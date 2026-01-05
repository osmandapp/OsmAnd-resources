import json
import os
import shutil
import gzip
import sqlite3
import requests
import time

# --- Configuration ---
INPUT_DB_JSON = '../gen/stars-db.json'
INPUT_DB_SQLITE = '../gen/stars.db'
OUTPUT_DB_SQLITE = '../gen/stars-articles.db'
WIKIPEDIA_DIR = '../wikipedia'
SKIP_DOWNLOAD = os.environ.get('SKIP_DOWNLOAD', 'false').lower() in ('true', '1', 'yes')
MAGNITUDE_ONLY_EN = 5.0

HEADERS = {
    'User-Agent': 'GalaxyDataFetcher/1.0 (my_email@example.com)'
}

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def get_valid_wiki_articles(group, item):
    """
    Extracts valid Wikipedia articles based on criteria:
    - Ends with 'wiki'
    - Language code is 2 characters (total length 6, e.g., 'enwiki')
    - Excludes 'commonswiki'
    """
    articles = item.get('wikipedia_articles', {})
    valid_list = []
    mag = item.get('mag')
    # allLangs = group != 'stars' or (mag is not None and mag <= MAGNITUDE_ONLY_EN)
    allLangs =  (mag is not None and mag <= MAGNITUDE_ONLY_EN)
    
    for site_code, title in articles.items():
        # Filter: Length must be 6 (2 chars + 'wiki') AND ends with 'wiki'
        # This automatically excludes 'commonswiki' (len 11) and 'simplewiki' (len 10)
        if site_code == 'enwiki' or (allLangs and len(site_code) == 6 and site_code.endswith('wiki')):
            lang = site_code[:-4] # Extract 'en' from 'enwiki'
            valid_list.append((lang, title))
            
    return valid_list

def download_wikipedia_data(wid, lang, title):
    """Downloads summary JSON and Mobile HTML for a specific language."""
    
    json_filename = f"{wid}.{lang}wiki.json"
    html_filename = f"{wid}.{lang}wiki.mob.html"
    
    json_path = os.path.join(WIKIPEDIA_DIR, json_filename)
    html_path = os.path.join(WIKIPEDIA_DIR, html_filename)
    
    # 1. Summary JSON
    if not os.path.exists(json_path):
        # Dynamic URL based on language
        url_summary = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title}"
        print(f"[{lang}] Downloading Summary for {wid} ({title})...", flush=True)
        try:
            resp = requests.get(url_summary, headers=HEADERS)
            if resp.status_code == 200:
                with open(json_path, 'w', encoding='utf-8') as f:
                    f.write(resp.text)
                time.sleep(0.3) 
            elif resp.status_code == 404:
                print(f"[{lang}] Not Found: {title}")
        except Exception as e:
            print(f"[{lang}] Error fetching summary: {e}")

    # 2. Mobile HTML
    if not os.path.exists(html_path):
        url_html = f"https://{lang}.wikipedia.org/api/rest_v1/page/mobile-html/{title}"
        print(f"[{lang}] Downloading HTML for {wid} ({title})...", flush=True)
        try:
            resp = requests.get(url_html, headers=HEADERS)
            if resp.status_code == 200:
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(resp.text)
                time.sleep(0.3)
        except Exception as e:
            print(f"[{lang}] Error fetching HTML: {e}")

def create_augmented_db():
    """Copies the original DB and adds the multi-language table."""
    print(f"Creating {OUTPUT_DB_SQLITE} from {INPUT_DB_SQLITE}...", flush=True)
    
    if os.path.exists(INPUT_DB_SQLITE):
        shutil.copy2(INPUT_DB_SQLITE, OUTPUT_DB_SQLITE)
    else:
        print("Error: Input SQLite DB not found.")
        return None

    conn = sqlite3.connect(OUTPUT_DB_SQLITE)
    cursor = conn.cursor()

    # Updated Schema: Composite Primary Key (wikidata, lang)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Wikipedia (
            wikidata TEXT,
            lang TEXT,
            title TEXT,
            extract TEXT,
            thumbnail_url TEXT,
            summary_json TEXT,
            mobile_html BLOB,
            PRIMARY KEY (wikidata, lang)
        )
    ''')
    conn.commit()
    return conn

def process_files_into_db(conn, wid, lang, title):
    """Reads downloaded files and inserts them into the DB."""
    json_path = os.path.join(WIKIPEDIA_DIR, f"{wid}.{lang}wiki.json")
    html_path = os.path.join(WIKIPEDIA_DIR, f"{wid}.{lang}wiki.mob.html")
    
    summary_json_str = None
    compressed_html = None
    extract_text = None
    thumbnail_url = None

    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            summary_json_str = f.read()
            try:
                data = json.loads(summary_json_str)
                extract_text = data.get('extract')
                thumbnail_url = data.get('thumbnail', {}).get('source')
            except:
                pass

    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            raw_html_str = f.read()
            # Convert string to bytes and then compress
            compressed_html = gzip.compress(raw_html_str.encode('utf-8'))

    if summary_json_str or compressed_html:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR REPLACE INTO Wikipedia
            (wikidata, lang, title, extract, thumbnail_url, summary_json, mobile_html)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (wid, lang, title, extract_text, thumbnail_url, summary_json_str, compressed_html))

def main():
    ensure_directory(WIKIPEDIA_DIR)
    
    if not os.path.exists(INPUT_DB_JSON):
        print(f"Error: {INPUT_DB_JSON} not found.")
        return

    print(f"Loading {INPUT_DB_JSON}...", flush=True)
    with open(INPUT_DB_JSON, 'r', encoding='utf-8') as f:
        db_data = json.load(f)

    # 1. Iterate and Download
    tasks = [] # List of (wid, lang, title)

    for group, items in db_data.items():
        print(f"Scanning group: {group}", flush=True)
        for item in items:
            wid = item.get('wid')
            if not wid: 
                print("  Skipping item {item} without WID.", flush=True)
                continue
            # Get valid articles (e.g., [('en', 'Aldebaran'), ('de', 'Aldebaran')])
            valid_articles = get_valid_wiki_articles(group, item)
            
            for lang, title in valid_articles:
                tasks.append((wid, lang, title))
                if not SKIP_DOWNLOAD:
                    download_wikipedia_data(wid, lang, title)
    
    # 2. Create DB and Populate
    conn = create_augmented_db()
    if not conn:
        return

    print("Populating augmented database...", flush=True)
    count = 0
    for wid, lang, title in tasks:
        process_files_into_db(conn, wid, lang, title)
        count += 1
        if count % 100 == 0:
            print(f"Processed {count} entries...", flush=True)
    
    conn.commit()
    conn.close()
    print(f"Done! New database saved to {OUTPUT_DB_SQLITE}", flush=True)

if __name__ == "__main__":
    main()