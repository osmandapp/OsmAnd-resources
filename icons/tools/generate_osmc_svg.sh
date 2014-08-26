cd ../svg/osmc_source
declare -a colors=("black" "white" "green" "red" "yellow" "blue")
## now loop through the above array
for bg in "${colors[@]}"
do
  for bar in "${colors[@]}"
  do
    if [ "$bg" != "$bar" ]; then
      python ../../tools/svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_bar.svg > ../osmc/osmc_${bg}_bg_${bar}_bar.svg
      python ../../tools/svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_circle.svg > ../osmc/osmc_${bg}_bg_${bar}_circle.svg
    fi
  done
   # or do whatever with individual element of the array
done