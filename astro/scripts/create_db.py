import json
import os
import requests
import time
import sqlite3
import re

# --- Configuration ---
INPUT_FILES = ['solar_system.json', 'galaxies.json', 'black_holes.json', 'constellations.json', 'stars.json',
               'open_clusters.json', 'globular_clusters.json', 'nebulae.json', 'galaxy_clusters.json'] 
INPUT_DIR = '../'
OUTPUT_JSON = '../gen/stars-db.json'
OUTPUT_DB = '../gen/stars.db'
WIKIDATA_DIR = '../wikidata'

# Environment variable to skip downloads
SKIP_DOWNLOAD = os.environ.get('SKIP_DOWNLOAD', 'false').lower() in ('true', '1', 'yes')

MAGNITUDE_ONLY_EN = 3.0
HEADERS = {
    'User-Agent': 'GalaxyDataFetcher/1.0 (my_email@example.com)' 
}

# --- Caching ---
# Caches catalog QIDs to Names (e.g., 'Q111130' -> 'Henry Draper Catalogue')
# This prevents re-parsing/re-fetching the same catalog authority for every star.
CATALOG_CACHE = {}

# --- Physics Constants ---
# We convert everything TO these target units:
# Distance -> Parsecs
# Mass     -> Solar Masses
# Radius   -> Solar Radii

CONSTANTS = {
    'LY_TO_PC': 0.306601,       # 1 Light Year = ~0.306 Parsecs
    'M_TO_PC': 3.24078e-17,     # 1 Meter = ~3.24e-17 Parsecs
    'AU_TO_PC': 4.84814e-6,     # 1 AU = ~4.8e-6 Parsecs
    'KG_TO_SOLAR': 5.029e-31,   # 1 Kg = ~5e-31 Solar Masses
    'M_TO_SOLAR_R': 1.4374e-9,  # 1 Meter = ~1.4e-9 Solar Radii
    'KM_TO_SOLAR_R': 1.4374e-6, # 1 KM = ~1.4e-6 Solar Radii
}

# Map Wikidata Unit QIDs to the Factor needed to reach our Target Unit
UNIT_CONVERSIONS = {
    # DISTANCE (Target: Parsec)
    'Q12129': 1.0,                     # Parsec -> Parsec
    'Q531':   CONSTANTS['LY_TO_PC'],   # Light Year -> Parsec
    'Q11573': CONSTANTS['M_TO_PC'],    # Metre -> Parsec
    'Q828224': CONSTANTS['M_TO_PC'] * 1000, # Kilometre -> Parsec
    'Q1811':  CONSTANTS['AU_TO_PC'],   # AU -> Parsec
    
    # MASS (Target: Solar Mass)
    'Q171497': 1.0,                    # Solar Mass -> Solar Mass
    'Q11570':  CONSTANTS['KG_TO_SOLAR'], # Kilogram -> Solar Mass
    
    # RADIUS (Target: Solar Radius)
    'Q48113': 1.0,                     # Solar Radius -> Solar Radius
    'Q11573': CONSTANTS['M_TO_SOLAR_R'], # Metre -> Solar Radius
    'Q828224': CONSTANTS['KM_TO_SOLAR_R'] # Kilometre -> Solar Radius
}

# Wikidata Property Constants
PROP_RADIUS = 'P2120'
PROP_DISTANCE = 'P2583'   # distance from Earth
PROP_MASS = 'P2067'
PROP_CATALOG = 'P528'
PROP_CATALOG_REF = 'P972'

def ensure_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def init_db(db_path):
    if os.path.exists(db_path):
        os.remove(db_path)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Objects Table (Includes 'hip')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Objects (
            wikidata TEXT,
            name TEXT,
            type TEXT,
            ra REAL,
            dec REAL,
            lines TEXT,
            centerwid TEXT,
            mag REAL,
            radius REAL,
            distance REAL,
            mass REAL,
            hip INTEGER, 
            PRIMARY KEY (name, wikidata, type)
        )
    ''')

    # 2. Names Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Names (
            wikidata TEXT,
            name TEXT,
            type TEXT,
            PRIMARY KEY (wikidata, type)
        ) WITHOUT ROWID
    ''')

    # 3. Catalogs Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Catalogs (
            catalogWid TEXT PRIMARY KEY,
            catalogName TEXT
        ) WITHOUT ROWID
    ''')

    # 4. CatalogIds Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS CatalogIds (
            wikidataid TEXT,
            catalogWid TEXT,
            catalogId TEXT,
            PRIMARY KEY (wikidataid, catalogWid)
        ) WITHOUT ROWID
    ''')
    
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_wikidata ON Objects (wikidata)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_name_nocase ON Objects (name COLLATE NOCASE)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_names_name_nocase ON Names (name COLLATE NOCASE)')
    
    conn.commit()
    return conn

