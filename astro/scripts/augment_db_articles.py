import json
import os
import shutil
import sqlite3
import requests
import time

# --- Configuration ---
INPUT_DB_JSON = '../gen/stars-db.json'
INPUT_DB_SQLITE = '../gen/stars.db'
OUTPUT_DB_SQLITE = '../gen/stars-articles.db'
WIKIPEDIA_DIR = '../wikipedia'

HEADERS = {
    'User-Agent': 'GalaxyDataFetcher/1.0 (my_email@example.com)'
}

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def get_enwiki_title(item):
    """Extracts the English Wikipedia title from the item dictionary."""
    # Based on create_db.py structure, 'wikipedia_articles' maps site code -> title
    articles = item.get('wikipedia_articles', {})
    return articles.get('enwiki')

def download_wikipedia_data(wid, title):
    """Downloads summary JSON and Mobile HTML if not present."""
    
    # 1. Summary JSON (API: page/summary)
    json_filename = f"{wid}.enwiki.json"
    json_path = os.path.join(WIKIPEDIA_DIR, json_filename)
    
    if not os.path.exists(json_path):
        url_summary = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
        print(f"Downloading Summary for {wid} ({title})...")
        try:
            resp = requests.get(url_summary, headers=HEADERS)
            if resp.status_code == 200:
                with open(json_path, 'w', encoding='utf-8') as f:
                    f.write(resp.text)
                time.sleep(0.5) # Rate limiting
            else:
                print(f"Failed to fetch summary for {title}: {resp.status_code}")
        except Exception as e:
            print(f"Error fetching summary for {title}: {e}")

    # 2. Mobile HTML (API: page/mobile-html)
    html_filename = f"{wid}.enwiki.mob.html"
    html_path = os.path.join(WIKIPEDIA_DIR, html_filename)
    
    if not os.path.exists(html_path):
        url_html = f"https://en.wikipedia.org/api/rest_v1/page/mobile-html/{title}"
        print(f"Downloading Mobile HTML for {wid} ({title})...")
        try:
            resp = requests.get(url_html, headers=HEADERS)
            if resp.status_code == 200:
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(resp.text)
                time.sleep(0.5)
            else:
                print(f"Failed to fetch HTML for {title}: {resp.status_code}")
        except Exception as e:
            print(f"Error fetching HTML for {title}: {e}")

def create_augmented_db():
    """Copies the original DB and adds new tables."""
    print(f"Creating {OUTPUT_DB_SQLITE} from {INPUT_DB_SQLITE}...")
    
    # Copy the file
    if os.path.exists(INPUT_DB_SQLITE):
        shutil.copy2(INPUT_DB_SQLITE, OUTPUT_DB_SQLITE)
    else:
        print("Error: Input SQLite DB not found.")
        return None

    conn = sqlite3.connect(OUTPUT_DB_SQLITE)
    cursor = conn.cursor()

    # Create new table to store the rich content
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Wikipedia_Pages (
            wikidata TEXT PRIMARY KEY,
            title TEXT,
            extract TEXT,
            thumbnail_url TEXT,
            summary_json TEXT,
            mobile_html TEXT
        )
    ''')
    conn.commit()
    return conn

def process_files_into_db(conn, wid, title):
    """Reads downloaded files and inserts them into the DB."""
    json_path = os.path.join(WIKIPEDIA_DIR, f"{wid}.enwiki.json")
    html_path = os.path.join(WIKIPEDIA_DIR, f"{wid}.enwiki.mob.html")
    
    summary_json_str = None
    mobile_html_str = None
    extract_text = None
    thumbnail_url = None

    # Process JSON file
    if os.path.exists(json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            summary_json_str = f.read()
            try:
                data = json.loads(summary_json_str)
                extract_text = data.get('extract')
                thumbnail_url = data.get('thumbnail', {}).get('source')
            except:
                pass

    # Process HTML file
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            mobile_html_str = f.read()

    # Insert if we have data
    if summary_json_str or mobile_html_str:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR REPLACE INTO Wikipedia_Pages 
            (wikidata, title, extract, thumbnail_url, summary_json, mobile_html)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (wid, title, extract_text, thumbnail_url, summary_json_str, mobile_html_str))

def main():
    ensure_directory(WIKIPEDIA_DIR)
    
    # 1. Load the JSON DB to get list of articles
    if not os.path.exists(INPUT_DB_JSON):
        print(f"Error: {INPUT_DB_JSON} not found.")
        return

    print(f"Loading {INPUT_DB_JSON}...")
    with open(INPUT_DB_JSON, 'r', encoding='utf-8') as f:
        db_data = json.load(f)

    # 2. Iterate and Download
    items_to_process = [] # list of (wid, title)

    for group, items in db_data.items():
        print(f"Scanning group: {group}")
        for item in items:
            wid = item.get('wid')
            title = get_enwiki_title(item)
            
            if wid and title:
                items_to_process.append((wid, title))
                download_wikipedia_data(wid, title)
    
    # 3. Create DB Copy and Augment
    conn = create_augmented_db()
    if not conn:
        return

    print("Populating augmented database...")
    for wid, title in items_to_process:
        process_files_into_db(conn, wid, title)
    
    conn.commit()
    conn.close()
    print(f"Done! New database saved to {OUTPUT_DB_SQLITE}")

if __name__ == "__main__":
    main()