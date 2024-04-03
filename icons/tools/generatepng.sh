#!/bin/bash

pushd . > /dev/null
cd `dirname $BASH_SOURCE` > /dev/null
BASEFOLDER=`pwd`;
popd  > /dev/null
BASEFOLDER=`dirname $BASEFOLDER`

FOLDERS_NOMX=(xxhdpi xhdpi hdpi mdpi) # no icons used in osmand interface (search, poi overlay)
FOLDERS_POI=(big-xxhdpi big-xhdpi big-hdpi big-mdpi) 
SIZES_NOMX=(36 24 18 12) 
SIZES_NOMX2=(96 64 48 32) 
SIZES_NOMX4=(192 128 96 64) 
SIZES_POI=(72 48 36 24) 

SVGFOLDER=${BASEFOLDER}/svg/
OUTPUT_SVG_FOLDER=${BASEFOLDER}/svg-res
OUTPUTSVGWEBFOLDER=${BASEFOLDER}/svg-web-res/
OUTPUTFOLDER=${BASEFOLDER}/png/
VDFOLDER=${BASEFOLDER}/vd/
VDFOLDERSVG=${BASEFOLDER}/vd/svg/

mkdir -p ${OUTPUTFOLDER}
mkdir -p ${OUTPUT_SVG_FOLDER}
mkdir -p ${OUTPUTSVGWEBFOLDER}
mkdir -p ${VDFOLDERSVG}
mkdir -p ${VDFOLDER}
mkdir -p ${VDFOLDER}/map
mkdir -p ${VDFOLDER}/poi

