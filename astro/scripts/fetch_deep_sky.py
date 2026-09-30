import requests
import json
import os

# Configuration: Mapping of file names to Wikidata Root Q-IDs
OBJECT_TYPES = {
    #"planetary_nebula.json": "Q13632",   # Planetary Nebula
    #"emission_nebula.json": "Q202265",   # Emission nebulae
    #"diffuse_nebula.json": "Q854857",   # Diffuse nebula
    #"reflection_nebula.json": "Q203958",   # Reflection nebula
    "galaxies.json":           "Q318",     # Galaxy
    "black_holes.json":      "Q589",     # Black Hole
    "open_clusters.json":    "Q11387",   # Open Cluster
    "globular_clusters.json": "Q11276",  # Globular Cluster
    "nebulae.json":           "Q42372",   # Nebula (General)    
    "galaxy_clusters.json":  "Q204107"   # Galaxy Cluster
}

def fetch_data(filename, root_qid):
    print(f"--- Processing {filename} (Root: {root_qid}) ---")
    
    # SPARQL Query
    # 1. We select ?typeLabel to get the text name of the "Instance of"
    # 2. We select ?image for P18
    query = f"""
    SELECT DISTINCT ?item ?itemLabel ?ra ?dec ?mag ?band ?wikiTitle ?typeLabel ?image WHERE {{
      # 1. Filter: Must be subclass of the root QID
      ?subclass wdt:P279* wd:{root_qid} .
      ?item wdt:P31 ?subclass .
      
      # 2. Get ALL "Instance of" types (for the comma-separated list)
      ?item wdt:P31 ?allTypes .
      ?allTypes rdfs:label ?typeLabel .
      FILTER(LANG(?typeLabel) = "en")

      # 3. Coordinates
      ?item wdt:P6257 ?ra ;
            wdt:P6258 ?dec .
            
      # 4. Magnitude (Optional)
      OPTIONAL {{ 
        ?item p:P1215 ?stmt .
        ?stmt ps:P1215 ?mag .
        OPTIONAL {{ ?stmt pq:P1227 ?band . }}
      }}
      
      # 5. Image (Optional)
      OPTIONAL {{ ?item wdt:P18 ?image . }}

      # 6. Must have English Wikipedia article
      ?article schema:about ?item ;
               schema:isPartOf <https://en.wikipedia.org/> ;
               schema:name ?wikiTitle .
      
      SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    LIMIT 50000
    """

    url = "https://query.wikidata.org/sparql"
    headers = {"User-Agent": "DeepSkyFetcher/3.0"}
    
    try:
        response = requests.get(url, params={'format': 'json', 'query': query}, headers=headers)
        print(response)
        data = response.json()
        
        # Deduplication Dictionary
        objects_map = {}

        for entry in data['results']['bindings']:
            try:
                wid = entry['item']['value'].split('/')[-1]
                
                # Name Priority: Wikipedia Title > Label
                raw_name = entry.get('wikiTitle', {}).get('value')
                if not raw_name:
                    raw_name = entry.get('itemLabel', {}).get('value')

                if wid not in objects_map:
                    objects_map[wid] = {
                        "name": raw_name,
                        "ra": round(float(entry['ra']['value']) / 15.0, 6),
                        "dec": round(float(entry['dec']['value']), 6),
                        "wid": wid,
                        "candidates": [], # For magnitudes
                        "types_set": set(), # For unique types
                        "image": None
                    }
                
                # Add Magnitude
                if 'mag' in entry:
                    mag_val = float(entry['mag']['value'])
                    band_val = entry['band']['value'].split('/')[-1] if 'band' in entry else None
                    objects_map[wid]["candidates"].append({"mag": mag_val, "band": band_val})
                
                # Add Type (to set to avoid duplicates)
                if 'typeLabel' in entry:
                    objects_map[wid]["types_set"].add(entry['typeLabel']['value'])

                # Add Image (Take the first one found)
                if 'image' in entry and objects_map[wid]["image"] is None:
                    objects_map[wid]["image"] = entry['image']['value']
                    
            except (ValueError, KeyError):
                continue

        # Final Processing
        final_list = []
        V_BAND_ID = "Q1048680" 

        for wid, data in objects_map.items():
            # 1. Process Magnitude (V-band priority)
            candidates = data.pop("candidates")
            selected_mag = None
            if candidates:
                v_bands = [c['mag'] for c in candidates if c['band'] == V_BAND_ID]
                selected_mag = v_bands[0] if v_bands else candidates[0]['mag']
            
            data["mag"] = selected_mag
            
            # 2. Process Types (Set -> Comma separated string)
            types_set = data.pop("types_set")
            data["type"] = ", ".join(sorted(types_set))
            
            final_list.append(data)

        # Sort by Name
        final_list.sort(key=lambda x: x['name'])

        # Write to File
        os.makedirs("gen", exist_ok=True)
        file_path = os.path.join("gen", filename)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write("[\n")
            for i, item in enumerate(final_list):
                line = "    " + json.dumps(item)
                if i < len(final_list) - 1:
                    line += ","
                f.write(line + "\n")
            f.write("]")

        print(f"Saved {len(final_list)} items to {file_path}")

    except Exception as e:
        print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    for filename, qid in OBJECT_TYPES.items():
        fetch_data(filename, qid)