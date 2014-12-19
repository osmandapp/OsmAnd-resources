#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

FOLDERS=(big-xxhdpi big-xhdpi big-hdpi big-mdpi xxhdpi xhdpi hdpi mdpi)
FOLDERS2=("${FOLDERS[@]}")

SVGFOLDER=${BASEFOLDER}/svg/
OUTPUTFOLDER=${BASEFOLDER}/png/

if [ ! -d "${OUTPUTFOLDER}" ]; then
  mkdir ${OUTPUTFOLDER}
fi

for (( i = 0 ; i < ${#FOLDERS[@]} ; i++ )) do
  mkdir -p ${OUTPUTFOLDER}/${FOLDERS[i]}
done

generateElements() {
  TYPE=$1
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=${FILENAME%.*}
      rsvg -f png ${FILE} -x 1 -y 1 ${OUTPUTFOLDER}mdpi/${FILENAME}.png
      rsvg -f png ${FILE} -x 1.5 -y 1.5 ${OUTPUTFOLDER}hdpi/${FILENAME}.png
      rsvg -f png ${FILE} -x 2 -y 2 ${OUTPUTFOLDER}xhdpi/${FILENAME}.png
      rsvg -f png ${FILE} -x 3 -y 3 ${OUTPUTFOLDER}xxhdpi/${FILENAME}.png
  done
}

generatePngs() {
  TYPE=$1
  COLOR=$2
  COLOR2=$3
  NEG=$4
  LARGE_ICONS=$5
  NO_MX=$6
  echo "On: $TYPE : $LARGE_ICONS $NO_MX"
  if [ "$LARGE_ICONS" = 'large' ]
    then
     SIZES=(96 64 48 32 96 64 48 32)
     echo "     ${SIZES[@]}  (5-8 with nomx)"
    else
     SIZES=(96 64 48 32 48 32 24 16)
     echo "     ${SIZES[@]}  (5-8 with nomx)"
  fi
  if [ "$NO_MX" = 'nomx' ]
    then
	FOLDERS=(xxhdpi xhdpi hdpi mdpi)
	echo "     ${FOLDERS[@]}"
    else
	FOLDERS=("${FOLDERS2[@]}")
 	echo "     ${FOLDERS[@]}"
 fi
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=${TYPE}_${FILENAME%.*}

      for (( j = 0 ; j < $( if [ "$NO_MX" = 'nomx' ]; then let "c=${#SIZES[@]} / 2"; echo $c ; else echo ${#SIZES[@]}; fi) ; j++ )) do
        OUTF=${OUTPUTFOLDER}${FOLDERS[j]}/
        if [[ -z $NEG ]]; then
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} 'none' 'none' $COLOR ${SIZES[j]} ${OUTF}${FILENAME}
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} 'none' 'none' $COLOR2 ${SIZES[j]} ${OUTF}${FILENAME}_2
        else
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} $COLOR $COLOR '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME}
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} ${COLOR2} ${COLOR2} '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME}_2
        fi
        # convert ${OUTF}${FILENAME}.png \( +clone -background "#ffffff" -shadow 8000x2-0+0 \) +swap -background none -layers merge +repage -trim ${OUTF}${FILENAME}_glow.png
      done
    done
}

    generateElements 'shaders'
    generateElements 'osmc'
    generatePngs 'seamark' '#777777' '#777777' '' large nomx

    generatePngs 'functional-icons' '#777777' '#777777'
    generatePngs 'water' '#0092DA' '#777777'

    generatePngs 'emergency' '#DA0092' '#777777'
    generatePngs 'health' '#DA0092' '#777777'

    generatePngs 'transport' '#0092DA' '#777777'

    generatePngs 'barrier' '#444444' '#777777'

    generatePngs 'accommodation' '#0092DA' '#777777'

    generatePngs 'tourist' '#734A08' '#777777'

    generatePngs 'sport'  '#39AC39' '#777777'

    generatePngs 'amenity' '#777777' '#734A08'
    generatePngs 'place_of_worship' '#333333' '#777777'
    generatePngs 'money' '#777777' '#777777'
    generatePngs 'education' '#777777' '#39AC39'
    generatePngs 'poi' '#777777' '#777777' 
    generatePngs 'power' '#777777' '#8e7409'

    generatePngs 'food' '#777777' '#734A08'

    generatePngs 'shopping' '#777777' '#AC39AC'

    generatePngs 'landuse' '#777777' '#999999'

    generatePngs 'icons8' '#777777' '#777777' neg
