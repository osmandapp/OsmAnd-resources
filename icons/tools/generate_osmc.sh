#!/bin/bash -xe
#create folders and generate colored svgs from src
BASEFOLDER=`pwd`;
INPUTFOLDER=${BASEFOLDER}/../svg/osmc_source/
OUTPUTFOLDER=${BASEFOLDER}/../svg/

COLORS=(black blue green red white yellow orange brown pink purple teal)
COLORS_HEX=(000000 0023ff 00ac26 d60e1e fefefe ffce00 ffa800 7b5100 F765AF B900F7 007C7C)
SRC_HEX=0000FF #color of src

for (( i = 0 ; i < ${#COLORS[@]} ; i++ )) do
  mkdir -p $OUTPUTFOLDER/osmc_${COLORS[i]}
  rm -f $OUTPUTFOLDER/osmc_${COLORS[i]}/*.*
done

cpsvg() {
	cp $INPUTFOLDER/${1} $OUTPUTFOLDER/osmc_${2}/osmc_${2}_${1}
}

recolour() {
#	sed -i '' "s/$SRC_HEX/$3/g" $OUTPUTFOLDER/osmc_${2}/osmc_${2}_${1}
	sed -i "s/$SRC_HEX/$3/g" $OUTPUTFOLDER/osmc_${2}/osmc_${2}_${1}
}

for FILE in $INPUTFOLDER*.svg; do
	FILENAME=${FILE##*/}
	echo $FILENAME;
	for (( j = 0 ; j < ${#COLORS[@]}; j++ )) do
		cpsvg ${FILENAME} ${COLORS[j]};
 		recolour ${FILENAME} ${COLORS[j]} ${COLORS_HEX[j]};
	done
done

mkdir -p $OUTPUTFOLDER/osmc_bg
mkdir -p $OUTPUTFOLDER/osmc_other
cp $INPUTFOLDER/bg/*.* $OUTPUTFOLDER/osmc_bg
cp $INPUTFOLDER/other/*.* $OUTPUTFOLDER/osmc_other
