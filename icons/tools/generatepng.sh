#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

#SIZES=(64 48 32 24 20 16 12)
SIZES=(32 24 16)
FOLDERS=(drawable-xhdpi drawable-hdpi drawable-mdpi)

SVGFOLDER=${BASEFOLDER}/svg/
OUTPUTFOLDER=${BASEFOLDER}/png/

if [ ! -d "${OUTPUTFOLDER}" ]; then
  mkdir ${OUTPUTFOLDER}
fi

for (( i = 0 ; i < ${#FOLDERS[@]} ; i++ )) do
  mkdir -p ${OUTPUTFOLDER}/${FOLDERS[i]}
done

generatePngs() {
  TYPE=$1
  COLOR=$2
  NEG=$3
  echo "On: ${TYPES[i]}"
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      FILENAME=mm_${TYPES[i]}_${FILENAME%.*}

      for (( j = 0 ; j < ${#SIZES[@]} ; j++ )) do
        OUTF=${OUTPUTFOLDER}/${FOLDERS[j]}/
        if [[ $NEG -ne neg ]]; then
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} 'none' 'none' $COLOR ${SIZES[j]} ${OUTF}${FILENAME}
        else
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} $COLOR $COLOR '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME}
        fi
        convert ${OUTF}${FILENAME}.png \( +clone -background "#ffffff" -shadow 8000x2-0+0 \) +swap -background none -layers merge +repage -trim ${OUTF}${FILENAME}_glow.png
      done

    done
}

generatePngs 'icons8' '#AAAAAA' neg

generatePngs 'accommodation' '#0092DA'
generatePngs 'amenity' '#734A08'
generatePngs 'barrier' '#666666'
generatePngs 'education' '#39AC39'
generatePngs 'food' '#734A08'
generatePngs 'health' '#DA0092'
generatePngs 'landuse' '#999999'
generatePngs 'money' '#000000'
generatePngs 'place_of_worship' '#000000'
generatePngs 'poi' '#000000' 
generatePngs 'power' '#8e7409'  
generatePngs 'shopping' '#AC39AC' 
generatePngs 'sport'  '#39AC39'
generatePngs 'tourist' '#734A08'
generatePngs 'transport' '#0092DA'
generatePngs 'water' '#0092DA'