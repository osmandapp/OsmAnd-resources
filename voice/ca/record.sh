#!/usr/bin/env bash

# Recording requires the following:
# - Festival TTS
# - FestCat voices (https://festcat.talp.cat/)
# - SoX

while read line; do
  filename=$(echo $line | cut -d ";" -f 1)
  tempfile=$(mktemp)
  echo $line | cut -d ";" -f 2 | iconv -f utf8 -t ISO-8859-15 > $tempfile
  text2wave $tempfile -o "voice/$filename.wav" -eval '(voice_upc_ca_ona_hts)'
  sox "voice/$filename.wav" "voice/$filename.ogg" silence 1 0.1 1% reverse silence 1 0.1 0.25% reverse
  rm $tempfile
  rm "voice/$filename.wav"
done < recording_sentences.txt