def download_wikidata_entity(qid):
    if not qid: return
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if os.path.exists(file_path): return
    if SKIP_DOWNLOAD: return

    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
    print(f"Downloading {qid}...", flush=True)
    
    try:
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(response.text)
            time.sleep(0.5)
        else:
            print(f"Failed to fetch {qid}: {response.status_code}")
    except Exception as e:
        print(f"Error downloading {qid}: {e}")

def get_label(qid):
    """Fetches just the label for a QID from cache or network."""
    if not qid: return None
    download_wikidata_entity(qid)
    
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if not os.path.exists(file_path): return qid
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        entity = data.get('entities', {}).get(qid, {})
        labels = entity.get('labels', {})
        if 'en' in labels: return labels['en']['value']
        if labels: return list(labels.values())[0]['value']
    except:
        pass
    return qid

def parse_quantity(claim_value):
    """
    Parses a Wikidata Quantity value.
    Returns (amount: float, unit_qid: str|None)
    """
    try:
        amount = float(claim_value.get('amount', 0))
        unit_url = claim_value.get('unit', '')
        
        # Extract QID from unit URL "http://www.wikidata.org/entity/Q531"
        unit_qid = None
        if 'entity/' in unit_url:
            unit_qid = unit_url.split('entity/')[-1]
            
        return amount, unit_qid
    except (ValueError, TypeError):
        return None, None

def get_physical_property(entity, prop_id):
    """
    Extracts value and converts it to the TARGET unit.
    """
    claims = entity.get('claims', {}).get(prop_id, [])
    if not claims: return None
    
    for claim in claims:
        rank = claim.get('rank', 'normal')
        if rank != 'deprecated':
            val_data = claim.get('mainsnak', {}).get('datavalue', {}).get('value')
            if not val_data: continue

            amount, unit_qid = parse_quantity(val_data)
            
            if amount is None: continue

            # 1. No Unit provided? SAFE BET: Ignore it to avoid errors.
            if not unit_qid or unit_qid == '1':
                continue 

            # 2. Convert if we know the unit
            if unit_qid in UNIT_CONVERSIONS:
                factor = UNIT_CONVERSIONS[unit_qid]
                return amount * factor
            else:
                pass
                
    return None

def extract_catalogs(entity):
    """
    Extracts catalog IDs and recursively fetches Catalog Names using in-memory cache.
    """
    claims = entity.get('claims', {}).get(PROP_CATALOG, [])
    results = []
    
    for claim in claims:
        if claim.get('rank') == 'deprecated': continue
        try:
            code = claim['mainsnak']['datavalue']['value']
            qualifiers = claim.get('qualifiers', {}).get(PROP_CATALOG_REF, [])
            
            cat_qid = None
            if qualifiers:
                q_val = qualifiers[0]['datavalue']['value']
                # Handle Wikidata's varied JSON structure for entity IDs
                if isinstance(q_val, dict) and 'numeric-id' in q_val:
                    cat_qid = f"Q{q_val['numeric-id']}"
                elif isinstance(q_val, dict) and 'id' in q_val:
                    cat_qid = q_val['id']
                else:
                    cat_qid = str(q_val).replace('http://www.wikidata.org/entity/', '')
            
            # If we found a Catalog Authority QID, fetch its name
            if cat_qid:
                # CHECK CACHE FIRST
                if cat_qid in CATALOG_CACHE:
                    cat_name = CATALOG_CACHE[cat_qid]
                else:
                    cat_name = get_label(cat_qid)
                    CATALOG_CACHE[cat_qid] = cat_name

                results.append({
                    'code': code,
                    'cat_qid': cat_qid,
                    'cat_name': cat_name
                })
        except Exception:
            continue
    return results

