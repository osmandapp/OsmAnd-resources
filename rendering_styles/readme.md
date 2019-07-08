Rendering styles
================
**Default (general purposes):**
* default.render.xml : General purpose style. Simplified rendering to have cleaner maps in the populated cities. Key features: contour lines, routes, surface quality, access restrictions, road shields, paths rendering according to SAC scale, whitewater sports features.
* mapnik.render.xml : (default dependent) Old mapnik-style default rendering style. Key features: colours are similar to Mapnik style.
* topo.render.xml : (independent) Contrast style designed primarily for nature hiking, trekking and cycling. Good readability in complex external lighting. Key features: contrast roads and natural objects, different types of routes, contour lines with advanced settings, more details at corresponding zoom levels than "default" style. "Surface integrity" option allows you distinguish between roads with different surface quality. No night mode.
* LightRS.render.xml : (independent) Simple and contrast style for car navigation. Gentle for the eyes in the night mode. Key features: contour lines, contrast orange styled roads, less distracting secondary map objects.
* Touring-view_(more-contrast-and-details).render.xml: (dependent on default) TODO add description
* offroad.render.xml: Suitable for use during off-road driving. Suitable for use with green satellite images as an undarlay map. Key points: reduced thickness of the main roads, increased thickness of tracks, paths, bicycle and other routes. Based on Topo style.

**Special:**
* skimap.render.xml : (Android/iOS, default dependent). Style for skiing. Key features: renders pistes, aerial ways and other ski features in a convenient way. Less distracting secondary map objects.
* nautical.render.xml : (Android/iOS, default independent) Style for marine and river navigation. Key features: buoys, lighthouses, water navigation lines and marks, harbours, seamark services, depth contours.

**Examples and deprecated:**
* standalone-template.render.xml : Template for standalone style
* regions.render.xml
* Topo-map-assimilation.render.xml
* UniRS.render.xml 
