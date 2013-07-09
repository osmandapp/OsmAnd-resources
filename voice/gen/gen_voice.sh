#!/bin/sh
CONFIG_FILE='_config.p'
GOAL="gen('$CONFIG_FILE')"
mkdir -p work

prolog -s gen_config.p -q -t "$GOAL" > work/fest.$1

cp -f $CONFIG_FILE work/_config.p

cd work
rm -f *.wav
rm -f $1.zip

festival -b fest.$1
for t in `ls *.wav` ; do oggenc $t ; done
rm -f *.wav
zip $1.zip _config.p *.ogg 
rm -f *.ogg
rm -f *.p