import os
import gzip
import json
import shutil
import requests
import pandas as pd
import numpy as np

# --- Configuration ---
# HIP_CATALOG_URL = "https://github.com/skyfielders/python-skyfield/raw/refs/heads/master/ci/hip_main.dat.gz"
# HIP_FILENAME = "hip_main.dat.gz"
HIP_CATALOG_URL = "https://codeberg.org/astronexus/hyg/media/branch/main/data/hyg/CURRENT/hyg_v42.csv.gz"
HIP_FILENAME = "hyg_v42.csv.gz"
CONST_FILENAME = "../constellations.json"
MAPPING_FILENAME = "../hipCatalogWikidata.json.gz"
OUTPUT_FILENAME = "stars.json"

# --- Functions ---

def download_hip_catalog():
    """Downloads the Hipparcos catalog if not present locally."""
    if not os.path.exists(HIP_FILENAME):
        print(f"Downloading Hipparcos catalog from {HIP_CATALOG_URL}...")
        try:
            with requests.get(HIP_CATALOG_URL, stream=True) as r:
                r.raise_for_status()
                with open(HIP_FILENAME, 'wb') as f:
                    shutil.copyfileobj(r.raw, f)
            print("Download complete.")
        except Exception as e:
            print(f"Error downloading file: {e}")
            exit(1)
    else:
        print(f"Using cached file: {HIP_FILENAME}")

def load_constellation_stars(filename):
    """Extracts a set of HIP IDs used in constellations."""
    if not os.path.exists(filename):
        print(f"Error: {filename} not found.")
        return set()
    
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    hip_ids = set()
    for constellation in data:
        lines = constellation.get('lines', [])
        for line in lines:
            # Each line is a list of HIP IDs [start, end]
            for hip_id in line:
                hip_ids.add(hip_id)
    return hip_ids

def load_wikidata_mapping(filename):
    """Loads the HIP->Wikidata mapping from a gzipped JSON file."""
    if not os.path.exists(filename):
        print(f"Error: {filename} not found.")
        return {}
        
    mapping = {}
    print(f"Loading mapping from {filename}...")
    try:
        with gzip.open(filename, 'rt', encoding='utf-8') as f:
            data = json.load(f)
            
        for entry in data:
            # entry example: {"item":"...","itemLabel":"...","hipID":"HIP 84345", ...}
            hip_str = entry.get('hipID', '')
            if isinstance(hip_str, str) and 'HIP' in hip_str:
                try:
                    # Parse "HIP 84345" -> 84345
                    hip_id = int(hip_str.replace('HIP', '').strip())
                    
                    # Extract QID from URL "http://www.wikidata.org/entity/Q13177" -> "Q13177"
                    wid_url = entry.get('item', '')
                    wid = wid_url.split('/')[-1] if wid_url else None
                    
                    mapping[hip_id] = {
                        'name': entry.get('itemLabel'),
                        'wid': wid
                    }
                except ValueError:
                    continue
    except Exception as e:
        print(f"Error reading mapping file: {e}")
        
    return mapping

def process_hip_catalog(constellation_stars, mapping):
    """Parses HIP catalog and produces the final stars list."""
    print("Processing Hipparcos catalog...")
    
    try:
        # CHANGE: Read as CSV. HYG has headers, so we don't need 'names' or 'header=None'
        # We use 'usecols' to grab exactly what we need.
        df = pd.read_csv(
            HIP_FILENAME, 
            compression='gzip',
            usecols=['hip', 'mag', 'ra', 'dec'], 
            dtype={'hip': 'Int64', 'mag': 'float64', 'ra': 'float64', 'dec': 'float64'},
            skipinitialspace=True,
            on_bad_lines='skip'
        )
    except Exception as e:
        print(f"Error parsing catalog: {e}")
        return []

    # Drop rows where HIP is missing
    df = df.dropna(subset=['hip'])
    
    output_stars = []
    
    count_const = 0
    count_bright = 0
    
    for _, row in df.iterrows():
        hip_id = int(row['hip'])
        mag = row['mag']
        
        # Filter Logic
        in_constellation = hip_id in constellation_stars
        
        is_bright = False
        if pd.notna(mag) and mag <= 4.5:
            is_bright = True
            
        if in_constellation or is_bright:
            # Get info from mapping
            star_info = mapping.get(hip_id, {})
            name = star_info.get('name', None)
            
            # EXCLUDE if name is null
            if name:
                if in_constellation: count_const += 1
                elif is_bright: count_bright += 1
                
                # Convert RA from degrees (0-360) to hours (0-24)
                ra_hours = row['ra']
                
                star_entry = {
                    "name": name,
                    "ra": round(ra_hours, 6),       # Rounded to 6 decimal places
                    "dec": round(row['dec'], 6),  # Rounded to 6 decimal places
                    "mag": mag if pd.notna(mag) else None,
                    "hip": hip_id,
                    "wid": star_info.get('wid', None)
                }
                output_stars.append(star_entry)

    print(f"Found {len(output_stars)} named stars matching criteria ({count_const} constellations, {count_bright} bright).")
    
    # Sort by Name (Case insensitive)
    output_stars.sort(key=lambda x: (str(x['name']).lower(), x['hip']))
    
    return output_stars

def main():
    # 1. Download HIP catalog
    download_hip_catalog()
    
    # 2. Load auxiliary data
    constellation_stars = load_constellation_stars(CONST_FILENAME)
    if not constellation_stars:
        print("Warning: No stars found in constellations file or file missing.")
        
    mapping = load_wikidata_mapping(MAPPING_FILENAME)
    if not mapping:
        print("Warning: Mapping file empty or missing.")

    # 3. Process and Filter
    stars_data = process_hip_catalog(constellation_stars, mapping)
    
    # 4. Save Output with custom formatting
    print(f"Saving to {OUTPUT_FILENAME}...")
    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
            f.write('[\n')
            
            lines = []
            for star in stars_data:
                # Limit float precision to keep file size reasonable/readable
                # Re-constructing dict for specific order if needed, but json.dumps usually follows insertion order in Py3.7+
                # We can also round here if strict formatting is required, but standard float output is usually fine.
                json_str = json.dumps(star, ensure_ascii=False)
                lines.append(f"  {json_str}")
            
            f.write(',\n'.join(lines))
            f.write('\n]')
        print("Done.")
    except Exception as e:
        print(f"Error saving file: {e}")

if __name__ == "__main__":
    main()