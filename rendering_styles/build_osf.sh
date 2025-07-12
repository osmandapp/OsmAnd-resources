#!/bin/sh -e

OUTPUT_FILE="RenderingStyles.osf"
ITEMS_DIR=$(mktemp -d)
ITEMS_FILE="${ITEMS_DIR}/items.json"

if [ "$0" = "-h" -o "$0" = "--help" ]; then
    echo "usage: $0 [OUTPUT.osf [INPUT.xml...]]"
fi

cleanup() {
    rm -rf "${ITEMS_DIR}"
}
trap cleanup EXIT

if [ "$#" -gt 0 ]; then
    OUTPUT_FILE="$1"
    shift
fi

# Allow specifying xml files to include on the commandline, but default to all if none are specified
if [ "$#" -eq 0 ]; then
    set -- "$(dirname "$0")"/*.render.xml
fi

jq --null-input '{} | .version = 1 | .items = []' > "${ITEMS_FILE}"
for file in "$@"; do
    jq --arg file "${file}" '.items += [{type: "FILE", subtype: "rendering_style", file: $file}]' "${ITEMS_FILE}" | sponge "${ITEMS_FILE}"
done

rm -f "$OUTPUT_FILE"
zip --junk-paths "$OUTPUT_FILE" "$@" "$ITEMS_FILE"
echo "Created ${OUTPUT_FILE}"
