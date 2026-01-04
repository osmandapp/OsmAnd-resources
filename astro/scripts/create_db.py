import json
import os
import requests
import time

# --- Configuration ---
# List of input files to process. 
# The script will use the filename (without extension) as the key in the final JSON.
INPUT_FILES = ['galaxies.json', 'black_holes.json', 'constellations.json']  
INPUT_DIR = '../'
OUTPUT_FILENAME = '../gen/stars-db.json'
WIKIDATA_DIR = '../wikidata'

HEADERS = {
    'User-Agent': 'GalaxyDataFetcher/1.0 (my_email@example.com)' 
}

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def download_wikidata_entity(qid):
    """Downloads the JSON for a specific QID if it doesn't exist."""
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    
    if os.path.exists(file_path):
        # print(f"Skipping {qid} (already exists)") # Uncomment to reduce noise
        return

    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
    print(f"Downloading {qid} from {url}...")
    
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(response.text)
            
        time.sleep(1.0) # Polite delay
        
    except Exception as e:
        print(f"Error downloading {qid}: {e}")

def process_entity_data(qid):
    """Reads the local JSON file and extracts labels and sitelinks."""
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

        # 2. Extract Sitelinks (Wikipedia article names)
        sitelinks_raw = entity.get('sitelinks', {})
        wikipedia_map = {site: item['title'] for site, item in sitelinks_raw.items()}

        return labels_map, wikipedia_map

    except Exception as e:
        print(f"Error processing data for {qid}: {e}")
        return {}, {}

def main():
    ensure_directory(WIKIDATA_DIR)
    
    # Ensure output directory exists
    output_dir = os.path.dirname(OUTPUT_FILENAME)
    if output_dir:
        ensure_directory(output_dir)

    # This dictionary will hold the grouped results
    # Example: { "galaxies": [...], "black_holes": [...] }
    final_db = {}

    for filename in INPUT_FILES:
        # Determine the key name (e.g., "galaxies" from "galaxies.json")
        group_key = os.path.splitext(filename)[0]
        file_path = os.path.join(INPUT_DIR, filename)

        print(f"--- Processing group: '{group_key}' from {file_path} ---")

        if not os.path.exists(file_path):
            print(f"Warning: File {file_path} not found. Skipping.")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                items = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from {file_path}: {e}")
            continue

        enriched_items = []
        
        for item in items:
            qid = item.get('wid')
            
            # If no Wiki ID, just keep the item as is
            if not qid:
                enriched_items.append(item)
                continue

            # Step 1: Download
            download_wikidata_entity(qid)

            # Step 2: Parse
            labels, wiki_articles = process_entity_data(qid)

            # Step 3: Enrich
            new_item = item.copy()
            new_item['i18n_names'] = labels
            new_item['wikipedia_articles'] = wiki_articles
            
            enriched_items.append(new_item)
        
        # Add the list of enriched items to the main dictionary under the group key
        final_db[group_key] = enriched_items

    # Step 4: Save final combined result
    print(f"Saving combined database to {OUTPUT_FILENAME}...")
    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
        json.dump(final_db, f, indent=4, ensure_ascii=False)
    
    print("Done!")

if __name__ == "__main__":
    main()