Rendering styles
================
This directory contains rendering style files, which dictate how the map should be rendered.
See [the OsmAnd documentation](https://osmand.net/docs/technical/osmand-file-formats/osmand-rendering-style/) for details on the format of these files.

**Default (general purposes):**
* **default.render.xml :** <br>General purpose style. Simplified rendering to have cleaner maps in the populated cities. Key features: contour lines, routes, surface quality, access restrictions, road shields, paths rendering according to SAC scale, whitewater sports features.
* **Touring-view_(more-contrast-and-details).render.xml :** <br>General purpose style: High-detail, high-contrast map for travelers and professional drivers. Provides at any given map zoom the maximum amount of travel details available, in particular depicts all roads, tracks, paths, and unambiguously distinguishes their types. Also features outdoor touring options like the original SAC Alpine hiking trail coding. (Depends on default.)
* **topo.render.xml :** <br>Contrast style designed primarily for nature hiking, trekking, and cycling. Good readability in complex external lighting. Key features: contrast roads and natural objects, different types of routes, contour lines with advanced settings, more details at corresponding zoom levels than "default" style. "Surface integrity" option allows you distinguish between roads with different surface quality. No night mode. (Standalone.)
* **LightRS.render.xml :** <br>Simple and contrast style for car navigation. Gentle for the eyes in the night mode. Key features: contour lines, contrast orange styled roads, less distracting secondary map objects. (Standalone.)
* **offroad.render.xml :** <br>Suitable for use during off-road driving. Suitable for use with green satellite images as an undarlay map. Key points: reduced thickness of the main roads, increased thickness of tracks, paths, bicycle and other routes. Based on Topo style.

**Special:**
* **skimap.render.xml :** <br>Style for skiing. Key features: renders pistes, aerial ways and other ski features in a convenient way. Less distracting secondary map objects. (Android/iOS, depends on default.)
* **nautical.render.xml :** <br>Style for marine and river navigation. Key features: buoys, lighthouses, water navigation lines and marks, harbours, seamark services, depth contours. (Android/iOS, depends on default.) 

**Examples and deprecated:**
* **standalone-template.render.xml :** Template for a standalone style.
* **mapnik.render.xml :** <br>Old mapnik-style default rendering style. Key features: colours are similar to Mapnik style. (Depends on default.)
* **regions.render.xml**
* **Topo-map-assimilation.render.xml**
* **UniRS.render.xml**

Installing modified rendering styles
------------------------------------
To test changes to these rendering styles, you can make changes and then copy the modified files into the `Android/data/net.osmand/files/rendering`
directory (or `net.osmand.plus` for OsmAnd plus and `net.osmand.dev` for OsmAnd nightly/beta) on the Android device (these files should be visible through any
file manager, or when browsing files via USB). There might already be files with the same name in that directory - OsmAnd copies the default builtin styles into
that directory whenever you first use them or whenever OsmAnd is updated (so any changes you make will last until the next update).

Alternatively, to simplify this install process, you can generate an .osf file using the `build_osf.sh` script, and then open that with OsmAnd to import these
files into the right place automatically (this might ask to overwrite files for
styles that you have used before, which is ok). You can run the script without
arguments to generate an osf file with *all* rendering styles:

    $ ./build_osf.sh
      adding: LightRS.render.xml (deflated 87%)
      adding: Topo-map-assimilation.render.xml (deflated 87%)
      [ ... snip more files ...]
      adding: weather.addon.render.xml (deflated 77%)
      adding: items.json (deflated 89%)
    Created RenderingStyles.osf

Alternatively, pass an output filename an optionally also xml filenames to include only those files:


    $ ./build_osf.sh output.osf routes.addon.render.xml default.render.xml
      adding: routes.addon.render.xml (deflated 89%)
      adding: default.render.xml (deflated 87%)
      adding: items.json (deflated 53%)
    Created output.osf

In both cases, such changes last until the next update of OsmAnd, then they are overwritten with the default version again.

This script uses POSIX sh, the `jq`, `zip` and `sponge` commands, so it should run on Linux (On Debian: `apt install zip jq moreutils`) and probably MacOS.
