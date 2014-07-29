#!/bin/sh
#./gen_voice.sh de German fest de-m # not supported
#./gen_voice.sh ru Russian fest ru-m
#./gen_voice.sh en English fest en-m

ENGINE=$1
if [ -z $ENGINE ]; then
ENGINE="convert"
fi

# ./gen_voice.sh cs Czech $ENGINE cs
# ./gen_voice.sh da Danish $ENGINE da
# ./gen_voice.sh de German $ENGINE de
# ./gen_voice.sh el Greek $ENGINE el
# ./gen_voice.sh en English $ENGINE en
# ./gen_voice.sh es Spanish $ENGINE es
# ./gen_voice.sh fi Finnish $ENGINE fi
# ./gen_voice.sh fr French $ENGINE fr
# ./gen_voice.sh he Hebrew $ENGINE he
# ./gen_voice.sh hi Hindi $ENGINE hi
# ./gen_voice.sh hu Hungarian $ENGINE hu
# ./gen_voice.sh it Italian $ENGINE it
# ./gen_voice.sh ko Korean $ENGINE ko
# ./gen_voice.sh lv Latvian $ENGINE lv
# ./gen_voice.sh nl Dutch $ENGINE nl
# ./gen_voice.sh pl Polish $ENGINE pl
# ./gen_voice.sh pt Portuguese $ENGINE pt
# ./gen_voice.sh ro Romanian $ENGINE ro
# ./gen_voice.sh ru Russian $ENGINE ru
# ./gen_voice.sh sk Slovak $ENGINE sk
# ./gen_voice.sh sl Slovenian $ENGINE sl
# ./gen_voice.sh sv Swedish $ENGINE sv
# ./gen_voice.sh sw Swahili $ENGINE sw
# ./gen_voice.sh zh Chinese $ENGINE zh



# VOICE package ready
./gen_voice.sh cs Czech ispeech cs
./gen_voice.sh da Danish ispeech da
./gen_voice.sh de German ispeech de
./gen_voice.sh el Greek ispeech el
./gen_voice.sh en English ispeech en
./gen_voice.sh es Spanish ispeech es
#./gen_voice.sh fa Persian ispeech fa
./gen_voice.sh fi Finnish ispeech fi
./gen_voice.sh fr French ispeech fr
./gen_voice.sh hu Hungarian ispeech hu
./gen_voice.sh it Italian ispeech it
./gen_voice.sh ko Korean ispeech ko
./gen_voice.sh nl Dutch ispeech nl
./gen_voice.sh pl Polish ispeech pl
./gen_voice.sh pt Portuguese ispeech pt
./gen_voice.sh ru Russian ispeech ru
./gen_voice.sh sv Swedish ispeech sv
./gen_voice.sh sl Slovenian govorec sl
./gen_voice.sh zh Chinese ispeech zh
./gen_voice.sh ja Japanese ispeech ja
./gen_voice.sh pt-br Brazilian ispeech pt-br

#./gen_voice.sh be Belarussian ispeech be
