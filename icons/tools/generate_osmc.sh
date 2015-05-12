#!/bin/bash
#create folders and generate colored svgs from src
BASEFOLDER=`pwd`;
INPUTFOLDER=${BASEFOLDER}/../svg/osmc_source/
OUTPUTFOLDER=${BASEFOLDER}/../svg/osmc/

COLORS=(black blue green red white yellow orange)
COLORS_HEX=(000000 0023ff 00ac26 d60e1e ffffff dada00 ffa800)
SRC_HEX=0000ff #color of src

for (( i = 0 ; i < ${#COLORS[@]} ; i++ )) do
  mkdir -p $OUTPUTFOLDER/${COLORS[i]}
  rm -f $OUTPUTFOLDER/${COLORS[i]}/*.*
done

cpsvg() {
	cp $INPUTFOLDER/${1} $OUTPUTFOLDER/${2}/osmc_${2}_${1}
}

recolour() {
	cat $OUTPUTFOLDER/${2}/osmc_${2}_${1} | sed -i "s/$SRC_HEX/$3/g" $OUTPUTFOLDER/${2}/osmc_${2}_${1}
}

for FILE in $INPUTFOLDER*.svg; do
	FILENAME=${FILE##*/}
	echo $FILENAME;
	for (( j = 0 ; j < ${#COLORS[@]}; j++ )) do
		cpsvg ${FILENAME} ${COLORS[j]};
 		recolour ${FILENAME} ${COLORS[j]} ${COLORS_HEX[j]};
	done
done

mkdir -p $OUTPUTFOLDER/bg
mkdir -p $OUTPUTFOLDER/other
cp $INPUTFOLDER/bg/*.* $OUTPUTFOLDER/bg
cp $INPUTFOLDER/other/*.* $OUTPUTFOLDER/other
