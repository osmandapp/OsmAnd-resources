#!/bin/bash

if [ $# -eq 0 ]
  then
    echo ""
    echo "  No arguments supplied."
    echo "  You need to supply at least 1 argument being the folder of the language, e.g. en, fr or nl."
    echo "  With only 1 argument given the script will generate defaults for the other arguments."
    echo "  It is best to supply all 4 arguments."
    echo ""
    echo "  $ gen_voice.sh <language folder> <language> <voice generator> <prefix for zip file> <tempo> <normalise yes/no>"
    echo ""
    echo "  examples:"
    echo "     ./gen_voice.sh de German google de"
    echo "     ./gen_voice.sh en English fest en-m"
    echo "     ./gen_voice.sh en English google en"
    echo "     ./gen_voice.sh en English google en 1.3 yes"
    echo "     ./gen_voice.sh sl Slovenian govorec sl"
    echo ""
    echo " The script requires the sox and mpg123 packages to be installed."
    echo " Also a package for the prolog language, e.g. swi-prolog."
    echo " Be sure that your console/terminal locale matches the character encoding"
    echo " of the source ttsconfig.p file of the language, e.g. UTF8."
    echo ""
    exit 1
fi

BOLD=$(tput bold)
NORMAL=$(tput sgr0)

CONFIG_FILE=$1/config.p
TARGET_FILE=$4
if [ -z $TARGET_FILE ]; then
TARGET_FILE="$1"
fi

ENGINE=$3
echo "${BOLD}Generating voice Data for $2${NORMAL}"

cd work
# clear previous files
# rm -f *.wav *.mp3 $1.zip

# default factor for speeding up or slowing down the generated speech
# < 1.0 .. slower
# = 1.0 .. no change
# > 1.0 .. faster

TEMPO_FACTOR=$5
if [ -z $TEMPO_FACTOR ]; then
  TEMPO_FACTOR="1.0"
fi

NORMALISE=$6
if [ -z $NORMALISE ]; then
  NORMALISE="yes"
fi

REDUCE_SILENCE=$7

if [ $ENGINE = "google" ]; then
	echo "Generating voice files using Google online service..."
	echo "TO DO SUPPORT JS generation from online services"
	exit 1;
elif [ $ENGINE = "govorec" ]; then
	#  Use Slovenian TTS engine eGovorec: http://dis.ijs.si/e-govorec/
	echo "Generating voice files using eGovorec online service..."
	TEMPO_FACTOR=1.3
	echo "TO DO SUPPORT JS generation from online services"
	exit 1;
else 
	cp ../$1/voice/*.ogg .
	echo "Copying existing ogg files from ../$1/voice/..."
fi

echo "Converting mp3 to wav..."
for t in `ls *.mp3`; do
	W=${t%????}
	mpg123 -w ${W}.wav $t
done

### for t in `ls *.wav` ; do oggenc $t ; done
# function updateFile { Og=${1::-4} && sox $1 r${Og}.ogg reverse && sox r${Og}.ogg ${Og}.ogg silence 1 0.1 0.01% reverse && rm r${Og}.ogg; }
# for t in `ls *.ogg` ; do Og=${t::-4} && sox $t r${Og}.ogg reverse && sox r${Og}.ogg ${Og}.ogg silence 1 0.1 0.01% reverse && rm r${Og}.ogg; done
if [ ! -z "$REDUCE_SILENCE" ]; then
	echo "Reducing the silence..."
	# see http://sox.sourceforge.net/sox.html silence
	for t in `ls *.wav *.ogg`; do
		Og=${t%????}
		sox $t TEMPreverse_${Og}.ogg reverse
		sox TEMPreverse_${Og}.ogg ${Og}.ogg silence 1 0.1 0.01% reverse
		rm TEMPreverse_${Og}.ogg
	done
fi

# change the tempo (speed without altering the pitch),
# see http://sox.sourceforge.net/sox.html tempo
if [ $TEMPO_FACTOR != "1.0" ]; then
	echo "Changing tempo by factor $TEMPO_FACTOR ..."
	for Og in `ls *.ogg`; do
		cp ${Og} TEMPslow_${Og}
		sox TEMPslow_${Og} ${Og} tempo -s $TEMPO_FACTOR
		rm TEMPslow_${Og}
	done
fi

# normalise
if [ "$NORMALISE" == "yes" ]; then
	echo "Normalising audio ..."
	for Og in `ls *.ogg`; do
		cp ${Og} TEMPslow_${Og}
		sox TEMPslow_${Og} ${Og} gain -n
		rm TEMPslow_${Og}
	done
fi

touch .nomedia
echo "Packaging voice files..."
echo "Voice Data $2 ($TARGET_FILE)" | zip ${TARGET_FILE}_0.voice.zip ${TARGET_FILE}.p -c
zip ${TARGET_FILE}_0.voice.zip *.ogg .nomedia

if [ ! -z "$ENGINE" ]; then
  rm -f ../$1/voice/*.*
  mv *.ogg ../$1/voice/
else 
  rm *.ogg
fi
rm -f *.wav *.mp3

echo ""
echo "### You can find your zipped voice file ${TARGET_FILE}_0.voice.zip in the folder work ###"
echo ""
