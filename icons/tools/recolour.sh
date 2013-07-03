#!/bin/bash

set -u
set -e

recolour() {
    filename="$1"
    fill="$2"
    stroke="$3"
    background="$4"

sed_script=$(cat << EOF
    s/fill:#111111/fill:${fill};/g
    s/fill:#111;/fill:${fill};/g
    s/stroke:#eeeeee/stroke:${stroke};/g
    s/stroke:#eee;/stroke:${stroke};/g
    s/fill:white/fill:${background};/g
    s/stroke:white/stroke:${background};/g
    s/fill:#ffffff/fill:${background};/g
    s/stroke:#ffffff/stroke:${background};/g
EOF)

    sed "$sed_script" $filename
}

if [[ $# -ne 4 ]]; then
    echo "Usage: $0 filename fill stroke foreground"
    exit 1
fi

recolour $@
