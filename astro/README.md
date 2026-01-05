All jsons are manually crafted except stars.json which is generated from HIP database and HIP-Wikidata mapping.

File stars.json 
Hip wikidata mapping is from SPARQL query:
SELECT DISTINCT ?item ?itemLabel ?hipID ?constellationLabel ?mag WHERE {
  # 1. Get the Apparent Magnitude (P1215)
  ?item wdt:P1215 ?mag.

  # 2. Get the Constellation (P59)
  ?item wdt:P59 ?constellation.

  # 3. Get the specific Catalog Code (P528) for Hipparcos (Q537199)
  ?item p:P528 ?statement .       # Enter the statement node
  ?statement ps:P528 ?hipID .     # Get the text value (e.g. "HIP 12345")
  ?statement pq:P972 wd:Q537199 . # Filter: Catalog MUST be Hipparcos (Q537199)

  # 4. Label Service (Only for Items, not Strings)
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "en". 
    ?item rdfs:label ?itemLabel .
    ?constellation rdfs:label ?constellationLabel .
  }
}
# Sort: Lower magnitude = Brighter star
ORDER BY ASC(?mag)
LIMIT 100000
