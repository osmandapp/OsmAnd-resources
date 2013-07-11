#!/bin/sh
CONFIG_FILE=$1/config.p
GOAL="gen('$CONFIG_FILE')"
mkdir -p work

echo "%%% !!! THIS IS GENERATED FILE !!! Modify ttsconfig.p" > $CONFIG_FILE 
sed "s/version(101)/version(0)/g" $1/ttsconfig.p >> $CONFIG_FILE 
prolog -s gen_config.p -q -t "$GOAL" > work/fest.$1
#prolog -s gen_config.p -q -t "$GOAL" > work/google.$1.sh

cp $CONFIG_FILE work/_config.p
cd work
rm -f *.wav
rm -f $1.zip

#chmod +x google.$1.sh
#./google.$1.sh

festival -b fest.$1
for t in `ls *.wav` ; do oggenc $t ; done
rm -f *.wav
zip $1.zip _config.p *.ogg 
rm -f *.ogg
rm -f *.p
