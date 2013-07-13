#!/bin/bash
CONFIG_FILE=$(readlink -m $1/config.p)
if [ -z $ENGINE ]; then
ENGINE="google"
fi

GOAL="gen('$CONFIG_FILE','$ENGINE')"
mkdir -p work
echo "%%% !!! THIS IS GENERATED FILE !!! Modify ttsconfig.p" > $CONFIG_FILE 
sed "s/version(101)/version(0)/g" $1/ttsconfig.p >> $CONFIG_FILE 

cp $CONFIG_FILE work/_config.p
cd work
# clear previous files
# rm -f *.wav *.mp3 $1.zip

if [ $ENGINE = "google" ]; then
	prolog -s ../gen_config.p -q -t "$GOAL" > google.$1.sh
	chmod +x google.$1.sh
	./google.$1.sh
else
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
zip $1.zip _config.p *.ogg .nomedia
rm -f *.wav *.mp3 *.ogg *.p
