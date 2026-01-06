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

SKIP_DOWNLOAD = os.environ.get('SKIP_DOWNLOAD', 'false').lower() in ('true', '1', 'yes')
MAGNITUDE_ONLY_EN = 3.0
HEADERS = {'User-Agent': 'GalaxyDataFetcher/1.0'} 

CATALOG_CACHE = {}

CONSTANTS = {
    'LY_TO_PC': 0.306601,       # 1 Light Year = ~0.306 Parsecs
    'M_TO_PC': 3.24078e-17,     # 1 Meter = ~3.24e-17 Parsecs
    'AU_TO_PC': 4.84814e-6,     # 1 AU = ~4.8e-6 Parsecs
    'KG_TO_SOLAR': 5.029e-31,   # 1 Kg = ~5e-31 Solar Masses
    'M_TO_SOLAR_R': 1.4374e-9,  # 1 Meter = ~1.4e-9 Solar Radii
    'KM_TO_SOLAR_R': 1.4374e-6, # 1 KM = ~1.4e-6 Solar Radii
}

CONVERSIONS_DISTANCE = {
    'Q12129': 1.0,                     # Parsec -> Parsec
    'Q531':   CONSTANTS['LY_TO_PC'],   # Light Year -> Parsec
    'Q11573': CONSTANTS['M_TO_PC'],    # Metre -> Parsec
    'Q828224': CONSTANTS['M_TO_PC'] * 1000, # Kilometre -> Parsec
    'Q1811':  CONSTANTS['AU_TO_PC'],   # AU -> Parsec
}

CONVERSIONS_MASS = {
    'Q180892': 1.0,                    # Solar Mass -> Solar Mass
    'Q11570':  CONSTANTS['KG_TO_SOLAR'], # Kilogram -> Solar Mass    
}

CONVERSIONS_RADIUS = {
    'Q48440': 1.0,                     # Solar Radius -> Solar Radius
    'Q11573': CONSTANTS['M_TO_SOLAR_R'], # Metre -> Solar Radius
    'Q828224': CONSTANTS['KM_TO_SOLAR_R'], # Kilometre -> Solar Radius
    'Q1811': (CONSTANTS['AU_TO_PC'] / CONSTANTS['M_TO_PC']) * CONSTANTS['M_TO_SOLAR_R'] # AU -> Solar Radius (Rare but possible)
}

PROP_RADIUS = 'P2120'
PROP_DISTANCE = 'P2583'
PROP_MASS = 'P2067'
PROP_CATALOG = 'P528'
PROP_CATALOG_REF = 'P972'

def ensure_directory(directory):
    if not os.path.exists(directory): os.makedirs(directory)

