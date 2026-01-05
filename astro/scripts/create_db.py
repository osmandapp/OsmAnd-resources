import json
import os
import requests
import time
import sqlite3

# --- Configuration ---
INPUT_FILES = ['galaxies.json', 'black_holes.json', 'constellations.json', 'stars.json',
               'open_clusters.json', 'globular_clusters.json', 'nebulae.json', 'galaxy_clusters.json'] 
INPUT_DIR = '../'
OUTPUT_JSON = '../gen/stars-db.json'
OUTPUT_DB = '../gen/stars.db'
WIKIDATA_DIR = '../wikidata'
SKIP_DOWNLOAD = os.environ.get('SKIP_DOWNLOAD', 'false').lower() in ('true', '1', 'yes')

HEADERS = {
    'User-Agent': 'GalaxyDataFetcher/1.0 (my_email@example.com)' 
}

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def init_db(db_path):
    """Initialize the SQLite database with required tables."""
    if os.path.exists(db_path):
        os.remove(db_path)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Objects Table
    # Constraint: Primary Key is (name, wikidata)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Objects (
            wikidata TEXT,
            name TEXT,
            type TEXT,
            ra REAL,
            dec REAL,
            lines TEXT,
            mag REAL,
            hip INTEGER,
            PRIMARY KEY (name, wikidata, type)
        )
    ''')

    # 2. Names Table
    # Constraint: No ID, No Foreign Keys, Primary Key is (wikidata, type)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Names (
            wikidata TEXT,
            name TEXT,
            type TEXT,
            PRIMARY KEY (wikidata, type)
        ) WITHOUT ROWID
    ''')
    
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_hip ON Objects (hip)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_wikidata ON Objects (wikidata)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_name_nocase ON Objects (name COLLATE NOCASE)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_names_name_nocase ON Names (name COLLATE NOCASE)')
    # Clear existing data to avoid duplicates on re-run
    cursor.execute("DELETE FROM Objects")
    cursor.execute("DELETE FROM Names")
    
    conn.commit()
    return conn

def download_wikidata_entity(qid):
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if os.path.exists(file_path):
        return

    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
    print(f"Downloading {qid} from {url}...", flush=True)
    
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(response.text)
        time.sleep(0.5) 
    except Exception as e:
        print(f"Error downloading {qid}: {e}")

def process_entity_data(qid):
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if not os.path.exists(file_path):
        return {}, {}

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        entity = data.get('entities', {}).get(qid, {})
        
        # 1. Extract Labels
        labels_raw = entity.get('labels', {})
        labels_map = {lang: item['value'] for lang, item in labels_raw.items()}

        # 2. Extract Sitelinks
        sitelinks_raw = entity.get('sitelinks', {})
        wikipedia_map = {site: item['title'] for site, item in sitelinks_raw.items()}

        return labels_map, wikipedia_map

    except Exception as e:
        print(f"Error processing data for {qid}: {e}")
        return {}, {}

def save_to_sqlite(conn, group_key, item):
    cursor = conn.cursor()
    
    wid = item.get('wid')
    if not wid:
        return # Skip items without wikidata ID

    # --- Insert into Objects ---
    # Will FAIL if (name, wikidata) already exists
    cursor.execute('''
        INSERT INTO Objects (wikidata, name, type, ra, dec, lines, mag, hip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        wid,
        item.get('name'),
        group_key,          # The "type" (e.g., 'galaxies')
        item.get('ra'),
        item.get('dec'),
        item.get('lines') is not None and json.dumps(item.get('lines')) or None,
        item.get('mag'),
        item.get('hip')     # Will be None (NULL) if not present
    ))

    # --- Insert into Names ---
    # Will FAIL if (wikidata, type) already exists
    
    # 1. Insert i18n names (Labels)
    if 'i18n_names' in item:
        for lang, name in item['i18n_names'].items():
            cursor.execute('INSERT OR IGNORE INTO Names (wikidata, name, type) VALUES (?, ?, ?)', 
                          (wid, name, f"{lang}"))
            
    # 2. Insert Wikipedia articles (Sitelinks)
    if 'wikipedia_articles' in item:
        for site, title in item['wikipedia_articles'].items():
            if len(site) == 6 and site.endswith('wiki'):
                cursor.execute('INSERT OR IGNORE INTO Names (wikidata, name, type) VALUES (?, ?, ?)', 
                           (wid, title, site))

def main():
    ensure_directory(WIKIDATA_DIR)
    
    output_dir = os.path.dirname(OUTPUT_JSON)
    if output_dir:
        ensure_directory(output_dir)

    # Initialize Database
    print(f"Initializing database: {OUTPUT_DB}")
    conn = init_db(OUTPUT_DB)
    
    final_db = {}

    for filename in INPUT_FILES:
        group_key = os.path.splitext(filename)[0]
        file_path = os.path.join(INPUT_DIR, filename)

        print(f"--- Processing group: '{group_key}' from {file_path} ---", flush=True)

        if not os.path.exists(file_path):
            print(f"Warning: File {file_path} not found. Skipping.")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                items = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            continue

        enriched_items = []
        
        for item in items:
            qid = item.get('wid')
            
            if not qid:
                enriched_items.append(item)
                continue

            # Download & Process
            if not SKIP_DOWNLOAD:
                download_wikidata_entity(qid)
            labels, wiki_articles = process_entity_data(qid)

            new_item = item.copy()
            new_item['i18n_names'] = labels
            new_item['wikipedia_articles'] = wiki_articles
            
            enriched_items.append(new_item)

            # Save to SQLite immediately
            save_to_sqlite(conn, group_key, new_item)
        
        final_db[group_key] = enriched_items

    # Commit DB changes and close
    conn.commit()
    conn.isolation_level = None
    
    conn.cursor().execute("PRAGMA page_size = 1024")
    conn.cursor().execute("VACUUM")
    conn.close()
    print(f"Database saved to {OUTPUT_DB}")

    # Save JSON
    print(f"Saving JSON to {OUTPUT_JSON}...", flush=True)
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(final_db, f, indent=4, ensure_ascii=False)
    
    print("Done!", flush=True)

if __name__ == "__main__":
    main()