#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

SIZES=(64 48 32 32 24 16)
FOLDERS=(big-xhdpi big-hdpi big-mdpi xhdpi hdpi mdpi)

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
  done
}

generatePngs() {
  TYPE=$1
  COLOR=$2
  COLOR2=$3
  NEG=$4
  echo "On: $TYPE"
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=${TYPE}_${FILENAME%.*}

      for (( j = 0 ; j < ${#SIZES[@]} ; j++ )) do
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
# generatePngs 'functional-icons' '#777777' '#777777'
# generatePngs 'water' '#0092DA' '#777777'

# generatePngs 'emergency' '#DA0092' '#777777'
# generatePngs 'health' '#DA0092' '#777777'

# generatePngs 'transport' '#0092DA' '#777777'

# generatePngs 'barrier' '#777777' '#777777'

# generatePngs 'accommodation' '#0092DA' '#777777'

# generatePngs 'tourist' '#734A08' '#777777'

# generatePngs 'sport'  '#39AC39' '#777777'

# generatePngs 'amenity' '#777777' '#734A08'
# generatePngs 'place_of_worship' '#777777' '#777777'
# generatePngs 'money' '#777777' '#777777'
# generatePngs 'education' '#777777' '#39AC39'
# generatePngs 'poi' '#777777' '#777777' 
# generatePngs 'power' '#777777' '#8e7409'

# generatePngs 'food' '#777777' '#734A08'

# generatePngs 'shopping' '#777777' '#AC39AC'

# generatePngs 'landuse' '#777777' '#999999'

# generatePngs 'icons8' '#777777' '#777777' neg
