cd ../svg/osmc_source
declare -a colors=("black" "white" "green" "red" "yellow" "blue")
## now loop through the above array
for bg in "${colors[@]}"
do
  for bar in "${colors[@]}"
  do
    if [ "$bg" != "$bar" ]; then
      python ../../tools/svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_bar.svg > ../osmc/h_osmc_${bg}_bg_${bar}_bar.svg
      python ../../tools/svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_circle.svg > ../osmc/h_osmc_${bg}_bg_${bar}_circle.svg
    fi
  done
   # or do whatever with individual element of the array
done
cp osmc_black_bg.svg ../osmc/h_osmc_black_bg.svg
cp osmc_blue_bg.svg ../osmc/h_osmc_blue_bg.svg
cp osmc_green_bg.svg ../osmc/h_osmc_green_bg.svg
cp osmc_red_bg.svg ../osmc/h_osmc_red_bg.svg
cp osmc_white_bg.svg ../osmc/h_osmc_white_bg.svg
cp osmc_yellow_bg.svg ../osmc/h_osmc_yellow_bg.svg