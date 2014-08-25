cd ../svg/osmc_source
declare -a colors=("black" "white" "green" "red" "yellow" "blue")

## now loop through the above array
for bg in "${arr[@]}"
do
  for bar in "${arr[@]}"
  do
      python svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_bar.svg > ../svg/osmc/osmc_${bg}_bg_${bar}_bar.svg
      python svg_stack.py --margin=-16  osmc_${bg}_bg.svg osmc_${bar}_circle.svg > ../svg/osmc/osmc_${bg}_bg_${bar}_circle.svg
  done
   # or do whatever with individual element of the array
done