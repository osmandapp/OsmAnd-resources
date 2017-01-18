#!/bin/bash

mygroup() {
 	echo "${2}  style-icons/mm_${1}.png"
 	cp ../png/mdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mm_${1}.png
 	cp ../png/hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mm_${1}.png
 	cp ../png/xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mm_${1}.png
 	cp ../png/xxhdpi/${2} ../../rendering_styles/style-icons/drawable-xxhdpi/mm_${1}.png
 	cp ../png/big-mdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mx_${1}.png
 	cp ../png/big-hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mx_${1}.png
 	cp ../png/big-xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mx_${1}.png
 	cp ../png/big-xxhdpi/${2} ../../rendering_styles/style-icons/drawable-xxhdpi/mx_${1}.png
}


mycp() {
	mygroup ${1}_${2} $3
}

mycpname() {
	mygroup ${1} ${2}
}



## Shaders ! # copy all shaders untouched
cp ../png/mdpi/h_* ../../rendering_styles/style-icons/drawable-mdpi/
cp ../png/hdpi/h_* ../../rendering_styles/style-icons/drawable-hdpi/
cp ../png/xhdpi/h_* ../../rendering_styles/style-icons/drawable-xhdpi/
cp ../png/xxhdpi/h_* ../../rendering_styles/style-icons/drawable-xxhdpi/

