#!/bin/bash
CONFIG_FILE=$(readlink -m $1/config.p)
TARGET_FILE=$4
if [ -z $TARGET_FILE ]; then
TARGET_FILE="$1"
fi

ENGINE=$3
if [ -z $ENGINE ]; then
ENGINE="google"
fi

GOAL="gen('g_config.p','$ENGINE')"
mkdir -p work
echo "%%% !!! THIS IS GENERATED FILE !!! Modify ttsconfig.p" > $CONFIG_FILE 
sed "s/version(102)/version(0)/g" $1/ttsconfig.p >> $CONFIG_FILE 

cp $CONFIG_FILE work/_config.p
cp $CONFIG_FILE work/g_config.p
cd work
# clear previous files
# rm -f *.wav *.mp3 $1.zip

if [ $ENGINE = "google" ]; then
	echo "google_gen." >> g_config.p
	prolog -s ../gen_config.p -q -t "$GOAL" > google.$1.sh
	chmod +x google.$1.sh
	./google.$1.sh
else
	echo "google_gen:-fail." >> g_config.p
	prolog -s ../gen_config.p -q -t "$GOAL" > fest.$1
	festival -b fest.$1
fi

for t in `ls *.mp3`; do 
	W=${t::-4}
	mpg123 -w ${W}.wav $t
done

### for t in `ls *.wav` ; do oggenc $t ; done

for t in `ls *.wav` ; do 
	Og=${t::-4}
	sox $t r${Og}.ogg reverse
	sox r${Og}.ogg ${Og}.ogg silence 1 0.1 0.01% reverse
	rm r${Og}.ogg
done

touch .nomedia
echo "Voice Data $2 ($TARGET_FILE)" | zip ${TARGET_FILE}_0.voice.zip _config.p -c 
zip ${TARGET_FILE}_0.voice.zip *.ogg .nomedia 
rm -f *.wav *.mp3
rm -f *.ogg *.p

echo ""
echo "### You can find your zipped voice file ${TARGET_FILE}_0.voice.zip in the folder work ###"
echo ""
