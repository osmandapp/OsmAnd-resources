#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import datetime
from os import getcwd, linesep, path, walk
import re
from sys import argv, exit
from typing import AnyStr


RESOURCES_BUNDLE_CHUNK_SIZE_THRESHOLD = 32 * 1024 * 1024
RESOURCES_BUNDLE_BASENAME = "resources-bundle"
RESOURCES_BUNDLE_CMAKE_FILENAME = RESOURCES_BUNDLE_BASENAME + ".cmake"
RESOURCES_BUNDLE_LISTS_INDEX_FILENAME = RESOURCES_BUNDLE_BASENAME + ".lists-index"
RESOURCES_BUNDLE_CHUNK_LIST_FILENAME = RESOURCES_BUNDLE_BASENAME + ".chunk-%d.list"
RESOURCES_BUNDLE_CHUNK_DEPS_FILENAME = RESOURCES_BUNDLE_BASENAME + ".chunk-%d.deps"
RESOURCES_BUNDLE_CHUNK_SOURCE_FILENAME = RESOURCES_BUNDLE_BASENAME + ".chunk-%d.cpp"
RESOURCES_BUNDLE_CONTENT_RULES = [

    # Map styles and related:
    [r'rendering_styles/default\.render\.xml', 'map/styles/default.render.xml'],

    # POI
    [r'poi/poi_types\.xml', 'poi/poi_types.xml'],

    # Map icons
    [r'rendering_styles/style-icons/map-icons-svg/(c_)?mx_([^/]*?)\.svg', r'map/icons/\1\2.svg'],
    [r'rendering_styles/style-icons/map-shaders-svg/(c_)?h_([^/]*?)\.svg', r'map/shaders_and_shields/\1\2.svg'],

    # Misc map resources:
    [r'rendering_styles/stubs/([^/]*?)\.png', r'map/stubs/\1.png'],
    [r'rendering_styles/stubs/\[([^/]*?)\]/([^/]*?)\.png', r'[\1]map/stubs/\2.png'],

    # Routing:
    [r'routing/routing\.xml', r'routing/routing.xml'],

    # Fonts:
    [r'rendering_styles/fonts/([^/]*?)\.(ttf)', r'map/fonts/\1.\2'],

    # Misc resources
    [r'misc/icu4c/icudt\d+([lb])\.dat', r'misc/icu4c/icu-data-\1.dat'],
    [r'misc/([^/]*?)', r'misc/\1'],

]