def init_db(db_path):
    if os.path.exists(db_path): os.remove(db_path)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
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

    # OPTIMIZATION: Changed PK to (wikidata, name) to enforce unique strings per object.
    # We still keep 'type' for reference, but it will store only the FIRST source found.
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Names (
            wikidata TEXT,
            name TEXT,
            type TEXT,
            PRIMARY KEY (wikidata, type)
        ) WITHOUT ROWID
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Catalogs (
            catalogWid TEXT PRIMARY KEY,
            catalogName TEXT
        ) WITHOUT ROWID
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS CatalogIds (
            wikidataid TEXT,
            catalogWid TEXT,
            catalogId TEXT,
            PRIMARY KEY (wikidataid, catalogWid)
        ) WITHOUT ROWID
    ''')
    
    # Indexes
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_wikidata ON Objects (wikidata)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_objects_name_nocase ON Objects (name COLLATE NOCASE)')
    
    # OPTIMIZATION: Add index on Names(name) only if you search directly against this table.
    # The PK handles lookup by ID. This index handles lookup by Name string.
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
    except Exception as e:
        print(f"Error downloading {qid}: {e}")

def get_label(qid):
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
    try:
        amount = float(claim_value.get('amount', 0))
        unit_url = claim_value.get('unit', '')
        unit_qid = None
        if 'entity/' in unit_url:
            unit_qid = unit_url.split('entity/')[-1]
        return amount, unit_qid
    except (ValueError, TypeError):
        return None, None

def get_physical_property(entity, prop_id, conversion_map):
    """
    Extracts a value and converts it using the specific conversion_map provided.
    """
    claims = entity.get('claims', {}).get(prop_id, [])
    if not claims: return None
    for claim in claims:
        if claim.get('rank') == 'deprecated': continue
        val_data = claim.get('mainsnak', {}).get('datavalue', {}).get('value')
        if not val_data: continue
        amount, unit_qid = parse_quantity(val_data)
        # If amount is None or unit is missing/dimensionless ('1'), skip
        if amount is None or not unit_qid or unit_qid == '1': 
            continue 
        if unit_qid in conversion_map:
            return amount * conversion_map[unit_qid]            
    return None

def extract_catalogs(entity):
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
                if isinstance(q_val, dict) and 'numeric-id' in q_val:
                    cat_qid = f"Q{q_val['numeric-id']}"
                elif isinstance(q_val, dict) and 'id' in q_val:
                    cat_qid = q_val['id']
                else:
                    cat_qid = str(q_val).replace('http://www.wikidata.org/entity/', '')
            
            if cat_qid:
                # Use Memory Cache for Catalog Names
                if cat_qid in CATALOG_CACHE:
                    cat_name = CATALOG_CACHE[cat_qid]
                else:
                    cat_name = get_label(cat_qid)
                    CATALOG_CACHE[cat_qid] = cat_name
                
                results.append({'code': code, 'cat_qid': cat_qid, 'cat_name': cat_name})
        except Exception as e:
            print(e)
            continue
    return results

def process_entity_data(qid):
    file_path = os.path.join(WIKIDATA_DIR, f"{qid}.json")
    if not os.path.exists(file_path): return {}, {}, {}, []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        entity = data.get('entities', {}).get(qid, {})
        labels = {l: i['value'] for l, i in entity.get('labels', {}).items()}
        wiki = {s: i['title'] for s, i in entity.get('sitelinks', {}).items()}
        physics = {
            'radius': get_physical_property(entity, PROP_RADIUS, CONVERSIONS_RADIUS),     # Pass Radius Map
            'distance': get_physical_property(entity, PROP_DISTANCE, CONVERSIONS_DISTANCE), # Pass Distance Map
            'mass': get_physical_property(entity, PROP_MASS, CONVERSIONS_MASS)            # Pass Mass Map
        }
        catalogs = extract_catalogs(entity)
        return labels, wiki, physics, catalogs
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
            if not qid:
                enriched_items.append(item)
                continue

            # Process
            download_wikidata_entity(qid)
            labels, wiki, physics, catalogs_list = process_entity_data(qid)
            
            new_item = item.copy()
            new_item['i18n_names'] = labels
            new_item['wikipedia_articles'] = wiki
            new_item.update(physics)
            
            cat_dict = {}
            for c in catalogs_list:
                cat_dict[c['cat_name']] = c['code']
            new_item['catalogs'] = cat_dict
            enriched_items.append(new_item)

            # DB Save
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO Objects (wikidata, name, type, ra, dec, lines, mag, centerwid, radius, distance, mass, hip)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                qid, item.get('name'), group_key, item.get('ra'), item.get('dec'),
                item.get('lines') and json.dumps(item.get('lines')),
                item.get('mag'), item.get('centerwid'),
                physics['radius'], physics['distance'], physics['mass'],
                item.get('hip')
            ))

            for cat in catalogs_list:
                cursor.execute('INSERT OR IGNORE INTO Catalogs (catalogWid, catalogName) VALUES (?, ?)',
                               (cat['cat_qid'], cat['cat_name']))
                # CatalogIds Logic here if needed...

            # Goal: Insert unique names only.
            allLangs = group_key != 'stars' or (item.get('mag') or 99) <= MAGNITUDE_ONLY_EN
            name_data = {} # Key: lower_name -> {'display': str, 'sources': set()}
            # Collect Labels
            for lang, val in labels.items():
                if lang == 'en' or allLangs:
                    key = val.strip().lower()
                    if not key: continue
                    if key not in name_data:
                        name_data[key] = {'display': val.strip(), 'sources': set()}
                    name_data[key]['sources'].add(lang)

            # Collect Wikis
            for site, title in wiki.items():
                if len(site) == 6 and site.endswith('wiki'):
                    if site == 'enwiki' or allLangs:
                        key = title.strip().lower()
                        if not key: continue
                        if key not in name_data:
                            name_data[key] = {'display': title.strip(), 'sources': set()}
                        name_data[key]['sources'].add(site)
            
            # Insert aggregated rows
            for key, data in name_data.items():
                # Join sources: "en,enwiki,frwiki"
                types_str = ",".join(sorted(data['sources']))
                cursor.execute('INSERT OR IGNORE INTO Names (wikidata, name, type) VALUES (?, ?, ?)', 
                               (qid, data['display'], types_str))

        final_db[group_key] = enriched_items

    conn.commit()
    conn.isolation_level = None
    conn.cursor().execute("PRAGMA page_size = 4096") # Larger page size can help slightly with blobs/text
    conn.cursor().execute("VACUUM")
    conn.close()
    
    print(f"Saving JSON to {OUTPUT_JSON}...")
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(final_db, f, indent=4, ensure_ascii=False)
    print("Done.")

if __name__ == "__main__":
    main()