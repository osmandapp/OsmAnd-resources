#!/bin/bash
./gen_voice.sh $1 Finnish ispeech $1

echo '#!/bin/bash' > script_diff.sh
git diff $1/ispeech_$1.csv | grep '^\+[^\+]' | while read i; do
	file=`echo ${i:1} | cut -d',' -f 1`
	word=`echo $i | cut -d',' -f 2`
	if [ -n "$word" ]; then
		echo "wget \"https://api.ispeech.org/api/rest?apikey=$2&action=convert&voice=$3&speed=1&pitch=100&startpadding=0&endpadding=0&format=ogg&frequency=16000&text=$word&filename=o.ogg\" -O $1/voice/$file" >> script_diff.sh
	fi
done 
