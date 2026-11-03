# POI name index: data box corner outside the request bbox

`poi_name_index_corner.obf` (POI section only) is a regression fixture for search by name with a
small bbox. Readers that accept a name index data box only when its top-left corner is inside the
request bbox lose POIs of that box. OsmAnd-java `collectTestResources` copies this directory to
`OsmAnd-java/src/test/resources/poi_name_index`, where the Java and Kotlin tests read it. Each test
checks the expected ids itself:

- OsmAnd-java: `net.osmand.binary.PoiNameIndexBBoxTest`, `BinaryMapIndexReader.searchPoiByName`.
- OsmAnd-shared: `net.osmand.shared.binary.PoiNameIndexBBoxTest`, the Kotlin `BinaryMapIndexReader`.
- OsmAnd-core: `tests/unit/TestPoiNameIndexBBox.cpp`, `AmenitiesByNameSearch` with `bbox31`. Needs
  `OSMAND_TEST_POI_NAME_INDEX_OBF` (this file) and `OSMAND_TEST_CORE_RESOURCES` (a directory with
  `misc/icu4c/icu-data-l.dat`, from `resources/misc/icu4c/icudt52l.dat`).

## Content

| Object | OSM node | Amenity id | Lat, lon |
|---|---|---|---|
| `Cornerbox Target`, amenity=cafe | 1001 | 2002 | 49.7212831, 13.3972778 |
| `Widebox Control`, amenity=cafe | 1002 | 2004 | 49.7227036, 13.4005737 |

The generator writes POI data boxes at zoom 16. `Cornerbox Target` is in the zoom 16 tile
x=35206, y=22304 (NW 49.7244792, 13.3923340; SE 49.7209279, 13.3978271), at 0.9/0.9 of the tile,
near its south-east corner. `Widebox Control` is in the next tile to the east.

## Requests

- Small bbox: NW 49.7215672, 13.3968384, SE 49.7201466, 13.3990356 (0.82..1.22 of the tile on both
  axes). It contains `Cornerbox Target`, but not the top-left corner of its data box. Its center
  (49.7208569, 13.3979370) is outside the data box, so the Java "box contains request point"
  condition does not apply either. Expected: id 2002.
- Wide bbox: NW 49.7250, 13.3920, SE 49.7200, 13.4010. Contains both tiles with their corners.
  Expected: id 2002 for `Cornerbox`, id 2004 for `Widebox`.

- Disjoint bbox: NW 49.7230, 13.4000, SE 49.7224, 13.4010. Lies entirely east of the
  `Cornerbox Target` data box; the request point is outside that box too. Expected: no results
  for `Cornerbox`. The same bbox contains `Widebox Control`; searching `Widebox` returns id 2004.

## How it was made

`poi_name_index_corner.osm` is the source. Generated with OsmAndMapCreator (distribution of
2026-05-22):

```
java -cp "OsmAndMapCreator.jar;lib/*" net.osmand.MainUtilities generate-poi poi_name_index_corner.osm
```

The output `Poi_name_index_corner.obf` was renamed to lower case.