def process_entity_data(qid):
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if not os.path.exists(file_path):
        return {}, {}, {}, []

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        entity = data.get('entities', {}).get(qid, {})
        
        labels_raw = entity.get('labels', {})
        labels_map = {lang: item['value'] for lang, item in labels_raw.items()}

        sitelinks_raw = entity.get('sitelinks', {})
        wikipedia_map = {site: item['title'] for site, item in sitelinks_raw.items()}

        # Get values converted to TARGET units
        physics = {
            'radius': get_physical_property(entity, PROP_RADIUS),   # Returns Solar Radii
            'distance': get_physical_property(entity, PROP_DISTANCE), # Returns Parsecs
            'mass': get_physical_property(entity, PROP_MASS)        # Returns Solar Mass
        }

        catalogs = extract_catalogs(entity)

        return labels_map, wikipedia_map, physics, catalogs

    except Exception as e:
        print(f"Error processing {qid}: {e}")
        return {}, {}, {}, []

def main():
    ensure_directory(WIKIDATA_DIR)
    print(f"Initializing DB: {OUTPUT_DB}")
    conn = init_db(OUTPUT_DB)
    
    final_db = {}

    for filename in INPUT_FILES:
        group_key = os.path.splitext(filename)[0]
        file_path = os.path.join(INPUT_DIR, filename)
        if not os.path.exists(file_path): continue

        print(f"Processing {group_key}...", flush=True)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                items = json.load(f)
        except: continue

        enriched_items = []
        
        for item in items:
            qid = item.get('wid')
            
            # 1. Fallback: Fetch name from catalog URL if missing
            if not item.get('name') and item.get('catalog'):
                 if 'wikidata.org' in str(item['catalog']):
                     match = re.search(r'(Q\d+)', item['catalog'])
                     if match:
                         cat_qid = match.group(1)
                         download_wikidata_entity(cat_qid)
                         fetched_name = get_label(cat_qid)
                         if fetched_name:
                             item['name'] = fetched_name
                             print(f"Fetched Name '{fetched_name}' from URL")

            if not qid:
                # Keep item even if no WID, but append raw
                enriched_items.append(item)
                continue

            # 2. Process Wikidata
            download_wikidata_entity(qid)
            labels, wiki, physics, catalogs_list = process_entity_data(qid)
            
            new_item = item.copy()
            new_item['i18n_names'] = labels
            new_item['wikipedia_articles'] = wiki
            
            # Apply physics (Correctly Normalized)
            new_item.update(physics)
            
            # 3. Add Catalogs to JSON Output
            # Structure: { "Henry Draper Catalogue": "HD 199611", ... }
            cat_dict = {}
            for c in catalogs_list:
                cat_dict[c['cat_name']] = c['code']
            new_item['catalogs'] = cat_dict

            enriched_items.append(new_item)

            # 4. Save to DB
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO Objects (wikidata, name, type, ra, dec, lines, mag, centerwid, radius, distance, mass, hip)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                qid, item.get('name'), group_key, item.get('ra'), item.get('dec'),
                item.get('lines') and json.dumps(item.get('lines')),
                item.get('mag'), item.get('centerwid'),
                physics['radius'], physics['distance'], physics['mass'],
                item.get('hip') # Preserved
            ))

            for cat in catalogs_list:
                # cursor.execute('INSERT OR REPLACE INTO CatalogIds (wikidataid, catalogWid, catalogId) VALUES (?, ?, ?)',
                #                (qid, cat['cat_qid'], cat['code']))
                cursor.execute('INSERT OR IGNORE INTO Catalogs (catalogWid, catalogName) VALUES (?, ?)',
                               (cat['cat_qid'], cat['cat_name']))

            # Save Names
            allLangs = group_key != 'stars' or (item.get('mag') or 99) <= MAGNITUDE_ONLY_EN
            for lang, val in labels.items():
                if lang == 'en' or allLangs:
                    labelname = val
                    # if val == item.get('name'):
                    #     labelname = ""
                    cursor.execute('INSERT OR IGNORE INTO Names (wikidata, name, type) VALUES (?, ?, ?)', 
                                   (qid, labelname, lang))
            
            for site, title in wiki.items():
                if len(site) == 6 and site.endswith('wiki'):
                    if lang == 'enwiki' or allLangs:
                        labelname = title
                        # if title == item.get('name'):
                        #     labelname = ""
                        cursor.execute('INSERT OR IGNORE INTO Names (wikidata, name, type) VALUES (?, ?, ?)', 
                                 (qid, labelname, site))

        final_db[group_key] = enriched_items

    conn.commit()
    conn.isolation_level = None
    
    conn.cursor().execute("PRAGMA page_size = 1024")
    conn.cursor().execute("VACUUM")

    conn.close()
    
    print(f"Saving JSON to {OUTPUT_JSON}...")
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(final_db, f, indent=4, ensure_ascii=False)
    print("Done.")

if __name__ == "__main__":
    main()