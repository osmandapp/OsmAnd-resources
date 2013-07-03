#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

TYPES=(             'accommodation' 'amenity' 'barrier' 'education' 'food'    'health'  'landuse' 'money'   'place_of_worship' 'poi'     'power'    'shopping' 'sport'   'tourist' 'transport' 'water')
FORGROUND_COLOURS=( '#0092DA' '#734A08' '#39AC39' '#DA0092' '#999999' '#666666' '#000000' '#8E7409' '#AC39AC' )

SIZES=(32 24 20 16 12)

SVGFOLDER=${BASEFOLDER}/svg/
OUTPUTFOLDER=${BASEFOLDER}/pngall/

if [ ! -d "${OUTPUTFOLDER}" ]; then
  mkdir ${OUTPUTFOLDER}
fi

for (( i = 0 ; i < ${#TYPES[@]} ; i++ )) do

  if  [ "$1" == "" -o "$1" == "${TYPES[i]}" ]; then

    echo "On: ${TYPES[i]}"

    for FILE in $SVGFOLDER${TYPES[i]}/*.svg; do

      BASENAME=${FILE##/*/}
      BASENAME=${OUTPUTFOLDER}${TYPES[i]}_${BASENAME%.*}

      for (( k = 0 ; k < ${#FORGROUND_COLOURS[@]} ; k++ )) do
        for (( j = 0 ; j < ${#SIZES[@]} ; j++ )) do
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} 'none' 'none' ${FORGROUND_COLOURS[k]} ${SIZES[j]} ${BASENAME}.p.${FORGROUND_COLOURS[k]:1}.${SIZES[j]}
          ${BASEFOLDER}/tools/recolourtopng.sh ${FILE} ${FORGROUND_COLOURS[k]} ${FORGROUND_COLOURS[k]} '#ffffff' ${SIZES[j]} ${BASENAME}.n.${FORGROUND_COLOURS[k]:1}.${SIZES[j]}
          convert ${BASENAME}.p.${FORGROUND_COLOURS[k]:1}.${SIZES[j]}.png \( +clone -background "#ffffff" -shadow 8000x2-0+0 \) +swap -background none -layers merge +repage -trim ${BASENAME}.glow.${FORGROUND_COLOURS[k]:1}.${SIZES[j]}.png
        done
      done

    done

  fi

done
