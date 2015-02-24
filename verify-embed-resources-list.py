#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import os
import zlib
import re
import subprocess

# =============================================================================
# =============================================================================
# =============================================================================

class OsmAndCoreResourcesListGenerator(object):
    FILENAME_REGEXP = r"[A–Za–z0–9._-]*?"

    # -------------------------------------------------------------------------
    def __init__(self):
        return

    # -------------------------------------------------------------------------
    def generate(self, workroot, rules, outputFilename):
    	# Open output file
        try:
            outputFile = open(outputFilename, "w")
        except IOError:
            print("Failed to open '%s' for writing" % (outputFilename))
            return False

        # List all files
        print("Looking for files...")
        filenames = []
        for path, dirs, files in os.walk(workroot):
        	if path.startswith('.') or os.path.basename(path).startswith('.'):
        		print("Ignoring '%s'" % (path))
        		continue
        	print("Listing '%s' with %d files" % (path, len(files)))
        	for filename in files:
        		filepath = os.path.join(path, filename)
        		filenames.append(os.path.relpath(filepath, workroot))
        print("Found %d files to test" % (len(filenames)))

        # Apply each rule to each file entry
        for rule in rules:
        	print("Processing rule '%s' => '%s' rule:" % (rule[0], rule[1]))
        	processed = []
        	for filename in filenames:
        		if re.match(rule[0], filename) == None:
        			continue
        		listname = re.sub(rule[0], rule[1], filename)
        		processed.append(filename)
        		outputFile.write("/%s:%s\n" % (filename, listname))

        		print("\t '%s' => '%s'" % (filename, listname))
        	print("\t%d processed" % (len(processed)))
        	filenames[:] = [filename for filename in filenames if not filename in processed]

        print("%d unmatched" % (len(filenames)))

        outputFile.flush()
        outputFile.close()

        return True

# =============================================================================
# =============================================================================
# =============================================================================