for (( i = 0 ; i < ${#FOLDERS_NOMX[@]} ; i++ )) do
  mkdir -p ${OUTPUTFOLDER}/${FOLDERS_NOMX[i]}
done
for (( i = 0 ; i < ${#FOLDERS_POI[@]} ; i++ )) do
  mkdir -p ${OUTPUTFOLDER}/${FOLDERS_POI[i]}
done

genMapIconsNoScale() {
  TYPE=$1
  COLORED=$2
  MDPI=1
  HDPI=1.5
  XHDPI=2
  XXHDPI=3
  echo $TYPE
  VDFOLDEROUT=${VDFOLDER}/map
  rm -f ${VDFOLDERSVG}/* || true
  for FILE in $SVGFOLDER$1/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]] || [[ $FILENAME == "*.svg" ]]; then
        continue;
      fi
      FILENAME=${FILENAME%.*}

      if [[ "${COLORED}" = 'colored' ]]; then
        cp "${FILE}" "${OUTPUT_SVG_FOLDER}/c_${FILENAME}.svg"
      else
        cp "${FILE}" "${OUTPUT_SVG_FOLDER}/${FILENAME}.svg"
      fi
      cp ${FILE} ${VDFOLDERSVG}/${FILENAME}.svg
      rsvg-convert -f png ${FILE} -x $MDPI -y $MDPI -o ${OUTPUTFOLDER}mdpi/${FILENAME}.png
      rsvg-convert -f png ${FILE} -x $HDPI -y $HDPI -o ${OUTPUTFOLDER}hdpi/${FILENAME}.png
      rsvg-convert -f png ${FILE} -x $XHDPI -y $XHDPI -o ${OUTPUTFOLDER}xhdpi/${FILENAME}.png
      rsvg-convert -f png ${FILE} -x $XXHDPI -y $XXHDPI -o ${OUTPUTFOLDER}xxhdpi/${FILENAME}.png
  done
  ${BASEFOLDER}/tools/SVGtoXML/vd-tool/bin/vd-tool -c -in ${VDFOLDERSVG} -out ${VDFOLDEROUT}
}

genMapIconsStdSize() {
  TYPE=$1
  PCOLOR=$2 # color for map icons(mm_*)
  FOLDERS=("${FOLDERS_NOMX[@]}")
  COLORED=$4
  NEG_PARAM=$5
  FILL_COLOR='none'
  STROKE_COLOR='none'
  BG_COLOR="$PCOLOR"
  if [[ ! -z "${NEG_PARAM}" ]]; then
    FILL_COLOR="$PCOLOR"
    STROKE_COLOR="$PCOLOR"
    BG_COLOR="#ffffff"
  fi 
  VDFOLDEROUT=${VDFOLDER}/map
  if [ "$3" == 'x4' ]; then 
    SIZES=("${SIZES_NOMX4[@]}")
  elif [ "$3" == 'x2' ]; then 
    SIZES=("${SIZES_NOMX2[@]}")
  elif [ "$3" == 'poi' ]; then 
    SIZES=("${SIZES_POI[@]}")
    FOLDERS=("${FOLDERS_POI[@]}")
    VDFOLDEROUT=${VDFOLDER}/poi
  else
    SIZES=("${SIZES_NOMX[@]}")
  fi

  # regex to replace value of first width and height
  DEFAULT_SIZE=${SIZES[-1]}
  SED_REPLACE_WIDTH="0,/\swidth=\"[0-9]+\"/s/(\swidth=\")[0-9]+\"/\1${DEFAULT_SIZE}\"/"
  SED_REPLACE_HEIGHT="0,/\sheight=\"[0-9]+\"/s/(\sheight=\")[0-9]+\"/\1${DEFAULT_SIZE}\"/"
  SED_RESIZE_SVG="$SED_REPLACE_WIDTH;$SED_REPLACE_HEIGHT"

  createSvgFolder ${1} ${3}

  echo "Generate $TYPE, sizes: ${SIZES[@]}, folders: ${FOLDERS[@]}, fill $FILL_COLOR, stroke $STROKE_COLOR, bg color $BG_COLOR "
  # delete previous input svg icons 
  rm -f ${VDFOLDERSVG}/* || true
  for FILE in ${SVGFOLDER}${TYPE}/*.svg; do
      FILENAME=${FILE##/*/}
      if [[ $FILENAME == _* ]]; then
        continue;
      fi
      FILENAME=${TYPE}_${FILENAME%.*}
      # prepare vector icon
      COLOURED_SVG=${VDFOLDERSVG}/${FILENAME}.svg
      if [ ! "$PCOLOR" == "#" ]; then 
        recolour "${FILE}" "$FILL_COLOR" "$STROKE_COLOR" "$BG_COLOR" > "$COLOURED_SVG"
      else
        cp "$FILE" "$COLOURED_SVG"
      fi

      # Resize svg
      if [[ "${COLORED}" = 'colored' ]]; then
        OUTPUT_SVG_PATH="${OUTPUT_SVG_FOLDER}/c_${FILENAME}.svg"
      else
        OUTPUT_SVG_PATH="${OUTPUT_SVG_FOLDER}/${FILENAME}.svg"
      fi
      sed -E "${SED_RESIZE_SVG}" "${VDFOLDERSVG}${FILENAME}.svg" > "${OUTPUT_SVG_PATH}"

      for (( j = 0 ; j < ${#SIZES[@]}; j++ )) do
        SZ=${SIZES[j]}
        RES_FILE=${OUTPUTFOLDER}${FOLDERS[j]}/${FILENAME}.png
        rsvg-convert -f png "$COLOURED_SVG" -w ${SZ} -h ${SZ}  -o ${RES_FILE} #> /dev/null 2>&1
        # RES_SVG_FILE=${OUTPUTFOLDER}${FOLDERS[j]}/${FILENAME}.svg
        # cp "$COLOURED_SVG" ${RES_SVG_FILE}
      done
  done
  ${BASEFOLDER}/tools/SVGtoXML/vd-tool/bin/vd-tool -c -in ${VDFOLDERSVG} -out ${VDFOLDEROUT} -widthDp ${SIZES[3]} -heightDp ${SIZES[3]}  
}

createSvgFolder() {
  TYPE_SVG=$1
  FOLDERS_SVG=("${FOLDERS_NOMX[@]}")

  for FILE in ${SVGFOLDER}${TYPE_SVG}/*.svg; do
      FILENAME_SVG=${FILE##/*/}
      if [[ $FILENAME_SVG == _* ]]; then
        continue;
      fi
      FILENAME_SVG=${TYPE_SVG}_${FILENAME_SVG%.*}
      SVGWEB=${OUTPUTSVGWEBFOLDER}/${FILENAME_SVG}.svg
      cp "$FILE" "$SVGWEB"
  done
}

recolour() {
    filename="$1"
    fill="$2"
    stroke="$3"
    background="$4"
sed_script=$(cat << EOF
    s/fill:#111111;/fill:${fill};/g
    s/fill:#111;/fill:${fill};/g
    s/fill=\"#111111\"/fill=\"${fill}\"/g
    s/fill=\"#111\"/fill=\"${fill}\"/g
    s/fill=\"#333333\"/fill=\"${fill}\"/g
    s/stroke:#eeeeee;/stroke:${stroke};/g
    s/stroke:#eee;/stroke:${stroke};/g
    s/stroke=\"#eeeeee\"/stroke=\"${stroke}\"/g
    s/stroke=\"#333333\"/stroke=\"${stroke}\"/g
    s/fill:white/fill:${background}/g
    s/stroke:white/stroke:${background}/g
    s/stroke=\"white\"/stroke=\"${background}\"/g
    s/fill:#ffffff/fill:${background}/g
    s/fill=\"#ffffff\"/fill=\"${background}\"/g
    s/fill=\"white\"/fill=\"${background}\"/g
    s/stroke:#ffffff/stroke:${background}/g
    s/stroke=\"#ffffff\"/stroke=\"${background}\"/g
EOF
)
    sed "$sed_script" $filename
}

generateBothMapPOIPng() {
  TYPE="$1"
  COLOR_MAP="$2" # color for map icons(mm_*)
  COLOR_POI="$3" # color for osmand interface icons (poi layer,search) (mx_)
  MAP_SCALE="$4" # x2, x4, empty
  COLORED="$5"
  NEG="$6"
  genMapIconsStdSize $TYPE "${COLOR_POI}" 'poi' "${COLORED}" "$NEG"
  genMapIconsStdSize $TYPE "${COLOR_MAP}" "$MAP_SCALE" "${COLORED}" "$NEG"
} 

  ### UNCOMMENT to generate only 1 category
  # generateBothMapPOIPng 'transport' '#ffffff' '#ff8f00'
  # exit 0;

  genMapIconsNoScale 'shaders' 'colored'
  genMapIconsNoScale 'shaders_int1' 'colored'
  genMapIconsNoScale 'shields' 'colored'
  genMapIconsNoScale 'shields_big'
  genMapIconsNoScale 'road_shields' 'colored'
  genMapIconsNoScale 'osmc_bg' 'colored'
  genMapIconsNoScale 'map-small' 'colored'
  genMapIconsNoScale 'cycle_node_shields'
  genMapIconsStdSize 'seamark_int1_shields' '#' 'x1' 'colored'

  genMapIconsNoScale 'osmc_black' 'colored'
  genMapIconsNoScale 'osmc_blue' 'colored'
  genMapIconsNoScale 'osmc_green' 'colored'
  genMapIconsNoScale 'osmc_orange' 'colored'
  genMapIconsNoScale 'osmc_red' 'colored'
  genMapIconsNoScale 'osmc_white' 'colored'
  genMapIconsNoScale 'osmc_yellow' 'colored'
  genMapIconsNoScale 'osmc_brown' 'colored'
  genMapIconsNoScale 'osmc_purple' 'colored'
  genMapIconsNoScale 'osmc_pink' 'colored'
  genMapIconsNoScale 'osmc_teal' 'colored'
  genMapIconsNoScale 'osmc_other' 'colored'
  genMapIconsStdSize 'functional-icons' '#' x1 'colored'
  genMapIconsStdSize 'functional-icons-x2' '#ff8f00' x2 'colored'

  genMapIconsStdSize 'overlays' '#' x2 'colored'
  genMapIconsStdSize 'overlays_water' '#' x2 'colored'

  genMapIconsStdSize 'topo' '#000000'
  genMapIconsStdSize 'topo_big' '#000000' x2
  genMapIconsStdSize 'topo_water'  '#0F5CF0'
  genMapIconsStdSize 'topo_emergency' '#DA0092'
  genMapIconsStdSize 'topo_accomodation'  '#1F3087'
  generateBothMapPOIPng 'special_poi' '#FFF5F1' '#ff8f00'
      
  genMapIconsNoScale 'seamark_shields' 'colored'
  genMapIconsNoScale 'seamark_shields_x4' 'colored'
  genMapIconsStdSize 'seamark' '#' x2 'colored'
  genMapIconsStdSize 'seamark_int1' '#' x2 'colored'
  genMapIconsStdSize 'seamark_small' '#' x2 'colored'
  genMapIconsStdSize 'seamark_big' '#' x4 'colored'

  generateBothMapPOIPng 'seamark_small_poi' '#777777' '#ff8f00' 'x1' 'colored'
  generateBothMapPOIPng 'skimap' '#000000' '#ff8f00' x2 'colored'
  generateBothMapPOIPng 'subway' '#777777' '#ff8f00' x2 'colored'

  generateBothMapPOIPng 'water' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'water_colored' '#0092DA' '#ff8f00'

  generateBothMapPOIPng 'emergency' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'emergency_colored' '#DA0092' '#ff8f00'
  generateBothMapPOIPng 'health' '#ffffff' '#ff8f00' '#DA0092'

  generateBothMapPOIPng 'transport' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'transport_colored' '#0092DA' '#ff8f00'

  generateBothMapPOIPng 'barrier' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'barrier_colored' '#444444' '#ff8f00'

  generateBothMapPOIPng 'accommodation' '#ffffff' '#ff8f00'

  generateBothMapPOIPng 'tourist' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'tourist_colored' '#593906' '#ff8f00'

  generateBothMapPOIPng 'sport' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'sport_colored' '#39AC39' '#ff8f00'

  generateBothMapPOIPng 'amenity' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'amenity_colored' '#555555' '#ff8f00'
  generateBothMapPOIPng 'office' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'craft' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'place_of_worship' '#333333' '#ff8f00'
  generateBothMapPOIPng 'money' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'education' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'poi' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'poi_colored' '#3f3f3f' '#ff8f00'
  generateBothMapPOIPng 'additional' '#3f3f3f' '#ff8f00'
  generateBothMapPOIPng 'additional_category' '#3f3f3f' '#ff8f00'
  generateBothMapPOIPng 'power' '#3f3f3f' '#ff8f00'
  generateBothMapPOIPng 'club' '#ffffff' '#ff8f00' '#555555'
  generateBothMapPOIPng 'food' '#ffffff' '#ff8f00' '#8f6732'
  generateBothMapPOIPng 'shopping' '#ffffff' '#ff8f00' '#a734c2'

  generateBothMapPOIPng 'landuse' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'landuse_colored' '#6dba00' '#ff8f00'

  generateBothMapPOIPng 'entertainment' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'entertainment_colored' '#6dba00' '#ff8f00'

  generateBothMapPOIPng 'icons8' '#777777' '#ff8f00' 'x1' '' neg
  generateBothMapPOIPng 'xmas' '#aa2001' '#ff8f00'
  generateBothMapPOIPng 'special' '#ffffff' '#ff8f00'
  generateBothMapPOIPng 'logos' '#ffffff' '#ff8f00'

