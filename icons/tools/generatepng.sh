#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

FOLDERS=(big-xxhdpi big-xhdpi big-hdpi big-mdpi xxhdpi xhdpi hdpi mdpi)
FOLDERS_NOMX=(xxhdpi xhdpi hdpi mdpi) # no icons used in osmand interface (search, poi overlay)
SIZES=(72 48 36 24 42 28 21 14)
SIZESx2=(72 48 36 24 96 64 48 32)
SIZESx4=(72 48 36 24 192 128 96 64)

FOLDERS_ORIG=("${FOLDERS[@]}")
SIZES_ORIG=("${SIZES[@]}")

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
  COLOR=$2 # color for map icons(mm_*)
  COLOR2=$3 # color for osmand interface icons (poi layer,search) (mx_)
  NEG=$4
  X2_ICONS=$5
  X4_ICONS=$6
  NO_MX=$7
  echo "On : $TYPE : $X2_ICONS $X4_ICONS $NO_MX"
  if [ "$X4_ICONS" = 'x4' ]
    then
     SIZES=("${SIZESx4[@]}")
     echo " x4  ${SIZES[@]}"
    else
     SIZES=("${SIZES_ORIG[@]}")
     echo "     ${SIZES[@]} "
  fi
  if [ "$X2_ICONS" = 'x2' ]
    then
     SIZES=("${SIZESx2[@]}")
     echo " x2  ${SIZES[@]}"
  fi

  if [ "$NO_MX" = 'nomx' ]
    then
	let "SIZES_HALF=${#SIZES[@]} / 2"
	SIZES=("${SIZES[@]:$SIZES_HALF}")
	echo "nomx:"${SIZES[@]}
	FOLDERS=("${FOLDERS_NOMX[@]}")
	echo "     ${FOLDERS[@]}"
    else
	FOLDERS=("${FOLDERS_ORIG[@]}")
 	echo "     ${FOLDERS[@]}"
 fi
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=${TYPE}_${FILENAME%.*}
      for (( j = 0 ; j < ${SIZES_HALF}; j++ )) do
        OUTF=${OUTPUTFOLDER}${FOLDERS[j]}/
        if [[ -z $NEG ]]; then
         ${BASEFOLDER}/tools/recolourtopng.sh "${FILE}" 'none' 'none' $COLOR2 ${SIZES[j]} ${OUTF}${FILENAME} > /dev/null 2>&1
        else
         ${BASEFOLDER}/tools/recolourtopng.sh "${FILE}" $COLOR2 $COLOR2 '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME} > /dev/null 2>&1
        fi
        # convert ${OUTF}${FILENAME}.png \( +clone -background "#ffffff" -shadow 8000x2-0+0 \) +swap -background none -layers merge +repage -trim ${OUTF}${FILENAME}_glow.png
      done
      for (( j = ${SIZES_HALF} ; j < ${#SIZES[@]}; j++ )) do
        OUTF=${OUTPUTFOLDER}${FOLDERS[j]}/
        if [[ -z $NEG ]]; then
          ${BASEFOLDER}/tools/recolourtopng.sh "${FILE}" 'none' 'none' $COLOR ${SIZES[j]} ${OUTF}${FILENAME} > /dev/null 2>&1
        else
          ${BASEFOLDER}/tools/recolourtopng.sh "${FILE}" $COLOR $COLOR '#ffffff'  ${SIZES[j]} ${OUTF}${FILENAME} > /dev/null 2>&1
        fi
      done

    done
}

       generateElements 'shaders'
       generateElements 'shields'
       generateElements 'shields_big'
       generateElements 'road_shields'
       generateElements 'osmc_bg'

       generatePngs 'osmc_black' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_blue' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_green' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_orange' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_red' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_white' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_yellow' '#777777' '#777777' '' '' '' nomx
       generatePngs 'osmc_other' '#777777' '#777777' '' '' '' nomx

       generatePngs 'seamark' '#777777' '#777777' '' x2 '' nomx
       generatePngs 'seamark_small' '#777777' '#777777' '' '' '' nomx
       generatePngs 'seamark_big' '#777777' '#777777' '' '' x4 nomx
       generateElements 'seamark_shields'
       generateElements 'seamark_shields_x4'

       generatePngs 'skimap' '#000000' '#ff8f00' '' x2

       generatePngs 'functional-icons' '#777777' '#ff8f00' '' '' '' nomx
       generatePngs 'functional-icons-x2' '#777777' '#ff8f00' '' x2 '' nomx
       generatePngs 'subway' '#777777' '#ff8f00' '' x2 '' nomx

       generatePngs 'water' '#ffffff' '#ff8f00'
       generatePngs 'water_colored' '#0092DA' '#ff8f00'

       generatePngs 'emergency' '#ffffff' '#ff8f00'
       generatePngs 'emergency_colored' '#DA0092' '#ff8f00'
       generatePngs 'health' '#ffffff' '#ff8f00' #DA0092

       generatePngs 'transport' '#ffffff' '#ff8f00'
       generatePngs 'transport_colored' '#0092DA' '#ff8f00'

       generatePngs 'barrier' '#ffffff' '#ff8f00'
       generatePngs 'barrier_colored' '#444444' '#ff8f00'

       generatePngs 'accommodation' '#ffffff' '#ff8f00'

       generatePngs 'tourist' '#ffffff' '#ff8f00'
       generatePngs 'tourist_colored' '#593906' '#ff8f00'
       generatePngs 'special_poi' '#a62b00' '#FFF5F1' '' '' '' nomx 

       generatePngs 'sport' '#ffffff' '#ff8f00'
       generatePngs 'sport_colored' '#39AC39' '#ff8f00'

       generatePngs 'amenity' '#ffffff' '#ff8f00'
       generatePngs 'amenity_colored' '#555555' '#ff8f00'
       generatePngs 'office' '#ffffff' '#ff8f00'
       generatePngs 'craft' '#ffffff' '#ff8f00'
       generatePngs 'place_of_worship' '#333333' '#ff8f00'
       generatePngs 'money' '#ffffff' '#ff8f00'
       generatePngs 'education' '#ffffff' '#ff8f00'
       generatePngs 'poi' '#ffffff' '#ff8f00'
       generatePngs 'poi_colored' '#3f3f3f' '#ff8f00'
       generatePngs 'topo' '#000000' '#000000' '' '' '' nomx
       generatePngs 'topo_big' '#000000' '#000000' '' x2 '' nomx
       generatePngs 'additional' '#3f3f3f' '#ff8f00'
       generatePngs 'additional_category' '#3f3f3f' '#ff8f00'
       generatePngs 'power' '#3f3f3f' '#ff8f00'

       generatePngs 'club' '#ffffff' '#ff8f00' #555555

       generatePngs 'food' '#ffffff' '#ff8f00' #8f6732

       generatePngs 'shopping' '#ffffff' '#ff8f00' #a734c2

       generatePngs 'landuse' '#ffffff' '#ff8f00'
       generatePngs 'landuse_colored' '#6dba00' '#ff8f00'

       generatePngs 'entertainment' '#ffffff' '#ff8f00'
       generatePngs 'entertainment_colored' '#6dba00' '#ff8f00'

       generatePngs 'icons8' '#777777' '#ff8f00' neg

       generatePngs 'xmas' '#aa2001' '#ff8f00'

       generatePngs 'overlays' '#777777' '#777777' '' x2 '' nomx