if __name__=='__main__':
    # Get root directory of entire project
    rootPath = os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), ".."))
    print("OsmAnd root path:      %s" % (rootPath))
    resourcesPath = rootPath + "/resources"
    print("OsmAnd resources path: %s" % (resourcesPath))

    # Check if should regenerate. Regeneration is needed in following cases:
    #  - stamp (git commit hash of the HEAD) differs from current HEAD
    #  - '.git' directory missing
    #  - this script is newer than list itself
    #  - previous list is present and any of the file is newer or missing
    shouldRegenerate = False
    currentHeadCommitHash = ""
    if not shouldRegenerate and not os.path.isdir(resourcesPath + "/.git"):
        shouldRegenerate = True
        print("Non-development build, will regenerate resources list...")
    if not shouldRegenerate:
        oldcwd = os.getcwd()
        os.chdir(resourcesPath)
        currentHeadCommitHash = "#" + subprocess.check_output(
            ["git", "rev-parse", "HEAD"],
            universal_newlines=True).strip()
        os.chdir(oldcwd)
        lastProcessedCommitHash = ""
        if os.path.exists(resourcesPath + "/.embed-resources.stamp"):
            with open(resourcesPath + "/.embed-resources.stamp", "r") as stampFile:
                lastProcessedCommitHash = stampFile.read().strip()
            if currentHeadCommitHash != lastProcessedCommitHash:
                shouldRegenerate = True
                print("Last processed commit: " + lastProcessedCommitHash)
                print("Current HEAD commit:   " + currentHeadCommitHash)
                print("New commits present, will regenerate resources list...")
        else:
            shouldRegenerate = True
            print("Last processed commit: none")
            print("Current HEAD commit:   " + currentHeadCommitHash)
            print("Will regenerate resources list...")
    if not shouldRegenerate:
        if not os.path.exists(resourcesPath + "/embed-resources.list"):
            shouldRegenerate = True
            print("Resources list missing, will regenerate...")
    if not shouldRegenerate:
        if os.path.getmtime(os.path.realpath(__file__)) > os.path.getmtime(resourcesPath + "/embed-resources.list"):
            shouldRegenerate = True
            print("List generation script is newer than generated list, will regenerate resources list...")
    if not shouldRegenerate and os.path.exists(resourcesPath + "/embed-resources.list"):
        currentResourcesList = list()
        with open(resourcesPath + "/embed-resources.list") as currentResourcesListFile:
            currentResourcesList = currentResourcesListFile.readlines()
        for resourceListLine in currentResourcesList:
            resourceFileName = resourceListLine.split(':')[0]
            if not os.path.exists(resourcesPath + resourceFileName):
                shouldRegenerate = True
                print("Missing resource file '%s', will regenerate resources list..." % (resourceFileName))
                break
            elif os.path.getmtime(resourcesPath + resourceFileName) > os.path.getmtime(resourcesPath + "/embed-resources.list"):
                shouldRegenerate = True
                print("Resource file '%s' is newer than list, will regenerate resources list..." % (resourceFileName))
                break
    if not shouldRegenerate:
        print("Resources list is up-to-date")
        sys.exit(0)

    rules = [
        # Map styles and related:
        [r'rendering_styles/default\.render\.xml', 'map/styles/default.render.xml'],
        [r'rendering_styles/default\.map_styles_presets\.xml', 'map/presets/default.map_styles_presets.xml'],

        # Map icons (Android mdpi == 1.0 ddf):
        [r'rendering_styles/style-icons/drawable-mdpi/h_((?:[^/]*?shield[^/]*?)|(?:[^/]*?osmc[^/]*?))\.png', r'[ddf=1.0]map/shields/\1.png'],
        [r'rendering_styles/style-icons/drawable-mdpi/h_([^/]*?)\.png', r'[ddf=1.0]map/shaders/\1.png'],
        [r'rendering_styles/style-icons/drawable-mdpi/mm_([^/]*?)\.png', r'[ddf=1.0]map/icons/\1.png'],

        # Map icons (Android hdpi == 1.5 ddf):
        [r'rendering_styles/style-icons/drawable-hdpi/h_((?:[^/]*?shield[^/]*?)|(?:[^/]*?osmc[^/]*?))\.png', r'[ddf=1.5]map/shields/\1.png'],
        [r'rendering_styles/style-icons/drawable-hdpi/h_([^/]*?)\.png', r'[ddf=1.5]map/shaders/\1.png'],
        [r'rendering_styles/style-icons/drawable-hdpi/mm_([^/]*?)\.png', r'[ddf=1.5]map/icons/\1.png'],

        # Map icons (Android xhdpi == 2.0 ddf):
        [r'rendering_styles/style-icons/drawable-xhdpi/h_((?:[^/]*?shield[^/]*?)|(?:[^/]*?osmc[^/]*?))\.png', r'[ddf=2.0]map/shields/\1.png'],
        [r'rendering_styles/style-icons/drawable-xhdpi/h_([^/]*?)\.png', r'[ddf=2.0]map/shaders/\1.png'],
        [r'rendering_styles/style-icons/drawable-xhdpi/mm_([^/]*?)\.png', r'[ddf=2.0]map/icons/\1.png'],

        # Map icons (Android xxhdpi == 3.0 ddf):
        [r'rendering_styles/style-icons/drawable-xxhdpi/h_((?:[^/]*?shield[^/]*?)|(?:[^/]*?osmc[^/]*?))\.png', r'[ddf=3.0]map/shields/\1.png'],
        [r'rendering_styles/style-icons/drawable-xxhdpi/h_([^/]*?)\.png', r'[ddf=3.0]map/shaders/\1.png'],
        [r'rendering_styles/style-icons/drawable-xxhdpi/mm_([^/]*?)\.png', r'[ddf=3.0]map/icons/\1.png'],

        # Misc map resources:
        [r'rendering_styles/stubs/([^/]*?)\.png', r'map/stubs/\1.png'],
        [r'rendering_styles/stubs/\[([^/]*?)\]/([^/]*?)\.png', r'[\1]map/stubs/\2.png'],

        # Routing:
        [r'routing/routing\.xml', r'routing/routing.xml'],

        # Fonts:
        [r'rendering_styles/fonts/([^/]*?)/([^/]*?)\.(ttf)', r'map/fonts/\1/\2.\3'],
        [r'rendering_styles/fonts/([^/]*?)\.(ttf)', r'map/fonts/\1.\2'],

        # Misc resources
        [r'misc/icu4c/icudt\d+([lb])\.dat', r'misc/icu4c/icu-data-\1.dat'],
        [r'misc/([^/]*?)', r'misc/\1'],
    ]

    resourcesListFilename = resourcesPath + "/embed-resources.list"
    generator = OsmAndCoreResourcesListGenerator()
    ok = generator.generate(resourcesPath, rules, resourcesListFilename)

    if not ok:
    	sys.exit(-1)

    # Update stamp (if development build)
    if currentHeadCommitHash:
        with open(resourcesPath + "/.embed-resources.stamp", "w") as stampFile:
            stampFile.write(currentHeadCommitHash)

    sys.exit(0)