def list_resources(input_path: AnyStr, output_path: AnyStr, cmake_filepath: AnyStr) -> bool:
    input_path = path.abspath(input_path)
    print("Input path:  %s" %(
        input_path,
    ))

    output_path = path.abspath(output_path)
    print("Output path: %s" %(
        output_path,
    ))

    cmake_filepath = path.abspath(cmake_filepath)
    print("CMake path:  %s" %(
        cmake_filepath,
    ))

    process = False
    oldest_output_timestamp = float("+inf")

    # Process lists index
    print("Checking previous lists index...")
    previous_listed_resources = None
    lists_index_filepath = path.join(output_path, RESOURCES_BUNDLE_LISTS_INDEX_FILENAME)
    if not path.isfile(lists_index_filepath):
        print("... not found")

        process = True
    elif not process:
        previous_listed_resources = set()

        lists_index_timestamp = path.getmtime(lists_index_filepath)
        print("... timestamp: %s" % (
            datetime.fromtimestamp(lists_index_timestamp),
        ))

        oldest_output_timestamp = min(oldest_output_timestamp, lists_index_timestamp)

        # Process every indexed list
        with open(lists_index_filepath, "r") as lists_index_file:
            for list_filepath in lists_index_file:
                list_filepath = list_filepath.strip()
                if not list_filepath:
                    continue

                print("> %s" % (
                    list_filepath,
                ))

                # If referenced list does not exist, no need for further checks
                if not path.isfile(list_filepath):
                    print("> ... missing")

                    process = True
                    break

                list_timestamp = path.getmtime(list_filepath)
                print("> ... timestamp: %s" % (
                    datetime.fromtimestamp(list_timestamp),
                ))

                oldest_output_timestamp = min(oldest_output_timestamp, list_timestamp)

                with open(list_filepath, "r") as list_file:
                    for list_entry in list_file:
                        list_entry = list_entry.strip()
                        if not list_entry:
                            continue

                        resource_filepath, bundle_entrypath = list_entry.split(":")

                        # If referenced resource does not exist, no need for further checks
                        if not path.isfile(resource_filepath):
                            print("> ... missing resource: %s" % (
                                resource_filepath,
                            ))

                            previous_listed_resources = None
                            process = True
                            break

                        previous_listed_resources.add(resource_filepath)

                if process:
                    break

    # Discover files
    print("Discovering files...")
    discovered_filepaths = []
    for dirpath, dirnames, filenames in walk(input_path):
        dirnames = [
            dirname
            for dirname in dirnames
            if not dirname.startswith('.')
        ]
        discovered_filepaths.extend([
            path.join(dirpath, filename)
            for filename in filenames
        ])
    print("... %d file(s) discovered" % (
        len(discovered_filepaths),
    ))

    # Resolve content
    print("Resolving content rules...")
    newest_input_timestamp = float('-inf')
    input_filepaths = []
    resource_bundle_contents = []
    for input_regexp, output_regexp in RESOURCES_BUNDLE_CONTENT_RULES:
        input_regexp = re.compile(input_regexp)

        for discovered_filepath in discovered_filepaths:
            bundle_entrypath, filepath_matches = re.subn(
                input_regexp,
                output_regexp,
                path.relpath(discovered_filepath, input_path),
            )
            if not filepath_matches:
                continue
            if discovered_filepath in input_filepaths:
                continue

            newest_input_timestamp = max(newest_input_timestamp, path.getmtime(discovered_filepath))
            resource_bundle_contents.append((discovered_filepath, bundle_entrypath))
            input_filepaths.append(discovered_filepath)
    print("... %d file(s) matched" % (
        len(input_filepaths),
    ))

    # Check script timestamp
    script_timestamp = path.getmtime(__file__)
    if not process and script_timestamp > oldest_output_timestamp:
        print("Detected that script is more recent (%s) than output (%s)" % (
            datetime.fromtimestamp(script_timestamp),
            datetime.fromtimestamp(oldest_output_timestamp),
        ))

        process = True

    # Check input and output timestamps
    if not process and newest_input_timestamp > oldest_output_timestamp:
        print("Detected that input is more recent (%s) than output (%s)" % (
            datetime.fromtimestamp(newest_input_timestamp),
            datetime.fromtimestamp(oldest_output_timestamp),
        ))

        process = True

    # Check contents
    if not process and previous_listed_resources is not None and previous_listed_resources != set(input_filepaths):
        print("Detected added/removed resources")

        process = True

    # Check if anything is needed
    if not process:
        print("No changes detected, bailing out!")
        return True

    # Generate resources lists
    print("Generating resources lists...")
    chunk_list_filepath = None
    chunk_list_file = None
    chunk_deps_filepath = None
    chunk_deps_file = None
    chunk_size = RESOURCES_BUNDLE_CHUNK_SIZE_THRESHOLD
    chunk_index = 0
    total_bundle_size = 0
    with open(cmake_filepath, "w") as cmake_file:
        cmake_file.write("declare_resourcebundle(\"%s\")" % (
            len(resource_bundle_contents),
        ))
        cmake_file.write(linesep)

        with open(lists_index_filepath, "w") as lists_index_file:
            for resource_index, (resource_filepath, bundle_entrypath) in enumerate(resource_bundle_contents):
                resource_filesize = path.getsize(resource_filepath)
                if chunk_size + resource_filesize >= RESOURCES_BUNDLE_CHUNK_SIZE_THRESHOLD:
                    print("... new chunk")

                    if chunk_deps_file is not None:
                        chunk_deps_filepath = None
                        chunk_deps_file.close()
                        chunk_deps_file = None

                    if chunk_list_file is not None:
                        chunk_list_filepath = None
                        chunk_list_file.close()
                        chunk_list_file = None

                    chunk_size = 0
                    chunk_index += 1

                    chunk_list_filepath = path.join(output_path, RESOURCES_BUNDLE_CHUNK_LIST_FILENAME % (chunk_index,))
                    chunk_list_file = open(chunk_list_filepath, "w")

                    chunk_deps_filepath = path.join(output_path, RESOURCES_BUNDLE_CHUNK_DEPS_FILENAME % (chunk_index,))
                    chunk_deps_file = open(chunk_deps_filepath, "w")

                    chunk_source_filepath = path.join(output_path, RESOURCES_BUNDLE_CHUNK_SOURCE_FILENAME % (chunk_index,))

                    lists_index_file.write(chunk_list_filepath)
                    lists_index_file.write(linesep)

                    cmake_file.write("add_resourcebundle_chunk(\"%s\" \"%s\" \"%s\" \"%s\" \"%s\")" % (
                        chunk_index,
                        chunk_list_filepath,
                        chunk_deps_filepath,
                        chunk_source_filepath,
                        resource_index,
                    ))
                    cmake_file.write(linesep)

                chunk_list_file.write("%s:%s" % (
                    resource_filepath,
                    bundle_entrypath,
                ))
                chunk_list_file.write(linesep)

                chunk_deps_file.write(resource_filepath)
                chunk_deps_file.write(linesep)

                chunk_size += resource_filesize
                total_bundle_size += resource_filesize
    print("... total size: %d byte(s)" % (
        total_bundle_size,
    ))

    return True


if __name__ == "__main__":
    exit(0 if list_resources(argv[1], getcwd(), argv[2]) else -1)
