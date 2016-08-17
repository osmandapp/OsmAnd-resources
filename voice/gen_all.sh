#!/bin/sh
#./gen_voice.sh de German fest de-m # not supported
#./gen_voice.sh ru Russian fest ru-m
#./gen_voice.sh en English fest en-m

ENGINE=$1
if [ -z $ENGINE ]; then
ENGINE="google"
fi

./gen_voice.sh fi Finnish $ENGINE fi 1.1 yes
./gen_voice.sh fr French $ENGINE fr 1.3 yes
./gen_voice.sh hi Hindi $ENGINE hi 1.1 yes
./gen_voice.sh hu Hungarian $ENGINE hu 1.2 yes
./gen_voice.sh hu-formal Hungarian_formal $ENGINE hu-formal 1.2 yes
./gen_voice.sh it Italian $ENGINE it 1.1 yes
./gen_voice.sh ja Japanese $ENGINE ja 1.2 yes
./gen_voice.sh ko Korean $ENGINE ko 1.1 yes
./gen_voice.sh nl Dutch $ENGINE nl 1.1 yes
./gen_voice.sh pl Polish $ENGINE pl 1.1 yes
./gen_voice.sh pt Portuguese $ENGINE pt 1.3 yes
./gen_voice.sh pt-br Portuguese_BR $ENGINE pt-br 1.3 yes
./gen_voice.sh sv Swedish $ENGINE sv 1.1 yes
./gen_voice.sh zh Chinese $ENGINE zh 1.1 yes
./gen_voice.sh es-ar Spanish_AR $ENGINE es-ar 1.2 yes
./gen_voice.sh es Spanish $ENGINE es 1.2 yes
./gen_voice.sh en-gb English_GB $ENGINE en-gb 1.1 yes
./gen_voice.sh el Greek $ENGINE el 1.1 yes
./gen_voice.sh da Danish $ENGINE da 1.1 yes
./gen_voice.sh cs Czech $ENGINE cs 1.1 yes
./gen_voice.sh de German $ENGINE de 1.1 yes
./gen_voice.sh en English $ENGINE en 1.1 yes
./gen_voice.sh ru Russian $ENGINE ru 1.1 yes
./gen_voice.sh sk Slovak $ENGINE sk 1.3 yes

# ./gen_voice.sh hr Croatian $ENGINE hr 1.1 yes          sounds really bad
# ./gen_voice.sh lv Latvian $ENGINE lv 1.1 yes          sounds really bad
# ./gen_voice.sh ro Romanian $ENGINE ro 1.1 yes          sounds really bad
# ./gen_voice.sh sw Swahili $ENGINE sw 1.1 yes          sounds really bad

#./gen_voice.sh be Belarussian $ENGINE be 1.1 yes    not supported by Google API
#./gen_voice.sh fa Persian $ENGINE fa 1.1 yes    not supported by Google API
#./gen_voice.sh he Hebrew $ENGINE he 1.0 yes    not supported by Google API
#./gen_voice.sh sc Sardinian $ENGINE sc 1.1 yes    not supported by Google API
# ./gen_voice.sh sl Slovenian $ENGINE sl 1.1 yes    not supported by Google API

# ./gen_voice.sh et Estonian $ENGINE et 1.1 yes        tts script errors
# ./gen_voice.sh uk Ukrainian $ENGINE uk 1.1 yes        tts script errors








# VOICE package ready
# ./gen_voice.sh cs Czech ispeech cs
# ./gen_voice.sh da Danish ispeech da
# ./gen_voice.sh de German ispeech de
# ./gen_voice.sh el Greek ispeech el
# ./gen_voice.sh en English ispeech en
# ./gen_voice.sh es Spanish ispeech es
# #./gen_voice.sh fa Persian ispeech fa
# ./gen_voice.sh fi Finnish ispeech fi
# ./gen_voice.sh fr French ispeech fr
# ./gen_voice.sh hu Hungarian ispeech hu
# ./gen_voice.sh it Italian ispeech it
# ./gen_voice.sh ko Korean ispeech ko
# ./gen_voice.sh nl Dutch ispeech nl
# ./gen_voice.sh pl Polish ispeech pl
# ./gen_voice.sh pt Portuguese ispeech pt
# ./gen_voice.sh ru Russian ispeech ru
# ./gen_voice.sh sv Swedish ispeech sv
# ./gen_voice.sh sl Slovenian govorec sl
# ./gen_voice.sh zh Chinese ispeech zh
# ./gen_voice.sh ja Japanese ispeech ja
# ./gen_voice.sh pt-br Brazilian ispeech pt-br

#./gen_voice.sh be Belarussian ispeech be