cp ../no-svg/drawable-mdpi/* ../../rendering_styles/style-icons/drawable-mdpi/
cp ../no-svg/drawable-hdpi/* ../../rendering_styles/style-icons/drawable-hdpi/
cp ../no-svg/drawable-xhdpi/* ../../rendering_styles/style-icons/drawable-xhdpi/
cp ../no-svg/drawable-xxhdpi/* ../../rendering_styles/style-icons/drawable-xxhdpi/

mygroup landuse landuse_coniferous.png
mycpname grass landuse_grass.png
mycpname forest landuse_colored_forest.png               # Keep shaders with background color, cannot be replaced by icons!
mycpname wood landuse_forest.png
mycpname beach tourist_beach2.png                     # Keep shaders with background color, cannot be replaced by icons!
#mycp natural scrub landuse_scrub.png                     # Keep shaders with background color, cannot be replaced by icons!
#mycp natural swamp landuse_swamp.png                     # Keep shaders with background color, cannot be replaced by icons!
mycpname zoo tourist_zoo.png                         # Keep shaders with background color, cannot be replaced by icons!
mycpname military_danger_area poi_colored_danger_area.png
mycpname military_nuclear_explosion_site poi_colored_nuclear_explosion_site.png
mycpname glacier poi_colored_peak2.png                       # Keep shaders with background color, cannot be replaced by icons!
mycpname landfill landuse_colored_landfill.png
mycpname wetland landuse_wetland.png
mycpname cemetery landuse_cemetery.png
mycpname grave_yard landuse_cemetery.png
mycpname military_landuse landuse_military.png
mycpname industrial landuse_industrial.png
mycpname construction landuse_construction.png
mycpname garages landuse_garages.png
mycpname quarry landuse_quarry.png
mycpname allotments landuse_allotments.png
mycpname place_allotments poi_colored_hamlet.png
mycpname village_green landuse_village_green.png
mycpname recreation_ground landuse_recreation_ground.png
mycpname residential landuse_residential.png
mycpname commercial landuse_commercial.png
mycpname retail landuse_retail.png
mycpname religious landuse_religious.png
mycpname orchard landuse_orchard.png
mycpname vineyard landuse_vineyard.png
mycpname garden landuse_colored_garden.png
mycpname farmland landuse_farmland.png
mycpname nature_reserve landuse_nature_reserve.png
mycpname logging landuse_logging.png
mycpname sand landuse_sand.png
mycpname meadow landuse_meadow.png
mycpname salt_pond landuse_salt_pond.png
mycpname farmyard landuse_farmyard.png
mycpname landuse_railway landuse_railway.png
mycpname scrub landuse_scrub2.png
mycpname heath landuse_heath.png
mycpname grassland landuse_grassland.png
mycpname greenfield landuse_greenfield.png
mycpname brownfield landuse_brownfield.png
mycpname protected_area landuse_protected_area.png
mycpname plant_nursery landuse_plant_nursery.png
mycpname greenhouse_horticulture landuse_greenhouse_horticulture.png
mycpname aquaculture landuse_aquaculture.png

mycp stroke black functional-icons_black_stroke.png
mycp stroke darkgreen functional-icons_darkgreen_stroke.png
mycp stroke gray functional-icons_gray_stroke.png
mycp stroke gray_triangle functional-icons_gray_stroke_triangle.png
mycp stroke lightorange_left functional-icons_lightorange_left_stroke.png
mycp stroke white functional-icons_white_stroke.png
mycp stroke brown_right functional-icons_brown_right_stroke.png

## Natural
mygroup natural poi_colored_peak2.png
mycp natural cave_entrance poi_cave.png
mycpname topo_cave topo_topo_cave.png
mycp natural geyser water_geyser.png  #scale 0.375
mycp natural hot_spring water_hot_spring.png  #scale 0.375
mycp natural peak_big poi_colored_peak_big.png
mycp natural peak poi_colored_peak.png
mycp natural peak_night_big functional-icons_peak_night_big.png  #For night orienteering use orange similar to contour lines (=day version with color #CC6600)  #scale 0.5
mycp natural peak_night functional-icons_peak_night.png  #For night orienteering use orange similar to contour lines (=day version with color #CC6600)  #scale 0.5
mycp natural saddle poi_colored_saddle.png
mycp natural sinkhole poi_colored_sinkhole.png
mycp natural spring water_spring.png  #scale 0.375
mycpname topo_spring topo_topo_spring.png  #scale 0.375
mycp natural stone poi_colored_stone.png  #scale 0.375
mycp natural tree_broadleaved functional-icons_tree_broadleaved.png
mycpname topo_tree_broadleaved functional-icons-x2_topo_tree_broadleaved.png
mycp natural tree_cypress functional-icons_tree_cypress.png
mycp natural tree functional-icons_tree.png  #scale 0.25
mycp natural tree_leafless functional-icons_tree_leafless.png
mycp natural tree_needleleaved functional-icons_tree_needleleaved.png
mycpname topo_tree_needleleaved functional-icons-x2_topo_tree_needleleaved.png
mycp natural tree_palm functional-icons_tree_palm.png
mycpname topo_tree_palm functional-icons-x2_topo_tree_palm.png
mycpname tree_dot functional-icons_tree.png
mycpname tree poi_colored_tree.png
mycp natural volcano_active_big functional-icons_volcano_active_big.png
mycp natural volcano_active functional-icons_volcano_active.png
mycp natural volcano_big functional-icons_volcano_big.png
mycp natural volcano_map functional-icons_volcano.png  #Is poi_colored_peak.png with color #D40000  #scale 0.5
mycpname volcano poi_colored_volcano_active.png
mycp waterway rapids barrier_rapids.png  #scale 0.375
mycpname waterfall water_waterfall.png  #scale 0.375
mycpname topo_waterfall topo_topo_waterfall.png  #scale 0.375
mycpname dam water_dam.png
mycpname weir water_weir.png
mycpname stream water_stream.png
mycpname river water_river.png
mycpname water water_water.png
mycpname canal water_canal.png
mycpname crater poi_colored_crater.png
mycpname cape poi_colored_cape.png
mycpname bay poi_colored_bay.png
mycpname reef poi_colored_reef.png
mycpname reservoir water_reservoir.png
mycpname basin water_reservoir.png
mycpname ridge poi_colored_ridge.png
mycpname strait poi_colored_strait.png
mycpname fjord poi_colored_fjord.png
mycpname cliff poi_colored_cliff.png

## Location dots
mygroup administrative poi_colored_boundary_administrative.png
mycp place city_dot_night functional-icons_city_night.png  #scale 0.375
mycp place city_dot_small functional-icons_city_small.png  #scale 0.375
mycp place city_dot_small_night functional-icons_city_small_night.png  #scale 0.375
mycp place city_dot functional-icons_city.png  #scale 0.375
mycp place capital_dot_night functional-icons_capital_night.png  #scale 0.375
mycp place capital_dot_small_night functional-icons_capital_small_night.png  #scale 0.375
mycp place capital_dot functional-icons_capital.png  #scale 0.375
mycp place capital_dot_small functional-icons_capital_small.png  #scale 0.375
mycp place town_dot_night functional-icons_town_night.png  #scale 0.25
mycp place town_dot functional-icons_town.png  #scale .25
mycp place city poi_colored_city.png  #scale 0.375
mycp place town poi_colored_town.png
mycpname hamlet poi_colored_hamlet.png
mycpname village poi_colored_village.png
mycpname locality poi_colored_place_locality.png
mycpname suburb poi_colored_suburb.png
mycpname neighbourhood poi_colored_suburb.png
mycpname isolated_dwelling poi_colored_isolated_dwelling.png
mycpname neighborhood poi_colored_place_neighborhood.png
mycpname island poi_colored_island.png
mycpname country poi_colored_country.png
mycpname quarter poi_colored_quarter.png
mycpname place_farm poi_colored_place_farm.png
mycpname islet poi_colored_islet.png

## Barrier dots
mycp barrier small_black_1 functional-icons_point_black_1.png  #scale 0.25
mycp barrier small_black_2 functional-icons_point_black_2.png  #scale 0.25
mycp barrier small_black_3 functional-icons_point_black_3.png  #scale 0.25
mycp barrier small_black_4 functional-icons_point_black_4.png  #scale 0.25
mycp barrier small_black_bold_1 functional-icons_point_black_bold_1.png  #scale 0.25
mycp barrier small_black_bold_2 functional-icons_point_black_bold_2.png  #scale 0.25
mycp barrier small_black_bold_3 functional-icons_point_black_bold_3.png  #scale 0.25
mycp barrier small_black_bold_4 functional-icons_point_black_bold_4.png  #scale 0.25
mycp barrier small_white_1 functional-icons_point_white_1.png  #scale 0.25
mycp barrier small_white_2 functional-icons_point_white_2.png  #scale 0.25
mycp barrier small_white_3 functional-icons_point_white_3.png  #scale 0.25
mycp barrier small_white_4 functional-icons_point_white_4.png  #scale 0.25
mycp barrier small_red_1 functional-icons_point_red_1.png  #scale 0.25
mycp barrier small_red_2 functional-icons_point_red_2.png  #scale 0.25
mycp barrier small_red_3 functional-icons_point_red_3.png  #scale 0.25
mycp barrier small_red_4 functional-icons_point_red_4.png  #scale 0.25
mycp barrier small_red_bold_1 functional-icons_point_red_bold_1.png  #scale 0.25
mycp barrier small_red_bold_2 functional-icons_point_red_bold_2.png  #scale 0.25
mycp barrier small_red_bold_3 functional-icons_point_red_bold_3.png  #scale 0.25
mycp barrier small_red_bold_4 functional-icons_point_red_bold_4.png  #scale 0.25
mycp barrier small_brown_bold_1 functional-icons_point_brown_bold_1.png  #scale 0.25
mycp barrier small_brown_bold_2 functional-icons_point_brown_bold_2.png  #scale 0.25

## Emergency + Health
mygroup emergency emergency_ambulance_station.png
mygroup emergency_infrastructure emergency_emergency_phone.png
mycp amenity fire_station emergency_firestation4.png
mycp amenity police emergency_police3.png
mycp emergency fire_hydrant emergency_colored_fire_hydrant.png
mycpname fire_hydrant_type_underground emergency_fire_hydrant_underground.png
mycpname fire_hydrant_type_pillar emergency_fire_hydrant.png
mycpname suction_point emergency_suction_point.png
mycp emergency phone emergency_emergency_phone.png
mycpname emergency_access_point emergency_emergency_access_point.png
mycpname defibrillator emergency_defibrillator.png
mycpname ambulance_station emergency_ambulance_station.png
mycpname fire_extinguisher emergency_fire_extinguisher.png

mygroup healthcare health_pharmacy.png
mycp amenity dentist health_dentist.png
mycp amenity doctors health_doctors3.png
mycp amenity hospital health_hospital2.png
mycpname clinic health_clinic.png
mycp amenity nursing_home health_nursing_home.png
mycp amenity pharmacy health_pharmacy2.png
mycp amenity veterinary health_veterinary.png
mycpname social_facility health_nursing_home.png
mycpname sanatorium health_sanatorium.png
mycpname health_amenity_type_first_aid_kit health_health_amenity_type_first_aid_kit.png

## Overlays
mycp hazard yes overlays_hazard.png
mycp hazard nuclear overlays_hazard_nuclear.png
mycp hazard erosion overlays_hazard_erosion.png
mycp hazard slippery_road overlays_hazard_slippery_road.png
mycp hazard flood overlays_hazard_flood.png
mycp hazard avalanche overlays_hazard_avalanche.png
mycp fixme_tag yes overlays_fixme.png
mycp fixme_tag_lowzoom yes overlays_fixme_dot.png
mycp fixme_tag_lowzoom2 yes overlays_fixme_dot_2.png
mycp note_tag yes overlays_note.png
mycp osm_note dot overlays_osm_note_dot.png
mycp osm_note dot_2 overlays_osm_note_dot_2.png
mycp drinking_water yes_map overlays_drinking_water_yes.png
mycp drinking_water no_map overlays_drinking_water_no.png
mycpname topo_drinking_water_yes_map overlays_topo_drinking_water_yes.png
mycpname topo_drinking_water_no_map overlays_topo_drinking_water_no.png
mycpname access_private_overlay overlays_access_private.png
mycpname access_private_red_overlay overlays_access_private_red.png


## Traffic + Transportation
mygroup transportation transport_taxi_rank.png
mygroup road_obstacle transport_speedbump.png
mygroup personal_transport shopping_car.png
mygroup air_transport transport_aerodrome.png
mygroup water_transport transport_ferry_terminal.png
mygroup bicycle_transport shopping_bicycle.png
mygroup aerialway_transport transport_aerialway_station.png
mycp highway crossing_bg functional-icons_highway_crossing_bg.png
mycpname highway_crossing transport_zebra_crossing2.png
mycpname highway_crossing_map functional-icons_highway_crossing.png
mycpname crossing_traffic_signals_map functional-icons_highway_crossing_traffic_signals.png
mycpname crossing_uncontrolled_map functional-icons_highway_crossing_uncontrolled.png
mycpname crossing_unmarked_map functional-icons_highway_crossing_unmarked.png

mycpname ford transport_colored_ford.png
mycpname topo_ford topo_topo_ford.png
mycp highway milestone functional-icons_milestone.png
mycp highway mini_roundabout transport_colored_miniroundabout_anticlockwise.png
mycp highway noexit functional-icons_noexit.png
mycpname deadlock poi_colored_noexit.png
mycp highway passing_place functional-icons_passing_place.png
mycp highway speed_camera transport_speedcamera.png
mycp highway steps transport_colored_highway_steps.png
mycp highway traffic_signals_map functional-icons_traffic_lights.png
mycp highway traffic_signals transport_traffic_lights.png
mycpname motorway_junction transport_motorway_junction.png
mycpname junction transport_junction.png
mycpname rest_area transport_rest_area.png
mycpname traffic_calming_bump transport_speedbump.png
mycpname traffic_calming_rumble_strip transport_rumble_strip.png
mycpname traffic_calming_chicane transport_chicane.png
mycpname traffic_calming_choker transport_choker.png
mycpname traffic_calming_cushion transport_cushion.png
mycpname traffic_calming_hump transport_hump.png
mycpname traffic_calming_island transport_traffic_island.png
mycpname traffic_calming_table transport_table.png
mycp oneway blue functional-icons_oneway_blue.png
mycp oneway reverse_blue functional-icons_oneway_reverse_blue.png
mycp oneway blue_big functional-icons_oneway_blue_big.png
mycp oneway reverse_blue_big functional-icons_oneway_reverse_blue_big.png
mycp arrow blue_big functional-icons_arrow_blue_big.png
mycp arrow blue_big_night functional-icons_arrow_blue_big_night.png
mycp arrow triangle_black functional-icons_arrow_triangle_black.png
mycp arrow triangle_black_big functional-icons_arrow_triangle_black_big.png
mycp arrow triangle_black_small functional-icons_arrow_triangle_black_small.png
mycp arrow triangle_black_nobg functional-icons_arrow_triangle_black_nobg.png
mycp arrow triangle_black_big_nobg functional-icons_arrow_triangle_black_big_nobg.png
mycp arrow triangle_black_small_nobg functional-icons_arrow_triangle_black_small_nobg.png
mycp arrow triangle_white_nobg functional-icons_arrow_triangle_white_nobg.png
mycp arrow triangle_white_big_nobg functional-icons_arrow_triangle_white_big_nobg.png
mycp arrow triangle_white_small_nobg functional-icons_arrow_triangle_white_small_nobg.png
mycp arrow triangle_blue functional-icons_arrow_triangle_blue.png
mycp arrow triangle_blue_big functional-icons_arrow_triangle_blue_big.png
mycp arrow triangle_blue_small functional-icons_arrow_triangle_blue_small.png
mycp arrow triangle_darkblue functional-icons_arrow_triangle_darkblue.png
mycp arrow triangle_darkblue_big functional-icons_arrow_triangle_darkblue_big.png
mycp arrow triangle_darkblue_small functional-icons_arrow_triangle_darkblue_small.png
mycp arrow 2triangles_black functional-icons_arrow_2triangles_black.png
mycp arrow 2triangles_white functional-icons_arrow_2triangles_white.png
mycp arrow triangle_white2 functional-icons_arrow_triangle_white2.png
mycp arrow triangle_black2 functional-icons_arrow_triangle_black2.png
mycp skimap arrow_2triangles_black skimap_arrow_2triangles_black.png
mycp skimap arrow_2triangles_black_big skimap_arrow_2triangles_black_big.png
mycp skimap arrow_2triangles_black_big_nobg skimap_arrow_2triangles_black_big_nobg.png
mycp skimap arrow_2triangles_white_big_nobg skimap_arrow_2triangles_white_big_nobg.png
mycp skimap arrow_2triangles_black_nobg skimap_arrow_2triangles_black_nobg.png
mycp skimap arrow_2triangles_white_nobg skimap_arrow_2triangles_white_nobg.png
mycp skimap arrow_2triangles_black_small skimap_arrow_2triangles_black_small.png
mycp skimap arrow_2triangles_black_small_nobg skimap_arrow_2triangles_black_small_nobg.png
mycp skimap arrow_2triangles_white_small_nobg skimap_arrow_2triangles_white_small_nobg.png
mycp harbour yes poi_colored_harbour.png
mycpname historic_milestone tourist_historic_milestone.png
mycpname runway transport_runway.png
mycpname ford_stepping_stones transport_colored_ford_stepping_stones.png
mycpname topo_ford_stepping_stones topo_topo_ford_stepping_stones.png
mycpname traffic_mirror poi_colored_traffic_mirror.png

mygroup fuel transport_fuel.png
mygroup filling_station transport_fuel.png
mycp amenity charging_station transport_charging_station.png
mycp amenity fuel_lpg transport_fuel_lpg.png
mycp amenity fuel transport_fuel.png
mycpname aeroway_fuel transport_aeroway_fuel.png
mycpname turning_circle transport_turning_circle.png
mycpname waterway_fuel transport_waterway_fuel.png

mygroup parking transport_parking.png
mycp amenity parking transport_parking.png
mycp amenity parking_private transport_parking_private2.png
mycp amenity parking_paid transport_parking_car_paid.png
mycpname parking_multi_storey transport_parking_multi-storey.png
mycp amenity parking_multi_storey_paid transport_parking_multi-storey_paid.png
mycpname parking_underground transport_parking_underground.png
mycp amenity parking_underground_paid transport_parking_underground_paid.png
mycpname bicycle_parking transport_parking_bicycle.png
mycpname bicycle_parking_stands transport_bicycle_parking_stands.png
mycpname bicycle_parking_wall_loops transport_bicycle_parking_wall_loops.png
mycpname bicycle_parking_rack transport_bicycle_parking_rack.png
mycpname bicycle_parking_anchors transport_bicycle_parking_anchors.png
mycpname bicycle_parking_building transport_bicycle_parking_building.png
mycpname bicycle_parking_shed transport_bicycle_parking_building.png
mycpname bicycle_parking_bollard transport_bicycle_parking_bollard.png
mycpname bicycle_parking_informal transport_bicycle_parking_informal.png
mycpname bicycle_parking_lockers transport_bicycle_parking_lockers.png
mycpname bicycle_parking_tree transport_bicycle_parking_tree.png
mycpname bicycle_parking_streetpod transport_bicycle_parking_streetpod.png
mycp amenity motorcycle_parking transport_parking_motorcycle.png
mycp amenity motorcycle_parking_paid transport_parking_motorcycle_paid.png

mygroup public_transport transport_bus_stop.png
mycp amenity bus_station transport_bus_station2.png
mycpname public_transport_station transport_bus_station.png
mycpname public_transport_stop_position transport_bus_stop2.png
mycp highway bus_stop transport_bus_stop.png
mycpname topo_bus_stop topo_topo_bus_stop.png
mycp highway bus_stop_small functional-icons_bus_stop_small.png
mycpname topo_bus_stop_small topo_topo_bus_stop_small.png
mycp highway bus_stop_round_small functional-icons_bus_stop_round_small.png
mycp highway bus_stop_round_big functional-icons_bus_stop_round_big.png
mycp highway bus_stop_round_small_night functional-icons_bus_stop_round_small_night.png
mycp highway bus_stop_round_big_night functional-icons_bus_stop_round_big_night.png
mycpname bus_station_small functional-icons_bus_station_small.png
mycp public_transport platform transport_bus_stop.png
mycp amenity ferry_terminal transport_ferry_terminal.png
mycpname ferry_terminal_small functional-icons_ferry_terminal_small.png
mycp amenity taxi transport_taxi_rank.png
mycp highway services transport_services.png
mycp mountain pass poi_mountain_pass.png

mycp amenity bicycle_rental transport_rental_bicycle.png
mycp amenity boat_sharing transport_boat_sharing.png
mycp amenity car_rental transport_rental_car.png
mycp amenity car_sharing transport_car_share.png
mycp amenity ski_rental transport_ski_rental.png

mycp leisure marina transport_marina.png
mycp leisure marina_private transport_marina_private.png
mycp leisure slipway transport_slipway.png
mycp man_made lighthouse transport_lighthouse.png
mycp waterway lock_gate_small functional-icons_lock_gate.png  #scale 0.5
mycpname lock_gate poi_colored_lock_gate.png  #scale 0.25
mycp waterway dock transport_dock.png

mycpname halt_small functional-icons_halt_small.png  #scale 0.25
mycpname halt_small_2 functional-icons_halt_small_2.png  #scale 0.25
mycpname topo_railway_halt_small functional-icons_topo_railway_halt_small.png
mycpname halt transport_halt.png  #scale 0.25
mycpname level_crossing_map functional-icons_level_crossing.png  #scale 0.5
mycpname level_crossing poi_colored_level_crossing.png  #scale 0.5
mycpname railway_yard transport_railway_yard.png  #scale 0.25
mycp railway platform transport_train_station2.png
mycp railway station_disused functional-icons_train_station_disused.png
mycp railway station_small_disused functional-icons_railway_station_small_disused.png
mycp railway station_small functional-icons_railway_station_small.png  #scale 0.375
mycpname topo_railway_station_small functional-icons_topo_railway_station_small.png
mycp railway station_subway_map transport_station_subway.png
mycp railway station_subway_small functional-icons_railway_station_subway_small.png  #scale 0.375
mycp railway station transport_train_station.png
mycp railway tram_stop_round_big functional-icons_blue_stop_round_big.png
mycp railway tram_stop_round_big_night functional-icons_blue_stop_round_big_night.png
mycp railway tram_stop_round_small functional-icons_blue_stop_round_small.png
mycp railway tram_stop_round_small_night functional-icons_blue_stop_round_small_night.png
mycp railway tram_stop transport_tram_stop.png
mycpname tram_stop_small functional-icons_tram_stop_small.png
mycpname subway_station transport_subway_station.png
mycpname funicular transport_funicular.png
mycpname escape_lane transport_escape_lane.png

mycpname subway_entrance_map subway_subway_entrance_map.png
mycpname subway_entrance poi_colored_subway_entrance.png
mycpname subway_entrance transport_subway_entrance.png
mycp railway subway_entrance_red functional-icons_subway_entrance_red.png
mycp railway subway_entrance_brown functional-icons_subway_entrance_brown.png
mycp railway subway_entrance_orange functional-icons_subway_entrance_orange.png
mycp railway subway_entrance_darkyellow functional-icons_subway_entrance_darkyellow.png
mycp railway subway_entrance_yellow functional-icons_subway_entrance_yellow.png
mycp railway subway_entrance_lightgreen functional-icons_subway_entrance_lightgreen.png
mycp railway subway_entrance_green functional-icons_subway_entrance_green.png
mycp railway subway_entrance_lightblue functional-icons_subway_entrance_lightblue.png
mycp railway subway_entrance_blue functional-icons_subway_entrance_blue.png
mycp railway subway_entrance_purple functional-icons_subway_entrance_purple.png
mycp railway subway_entrance_gray functional-icons_subway_entrance_gray.png
mycp railway subway_entrance_black functional-icons_subway_entrance_black.png

mycp railway subway_station_small_default functional-icons_subway_station_small_default.png
mycp railway subway_station_small_default2 functional-icons_subway_station_small_default2.png
mycp railway subway_station_small_red functional-icons_subway_station_small_red.png
mycp railway subway_station_small_brown functional-icons_subway_station_small_brown.png
mycp railway subway_station_small_orange functional-icons_subway_station_small_orange.png
mycp railway subway_station_small_orange2 functional-icons_subway_station_small_orange2.png
mycp railway subway_station_small_darkyellow functional-icons_subway_station_small_darkyellow.png
mycp railway subway_station_small_darkyellow2 functional-icons_subway_station_small_darkyellow2.png
mycp railway subway_station_small_yellow functional-icons_subway_station_small_yellow.png
mycp railway subway_station_small_yellow2 functional-icons_subway_station_small_yellow2.png
mycp railway subway_station_small_lightgreen functional-icons_subway_station_small_lightgreen.png
mycp railway subway_station_small_lightgreen2 functional-icons_subway_station_small_lightgreen2.png
mycp railway subway_station_small_green functional-icons_subway_station_small_green.png
mycp railway subway_station_small_green2 functional-icons_subway_station_small_green2.png
mycp railway subway_station_small_lightblue functional-icons_subway_station_small_lightblue.png
mycp railway subway_station_small_lightblue2 functional-icons_subway_station_small_lightblue2.png
mycp railway subway_station_small_blue functional-icons_subway_station_small_blue.png
mycp railway subway_station_small_blue2 functional-icons_subway_station_small_blue2.png
mycp railway subway_station_small_purple functional-icons_subway_station_small_purple.png
mycp railway subway_station_small_purple2 functional-icons_subway_station_small_purple2.png
mycp railway subway_station_small_gray functional-icons_subway_station_small_gray.png
mycp railway subway_station_small_gray2 functional-icons_subway_station_small_gray2.png
mycp railway subway_station_small_black functional-icons_subway_station_small_black.png
mycp railway subway_station_small_black2 functional-icons_subway_station_small_black2.png
mycp railway subway_station_small_white functional-icons_subway_station_small_white.png

mycpname subway_moscow subway_subway_moscow.png
mycpname subway_samara subway_subway_samara.png
mycpname subway_budapest subway_subway_budapest.png
mycpname subway_spb subway_subway_spb.png
mycpname subway_kazan subway_subway_kazan.png
mycpname subway_baku subway_subway_baku.png
mycpname subway_tbilisi subway_subway_tbilisi.png
mycpname subway_yerevan subway_subway_yerevan.png
mycpname subway_minsk subway_subway_minsk.png
mycpname subway_nnovgorod subway_subway_nnovgorod.png
mycpname subway_novosibirsk subway_subway_novosibirsk.png
mycpname subway_yekaterinburg subway_subway_yekaterinburg.png
mycpname subway_germany subway_subway_germany.png
mycpname subway_wien subway_subway_wien.png
mycpname subway_madrid subway_subway_madrid.png
mycpname subway_paris subway_subway_paris.png
mycpname subway_london subway_subway_london.png
mycpname subway_barcelona subway_subway_barcelona.png
mycpname subway_stockholm subway_subway_stockholm.png
mycpname subway_praha subway_subway_praha.png
mycpname subway_athens subway_subway_athens.png
mycpname subway_italy subway_subway_italy.png
mycpname subway_italy_catania subway_subway_italy_catania.png
#mycpname subway_italy_brescia subway_subway_italy_brescia.png
mycpname subway_rotterdam subway_subway_rotterdam.png
mycpname subway_amsterdam subway_subway_amsterdam.png
mycpname subway_brussels subway_subway_brussels.png
mycpname subway_lyon subway_subway_lyon.png
mycpname subway_chicago subway_subway_chicago.png
mycpname subway_newyork subway_subway_newyork.png
mycpname subway_tokyo subway_subway_tokyo.png
mycpname subway_osaka subway_subway_osaka.png
mycpname subway_nagoya subway_subway_nagoya.png
mycpname subway_singapore subway_subway_singapore.png
mycpname subway_kolkata subway_subway_kolkata.png
mycpname subway_delhi subway_subway_delhi.png
mycpname subway_tehran subway_subway_tehran.png
mycpname subway_cairo subway_subway_cairo.png
mycpname subway_riodejaneiro subway_subway_riodejaneiro.png
mycpname subway_tashkent subway_subway_tashkent.png
mycpname subway_almaty subway_subway_almaty.png
mycpname subway_manila subway_subway_manila.png
mycpname subway_toronto subway_subway_toronto.png
mycpname subway_montreal subway_subway_montreal.png
mycpname subway_kyiv subway_subway_kyiv.png
mycpname subway_kharkiv subway_subway_kharkiv.png
mycpname subway_buenosaires subway_subway_buenosaires.png
mycpname subway_boston subway_subway_boston.png
mycpname subway_washington subway_subway_washington.png
mycpname subway_bucharest subway_subway_bucharest.png
mycpname subway_losangeles subway_subway_losangeles.png
mycpname subway_sofia subway_subway_sofia.png
mycpname subway_taipei subway_subway_taipei.png
mycpname subway_santiago subway_subway_santiago.png
mycpname subway_valparaiso subway_subway_valparaiso.png
mycpname subway_seoul subway_subway_seoul.png
mycpname subway_philadelphia subway_subway_philadelphia.png
mycpname subway_philadelphia_patco subway_subway_philadelphia_patco.png
mycpname subway_istanbul subway_subway_istanbul.png
mycpname subway_san_francisco subway_subway_san_francisco.png
mycpname subway_atlanta subway_subway_atlanta.png
mycpname subway_baltimore subway_subway_baltimore.png
mycpname subway_cleveland subway_subway_cleveland.png
mycpname subway_miami subway_subway_miami.png
mycpname subway_newyork_path subway_subway_newyork_path.png
mycpname subway_puerto_rico subway_subway_puerto_rico.png
mycpname subway_mexico subway_subway_mexico.png
mycpname subway_sanpaulo subway_subway_sanpaulo.png
mycpname subway_caracas subway_subway_caracas.png
mycpname subway_yokohama subway_subway_yokohama.png
mycpname subway_yokohama_minatomirai subway_subway_yokohama_minatomirai.png
mycpname subway_sapporo subway_subway_sapporo.png
mycpname subway_medellin subway_subway_medellin.png
mycpname subway_monterrey subway_subway_monterrey.png
mycpname subway_warsaw subway_subway_warsaw.png
mycpname subway_lisbon subway_subway_lisbon.png
mycpname subway_fukuoka subway_subway_fukuoka.png
mycpname subway_suzhou subway_subway_suzhou.png
mycpname subway_shanghai subway_subway_shanghai.png
mycpname subway_guangzhou subway_subway_guangzhou.png

mycp aerialway station_small functional-icons_aerialway_station_small.png  #scale 0.25
mycp aerialway station transport_aerialway_station.png  #scale 0.375
mycpname aerialway_cable_car transport_aerialway_cable_car.png
mycpname aerialway_chair_lift transport_aerialway_chair_lift.png
mycpname aerialway_pylon transport_aerialway_pylon.png
mycpname aerialway_pylon_small functional-icons_aerialway_pylon_small.png
mycpname aerialway_drag_lift transport_aerialway_drag_lift.png
mycpname aerialway_platter transport_aerialway_platter.png
mycpname aerialway_j_bar transport_aerialway_j_bar.png
mycpname aerialway_t_bar transport_aerialway_t_bar.png
mycpname aerialway_goods transport_aerialway_goods.png
mycpname aerialway_magic_carpet transport_aerialway_magic_carpet.png
mycpname aerialway_gondola transport_aerialway_gondola.png
mycpname aerialway_rope_tow transport_aerialway_rope_tow.png

mycp aeroway aerodrome_abandoned functional-icons_aerodrome_abandoned.png
mycpname topo_aerodrome_abandoned topo_topo_aerodrome_abandoned.png
mycp aeroway aerodrome transport_aerodrome.png
mycpname aeroway_aerodrome_small transport_colored_aerodrome.png
mycpname topo_aerodrome topo_topo_aerodrome.png
mycp aeroway airport transport_airport.png
mycp aeroway gate transport_colored_airport_gate.png
mycp aeroway helipad transport_helicopter_pad.png
mycpname aeroway_terminal transport_airport_terminal.png


## Barrier
mygroup barrier barrier_bollard.png
mycp barrier block barrier_blocks.png
mycp barrier bollard barrier_bollard.png
mycp barrier border_control barrier_border_control.png
mycp barrier bump_gate barrier_bump_gate.png
mycp barrier bus_trap barrier_bus_trap.png
mycp barrier cattle_grid barrier_cattle_grid2.png
mycp barrier chain barrier_chain.png
mycp barrier cycle_barrier barrier_cycle_barrier2.png
mycp barrier entrance barrier_entrance.png
mycp barrier gate barrier_gate.png
mycp barrier height_restrictor barrier_height_restrictor.png
mycp barrier kissing_gate barrier_kissing_gate.png
mycp barrier lift_gate barrier_lift_gate.png
mycp barrier motorcycle_barrier barrier_cycle_barrier.png
mycp barrier sally_port barrier_sally_port.png
mycp barrier stile barrier_stile.png
mycp barrier swing_gate barrier_swing_gate.png
mycpname toll_booth barrier_toll_booth.png
mycpname military_checkpoint barrier_military_checkpoint.png
mycp barrier turnstile barrier_turnstile.png
mycp entrance yes barrier_entrance2.png
mycpname entrance_exit_map functional-icons_entrance_exit.png
mycpname entrance_main_map functional-icons_entrance3.png
mycpname entrance_service functional-icons_entrance_service.png
mycpname entrance_exit poi_colored_entrance_exit.png
mycpname entrance_main barrier_entrance2.png
mycp amenity parking_entrance transport_parking_entrance.png
mycp building entrance barrier_entrance.png
mycpname barrier_debris barrier_debris.png
mycpname barrier_horse_stile barrier_horse_stile.png
mycpname barrier_jersey_barrier barrier_jersey_barrier.png
mycpname barrier_log barrier_log.png


## Accommodation
mygroup accomodation accommodation_hotel.png
mycp amenity shelter accommodation_shelter2.png
mycpname topo_shelter topo_topo_shelter.png
mycp tourism alpine_hut accommodation_alpinehut.png
mycpname topo_alpine_hut topo_topo_alpine_hut.png
mycpname cabin accommodation_cabin.png
mycpname topo_cabin topo_topo_cabin.png
mycpname lean_to accommodation_lean_to.png
mycpname topo_lean_to topo_topo_lean_to.png
mycp tourism apartment accommodation_apartment.png
mycpname topo_apartment topo_topo_apartment.png
mycp tourism camp_site accommodation_camping.png
mycpname topo_camp_site topo_topo_camp_site.png
mycp tourism caravan_site accommodation_caravan_park.png
mycpname topo_caravan_site topo_topo_caravan_site.png
mycp tourism chalet accommodation_chalet.png
mycpname topo_chalet topo_topo_chalet.png
mycp tourism guest_house accommodation_bed_and_breakfast.png
mycpname topo_guest_house topo_topo_guest_house.png
mycp tourism hostel accommodation_hostel.png
mycpname topo_hostel topo_topo_hostel.png
mycp tourism hotel accommodation_hotel.png
mycpname topo_hotel topo_topo_hotel.png
mycp tourism motel accommodation_motel.png
mycpname topo_motel topo_topo_motel.png
mycpname wilderness_hut accommodation_wilderness_hut.png
mycpname topo_wilderness_hut topo_topo_wilderness_hut.png
mycpname summer_camp accommodation_summer_camp.png


## Tourism
mygroup sightseeing tourist_castle2.png
mygroup tourism tourist_museum.png
mygroup for_tourists tourist_view_point.png
mygroup attraction tourist_attraction.png
mycp attraction amusement_ride tourist_amusement_ride.png
mycp attraction animal tourist_animal.png
mycp attraction big_wheel tourist_big_wheel.png
mycp attraction carousel tourist_carousel.png
mycp attraction maze tourist_maze.png
mycp attraction roller_coaster tourist_roller_coaster.png
mycp attraction slide tourist_slide.png
mycp attraction summer_toboggan tourist_summer_toboggan.png
mycp attraction swing_carousel tourist_swing_carousel.png
mycp attraction train tourist_train.png
mycp attraction water_slide entertainment_water_slide.png
mycp tourism aquarium tourist_aquarium.png
mycp tourism artwork tourist_artwork.png
mycp tourism attraction tourist_attraction.png
mycp tourism information tourist_colored_information.png
mycpname information_office tourist_colored_information_office.png
mycpname information_board tourist_colored_information_board.png
mycpname information_guidepost tourist_colored_information_guidepost.png
mycpname information_map tourist_colored_information_map.png
mycpname information_terminal tourist_colored_information_terminal.png
mycpname information_audioguide tourist_colored_information_audioguide.png
mycp tourism museum tourist_museum.png
mycp tourism picnic_site tourist_colored_picnic.png
mycpname picnic_table tourist_colored_picnic_table.png
mycp tourism theme_park tourist_theme_park.png
mycp tourism viewpoint tourist_view_point.png
mycp tourism zoo tourist_zoo.png
mycpname city_wall tourist_city_wall.png
mycpname clock tourist_clock.png
mycpname route_hiking_iwn_poi tourist_route_hiking_iwn_poi.png
mycpname route_hiking_nwn_poi tourist_route_hiking_nwn_poi.png
mycpname route_hiking_rwn_poi tourist_route_hiking_rwn_poi.png
mycpname route_hiking_lwn_poi tourist_route_hiking_lwn_poi.png
mycpname icn_ref tourist_icn_ref.png
mycpname ncn_ref tourist_ncn_ref.png
mycpname rcn_ref tourist_rcn_ref.png
mycpname lcn_ref tourist_lcn_ref.png
mycpname iwn_ref tourist_iwn_ref.png
mycpname nwn_ref tourist_nwn_ref.png
mycpname rwn_ref tourist_rwn_ref.png
mycpname lwn_ref tourist_lwn_ref.png
mycpname gallery tourist_gallery.png
mycpname firepit tourist_firepit.png

## Entertainment
mygroup entertainment tourist_cinema3.png
mygroup club tourist_night_club.png
mycp amenity arts_centre tourist_art_gallery.png
mycp amenity casino tourist_casino.png
mycp amenity cinema tourist_cinema3.png
mycp amenity nightclub tourist_night_club.png
mycp amenity stripclub amenity_stripclub.png
mycp amenity theatre tourist_theatre.png
mycpname hackerspace entertainment_hackerspace.png
mycpname leisure_common entertainment_leisure_common.png
mycpname love_hotel entertainment_love_hotel.png
mycpname gambling entertainment_gambling.png


## Historic
mygroup historic tourist_archaeological2.png
mycp historic archaeological_site tourist_archaeological2.png
mycp historic battlefield tourist_battlefield.png
mycp historic boundary_stone tourist_boundary_stone.png
mycp historic cannon tourist_colored_cannon.png
mycp historic castle tourist_castle2.png
mycpname city_gate barrier_sally_port.png
mycp historic memorial tourist_memorial.png
mycpname topo_memorial topo_topo_memorial.png
mycp historic mine tourist_mine_abandoned.png
mycpname monument tourist_monument2.png
mycpname topo_monument topo_topo_monument.png
mycp historic ruins tourist_ruin.png
mycpname topo_ruins topo_topo_ruins.png
mycp historic rune_stone tourist_colored_rune_stone.png
mycp historic ship tourist_ship.png
mycp historic wayside_cross tourist_wayside_cross.png
mycp historic wayside_shrine tourist_wayside_shrine.png
mycpname wreck tourist_wreck.png
mycpname palaeontological_site tourist_palaeontological_site.png
mycp building pyramid tourist_pyramid.png
mycpname tomb tourist_tomb.png
mycpname historic_aircraft tourist_historic_aircraft.png
mycpname technical_monument tourist_technical_monument.png
mycpname memorial_stolperstein tourist_memorial_stolperstein.png
mycpname memorial_bust tourist_bust.png
mycpname memorial_obelisk tourist_obelisk.png
mycpname memorial_plaque tourist_plaque.png
mycpname memorial_statue tourist_statue.png
mycpname memorial_stele tourist_stele.png
mycpname memorial_war tourist_war_memorial.png
mycpname historic_manor tourist_historic_manor.png
mycpname historic_stone tourist_historic_stone.png
mycpname prison_camp tourist_prison_camp.png
mycpname locomotive tourist_locomotive.png

## Special POI icons
mycp special_poi big_ben special_poi_big_ben.png
mycp special_poi brandenburg_gate special_poi_brandenburg_gate.png
mycp special_poi chichen_itza special_poi_chichen_itza.png
mycp special_poi colosseum special_poi_colosseum.png
mycp special_poi eiffel_tower special_poi_eiffel_tower.png
mycp special_poi sagrada_familia special_poi_sagrada_familia.png
mycp special_poi statue_of_liberty special_poi_statue_of_liberty.png
mycp special_poi taj_mahal special_poi_taj_mahal.png
mycp special_poi us_capitol special_poi_us_capitol.png

## Sport
mygroup sport sport_swimming_outdoor.png
mycp leisure stadium sport_stadium.png
mycp sport 10pin sport_bowling.png
mycp sport 9pin sport_bowling.png
mycp sport archery sport_archery.png
mycp sport athletics sport_athletics.png
mycp sport baseball sport_baseball2.png
mycp sport base sport_basejumping.png
mycp sport basketball sport_basketball.png
mycp sport billiard sport_snooker.png
mycp sport bmx sport_bmx.png
mycp sport canoe sport_canoe.png
mycp sport climbing sport_hillclimbing.png
mycp sport cricket sport_cricket.png
mycp sport cycling sport_cycling.png
mycp sport diving sport_diving.png
mycp sport golf sport_golf.png
mycp sport gymnastics sport_gymnasium.png
mycp sport handball sport_handball.png
mycpname ice_hockey sport_ice_hockey.png
mycpname field_hockey sport_field_hockey.png
mycpname equestrian sport_horse_racing.png
mycp sport motor sport_motorracing.png
mycpname sport_free_flying sport_free_flying.png
mycp sport rugby_league sport_rugby_league.png
mycp sport rugby_union sport_rugby_union.png
mycp sport sailing sport_sailing.png
mycp sport scuba_diving sport_scuba_diving.png  #derived from NPS public library
mycp sport shooting sport_shooting.png
mycp sport skateboard sport_skateboard.png
mycp sport skiing sport_skiing_downhill.png
mycp sport soccer sport_soccer.png
mycp sport stadium sport_stadium.png
mycp sport surfing sport_surfing.png
mycp sport swimming sport_swimming_outdoor.png
mycp sport table_tennis sport_table_tennis.png
mycp sport tennis sport_tennis.png
mycp sport volleyball sport_volleyball.png
mycpname beachvolleyball sport_beachvolleyball.png
mycpname pitch sport_pitch.png
mycpname swimming_pool sport_swimming_outdoor.png
mycpname leisure_track sport_leisure_track.png
mycpname ice_skating sport_iceskating.png
mycpname orienteering sport_orienteering.png
mycpname golf_course sport_golf.png
mycpname horse_riding sport_horse_riding.png
mycpname model_aerodrome sport_model_aerodrome.png
mycpname american_football sport_american_football.png
mycpname raceway sport_raceway.png
mycpname fitness_centre sport_fitness_centre.png
mycpname billiards sport_billiards.png
mycpname chess sport_chess.png
mycpname gaelic_games sport_gaelic_games.png
mycpname running sport_running.png
mycpname karting sport_karting.png
mycpname badminton sport_badminton.png
mycpname ice_stock sport_ice_stock.png
mycpname korfball sport_korfball.png
mycpname judo sport_judo.png
mycpname rc_car sport_rc_car.png
mycpname bandy sport_bandy.png
mycpname sport_multi sport_multi.png


## Leisure
mygroup leisure sport_playground.png
mycp leisure beach_resort tourist_beach_resort.png
mycp leisure bird_hide entertainment_bird_hide.png
mycp leisure fishing sport_fishing.png  #used shop=fish turned by 45 degrees for now
mycp leisure ice_rink sport_iceskating.png
mycp leisure miniature_golf sport_miniature_golf.png
mycp leisure playground sport_colored_playground.png
mycp leisure sports_centre sport_leisure_centre2.png
mycp leisure water_park entertainment_water_slide.png
mycp amenity sauna sport_sauna.png
mycpname fitness_station sport_fitness_station.png
mycpname tanning_salon sport_tanning_salon.png

mygroup geocache poi_colored_point_of_interest.png
mycp geocache not_found poi_colored_point_of_interest.png
mycp geocache found poi_colored_point_of_interest.png


## Other amenities
mygroup other amenity_post_office.png
mygroup place_of_worship place_of_worship_unknown.png
mygroup internet_access amenity_internet_access.png
mycp amenity car_wash amenity_car_wash.png
mycpname car_wash_self_service amenity_car_wash_self_service.png
mycpname vehicle_inspection amenity_vehicle_inspection.png
mycp amenity fountain water_colored_fountain2.png
mycp amenity fountain_night functional-icons_fountain2_night.png
mycp amenity monastery place_of_worship_monastery.png
mycpname historic_monastery place_of_worship_monastery.png
mycp amenity place_of_worship place_of_worship_unknown.png
mycpname topo_religion_unknown topo_topo_religion_unknown.png
mycp amenity post_box amenity_post_box.png
mycp amenity post_office amenity_post_office2.png
mycp amenity prison amenity_prison.png
mycp amenity recycling amenity_colored_recycling.png
mycp amenity telephone amenity_telephone.png
mycp amenity toilets amenity_toilets.png
mycp amenity vehicle_ramp amenity_vehicle_ramp.png
mycpname service_tyres shopping_service_tyres.png
mycp religion christian place_of_worship_christian3.png
mycpname topo_christian topo_topo_christian.png
mycp religion jewish place_of_worship_jewish3.png
mycpname topo_jewish topo_topo_jewish.png
mycp religion muslim place_of_worship_islamic3.png
mycpname topo_muslim topo_topo_muslim.png
mycp religion sikh place_of_worship_sikh3.png
mycp religion buddhist place_of_worship_buddhist3.png
mycpname topo_buddhist topo_topo_buddhist.png
mycp religion hindu place_of_worship_hindu3.png
mycpname topo_hindu topo_topo_hindu.png
mycp religion shinto place_of_worship_shinto3.png
mycp religion taoist place_of_worship_taoist.png
mycpname brothel amenity_brothel.png
mycpname smoking_area amenity_smoking_area.png
mycpname studio amenity_studio.png
mycpname waste_basket amenity_waste_bin.png
mycpname waste_basket2 amenity_colored_waste_basket.png
mycpname waste_disposal amenity_colored_waste_disposal.png
mycpname shower amenity_shower.png
mycpname bench amenity_colored_bench.png
mycpname dry_cleaning amenity_dry_cleaning.png
mycpname massage amenity_massage.png
mycpname funeral_directors amenity_funeral_directors.png
mycpname internet_access_wlan amenity_internet_access_wlan.png
mycpname internet_access_wired amenity_internet_access_wired.png
#! mycp amenity grave_yard place_of_worship_christian3.png  #already defined as icon in the shader section
mycpname watering_place amenity_watering_place.png
mycpname animal_shelter amenity_animal_shelter.png
mycpname animal_boarding amenity_animal_boarding.png
mycpname baby_hatch amenity_baby_hatch.png
mycpname boat_storage amenity_boat_storage.png
mycpname crematorium amenity_crematorium.png
mycpname mortuary amenity_mortuary.png
mycpname internet_access_yes amenity_internet_access_wlan.png
mycpname customs amenity_customs.png
mycpname dojo amenity_dojo.png
mycpname social_centre amenity_social_centre.png
mycpname compressed_air amenity_compressed_air.png
mycpname amenity_vacuum_cleaner amenity_vacuum_cleaner.png
mycpname bicycle_repair_station amenity_bicycle_repair_station.png
mycpname water_tap amenity_water_tap.png
mycpname recycling_centre amenity_recycling_centre.png
mycpname recycling_container amenity_colored_recycling_container.png
mycpname barbecue amenity_barbecue.png
mycpname public_bookcase amenity_public_bookcase.png
mycpname internet_cafe amenity_internet_cafe.png
mycpname feeding_place amenity_colored_feeding_place.png
mycpname animal_keeping amenity_animal_keeping.png
mycpname coworking_space amenity_coworking.png

mygroup craft craft_tailor.png
mycpname craft_beekeeper craft_beekeeper.png
mycpname craft_blacksmith craft_blacksmith.png
mycpname craft_brewery craft_brewery.png
mycpname craft_locksmith craft_locksmith.png
mycpname craft_painter craft_painter.png
mycpname craft_tailor craft_tailor.png
mycpname craft_shoemaker craft_shoemaker.png
mycpname craft_jeweller craft_jeweller.png
mycpname craft_agricultural_engines craft_agricultural_engines.png
mycpname craft_boatbuilder craft_boatbuilder.png
mycpname craft_electrician craft_electrician.png
mycpname craft_handicraft craft_handicraft.png
mycpname craft_hvac craft_hvac.png
mycpname craft_insulation craft_insulation.png
mycpname craft_photographic_laboratory craft_photographic_laboratory.png
mycpname craft_clockmaker craft_clockmaker.png
mycpname craft_key_cutter craft_key_cutter.png
mycpname craft_plasterer craft_plasterer.png
mycpname craft_plumber craft_plumber.png
mycpname craft_roofer craft_roofer.png
mycpname craft_stonemason craft_stonemason.png
mycpname craft_carpenter craft_carpenter.png
mycpname craft_sawmill craft_sawmill.png
mycpname craft_pottery craft_pottery.png
mycpname craft_winery craft_winery.png
mycpname craft_metal_construction craft_metal_construction.png
mycpname craft_window_construction craft_window_construction.png

mygroup finance money_bank2.png
mycp amenity atm money_atm.png
mycpname payment_terminal money_payment_terminal.png
mycp amenity bank money_bank2.png
mycp amenity bureau_de_change money_currency_exchange.png
mycp bitcoin yes money_bitcoin.png

mygroup office amenity_public_building2.png
mycp amenity community_centre amenity_public_building.png
mycp amenity courthouse amenity_court.png
mycp amenity embassy amenity_embassy.png
mycp amenity library amenity_library.png
mycp amenity public_building amenity_public_building.png
mycp amenity social_centre amenity_public_building.png
mycp amenity townhall amenity_town_hall2.png
mycpname register_office amenity_register_office.png

mygroup service amenity_service.png
mygroup landuse landuse_landuse.png

## Education
mygroup education education_university.png
mycp amenity college education_college.png
mycpname kindergarten education_kindergarten.png
mycp amenity school education_school.png
mycp amenity university education_university.png
mycpname driving_school education_driving_school.png
mycpname training education_training.png
mycpname training_yoga education_training_yoga.png


## Man made
mygroup man_made power_generator_wind2.png
mygroup transport_construction poi_colored_bridge.png
mygroup water_supply poi_colored_water_tower.png
mygroup power power_generator.png
mygroup communication amenity_telephone.png
mygroup trash_disposal amenity_waste_disposal.png
mycpname bridge poi_colored_bridge.png
mycpname tunnel poi_colored_tunnel.png
mycp amenity hunting_stand poi_colored_hunting_stand.png
mycp highway street_lamp functional-icons_street_lamp.png
mycp highway street_lamp_lit functional-icons_street_lamp_lit.png
mycp man_made adit poi_adit.png
mycp man_made antenna poi_colored_antenna.png
mycp man_made chimney poi_colored_chimney.png
mycpname topo_chimney topo_big_topo_chimney.png
mycpname crane poi_colored_crane.png
mycp man_made mast poi_colored_mast.png
mycpname topo_mast topo_big_topo_mast.png
mycp man_made mineshaft poi_colored_mine.png
mycpname topo_mine topo_topo_mine.png
mycpname topo_mine_abandoned topo_topo_mine_abandoned.png
mycpname radar poi_colored_monitoring_station_radar.png
mycpname astronomical_observatory poi_colored_observatory_astronomical.png
mycpname telescope poi_colored_telescope.png
mycp man_made observatory poi_colored_observatory.png
mycpname observation_tower poi_colored_observatory.png
mycp man_made petroleum_well poi_colored_petroleum_well.png
mycp man_made survey_point poi_colored_survey_point.png
mycpname topo_survey_point topo_topo_survey_point.png
mycp man_made tower poi_colored_tower.png
mycpname topo_tower topo_big_topo_tower.png
mycpname bell_tower poi_colored_tower_bell_tower.png
mycpname communication_tower poi_colored_tower_communications2.png
mycpname topo_communication_tower topo_big_topo_communication_tower.png
mycpname cooling_tower poi_colored_tower_cooling.png
mycpname lighting_tower poi_colored_tower_lighting.png
mycp man_made water_tower poi_colored_water_tower.png
mycp man_made windmill poi_colored_windmill.png
mycpname topo_windmill topo_big_topo_windmill.png
mycp no icon functional-icons_no_icon.png
mycpname generator_source_coal power_generator_coal.png
mycpname generator_source_gas power_generator_gas.png
mycpname generator_source_geothermal power_generator_geothermal.png
mycpname generator_source_nuclear power_generator_nuclear.png
mycpname generator_source_oil power_generator_oil.png
mycpname generator_source_diesel power_generator_diesel.png
mycpname generator_source_solar power_generator_solar.png
mycpname generator_source_hydro power_generator_water2.png
mycpname generator_source_wind power_generator_wind.png
mycpname power_generator power_generator.png
mycpname power_plant power_plant.png
mycp power substation power_transformer2.png
mycp power tower poi_colored_power_tower.png
mycp power tower_square functional-icons_power_tower.png
mycp power tower_small functional-icons_power_tower_small.png
mycp power tower_small2 functional-icons_power_tower_small2.png
mycpname power_generator power_generator.png
mycp railway buffer_stop poi_colored_buffer_stop.png
mycpname power_transformer power_transformer_small.png
mycpname topo_transformer topo_big_topo_transformer.png
mycpname works poi_colored_works.png
mycpname military_bunker poi_colored_military_bunker.png
mycpname abandoned_poi poi_colored_abandoned_poi.png
mycpname surveillance poi_colored_surveillance.png
mycpname pier poi_colored_pier.png
mycpname beacon poi_colored_beacon.png
mycpname breakwater poi_colored_breakwater.png
mycpname military_range poi_colored_military_range.png
mycpname power_cable_distribution_cabinet power_cable_distribution_cabinet.png
mycpname kiln poi_colored_kiln.png
mycpname cairn poi_colored_cairn.png
mycpname groyne poi_colored_groyne.png
mycpname military_naval_base poi_colored_military_naval_base.png
mycpname building_map functional-icons_building_map.png
mycpname square poi_colored_square.png
mycpname building poi_colored_building.png
mycpname cross poi_colored_cross.png
mycpname storage_tank poi_colored_storage_tank.png
mycpname wastewater_plant poi_colored_wastewater_plant.png
mycpname water_works poi_colored_water_works.png
mycpname watermill poi_watermill.png
mycpname topo_watermill topo_topo_watermill.png
mycpname monitoring_station poi_colored_monitoring_station.png
mycpname dolphin poi_colored_dolphin.png
mycpname street_cabinet poi_colored_street_cabinet.png
mycpname sanitary_dump_station poi_colored_sanitary_dump_station.png
mycpname spoil_heap poi_colored_spoil_heap.png
mycpname ventilation_shaft poi_colored_ventilation_shaft.png
mycpname pumping_station poi_colored_pumping_station.png
mycpname mdf poi_colored_mdf.png

mycpname topo_power_plant topo_topo_power_plant.png

mygroup military poi_colored_military_bunker.png


## Food and Drink
mygroup restaurants food_restaurant.png
mygroup sustenance food_fastfood.png
mygroup cafe_and_restaurant food_restaurant.png
mycp amenity bar food_bar.png
mycp amenity biergarten food_biergarten.png
mycp amenity cafe food_cafe.png
mycp amenity drinking_water food_drinkingtap.png
mycpname topo_drinking_water topo_topo_drinking_water.png
mycp amenity fast_food food_fastfood.png
mycp amenity food_court food_food_court.png
mycp amenity pub food_pub.png
mycp amenity restaurant food_restaurant.png
mycp man_made water_well food_water_well.png
mycpname topo_water_well topo_topo_water_well.png
mycpname water_point food_water_point.png

## Seamarks
mygroup seamark icons8_sail_boat.png
mycp seamark buoy_conical seamark_buoy_conical.png
mycp seamark buoy_barrel seamark_buoy_barrel.png
mycp seamark buoy_can seamark_buoy_can.png
mycp seamark buoy_spherical seamark_buoy_spherical.png

mycp seamark buoy_blackredblack_conical seamark_buoy_blackredblack_conical.png
mycp seamark buoy_blackredblack_pillar seamark_buoy_blackredblack_pillar.png
mycp seamark buoy_blackredblack_spar seamark_buoy_blackredblack_spar.png
mycp seamark buoy_blackredblack_spherical seamark_buoy_blackredblack_spherical.png

mycp seamark buoy_red_conical seamark_buoy_red_conical.png
mycp seamark buoy_red_barrel seamark_buoy_red_barrel.png
mycp seamark buoy_red_can seamark_buoy_red_can.png
mycp seamark buoy_red_pillar seamark_buoy_red_pillar.png
mycp seamark buoy_red_spar seamark_buoy_red_spar.png
mycp seamark buoy_red_spherical seamark_buoy_red_spherical.png
mycp seamark buoy_green_conical seamark_buoy_green_conical.png
mycp seamark buoy_green_barrel seamark_buoy_green_barrel.png
mycp seamark buoy_green_can seamark_buoy_green_can.png
mycp seamark buoy_green_pillar seamark_buoy_green_pillar.png
mycp seamark buoy_green_spar seamark_buoy_green_spar.png
mycp seamark buoy_green_spherical seamark_buoy_green_spherical.png
mycp seamark buoy_orange_spherical seamark_buoy_orange_spherical.png
mycp seamark buoy_yellow_conical seamark_buoy_yellow_conical.png
mycp seamark buoy_yellow_barrel seamark_buoy_yellow_barrel.png
mycp seamark buoy_yellow_can seamark_buoy_yellow_can.png
mycp seamark buoy_yellow_pillar seamark_buoy_yellow_pillar.png
mycp seamark buoy_yellow_spar seamark_buoy_yellow_spar.png
mycp seamark buoy_yellow_spherical seamark_buoy_yellow_spherical.png
mycp seamark buoy_yellow_super_buoy seamark_buoy_yellow_super_buoy.png
mycp seamark buoy_white_conical seamark_buoy_white_conical.png
mycp seamark buoy_white_barrel seamark_buoy_white_barrel.png
mycp seamark buoy_white_can seamark_buoy_white_can.png
mycp seamark buoy_white_pillar seamark_buoy_white_pillar.png
mycp seamark buoy_white_spar seamark_buoy_white_spar.png
mycp seamark buoy_white_spherical seamark_buoy_white_spherical.png
mycp seamark buoy_white_super_buoy seamark_buoy_white_super_buoy.png

mycp seamark buoy_whiteyellow_spherical_cross seamark_buoy_whiteyellow_spherical_cross.png

mycp seamark buoy_yellow_installation seamark_buoy_yellow_installation.png

mycp seamark buoy_redwhite_pillar_vertical seamark_buoy_redwhite_pillar_vertical.png
mycp seamark buoy_redwhite_spherical_vertical seamark_buoy_redwhite_spherical_vertical.png
mycp seamark buoy_redwhite_spar_vertical seamark_buoy_redwhite_spar_vertical.png
mycp seamark buoy_redwhite_spar_horizontal seamark_buoy_redwhite_spar_horizontal.png

mycp seamark buoy_blackyellowblack_can seamark_buoy_blackyellowblack_can.png
mycp seamark buoy_blackyellowblack_conical seamark_buoy_blackyellowblack_conical.png
mycp seamark buoy_blackyellowblack_pillar seamark_buoy_blackyellowblack_pillar.png
mycp seamark buoy_blackyellowblack_spar seamark_buoy_blackyellowblack_spar.png
mycp seamark buoy_blackyellow_can seamark_buoy_blackyellow_can.png
mycp seamark buoy_blackyellow_conical seamark_buoy_blackyellow_conical.png
mycp seamark buoy_blackyellow_pillar seamark_buoy_blackyellow_pillar.png
mycp seamark buoy_blackyellow_spar seamark_buoy_blackyellow_spar.png
mycp seamark buoy_yellowblack_can seamark_buoy_yellowblack_can.png
mycp seamark buoy_yellowblack_conical seamark_buoy_yellowblack_conical.png
mycp seamark buoy_yellowblack_pillar seamark_buoy_yellowblack_pillar.png
mycp seamark buoy_yellowblack_spar seamark_buoy_yellowblack_spar.png
mycp seamark buoy_yellowblackyellow_can seamark_buoy_yellowblackyellow_can.png
mycp seamark buoy_yellowblackyellow_conical seamark_buoy_yellowblackyellow_conical.png
mycp seamark buoy_yellowblackyellow_pillar seamark_buoy_yellowblackyellow_pillar.png
mycp seamark buoy_yellowblackyellow_spar seamark_buoy_yellowblackyellow_spar.png

mycp seamark buoy_redgreenred_pillar_horizontal seamark_buoy_redgreenred_pillar_horizontal.png
mycp seamark buoy_redgreenred_can_horizontal seamark_buoy_redgreenred_can_horizontal.png
mycp seamark buoy_redgreenred_spar_horizontal seamark_buoy_redgreenred_spar_horizontal.png
mycp seamark buoy_redgreenred_spherical_horizontal seamark_buoy_redgreenred_spherical_horizontal.png

mycp seamark buoy_redwhiteredwhite_spar_horizontal seamark_buoy_redwhiteredwhite_spar_horizontal.png
mycp seamark buoy_redwhiteredwhite_can_horizontal seamark_buoy_redwhiteredwhite_can_horizontal.png

mycp seamark buoy_whiteredwhitered_spar_horizontal seamark_buoy_whiteredwhitered_spar_horizontal.png
mycp seamark buoy_whitegreenwhitegreen_spar_horizontal seamark_buoy_whitegreenwhitegreen_spar_horizontal.png
mycp seamark buoy_greenwhite_spar_horizontal seamark_buoy_greenwhite_spar_horizontal.png

mycp seamark buoy_greenwhitegreenwhite_conical_horizontal seamark_buoy_greenwhitegreenwhite_conical_horizontal.png
mycp seamark buoy_greenwhitegreenwhite_spar_horizontal seamark_buoy_greenwhitegreenwhite_spar_horizontal.png

mycp seamark buoy_greenredgreen_conical_horizontal seamark_buoy_greenredgreen_conical_horizontal.png
mycp seamark buoy_greenredgreen_can_horizontal seamark_buoy_greenredgreen_can_horizontal.png
mycp seamark buoy_greenredgreen_pillar_horizontal seamark_buoy_greenredgreen_pillar_horizontal.png
mycp seamark buoy_greenredgreen_spar_horizontal seamark_buoy_greenredgreen_spar_horizontal.png
mycp seamark buoy_greenredgreen_spherical_horizontal seamark_buoy_greenredgreen_spherical_horizontal.png

mycp seamark beacon_pile seamark_beacon_pile.png
mycp seamark beacon_stake seamark_beacon_stake.png
mycp seamark beacon_tower seamark_beacon_tower.png
mycp seamark beacon_cairn seamark_beacon_cairn.png
mycp seamark beacon_pillar seamark_beacon_pillar.png
mycp seamark beacon_perch_port seamark_beacon_perch_port.png
mycp seamark beacon_perch_starboard seamark_beacon_perch_starboard.png

mycp seamark beacon_red_perch_port seamark_beacon_red_perch_port.png
mycp seamark beacon_green_perch_port seamark_beacon_green_perch_port.png
mycp seamark beacon_red_perch_starboard seamark_beacon_red_perch_starboard.png
mycp seamark beacon_green_perch_starboard seamark_beacon_green_perch_starboard.png

mycp seamark beacon_black_pillar seamark_beacon_black_pillar.png
mycp seamark beacon_green_pillar seamark_beacon_green_pillar.png
mycp seamark beacon_green_stake seamark_beacon_green_stake.png
mycp seamark beacon_green_tower seamark_beacon_green_tower.png
mycp seamark beacon_greenwhitegreenwhite_stake seamark_beacon_greenwhitegreenwhite_stake.png
mycp seamark beacon_greenwhitegreenwhite_tower seamark_beacon_greenwhitegreenwhite_tower.png
mycp seamark beacon_greenwhite_stake seamark_beacon_greenwhite_stake.png
mycp seamark beacon_greenwhite_tower seamark_beacon_greenwhite_tower.png
mycp seamark beacon_red_pillar seamark_beacon_red_pillar.png
mycp seamark beacon_red_stake seamark_beacon_red_stake.png
mycp seamark beacon_red_tower seamark_beacon_red_tower.png
mycp seamark beacon_redwhite_stake seamark_beacon_redwhite_stake.png
mycp seamark beacon_redwhite_tower seamark_beacon_redwhite_tower.png
mycp seamark beacon_whitegreen_stake seamark_beacon_whitegreen_stake.png
mycp seamark beacon_whitegreen_tower seamark_beacon_whitegreen_tower.png
mycp seamark beacon_whitegreenwhitegreen_tower seamark_beacon_whitegreenwhitegreen_tower.png
mycp seamark beacon_whitered_stake seamark_beacon_whitered_stake.png
mycp seamark beacon_whitered_tower seamark_beacon_whitered_tower.png

mycp seamark beacon_blackyellowblack_tower seamark_beacon_blackyellowblack_tower.png
mycp seamark beacon_yellowblackyellow_tower seamark_beacon_yellowblackyellow_tower.png
mycp seamark beacon_blackyellow_tower seamark_beacon_blackyellow_tower.png
mycp seamark beacon_yellowblack_tower seamark_beacon_yellowblack_tower.png
mycp seamark beacon_blackyellowblack_stake seamark_beacon_blackyellowblack_stake.png
mycp seamark beacon_yellowblackyellow_stake seamark_beacon_yellowblackyellow_stake.png
mycp seamark beacon_blackyellow_stake seamark_beacon_blackyellow_stake.png
mycp seamark beacon_yellowblack_stake seamark_beacon_yellowblack_stake.png

mycp seamark beacon_blackredblack_tower seamark_beacon_blackredblack_tower.png
mycp seamark beacon_blackredblack_stake seamark_beacon_blackredblack_stake.png
mycp seamark beacon_blackredblack_pile seamark_beacon_blackredblack_pile.png

mycp seamark beacon_yellow_tower seamark_beacon_yellow_tower.png
mycp seamark beacon_yellow_stake seamark_beacon_yellow_stake.png
mycp seamark beacon_yellow_pile seamark_beacon_yellow_pile.png

mycp seamark beacon_white_tower seamark_beacon_white_tower.png
mycp seamark beacon_white_stake seamark_beacon_white_stake.png
mycp seamark beacon_white_pile seamark_beacon_white_pile.png

mycp seamark beacon_black_tower seamark_beacon_black_tower.png

mycp seamark beacon_whiteredwhiteorange_pile seamark_beacon_whiteredwhiteorange_pile.png

mycp seamark beacon_redwhite_tower_vertical seamark_beacon_redwhite_tower_vertical.png
mycp seamark beacon_redwhite_pole_vertical seamark_beacon_redwhite_pole_vertical.png

mycp seamark light_float_red seamark_light_float_red.png
mycp seamark light_float_green seamark_light_float_green.png
mycp seamark light_float_redwhite_vertical seamark_light_float_redwhite_vertical.png

mycp seamark light_minor seamark_light_minor.png
mycp seamark light_major seamark_light_major.png
mycp seamark light_major_small seamark_light_major_small.png
mycp seamark light_vessel seamark_light_vessel.png

mycp seamark fog_signal seamark_fog_signal.png
mycp seamark radar_transponder seamark_radar_transponder.png
mycp seamark radio_station seamark_radio_station.png
mycp seamark platform seamark_platform.png
mycp seamark platform_small seamark_small_platform_small.png

mycp seamark landmark_tower seamark_big_landmark_tower.png
mycp seamark landmark_windmotor seamark_big_landmark_windmotor.png
mycp seamark landmark_mast seamark_big_landmark_mast.png
mycp seamark landmark_chimney seamark_big_landmark_chimney.png
mycp seamark landmark_monument seamark_big_landmark_monument.png
mycp seamark landmark_flagstaff seamark_big_landmark_flagstaff.png
mycp seamark landmark_water_tower seamark_big_landmark_water_tower.png
mycp seamark landmark_dish_aerial seamark_big_landmark_dish_aerial.png
mycp seamark landmark_windsock seamark_big_landmark_windsock.png
mycp seamark landmark_cemetery seamark_big_landmark_cemetery.png
mycp seamark landmark_cross seamark_big_landmark_cross.png
mycp seamark landmark_statue seamark_big_landmark_statue.png
mycp seamark landmark_minaret seamark_big_landmark_minaret.png
mycp seamark landmark_spire_big seamark_big_landmark_spire_big.png
mycp seamark landmark_dome_big seamark_big_landmark_dome_big.png
mycp seamark landmark_cairn seamark_big_landmark_cairn.png

mycp seamark landmark_communication_additional seamark_big_landmark_communication_additional.png
mycp seamark landmark_church seamark_big_landmark_church.png
mycp seamark landmark_tower_church_additional seamark_big_landmark_tower_church_additional.png
mycp seamark landmark_dome seamark_big_landmark_dome.png
mycp seamark landmark_mosque seamark_big_landmark_mosque.png
mycp seamark landmark_spire seamark_big_landmark_spire.png

mycp seamark harbour_default seamark_harbour_default.png
mycp seamark harbour_default_small seamark_harbour_default_small.png
mycp seamark harbour_marina seamark_harbour_marina.png
mycp seamark harbour_fishing seamark_harbour_fishing.png
mycp seamark harbour_container seamark_harbour_container.png
mycp seamark harbour_shipyard seamark_harbour_shipyard.png
mycp seamark harbour_ferry seamark_harbour_ferry.png

mycp seamark topmark_oblique_red_board seamark_topmark_oblique_red_board.png
mycp seamark topmark_oblique_red_conepointdown seamark_topmark_oblique_red_conepointdown.png
mycp seamark topmark_oblique_red_conepointup seamark_topmark_oblique_red_conepointup.png
mycp seamark topmark_oblique_red_cylinder seamark_topmark_oblique_red_cylinder.png
mycp seamark topmark_oblique_red_rhombus seamark_topmark_oblique_red_rhombus.png
mycp seamark topmark_oblique_red_sphere seamark_topmark_oblique_red_sphere.png
mycp seamark topmark_oblique_red_xshape seamark_topmark_oblique_red_xshape.png

mycp seamark topmark_oblique_green_board seamark_topmark_oblique_green_board.png
mycp seamark topmark_oblique_green_conepointdown seamark_topmark_oblique_green_conepointdown.png
mycp seamark topmark_oblique_green_conepointup seamark_topmark_oblique_green_conepointup.png
mycp seamark topmark_oblique_green_cylinder seamark_topmark_oblique_green_cylinder.png
mycp seamark topmark_oblique_green_sphere seamark_topmark_oblique_green_sphere.png
mycp seamark topmark_oblique_green_xshape seamark_topmark_oblique_green_xshape.png

mycp seamark topmark_oblique_black_conepointdown seamark_topmark_oblique_black_conepointdown.png
mycp seamark topmark_oblique_black_conepointup seamark_topmark_oblique_black_conepointup.png
mycp seamark topmark_oblique_black_cylinder seamark_topmark_oblique_black_cylinder.png
mycp seamark topmark_oblique_black_rhombus seamark_topmark_oblique_black_rhombus.png
mycp seamark topmark_oblique_black_sphere seamark_topmark_oblique_black_sphere.png
mycp seamark topmark_oblique_black_xshape seamark_topmark_oblique_black_xshape.png

mycp seamark topmark_oblique_yellow_conepointdown seamark_topmark_oblique_yellow_conepointdown.png
mycp seamark topmark_oblique_yellow_conepointup seamark_topmark_oblique_yellow_conepointup.png
mycp seamark topmark_oblique_yellow_cylinder seamark_topmark_oblique_yellow_cylinder.png
mycp seamark topmark_oblique_yellow_rhombus seamark_topmark_oblique_yellow_rhombus.png
mycp seamark topmark_oblique_yellow_sphere seamark_topmark_oblique_yellow_sphere.png
mycp seamark topmark_oblique_yellow_xshape seamark_topmark_oblique_yellow_xshape.png

mycp seamark topmark_oblique_redwhitered_board seamark_topmark_oblique_redwhitered_board.png
mycp seamark topmark_oblique_redwhitered_conepointdown seamark_topmark_oblique_redwhitered_conepointdown.png
mycp seamark topmark_oblique_redwhitered_cylinder seamark_topmark_oblique_redwhitered_cylinder.png

mycp seamark topmark_oblique_whitered_board_border seamark_topmark_oblique_whitered_board_border.png

mycp seamark topmark_oblique_black_2conesbasetogether seamark_topmark_oblique_black_2conesbasetogether.png
mycp seamark topmark_oblique_black_2conesdown seamark_topmark_oblique_black_2conesdown.png
mycp seamark topmark_oblique_black_2conespointtogether seamark_topmark_oblique_black_2conespointtogether.png
mycp seamark topmark_oblique_black_2conesup seamark_topmark_oblique_black_2conesup.png
mycp seamark topmark_oblique_black_2spheres seamark_topmark_oblique_black_2spheres.png
mycp seamark topmark_oblique_yellow_2conespointtogether seamark_topmark_oblique_yellow_2conespointtogether.png

mycp seamark topmark_vertical_black_2conesbasetogether seamark_topmark_vertical_black_2conesbasetogether.png
mycp seamark topmark_vertical_black_2conesdown seamark_topmark_vertical_black_2conesdown.png
mycp seamark topmark_vertical_black_2conespointtogether seamark_topmark_vertical_black_2conespointtogether.png
mycp seamark topmark_vertical_black_2conesup seamark_topmark_vertical_black_2conesup.png

mycp seamark topmark_vertical_black_2spheres seamark_topmark_vertical_black_2spheres.png
mycp seamark topmark_vertical_black_conepointdown seamark_topmark_vertical_black_conepointdown.png
mycp seamark topmark_vertical_black_conepointup seamark_topmark_vertical_black_conepointup.png
mycp seamark topmark_vertical_black_cylinder seamark_topmark_vertical_black_cylinder.png
mycp seamark topmark_vertical_black_rhombus seamark_topmark_vertical_black_rhombus.png
mycp seamark topmark_vertical_black_sphere seamark_topmark_vertical_black_sphere.png
mycp seamark topmark_vertical_black_xshape seamark_topmark_vertical_black_xshape.png

mycp seamark topmark_vertical_green_board seamark_topmark_vertical_green_board.png
mycp seamark topmark_vertical_green_conepointdown seamark_topmark_vertical_green_conepointdown.png
mycp seamark topmark_vertical_green_conepointup seamark_topmark_vertical_green_conepointup.png
mycp seamark topmark_vertical_green_cylinder seamark_topmark_vertical_green_cylinder.png
mycp seamark topmark_vertical_green_sphere seamark_topmark_vertical_green_sphere.png
mycp seamark topmark_vertical_green_xshape seamark_topmark_vertical_green_xshape.png

mycp seamark topmark_vertical_greenwhite_rhombus_vertical seamark_topmark_vertical_greenwhite_rhombus_vertical.png

mycp seamark topmark_vertical_red_board seamark_topmark_vertical_red_board.png
mycp seamark topmark_vertical_red_conepointdown seamark_topmark_vertical_red_conepointdown.png
mycp seamark topmark_vertical_red_conepointup seamark_topmark_vertical_red_conepointup.png
mycp seamark topmark_vertical_red_cylinder seamark_topmark_vertical_red_cylinder.png
mycp seamark topmark_vertical_red_rhombus seamark_topmark_vertical_red_rhombus.png
mycp seamark topmark_vertical_red_sphere seamark_topmark_vertical_red_sphere.png
mycp seamark topmark_vertical_red_xshape seamark_topmark_vertical_red_xshape.png

mycp seamark topmark_vertical_redwhitered_board seamark_topmark_vertical_redwhitered_board.png
mycp seamark topmark_vertical_redwhitered_conepointdown seamark_topmark_vertical_redwhitered_conepointdown.png
mycp seamark topmark_vertical_redwhitered_cylinder seamark_topmark_vertical_redwhitered_cylinder.png

mycp seamark topmark_vertical_whitered_board_border seamark_topmark_vertical_whitered_board_border.png
mycp seamark topmark_vertical_whitered_conepointdown_border seamark_topmark_vertical_whitered_conepointdown_border.png

mycp seamark topmark_vertical_whitegreen_rhombus_border seamark_topmark_vertical_whitegreen_rhombus_border.png

mycp seamark topmark_vertical_whiteblack_board_border seamark_topmark_vertical_whiteblack_board_border.png

mycp seamark topmark_vertical_whiteblackwhite_rhombus_vertical seamark_topmark_vertical_whiteblackwhite_rhombus_vertical.png

mycp seamark topmark_vertical_yellow_2conespointtogether seamark_topmark_vertical_yellow_2conespointtogether.png
mycp seamark topmark_vertical_yellow_conepointdown seamark_topmark_vertical_yellow_conepointdown.png
mycp seamark topmark_vertical_yellow_conepointup seamark_topmark_vertical_yellow_conepointup.png
mycp seamark topmark_vertical_yellow_cylinder seamark_topmark_vertical_yellow_cylinder.png
mycp seamark topmark_vertical_yellow_rhombus seamark_topmark_vertical_yellow_rhombus.png
mycp seamark topmark_vertical_yellow_sphere seamark_topmark_vertical_yellow_sphere.png
mycp seamark topmark_vertical_yellow_xshape seamark_topmark_vertical_yellow_xshape.png
mycp seamark topmark_vertical_yellow_cross seamark_topmark_vertical_yellow_cross.png

mycp seamark topmark_vertical_black_2conesbasetogether_big seamark_big_topmark_vertical_black_2conesbasetogether_big.png
mycp seamark topmark_vertical_black_2conesdown_big seamark_big_topmark_vertical_black_2conesdown_big.png
mycp seamark topmark_vertical_black_2conespointtogether_big seamark_big_topmark_vertical_black_2conespointtogether_big.png
mycp seamark topmark_vertical_black_2conesup_big seamark_big_topmark_vertical_black_2conesup_big.png

mycp seamark topmark_vertical_black_2spheres_big seamark_big_topmark_vertical_black_2spheres_big.png
mycp seamark topmark_vertical_black_conepointdown_big seamark_big_topmark_vertical_black_conepointdown_big.png
mycp seamark topmark_vertical_black_conepointup_big seamark_big_topmark_vertical_black_conepointup_big.png
mycp seamark topmark_vertical_black_cylinder_big seamark_big_topmark_vertical_black_cylinder_big.png
mycp seamark topmark_vertical_black_rhombus_big seamark_big_topmark_vertical_black_rhombus_big.png
mycp seamark topmark_vertical_black_sphere_big seamark_big_topmark_vertical_black_sphere_big.png
mycp seamark topmark_vertical_black_xshape_big seamark_big_topmark_vertical_black_xshape_big.png

mycp seamark fog_signal_additional_big seamark_big_fog_signal_additional_big.png
mycp seamark fog_signal_additional_big_night seamark_big_fog_signal_additional_big_night.png
mycp seamark fog_signal_additional_center_big seamark_big_fog_signal_additional_center_big.png
mycp seamark fog_signal_additional_center_big_night seamark_big_fog_signal_additional_center_big_night.png
mycp seamark fog_signal_additional seamark_fog_signal_additional.png
mycp seamark fog_signal_additional_night seamark_fog_signal_additional_night.png

mycp seamark radar_reflector_additional seamark_radar_reflector_additional.png
mycp seamark radar_reflector_additional_night seamark_radar_reflector_additional_night.png
mycp seamark radar_reflector_additional_big seamark_big_radar_reflector_additional_big.png
mycp seamark radar_reflector_additional_big_night seamark_big_radar_reflector_additional_big_night.png
mycp seamark radar_reflector_additional_center_big seamark_big_radar_reflector_additional_center_big.png
mycp seamark radar_reflector_additional_center_big_night seamark_big_radar_reflector_additional_center_big_night.png
mycp seamark radar_transponder_additional seamark_radar_transponder_additional.png
mycp seamark radar_transponder_additional_night seamark_radar_transponder_additional_night.png
mycp seamark radar_transponder_additional_big seamark_big_radar_transponder_additional_big.png
mycp seamark radar_transponder_additional_big_night seamark_big_radar_transponder_additional_big_night.png
mycp seamark radar_transponder_additional_center_big seamark_big_radar_transponder_additional_center_big.png
mycp seamark radar_transponder_additional_center_big_night seamark_big_radar_transponder_additional_center_big_night.png
mycp seamark radio_station_ais_additional seamark_big_radio_station_ais_additional.png
mycp seamark radio_station_omnidirectional_additional seamark_big_radio_station_omnidirectional_additional.png
mycp seamark radio_station_aeronautical_additional seamark_big_radio_station_aeronautical_additional.png
mycp seamark radio_station_dgps_additional seamark_big_radio_station_dgps_additional.png
mycp seamark radio_station_vais_additional seamark_big_radio_station_vais_additional.png
mycp seamark signal_station_additional seamark_big_signal_station_additional.png
mycp seamark radar_station_additional seamark_big_radar_station_additional.png
mycp seamark radar_station_additional_night seamark_big_radar_station_additional_night.png
mycp seamark radar_station_coast_additional seamark_big_radar_station_coast_additional.png
mycp seamark radar_station_surveillance_additional seamark_big_radar_station_surveillance_additional.png
mycp seamark radar_station_surveillance_additional_night seamark_big_radar_station_surveillance_additional_night.png

mycp seamark platform_production_additional seamark_platform_production_additional.png
mycp seamark platform_fpso_additional seamark_platform_fpso_additional.png

mycp seamark separation_line_arrow seamark_separation_line_arrow.png
mycp seamark separation_line_arrow_night seamark_separation_line_arrow_night.png
mycp seamark separation_line_arrow_small seamark_separation_line_arrow_small.png
mycp seamark separation_line_arrow_small_night seamark_separation_line_arrow_small_night.png

mycp seamark gate seamark_gate.png
mycp seamark lock_gate seamark_lock_gate.png

mycp seamark hulk seamark_hulk.png
mycp seamark hulk_restaurant_additional seamark_hulk_restaurant_additional.png

mycp seamark anchorage seamark_anchorage.png
mycp seamark anchorage_small_craft seamark_anchorage_small_craft.png
mycp seamark anchorage_tanker seamark_anchorage_tanker.png
mycp seamark anchor_berth seamark_anchor_berth.png
mycp seamark berth seamark_berth.png

mycp seamark bridge_fixed seamark_bridge_fixed.png
mycp seamark bridge_opening seamark_bridge_opening.png
mycp seamark bridge_lifting seamark_bridge_lifting.png
mycp seamark bridge_suspension seamark_bridge_suspension.png

mycp seamark building seamark_building.png
mycp seamark building_church seamark_building_church.png
mycp seamark building_customs seamark_building_customs.png
mycp seamark building_harbour_master seamark_building_harbour_master.png
mycp seamark building_water_police_station seamark_building_water_police_station.png

mycp seamark notice_prohibition_bg seamark_notice_prohibition_bg.png
mycp seamark notice_prohibition_bg_plus seamark_notice_prohibition_bg_plus.png
mycp seamark notice_prohibition_bg_night seamark_notice_prohibition_bg_night.png
mycp seamark notice_prohibition_bg_plus_night seamark_notice_prohibition_bg_plus_night.png
mycp seamark notice_prohibition_noentry seamark_notice_prohibition_noentry.png
mycp seamark notice_prohibition_closedarea seamark_notice_prohibition_closedarea.png
mycp seamark notice_prohibition_noovertaking seamark_notice_prohibition_noovertaking.png
mycp seamark notice_prohibition_noconvoyovertaking seamark_notice_prohibition_noconvoyovertaking.png
mycp seamark notice_prohibition_nopassing seamark_notice_prohibition_nopassing.png
mycp seamark notice_prohibition_noconvoypassing seamark_notice_prohibition_noconvoypassing.png
mycp seamark notice_prohibition_noberthing seamark_notice_prohibition_noberthing.png
mycp seamark notice_prohibition_noanchoring seamark_notice_prohibition_noanchoring.png
mycp seamark notice_prohibition_nomooring seamark_notice_prohibition_nomooring.png
mycp seamark notice_prohibition_noturning seamark_notice_prohibition_noturning.png
mycp seamark notice_prohibition_nowash seamark_notice_prohibition_nowash.png
mycp seamark notice_prohibition_nopassageleft seamark_notice_prohibition_nopassageleft.png
mycp seamark notice_prohibition_nopassageright seamark_notice_prohibition_nopassageright.png
mycp seamark notice_prohibition_nomotorcraft seamark_notice_prohibition_nomotorcraft.png
mycp seamark notice_prohibition_nosportcraft seamark_notice_prohibition_nosportcraft.png
mycp seamark notice_prohibition_nowaterskiing seamark_notice_prohibition_nowaterskiing.png
mycp seamark notice_prohibition_nosailingcraft seamark_notice_prohibition_nosailingcraft.png
mycp seamark notice_prohibition_nounpoweredcraft seamark_notice_prohibition_nounpoweredcraft.png
mycp seamark notice_prohibition_nosailboards seamark_notice_prohibition_nosailboards.png
mycp seamark notice_prohibition_nohighspeeds seamark_notice_prohibition_nohighspeeds.png
mycp seamark notice_prohibition_nolaunchingbeaching seamark_notice_prohibition_nolaunchingbeaching.png
mycp seamark notice_prohibition_nowaterbikes seamark_notice_prohibition_nowaterbikes.png

mycp seamark notice_regulation_bg seamark_notice_regulation_bg.png
mycp seamark notice_regulation_bg_plus seamark_notice_regulation_bg_plus.png
mycp seamark notice_regulation_bg_night seamark_notice_regulation_bg_night.png
mycp seamark notice_regulation_bg_plus_night seamark_notice_regulation_bg_plus_night.png
mycp seamark notice_regulation_crosstoport seamark_notice_regulation_crosstoport.png
mycp seamark notice_regulation_crosstostarboard seamark_notice_regulation_crosstostarboard.png
mycp seamark notice_regulation_givewaycrossing seamark_notice_regulation_givewaycrossing.png
mycp seamark notice_regulation_givewayjunction seamark_notice_regulation_givewayjunction.png
mycp seamark notice_regulation_keeplookout seamark_notice_regulation_keeplookout.png
mycp seamark notice_regulation_keeptoport seamark_notice_regulation_keeptoport.png
mycp seamark notice_regulation_keeptostarboard seamark_notice_regulation_keeptostarboard.png
mycp seamark notice_regulation_makeradiocontact seamark_notice_regulation_makeradiocontact.png
mycp seamark notice_regulation_movetoleft seamark_notice_regulation_movetoleft.png
mycp seamark notice_regulation_movetoport seamark_notice_regulation_movetoport.png
mycp seamark notice_regulation_movetoright seamark_notice_regulation_movetoright.png
mycp seamark notice_regulation_movetostarboard seamark_notice_regulation_movetostarboard.png
mycp seamark notice_regulation_speedlimit seamark_notice_regulation_speedlimit.png
mycp seamark notice_regulation_soundhorn seamark_notice_regulation_soundhorn.png
mycp seamark notice_regulation_stop seamark_notice_regulation_stop.png

mycp seamark notice_restriction_channeldistanceleft seamark_notice_restriction_channeldistanceleft.png
mycp seamark notice_restriction_channeldistanceright seamark_notice_restriction_channeldistanceright.png
mycp seamark notice_restriction_limiteddepth seamark_notice_restriction_limiteddepth.png
mycp seamark notice_restriction_limitedheadroom seamark_notice_restriction_limitedheadroom.png
mycp seamark notice_restriction_limitedwidth seamark_notice_restriction_limitedwidth.png

mycp seamark notice_recommendation_channeltwoway seamark_notice_recommendation_channeltwoway.png
mycp seamark notice_recommendation_channeloneway seamark_notice_recommendation_channeloneway.png
mycp seamark notice_recommendation_openingtoleft seamark_notice_recommendation_openingtoleft.png
mycp seamark notice_recommendation_openingtoright seamark_notice_recommendation_openingtoright.png
mycp seamark notice_recommendation_proceedtoleft seamark_notice_recommendation_proceedtoleft.png
mycp seamark notice_recommendation_proceedtoright seamark_notice_recommendation_proceedtoright.png

mycp seamark notice_information_bg seamark_notice_information_bg.png
mycp seamark notice_information_bg_plus seamark_notice_information_bg_plus.png
mycp seamark notice_information_entrypermitted seamark_notice_information_entrypermitted.png
mycp seamark notice_information_overheadcable seamark_notice_information_overheadcable.png
mycp seamark notice_information_weir seamark_notice_information_weir.png
mycp seamark notice_information_ferrynonindependent seamark_notice_information_ferrynonindependent.png
mycp seamark notice_information_ferryindependent seamark_notice_information_ferryindependent.png
mycp seamark notice_information_berthingpermitted seamark_notice_information_berthingpermitted.png
mycp seamark notice_information_berthingunmarkedpushing seamark_notice_information_berthingunmarkedpushing.png
mycp seamark notice_information_berthingmarkedpushing1 seamark_notice_information_berthingmarkedpushing1.png
mycp seamark notice_information_berthingmarkedpushing2 seamark_notice_information_berthingmarkedpushing2.png
mycp seamark notice_information_berthingmarkedpushing3 seamark_notice_information_berthingmarkedpushing3.png
mycp seamark notice_information_berthingunmarkednonpushing seamark_notice_information_berthingunmarkednonpushing.png
mycp seamark notice_information_berthingmarkednonpushing1 seamark_notice_information_berthingmarkednonpushing1.png
mycp seamark notice_information_berthingmarkednonpushing2 seamark_notice_information_berthingmarkednonpushing2.png
mycp seamark notice_information_berthingmarkednonpushing3 seamark_notice_information_berthingmarkednonpushing3.png
mycp seamark notice_information_berthingunmarked seamark_notice_information_berthingunmarked.png
mycp seamark notice_information_berthingmarked1 seamark_notice_information_berthingmarked1.png
mycp seamark notice_information_berthingmarked2 seamark_notice_information_berthingmarked2.png
mycp seamark notice_information_berthingmarked3 seamark_notice_information_berthingmarked3.png
mycp seamark notice_information_anchoringpermitted seamark_notice_information_anchoringpermitted.png
mycp seamark notice_information_mooringpermitted seamark_notice_information_mooringpermitted.png
mycp seamark notice_information_vehicleloadingberth seamark_notice_information_vehicleloadingberth.png
mycp seamark notice_information_turningarea seamark_notice_information_turningarea.png
mycp seamark notice_information_secondarywaterwaycrossing seamark_notice_information_secondarywaterwaycrossing.png
mycp seamark notice_information_secondarywaterwayright seamark_notice_information_secondarywaterwayright.png
mycp seamark notice_information_secondarywaterwayleft seamark_notice_information_secondarywaterwayleft.png
mycp seamark notice_information_mainwaterwayleftsecondaryahead seamark_notice_information_mainwaterwayleftsecondaryahead.png
mycp seamark notice_information_mainwaterwayrightsecondaryleft seamark_notice_information_mainwaterwayrightsecondaryleft.png
mycp seamark notice_information_mainwaterwayleftsecondaryright seamark_notice_information_mainwaterwayleftsecondaryright.png
mycp seamark notice_information_mainwaterwayrightsecondaryahead seamark_notice_information_mainwaterwayrightsecondaryahead.png
mycp seamark notice_information_mainwaterwayleftsecondaryaheadright seamark_notice_information_mainwaterwayleftsecondaryaheadright.png
mycp seamark notice_information_mainwaterwayrightsecondaryaheadleft seamark_notice_information_mainwaterwayrightsecondaryaheadleft.png
mycp seamark notice_information_mainwaterwaycrossing seamark_notice_information_mainwaterwaycrossing.png
mycp seamark notice_information_mainwaterwayjunction seamark_notice_information_mainwaterwayjunction.png
mycp seamark notice_information_mainwaterwayaheadright seamark_notice_information_mainwaterwayaheadright.png
mycp seamark notice_information_mainwaterwayaheadleft seamark_notice_information_mainwaterwayaheadleft.png
mycp seamark notice_information_mainwaterwayaheadrightsecondaryleft seamark_notice_information_mainwaterwayaheadrightsecondaryleft.png
mycp seamark notice_information_mainwaterwayaheadleftsecondaryright seamark_notice_information_mainwaterwayaheadleftsecondaryright.png
mycp seamark notice_information_prohibitionends seamark_notice_information_prohibitionends.png
mycp seamark notice_information_drinkingwater seamark_notice_information_drinkingwater.png
mycp seamark notice_information_telephone seamark_notice_information_telephone.png
mycp seamark notice_information_motorcraftpermitted seamark_notice_information_motorcraftpermitted.png
mycp seamark notice_information_sportcraftpermitted seamark_notice_information_sportcraftpermitted.png
mycp seamark notice_information_waterskiingpermitted seamark_notice_information_waterskiingpermitted.png
mycp seamark notice_information_sailingcraftpermitted seamark_notice_information_sailingcraftpermitted.png
mycp seamark notice_information_unpoweredcraftpermitted seamark_notice_information_unpoweredcraftpermitted.png
mycp seamark notice_information_sailboardspermitted seamark_notice_information_sailboardspermitted.png
mycp seamark notice_information_highspeedspermitted seamark_notice_information_highspeedspermitted.png
mycp seamark notice_information_launchingbeachingpermitted seamark_notice_information_launchingbeachingpermitted.png
mycp seamark notice_information_radioinformation seamark_notice_information_radioinformation.png
mycp seamark notice_information_waterbikespermitted seamark_notice_information_waterbikespermitted.png

mycp seamark notice_addition_leftboard seamark_notice_addition_leftboard.png
mycp seamark notice_addition_lefttriangle seamark_notice_addition_lefttriangle.png
mycp seamark notice_addition_topboard seamark_notice_addition_topboard.png
mycp seamark notice_addition_toptriangle seamark_notice_addition_toptriangle.png
mycp seamark notice_addition_rightboard seamark_notice_addition_rightboard.png
mycp seamark notice_addition_righttriangle seamark_notice_addition_righttriangle.png
mycp seamark notice_addition_bottomboard seamark_notice_addition_bottomboard.png
mycp seamark notice_addition_bottomtriangle seamark_notice_addition_bottomtriangle.png

mycp seamark notice_impact_banktobank seamark_notice_impact_banktobank.png
mycp seamark notice_impact_downstream seamark_notice_impact_downstream.png
mycp seamark notice_impact_leftbank seamark_notice_impact_leftbank.png
mycp seamark notice_impact_rightbank seamark_notice_impact_rightbank.png
mycp seamark notice_impact_upstream seamark_notice_impact_upstream.png
mycp seamark notice_impact_upstreamdownstream seamark_notice_impact_upstreamdownstream.png
mycp seamark notice_impact_upstreamdownstreamleftbank seamark_notice_impact_upstreamdownstreamleftbank.png
mycp seamark notice_impact_upstreamdownstreamrightbank seamark_notice_impact_upstreamdownstreamrightbank.png
mycp seamark notice_impact_downstreamleftbank seamark_notice_impact_downstreamleftbank.png

mycp seamark notice_orientation_0 seamark_notice_orientation_0.png
mycp seamark notice_orientation_45 seamark_notice_orientation_45.png
mycp seamark notice_orientation_90 seamark_notice_orientation_90.png
mycp seamark notice_orientation_135 seamark_notice_orientation_135.png
mycp seamark notice_orientation_180 seamark_notice_orientation_180.png
mycp seamark notice_orientation_225 seamark_notice_orientation_225.png
mycp seamark notice_orientation_270 seamark_notice_orientation_270.png
mycp seamark notice_orientation_315 seamark_notice_orientation_315.png

mycp seamark mooring_bollard seamark_mooring_bollard.png
mycp seamark mooring_deviationdolphin seamark_mooring_deviationdolphin.png
mycp seamark mooring_dolphin seamark_mooring_dolphin.png
mycp seamark mooring_pile seamark_mooring_pile.png
mycp seamark mooring_pylon seamark_mooring_pylon.png
mycp seamark mooring_wall seamark_mooring_wall.png
mycp seamark mooring_additional_for_buoy seamark_mooring_additional_for_buoy.png

mycp seamark small_craft_facility_boat_hoist seamark_big_small_craft_facility_boat_hoist.png
mycp seamark small_craft_facility_boatyard seamark_big_small_craft_facility_boatyard.png
mycp seamark small_craft_facility_chandler seamark_big_small_craft_facility_chandler.png
mycp seamark small_craft_facility_electricity seamark_big_small_craft_facility_electricity.png
mycp seamark small_craft_facility_fuel_station seamark_big_small_craft_facility_fuel_station.png
mycp seamark small_craft_facility_laundrette seamark_big_small_craft_facility_laundrette.png
mycp seamark small_craft_facility_nautical_club seamark_big_small_craft_facility_nautical_club.png
mycp seamark small_craft_facility_public_inn seamark_big_small_craft_facility_public_inn.png
mycp seamark small_craft_facility_pump_out seamark_big_small_craft_facility_pump_out.png
mycp seamark small_craft_facility_pump_out2 seamark_big_small_craft_facility_pump_out2.png
mycp seamark small_craft_facility_restaurant seamark_big_small_craft_facility_restaurant.png
mycp seamark small_craft_facility_showers seamark_big_small_craft_facility_showers.png
mycp seamark small_craft_facility_slipway seamark_big_small_craft_facility_slipway.png
mycp seamark small_craft_facility_toilets seamark_big_small_craft_facility_toilets.png
mycp seamark small_craft_facility_toilets2 seamark_big_small_craft_facility_toilets2.png
mycp seamark small_craft_facility_visitor_berth seamark_big_small_craft_facility_visitor_berth.png
mycp seamark small_craft_facility_visitors_mooring seamark_big_small_craft_facility_visitors_mooring.png
mycp seamark small_craft_facility_water_tap seamark_big_small_craft_facility_water_tap.png
mycp seamark small_craft_facility_shield2 seamark_big_small_craft_facility_shield2.png

mycp seamark restricted_area_kite_surfing seamark_small_restricted_area_kite_surfing.png
mycp seamark restricted_area_swimming seamark_small_restricted_area_swimming.png
mycp seamark restricted_area_fish_sanctuary seamark_small_restricted_area_fish_sanctuary.png
mycp seamark restricted_area_water_skiing seamark_small_restricted_area_water_skiing.png
mycp seamark restriction_fishing seamark_restriction_fishing.png
mycp seamark restriction_drilling seamark_restriction_drilling.png
mycp seamark restriction_to_be_avoided seamark_restriction_to_be_avoided.png
mycp seamark restriction_discharging seamark_restriction_discharging.png
mycp seamark restriction_exploration_development seamark_restriction_exploration_development.png

mycp seamark obstruction_foul_ground seamark_small_obstruction_foul_ground.png
mycp seamark obstruction_boom seamark_small_obstruction_boom.png
mycp seamark obstruction_construction seamark_small_obstruction_construction.png

mycp seamark distance_mark seamark_small_distance_mark.png
mycp seamark distance_mark_installed seamark_small_distance_mark_installed.png

mycp seamark fishing_facility seamark_fishing_facility.png

mycp seamark marine_farm seamark_marine_farm.png
mycp seamark marine_farm_crustaceans_additional seamark_marine_farm_crustaceans_additional.png
mycp seamark marine_farm_fish_additional seamark_marine_farm_fish_additional.png
mycp seamark marine_farm_oysters_mussels_additional seamark_marine_farm_oysters_mussels_additional.png
mycp seamark marine_farm_seaweed_additional seamark_marine_farm_seaweed_additional.png

mycp seamark pilot_boarding seamark_pilot_boarding.png
mycp seamark pylon seamark_pylon.png
mycp seamark pylon_power seamark_pylon_power.png
mycp seamark radar_reflector seamark_radar_reflector.png
mycp seamark waterfall seamark_waterfall.png
mycp seamark rescue_station seamark_rescue_station.png
mycp seamark seaplane_landing_area seamark_small_seaplane_landing_area.png

mycp seamark rock_awash seamark_rock_awash.png
mycp seamark rock_covers seamark_rock_covers.png
mycp seamark rock_submerged seamark_rock_submerged.png

mycp seamark waterway_gauge seamark_waterway_gauge.png

mycp seamark wreck seamark_wreck.png
mycp seamark wreck_hull_showing seamark_wreck_hull_showing.png

mycp seamark power_line seamark_small_power_line.png
mycp seamark submarine_cable seamark_small_submarine_cable.png

## Skimap
mycp skimap overlay_advanced skimap_overlay_advanced.png
mycp skimap overlay_easy skimap_overlay_easy.png
mycp skimap overlay_expert skimap_overlay_expert.png
mycp skimap overlay_extreme skimap_overlay_extreme.png
mycp skimap overlay_freeride skimap_overlay_freeride.png
mycp skimap overlay_intermediate skimap_overlay_intermediate.png
mycp skimap overlay_novice skimap_overlay_novice.png
mycpname piste skimap_piste.png
mycp piste downhill skimap_piste_downhill.png
mycp piste hike skimap_piste_hike.png
mycp piste nordic skimap_piste_nordic.png
mycp piste nordic_black skimap_piste_nordic_black.png
mycp piste nordic_blue skimap_piste_nordic_blue.png
mycp piste nordic_brown skimap_piste_nordic_brown.png
mycp piste nordic_darkyellow skimap_piste_nordic_darkyellow.png
mycp piste nordic_gray skimap_piste_nordic_gray.png
mycp piste nordic_green skimap_piste_nordic_green.png
mycp piste nordic_lightblue skimap_piste_nordic_lightblue.png
mycp piste nordic_lightgreen skimap_piste_nordic_lightgreen.png
mycp piste nordic_orange skimap_piste_nordic_orange.png
mycp piste nordic_purple skimap_piste_nordic_purple.png
mycp piste nordic_red skimap_piste_nordic_red.png
mycp piste nordic_yellow skimap_piste_nordic_yellow.png
mycp piste skitour skimap_piste_skitour.png
mycp piste sled skimap_piste_sled.png
mycp skimap gray_black_round_shield skimap_gray_black_round_shield.png
mycp skimap white_black_round_shield skimap_white_black_round_shield.png

## Shops
mygroup car_aid shopping_car.png
mygroup food_shop shopping_convenience.png
mygroup shop shopping_department_store.png
mygroup shop_food shopping_convenience.png
mycp amenity marketplace shopping_marketplace.png
mycp amenity vending_machine shopping_vending_machine.png
mycp shop alcohol shopping_alcohol.png
mycp shop baby_goods shopping_baby.png
mycp shop bakery shopping_bakery.png
mycp shop bicycle shopping_bicycle.png
mycpname beverages shopping_beverages.png
mycp shop books shopping_book2.png
mycp shop boutique shopping_clothes.png
mycp shop butcher shopping_butcher2.png
mycp shop car_parts shopping_car_parts.png
mycp shop car_repair shopping_car_repair.png
mycp shop car shopping_car.png
mycp shop clothes shopping_clothes.png
mycp clothes children shopping_clothes_children.png
mycp shop computer shopping_computer.png
mycp shop confectionery shopping_confectionery.png
mycp shop convenience shopping_convenience.png
mycp shop copyshop shopping_copyshop.png
mycp shop dairy shopping_dairy.png
mycp shop department_store shopping_department_store.png
mycp shop doityourself shopping_diy.png
mycpname electronics shopping_electronics.png
mycpname hifi shopping_hifi.png
mycp shop fashion shopping_clothes.png
mycp shop fishing shopping_tackle.png
mycp shop florist shopping_florist.png
mycp shop furniture shopping_furniture.png
mycp shop garden_centre shopping_garden_centre.png
mycpname shop_yes shopping_general.png
mycp shop gift shopping_gift.png
mycp shop greengrocer shopping_greengrocer.png
mycp shop hairdresser shopping_hairdresser.png
mycp shop hardware shopping_diy.png
mycp shop hearing_aids shopping_hearing_aids.png
mycpname ice_cream food_ice_cream.png
mycp shop jewelry shopping_jewelry2.png
mycp shop kiosk shopping_kiosk.png
mycp shop laundry shopping_laundrette.png
mycp shop mall shopping_mall.png
mycp shop mobile_phone shopping_mobile_phone.png
mycp shop motorcycle shopping_motorcycle.png
mycpname motorcycle_repair shopping_motorcycle_repair.png
mycp shop musical_instrument shopping_musical_instrument.png
mycp shop optician shopping_opticians.png
mycp shop pet shopping_pet2.png
mycpname photo shopping_photo.png
mycp shop seafood shopping_fish.png
mycp shop shoes shopping_shoes.png
mycp shop sports shopping_sports.png
mycp shop supermarket shopping_supermarket.png
mycp shop ticket shopping_ticket.png
mycp shop tobacco shopping_tobacco.png
mycp shop toys shopping_toys.png
mycp shop video shopping_video_rental.png
mycpname wine shopping_wine.png
mycpname outdoor shopping_outdoor.png
mycpname tyres shopping_tyres.png
mycpname cosmetics shopping_cosmetics.png
mycpname leather shopping_leather.png
mycpname medical_supply shopping_medical_supply.png
mycpname cheese shopping_cheese.png
mycpname chocolate shopping_chocolate.png
mycpname coffee shopping_coffee.png
mycpname farm shopping_farm.png
mycpname tea shopping_tea.png
mycpname pastry shopping_pastry.png
mycpname antiques shopping_antiques.png
mycpname bag shopping_bag.png
mycpname bed shopping_bed.png
mycpname boutique shopping_boutique.png
mycpname bathroom_furnishing shopping_bathroom_furnishing.png
mycpname camera shopping_camera.png
mycpname carpet shopping_carpet.png
mycpname chemist shopping_chemist.png
mycpname curtain shopping_curtain.png
mycpname fabric shopping_fabric.png
mycpname bedding shopping_bedding.png
mycpname erotic shopping_erotic.png
mycpname fashion shopping_fashion.png
mycpname frame shopping_frame.png
mycpname free_flying shopping_free_flying.png
mycpname furnace shopping_furnace.png
mycpname gas shopping_gas.png
mycpname glaziery shopping_glaziery.png
mycpname herbalist shopping_herbalist.png
mycpname houseware shopping_houseware.png
mycpname hunting shopping_hunting.png
mycpname beauty shopping_beauty.png
mycpname interior_decoration shopping_interior_decoration.png
mycpname art shopping_art.png
mycpname model shopping_model.png
mycpname music shopping_music.png
mycpname newsagent shopping_newsagent.png
mycpname paint shopping_paint.png
mycpname radiotechnics shopping_radiotechnics.png
mycpname scuba_diving_shop shopping_scuba_diving_shop.png
mycpname stationery shopping_stationery.png
mycpname tableware shopping_tableware.png
mycpname trophy shopping_trophy.png
mycpname trade shopping_trade.png
mycpname vacuum_cleaner shopping_vacuum_cleaner.png
mycpname tattoo shopping_tattoo.png
mycpname perfumery shopping_perfumery.png
mycpname pawnbroker shopping_pawnbroker.png
mycpname second_hand shopping_second_hand.png
mycpname honey shopping_honey.png
mycpname charity shopping_charity.png
mycpname energy shopping_energy.png
mycpname variety_store shopping_variety_store.png
mycpname kitchen shopping_kitchen.png
mycpname video_games shopping_video_games.png
mycpname pyrotechnics shopping_pyrotechnics.png
mycpname weapons shopping_weapons.png
mycpname window_blind shopping_window_blind.png
mycpname watches shopping_watches.png
mycpname candles shopping_candles.png
mycpname religion shopping_religion.png
mycpname games shopping_games.png
mycpname doors shopping_doors.png
mycpname sewing shopping_sewing.png
mycpname spices shopping_spices.png
mycpname shop_craft shopping_craft.png
mycpname party shopping_party.png
mycpname deli shopping_deli.png
mycpname electrical shopping_electrical.png
mycpname locksmith shopping_locksmith.png
mycpname lighting shopping_lighting.png
mycpname lottery shopping_lottery.png
mycpname e_cigarette shopping_e_cigarette.png
mycpname nutrition_supplements shopping_nutrition_supplements.png
mycpname photo_studio shopping_photo_studio.png

## Office
mycpname estate_agent office_estate_agent.png
mycpname insurance office_insurance.png
mycpname research office_research.png
mycpname travel_agent office_travel_agent.png
mycpname it office_it.png
mycp office government office_government.png
mycpname company office_company.png
mycpname advertising_agency office_advertising_agency.png
mycpname employment_agency office_employment_agency.png
mycpname lawyer office_lawyer.png
mycpname office_administrative office_administrative.png
mycpname ngo office_ngo.png
mycpname political_party office_political_party.png
mycpname office_telecommunication office_telecommunication.png
mycpname accountant office_accountant.png
mycpname architect office_architect.png
mycpname office_camping office_camping.png
mycpname educational_institution office_educational_institution.png
mycpname office_foundation office_foundation.png
mycpname guide office_guide.png
mycpname newspaper office_newspaper.png
mycpname quango office_quango.png
mycpname tax_advisor office_tax_advisor.png
mycpname consulting office_consulting.png
mycpname cooperative office_cooperative.png
mycpname financial office_financial.png
mycpname forestry office_forestry.png
mycpname logistics office_logistics.png
mycpname notary office_notary.png
mycpname parish office_parish.png
mycpname publisher office_publisher.png

## Entertainment
mycpname park entertainment_colored_park.png
mycpname dance_floor entertainment_dance_floor.png
mycpname dog_park entertainment_dog_park.png
mycpname ski_resort entertainment_ski_resort.png
mycpname bandstand entertainment_bandstand.png

## Club
mycpname club_sport club_sport.png

# mygroup custom_id icons8 #TODO
mygroup user_defined icons8_user.png
mygroup user_defined_other icons8_user.png
mygroup osmwiki icons8_wikipedia.png
mycpname wiki_place poi_colored_wikipedia2.png
mygroup name_finder icons8_web_search.png
mycp osmand waypoint functional-icons_waypoint.png
mycp osmand fav functional-icons_fav.png
mygroup null icons8_worldwide_location.png

mycp stub amenity functional-icons_stub_amenity.png
mycp stub club functional-icons_stub_club.png
mycp stub craft functional-icons_stub_craft.png
mycp stub emergency functional-icons_stub_emergency.png
mycp stub healthcare functional-icons_stub_healthcare.png
mycp stub historic functional-icons_stub_historic.png
mycp stub office functional-icons_stub_office.png
mycp stub man_made functional-icons_stub_man_made.png
mycp stub shop functional-icons_stub_shop.png
mycp stub tourism functional-icons_stub_tourism.png

#OSMC
mycpname osmc_black_arch osmc_black_osmc_black_arch.png
mycpname osmc_black_backslash osmc_black_osmc_black_backslash.png
mycpname osmc_black_bar osmc_black_osmc_black_bar.png
mycpname osmc_black_bicycle osmc_black_osmc_black_bicycle.png
mycpname osmc_black_bowl osmc_black_osmc_black_bowl.png
mycpname osmc_black_circle osmc_black_osmc_black_circle.png
mycpname osmc_black_circle_arrow osmc_black_osmc_black_circle_arrow.png
mycpname osmc_black_corner osmc_black_osmc_black_corner.png
mycpname osmc_black_cross osmc_black_osmc_black_cross.png
mycpname osmc_black_diamond osmc_black_osmc_black_diamond.png
mycpname osmc_black_diamond_line osmc_black_osmc_black_diamond_line.png
mycpname osmc_black_dot osmc_black_osmc_black_dot.png
mycpname osmc_black_drop_line osmc_black_osmc_black_drop_line.png
mycpname osmc_black_fork osmc_black_osmc_black_fork.png
mycpname osmc_black_hiker osmc_black_osmc_black_hiker.png
mycpname osmc_black_house osmc_black_osmc_black_house.png
mycpname osmc_black_l osmc_black_osmc_black_l.png
mycpname osmc_black_m osmc_black_osmc_black_m.png
mycpname osmc_black_lower osmc_black_osmc_black_lower.png
mycpname osmc_black_pointer osmc_black_osmc_black_pointer.png
mycpname osmc_black_pointer_line osmc_black_osmc_black_pointer_line.png
mycpname osmc_black_rectangle osmc_black_osmc_black_rectangle.png
mycpname osmc_black_rectangle_line osmc_black_osmc_black_rectangle_line.png
mycpname osmc_black_slash osmc_black_osmc_black_slash.png
mycpname osmc_black_stripe osmc_black_osmc_black_stripe.png
mycpname osmc_black_t osmc_black_osmc_black_t.png
mycpname osmc_black_triangle osmc_black_osmc_black_triangle.png
mycpname osmc_black_triangle_line osmc_black_osmc_black_triangle_line.png
mycpname osmc_black_triangle_turned osmc_black_osmc_black_triangle_turned.png
mycpname osmc_black_turned_t osmc_black_osmc_black_turned_t.png
mycpname osmc_black_upper osmc_black_osmc_black_upper.png
mycpname osmc_black_x osmc_black_osmc_black_x.png

mycpname osmc_blue_arch osmc_blue_osmc_blue_arch.png
mycpname osmc_blue_backslash osmc_blue_osmc_blue_backslash.png
mycpname osmc_blue_bar osmc_blue_osmc_blue_bar.png
mycpname osmc_blue_bicycle osmc_blue_osmc_blue_bicycle.png
mycpname osmc_blue_bowl osmc_blue_osmc_blue_bowl.png
mycpname osmc_blue_circle osmc_blue_osmc_blue_circle.png
mycpname osmc_blue_circle_arrow osmc_blue_osmc_blue_circle_arrow.png
mycpname osmc_blue_corner osmc_blue_osmc_blue_corner.png
mycpname osmc_blue_cross osmc_blue_osmc_blue_cross.png
mycpname osmc_blue_diamond osmc_blue_osmc_blue_diamond.png
mycpname osmc_blue_diamond_line osmc_blue_osmc_blue_diamond_line.png
mycpname osmc_blue_dot osmc_blue_osmc_blue_dot.png
mycpname osmc_blue_drop_line osmc_blue_osmc_blue_drop_line.png
mycpname osmc_blue_fork osmc_blue_osmc_blue_fork.png
mycpname osmc_blue_hiker osmc_blue_osmc_blue_hiker.png
mycpname osmc_blue_house osmc_blue_osmc_blue_house.png
mycpname osmc_blue_l osmc_blue_osmc_blue_l.png
mycpname osmc_blue_m osmc_blue_osmc_blue_m.png
mycpname osmc_blue_lower osmc_blue_osmc_blue_lower.png
mycpname osmc_blue_pointer osmc_blue_osmc_blue_pointer.png
mycpname osmc_blue_pointer_line osmc_blue_osmc_blue_pointer_line.png
mycpname osmc_blue_rectangle osmc_blue_osmc_blue_rectangle.png
mycpname osmc_blue_rectangle_line osmc_blue_osmc_blue_rectangle_line.png
mycpname osmc_blue_slash osmc_blue_osmc_blue_slash.png
mycpname osmc_blue_stripe osmc_blue_osmc_blue_stripe.png
mycpname osmc_blue_t osmc_blue_osmc_blue_t.png
mycpname osmc_blue_triangle osmc_blue_osmc_blue_triangle.png
mycpname osmc_blue_triangle_line osmc_blue_osmc_blue_triangle_line.png
mycpname osmc_blue_triangle_turned osmc_blue_osmc_blue_triangle_turned.png
mycpname osmc_blue_turned_t osmc_blue_osmc_blue_turned_t.png
mycpname osmc_blue_upper osmc_blue_osmc_blue_upper.png
mycpname osmc_blue_x osmc_blue_osmc_blue_x.png

mycpname osmc_green_arch osmc_green_osmc_green_arch.png
mycpname osmc_green_backslash osmc_green_osmc_green_backslash.png
mycpname osmc_green_bar osmc_green_osmc_green_bar.png
mycpname osmc_green_bicycle osmc_green_osmc_green_bicycle.png
mycpname osmc_green_bowl osmc_green_osmc_green_bowl.png
mycpname osmc_green_circle osmc_green_osmc_green_circle.png
mycpname osmc_green_circle_arrow osmc_green_osmc_green_circle_arrow.png
mycpname osmc_green_corner osmc_green_osmc_green_corner.png
mycpname osmc_green_cross osmc_green_osmc_green_cross.png
mycpname osmc_green_diamond osmc_green_osmc_green_diamond.png
mycpname osmc_green_diamond_line osmc_green_osmc_green_diamond_line.png
mycpname osmc_green_dot osmc_green_osmc_green_dot.png
mycpname osmc_green_drop_line osmc_green_osmc_green_drop_line.png
mycpname osmc_green_fork osmc_green_osmc_green_fork.png
mycpname osmc_green_hiker osmc_green_osmc_green_hiker.png
mycpname osmc_green_house osmc_green_osmc_green_house.png
mycpname osmc_green_l osmc_green_osmc_green_l.png
mycpname osmc_green_m osmc_green_osmc_green_m.png
mycpname osmc_green_lower osmc_green_osmc_green_lower.png
mycpname osmc_green_pointer osmc_green_osmc_green_pointer.png
mycpname osmc_green_pointer_line osmc_green_osmc_green_pointer_line.png
mycpname osmc_green_rectangle osmc_green_osmc_green_rectangle.png
mycpname osmc_green_rectangle_line osmc_green_osmc_green_rectangle_line.png
mycpname osmc_green_slash osmc_green_osmc_green_slash.png
mycpname osmc_green_stripe osmc_green_osmc_green_stripe.png
mycpname osmc_green_t osmc_green_osmc_green_t.png
mycpname osmc_green_triangle osmc_green_osmc_green_triangle.png
mycpname osmc_green_triangle_line osmc_green_osmc_green_triangle_line.png
mycpname osmc_green_triangle_turned osmc_green_osmc_green_triangle_turned.png
mycpname osmc_green_turned_t osmc_green_osmc_green_turned_t.png
mycpname osmc_green_upper osmc_green_osmc_green_upper.png
mycpname osmc_green_x osmc_green_osmc_green_x.png

mycpname osmc_orange_arch osmc_orange_osmc_orange_arch.png
mycpname osmc_orange_backslash osmc_orange_osmc_orange_backslash.png
mycpname osmc_orange_bar osmc_orange_osmc_orange_bar.png
mycpname osmc_orange_bicycle osmc_orange_osmc_orange_bicycle.png
mycpname osmc_orange_bowl osmc_orange_osmc_orange_bowl.png
mycpname osmc_orange_circle osmc_orange_osmc_orange_circle.png
mycpname osmc_orange_circle_arrow osmc_orange_osmc_orange_circle_arrow.png
mycpname osmc_orange_corner osmc_orange_osmc_orange_corner.png
mycpname osmc_orange_cross osmc_orange_osmc_orange_cross.png
mycpname osmc_orange_diamond osmc_orange_osmc_orange_diamond.png
mycpname osmc_orange_diamond_line osmc_orange_osmc_orange_diamond_line.png
mycpname osmc_orange_dot osmc_orange_osmc_orange_dot.png
mycpname osmc_orange_drop_line osmc_orange_osmc_orange_drop_line.png
mycpname osmc_orange_fork osmc_orange_osmc_orange_fork.png
mycpname osmc_orange_hiker osmc_orange_osmc_orange_hiker.png
mycpname osmc_orange_house osmc_orange_osmc_orange_house.png
mycpname osmc_orange_l osmc_orange_osmc_orange_l.png
mycpname osmc_orange_m osmc_orange_osmc_orange_m.png
mycpname osmc_orange_lower osmc_orange_osmc_orange_lower.png
mycpname osmc_orange_pointer osmc_orange_osmc_orange_pointer.png
mycpname osmc_orange_pointer_line osmc_orange_osmc_orange_pointer_line.png
mycpname osmc_orange_rectangle osmc_orange_osmc_orange_rectangle.png
mycpname osmc_orange_rectangle_line osmc_orange_osmc_orange_rectangle_line.png
mycpname osmc_orange_slash osmc_orange_osmc_orange_slash.png
mycpname osmc_orange_stripe osmc_orange_osmc_orange_stripe.png
mycpname osmc_orange_t osmc_orange_osmc_orange_t.png
mycpname osmc_orange_triangle osmc_orange_osmc_orange_triangle.png
mycpname osmc_orange_triangle_line osmc_orange_osmc_orange_triangle_line.png
mycpname osmc_orange_triangle_turned osmc_orange_osmc_orange_triangle_turned.png
mycpname osmc_orange_turned_t osmc_orange_osmc_orange_turned_t.png
mycpname osmc_orange_upper osmc_orange_osmc_orange_upper.png
mycpname osmc_orange_x osmc_orange_osmc_orange_x.png

mycpname osmc_red_arch osmc_red_osmc_red_arch.png
mycpname osmc_red_backslash osmc_red_osmc_red_backslash.png
mycpname osmc_red_bar osmc_red_osmc_red_bar.png
mycpname osmc_red_bicycle osmc_red_osmc_red_bicycle.png
mycpname osmc_red_bowl osmc_red_osmc_red_bowl.png
mycpname osmc_red_circle osmc_red_osmc_red_circle.png
mycpname osmc_red_circle_arrow osmc_red_osmc_red_circle_arrow.png
mycpname osmc_red_corner osmc_red_osmc_red_corner.png
mycpname osmc_red_cross osmc_red_osmc_red_cross.png
mycpname osmc_red_diamond osmc_red_osmc_red_diamond.png
mycpname osmc_red_diamond_line osmc_red_osmc_red_diamond_line.png
mycpname osmc_red_dot osmc_red_osmc_red_dot.png
mycpname osmc_red_drop_line osmc_red_osmc_red_drop_line.png
mycpname osmc_red_fork osmc_red_osmc_red_fork.png
mycpname osmc_red_hiker osmc_red_osmc_red_hiker.png
mycpname osmc_red_house osmc_red_osmc_red_house.png
mycpname osmc_red_l osmc_red_osmc_red_l.png
mycpname osmc_red_m osmc_red_osmc_red_m.png
mycpname osmc_red_lower osmc_red_osmc_red_lower.png
mycpname osmc_red_pointer osmc_red_osmc_red_pointer.png
mycpname osmc_red_pointer_line osmc_red_osmc_red_pointer_line.png
mycpname osmc_red_rectangle osmc_red_osmc_red_rectangle.png
mycpname osmc_red_rectangle_line osmc_red_osmc_red_rectangle_line.png
mycpname osmc_red_slash osmc_red_osmc_red_slash.png
mycpname osmc_red_stripe osmc_red_osmc_red_stripe.png
mycpname osmc_red_t osmc_red_osmc_red_t.png
mycpname osmc_red_triangle osmc_red_osmc_red_triangle.png
mycpname osmc_red_triangle_line osmc_red_osmc_red_triangle_line.png
mycpname osmc_red_triangle_turned osmc_red_osmc_red_triangle_turned.png
mycpname osmc_red_turned_t osmc_red_osmc_red_turned_t.png
mycpname osmc_red_upper osmc_red_osmc_red_upper.png
mycpname osmc_red_x osmc_red_osmc_red_x.png

mycpname osmc_white_arch osmc_white_osmc_white_arch.png
mycpname osmc_white_backslash osmc_white_osmc_white_backslash.png
mycpname osmc_white_bar osmc_white_osmc_white_bar.png
mycpname osmc_white_bicycle osmc_white_osmc_white_bicycle.png
mycpname osmc_white_bowl osmc_white_osmc_white_bowl.png
mycpname osmc_white_circle osmc_white_osmc_white_circle.png
mycpname osmc_white_circle_arrow osmc_white_osmc_white_circle_arrow.png
mycpname osmc_white_corner osmc_white_osmc_white_corner.png
mycpname osmc_white_cross osmc_white_osmc_white_cross.png
mycpname osmc_white_diamond osmc_white_osmc_white_diamond.png
mycpname osmc_white_diamond_line osmc_white_osmc_white_diamond_line.png
mycpname osmc_white_dot osmc_white_osmc_white_dot.png
mycpname osmc_white_drop_line osmc_white_osmc_white_drop_line.png
mycpname osmc_white_fork osmc_white_osmc_white_fork.png
mycpname osmc_white_hiker osmc_white_osmc_white_hiker.png
mycpname osmc_white_house osmc_white_osmc_white_house.png
mycpname osmc_white_l osmc_white_osmc_white_l.png
mycpname osmc_white_m osmc_white_osmc_white_m.png
mycpname osmc_white_lower osmc_white_osmc_white_lower.png
mycpname osmc_white_pointer osmc_white_osmc_white_pointer.png
mycpname osmc_white_pointer_line osmc_white_osmc_white_pointer_line.png
mycpname osmc_white_rectangle osmc_white_osmc_white_rectangle.png
mycpname osmc_white_rectangle_line osmc_white_osmc_white_rectangle_line.png
mycpname osmc_white_slash osmc_white_osmc_white_slash.png
mycpname osmc_white_stripe osmc_white_osmc_white_stripe.png
mycpname osmc_white_t osmc_white_osmc_white_t.png
mycpname osmc_white_triangle osmc_white_osmc_white_triangle.png
mycpname osmc_white_triangle_line osmc_white_osmc_white_triangle_line.png
mycpname osmc_white_triangle_turned osmc_white_osmc_white_triangle_turned.png
mycpname osmc_white_turned_t osmc_white_osmc_white_turned_t.png
mycpname osmc_white_upper osmc_white_osmc_white_upper.png
mycpname osmc_white_x osmc_white_osmc_white_x.png

mycpname osmc_yellow_arch osmc_yellow_osmc_yellow_arch.png
mycpname osmc_yellow_backslash osmc_yellow_osmc_yellow_backslash.png
mycpname osmc_yellow_bar osmc_yellow_osmc_yellow_bar.png
mycpname osmc_yellow_bicycle osmc_yellow_osmc_yellow_bicycle.png
mycpname osmc_yellow_bowl osmc_yellow_osmc_yellow_bowl.png
mycpname osmc_yellow_circle osmc_yellow_osmc_yellow_circle.png
mycpname osmc_yellow_circle_arrow osmc_yellow_osmc_yellow_circle_arrow.png
mycpname osmc_yellow_corner osmc_yellow_osmc_yellow_corner.png
mycpname osmc_yellow_cross osmc_yellow_osmc_yellow_cross.png
mycpname osmc_yellow_diamond osmc_yellow_osmc_yellow_diamond.png
mycpname osmc_yellow_diamond_line osmc_yellow_osmc_yellow_diamond_line.png
mycpname osmc_yellow_dot osmc_yellow_osmc_yellow_dot.png
mycpname osmc_yellow_drop_line osmc_yellow_osmc_yellow_drop_line.png
mycpname osmc_yellow_fork osmc_yellow_osmc_yellow_fork.png
mycpname osmc_yellow_hiker osmc_yellow_osmc_yellow_hiker.png
mycpname osmc_yellow_house osmc_yellow_osmc_yellow_house.png
mycpname osmc_yellow_l osmc_yellow_osmc_yellow_l.png
mycpname osmc_yellow_m osmc_yellow_osmc_yellow_m.png
mycpname osmc_yellow_lower osmc_yellow_osmc_yellow_lower.png
mycpname osmc_yellow_pointer osmc_yellow_osmc_yellow_pointer.png
mycpname osmc_yellow_pointer_line osmc_yellow_osmc_yellow_pointer_line.png
mycpname osmc_yellow_rectangle osmc_yellow_osmc_yellow_rectangle.png
mycpname osmc_yellow_rectangle_line osmc_yellow_osmc_yellow_rectangle_line.png
mycpname osmc_yellow_slash osmc_yellow_osmc_yellow_slash.png
mycpname osmc_yellow_stripe osmc_yellow_osmc_yellow_stripe.png
mycpname osmc_yellow_t osmc_yellow_osmc_yellow_t.png
mycpname osmc_yellow_triangle osmc_yellow_osmc_yellow_triangle.png
mycpname osmc_yellow_triangle_line osmc_yellow_osmc_yellow_triangle_line.png
mycpname osmc_yellow_triangle_turned osmc_yellow_osmc_yellow_triangle_turned.png
mycpname osmc_yellow_turned_t osmc_yellow_osmc_yellow_turned_t.png
mycpname osmc_yellow_upper osmc_yellow_osmc_yellow_upper.png
mycpname osmc_yellow_x osmc_yellow_osmc_yellow_x.png

mycpname osmc_ammonit osmc_other_osmc_ammonit.png
mycpname osmc_black_horse osmc_other_osmc_black_horse.png
mycpname osmc_black_red_diamond osmc_other_osmc_black_red_diamond.png
mycpname osmc_blue_grape osmc_other_osmc_blue_grape.png
mycpname osmc_blue_wheelchair osmc_other_osmc_blue_wheelchair.png
mycpname osmc_brown_bar osmc_other_osmc_brown_bar.png
mycpname osmc_brown_dot osmc_other_osmc_brown_dot.png
mycpname osmc_brown_x osmc_other_osmc_brown_x.png
mycpname osmc_green_wheelchair osmc_other_osmc_green_wheelchair.png
mycpname osmc_green_z osmc_other_osmc_green_z.png
mycpname osmc_heart osmc_other_osmc_heart.png
mycpname osmc_mine osmc_other_osmc_mine.png
mycpname osmc_purple_bar osmc_other_osmc_purple_bar.png
mycpname osmc_purple_diamond osmc_other_osmc_purple_diamond.png
mycpname osmc_purple_dot osmc_other_osmc_purple_dot.png
mycpname osmc_purple_l osmc_other_osmc_purple_l.png
mycpname osmc_purple_m osmc_other_osmc_purple_m.png
mycpname osmc_purple_pointer osmc_other_osmc_purple_pointer.png
mycpname osmc_purple_rectangle osmc_other_osmc_purple_rectangle.png
mycpname osmc_purple_stripe osmc_other_osmc_purple_stripe.png
mycpname osmc_red_blue_diamond osmc_other_osmc_red_blue_diamond.png
mycpname osmc_red_diamond_green_grape osmc_other_osmc_red_diamond_green_grape.png
mycpname osmc_red_diamond_yellow_grape osmc_other_osmc_red_diamond_yellow_grape.png
mycpname osmc_red_grape osmc_other_osmc_red_grape.png
mycpname osmc_red_wheelchair osmc_other_osmc_red_wheelchair.png
mycpname osmc_shell_modern osmc_other_osmc_shell_modern.png
mycpname osmc_tower osmc_other_osmc_tower.png
mycpname osmc_white_black_diamond osmc_other_osmc_white_black_diamond.png
mycpname osmc_white_red_diamond osmc_other_osmc_white_red_diamond.png
mycpname osmc_white_shell osmc_other_osmc_white_shell.png
mycpname osmc_white_wheelchair osmc_other_osmc_white_wheelchair.png
mycpname osmc_wolfshook osmc_other_osmc_wolfshook.png
mycpname osmc_yellow_hexagon osmc_other_osmc_yellow_hexagon.png
mycpname osmc_yellow_mz osmc_other_osmc_yellow_mz.png
mycpname osmc_yellow_sg osmc_other_osmc_yellow_sg.png
mycpname osmc_yellow_shell osmc_other_osmc_yellow_shell.png

# Additional
mycpname cuisine additional_cuisine.png
mycpname website additional_website.png
mycpname email additional_email.png
mycpname facebook additional_facebook.png
mycpname twitter additional_twitter.png
mycpname youtube additional_youtube.png
mycpname vk additional_vk.png
mycpname fee_yes additional_fee_yes.png
mycpname fee_no additional_fee_no.png
mycpname ele additional_ele.png
mycpname width additional_width.png
mycpname height additional_height.png
mycpname abandoned additional_abandoned.png
mycpname disused additional_disused.png
mycpname drinking_water_yes additional_drinking_water_yes.png
mycpname drinking_water_no additional_drinking_water_no.png
mycpname seasonal_no additional_seasonal_no.png
mycpname seasonal_yes additional_seasonal_yes.png
mycpname seasonal_summer additional_seasonal_summer.png
mycpname seasonal_winter additional_seasonal_winter.png
mycpname route_bus_ref transport_bus_stop.png
mycpname route_tram_ref additional_tram.png
mycpname route_trolleybus_ref additional_trolleybus.png
mycpname route_train_ref transport_train_station2.png
mycpname route_share_taxi_ref additional_share_taxi.png
mycpname route_railway_ref transport_train_station.png
mycpname route_ferry_ref transport_ferry_terminal.png
mycpname route_funicular_ref transport_funicular.png
mycpname route_monorail_ref additional_monorail.png
mycpname route_light_rail_ref additional_light_rail.png
mycpname shop_yes shopping_convenience.png
mycpname beauty_salon_nails additional_beauty_salon_nails.png
mycpname historic_yes tourist_archaeological2.png
mycpname lit_yes additional_lit_yes.png
mycpname lit_no additional_lit_no.png
mycpname elevator_yes poi_colored_elevator.png
mycpname elevator poi_colored_elevator.png
mycpname theatre_genre_comedy additional_comedy.png
mycpname temperature additional_temperature.png
mycpname conveying_yes additional_conveying_yes.png
mycpname shoes_women additional_shoes_women.png
mycpname shoes_children additional_shoes_children.png
mycpname shoes_men shopping_shoes.png
mycpname cargo_vehicle additional_cargo_vehicle.png
mycpname cargo_passengers additional_cargo_passengers.png
mycpname bridge_movable_lift additional_bridge_movable_lift.png
mycpname bridge_structure_arch additional_bridge_structure_arch.png
mycpname bridge_structure_beam additional_bridge_structure_beam.png
mycpname bridge_structure_suspension additional_bridge_structure_suspension.png
mycpname bridge_type_movable additional_bridge_type_movable.png
mycpname building_type_basilica additional_building_type_basilica.png
mycpname building_type_cathedral additional_building_type_cathedral.png
mycpname building_type_chapel additional_building_type_chapel.png
mycpname building_type_church additional_building_type_church.png
mycpname building_type_monastery additional_building_type_monastery.png
mycpname building_type_mosque additional_building_type_mosque.png
mycpname building_type_pyramid additional_building_type_pyramid.png
mycpname building_type_synagogue additional_building_type_synagogue.png
mycpname tourism_yes additional_tourism_yes.png
mycpname supervised_yes additional_supervised_yes.png
mycpname supervised_no additional_supervised_no.png
mycpname access_no additional_access_no.png
mycpname access_private additional_access_private.png
mycpname smoking_yes additional_smoking_yes.png
mycpname smoking_no additional_smoking_no.png
mycpname covered_yes additional_covered_yes.png
mycpname covered_no additional_covered_no.png
mycpname male_yes additional_male_yes.png
mycpname male_no additional_male_no.png
mycpname female_yes additional_female_yes.png
mycpname female_no additional_female_no.png
mycpname wheelchair_yes additional_wheelchair.png
mycpname wheelchair_designated additional_wheelchair.png
mycpname wheelchair_no additional_wheelchair_no.png
mycpname bench_yes additional_bench_yes.png
mycpname bench_no additional_bench_no.png
mycpname bin_yes additional_bin_yes.png
mycpname bin_no additional_bin_no.png
mycpname surface_sand additional_surface_sand.png
mycpname recycling_container amenity_waste_disposal.png
mycpname recycling_centre additional_recycling_centre.png
mycpname crossing_traffic_signals additional_crossing_traffic_lights.png
mycpname crossing_unmarked additional_crossing_unmarked.png
mycpname crossing_uncontrolled additional_crossing_uncontrolled.png
mycpname vending_parking_tickets additional_vending_parking_tickets.png
mycpname vending_cigarettes additional_vending_cigarettes.png
mycpname vending_excrement_bags additional_vending_excrement_bags.png
mycpname vending_public_transport_tickets additional_vending_public_transport_tickets.png
mycpname vending_drinks additional_vending_drinks.png
mycpname vending_sweets additional_vending_sweets.png
mycpname vending_parcel_pickup_mail_in additional_vending_parcel_pickup_mail_in.png
mycpname vending_condoms additional_vending_condoms.png
mycpname vending_stamps additional_vending_stamps.png
mycpname product_brick additional_product_brick.png
mycpname backrest_yes additional_backrest_yes.png
mycpname backrest_no additional_backrest_no.png
mycpname construction_yes additional_construction_yes.png
mycpname atm_yes additional_atm_yes.png
mycpname atm_no additional_atm_no.png
mycpname compressed_air_yes additional_compressed_air_yes.png
mycpname compressed_air_no additional_compressed_air_no.png
mycpname car_wash_yes additional_car_wash_yes.png
mycpname car_wash_no additional_car_wash_no.png
mycpname vacuum_cleaner_yes additional_vacuum_cleaner_yes.png
mycpname button_operated_yes additional_button_operated_yes.png
mycpname button_operated_no additional_button_operated_no.png
mycpname shop_additional_yes additional_shop_additional_yes.png
mycpname salt_yes additional_salt_yes.png
mycpname dispensing_yes additional_dispensing_yes.png
mycpname dispensing_no additional_dispensing_no.png
mycpname aerodrome_type_military additional_aerodrome_type_military.png
mycpname telescope_type_optical additional_telescope_type_optical.png
mycpname telescope_type_radio additional_telescope_type_radio.png

#Additional category
mycpname payment_type additional_category_payment_type.png

#Xmas
mygroup xmas xmas_tree.png
mycpname xmas_event xmas_event.png
mycpname xmas_market xmas_market.png
mycpname xmas_pyramid xmas_pyramid.png
mycpname xmas_shop xmas_shop.png
mycpname xmas_tree xmas_tree.png
