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
  echo "On: $TYPE"
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=mm_${TYPE}_${FILENAME%.*}

      for (( j = 0 ; j < ${#SIZES[@]} ; j++ )) do
        OUTF=${OUTPUTFOLDER}/${FOLDERS[j]}/
        if [[ -z $NEG ]]; then
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} 'none' 'none' $COLOR ${SIZES[j]} ${OUTF}${FILENAME}
        else
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} $COLOR $COLOR '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME}
          
        fi
        convert ${OUTF}${FILENAME}.png \( +clone -background "#ffffff" -shadow 8000x2-0+0 \) +swap -background none -layers merge +repage -trim ${OUTF}${FILENAME}_glow.png
      done

    done
}

generatePngs 'icons8' '#777777' neg

generatePngs 'accommodation' '#777777' #'#0092DA'
generatePngs 'amenity' '#777777' #'#734A08'
generatePngs 'barrier' '#777777' #'#666666'
generatePngs 'education' '#777777' #'#39AC39'
generatePngs 'food' '#777777' #'#734A08'
generatePngs 'health' '#DA0092' #'#DA0092'
generatePngs 'landuse' '#777777' #'#999999'
generatePngs 'money' '#777777' #'#000000'
generatePngs 'place_of_worship' '#777777' #'#000000'
generatePngs 'poi' '#777777' #'#000000'
generatePngs 'power' '#777777' #'#8e7409'
generatePngs 'shopping' '#777777' #'#AC39AC'
generatePngs 'sport'  '#777777' #'#39AC39'
generatePngs 'tourist' '#777777' #'#734A08'
generatePngs 'transport' '#777777' #'#0092DA'
generatePngs 'water' '#777777' #'#0092DA'