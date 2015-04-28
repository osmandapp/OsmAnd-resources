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

mygroup landuse landuse_coniferous.png
mycp landuse grass landuse_grass.png
mycpname forest landuse_coniferous_and_deciduous.png               # Keep shaders with background color, cannot be replaced by icons!
mycpname wood landuse_coniferous_and_deciduous.png
mycp natural beach tourist_beach2.png                     # Keep shaders with background color, cannot be replaced by icons!
mycp landuse cemetery place_of_worship_christian3.png    # Keep shaders with background color, cannot be replaced by icons!
mycp amenity grave_yard place_of_worship_christian3.png  # Keep shaders with background color, cannot be replaced by icons!
#mycp natural scrub landuse_scrub.png                     # Keep shaders with background color, cannot be replaced by icons!
#mycp natural swamp landuse_swamp.png                     # Keep shaders with background color, cannot be replaced by icons!
mycp tourism zoo tourist_zoo.png                         # Keep shaders with background color, cannot be replaced by icons!
mycp military danger_area poi_danger_area.png
mycp military nuclear_explosion_site poi_nuclear_explosion_site.png
mycp natural glacier poi_peak2.png                       # Keep shaders with background color, cannot be replaced by icons!
mycp landuse landfill landuse_landfill.png
#mycpname wetland landuse_wetland.png

mycp stroke black functional-icons_black_stroke.png
mycp stroke darkgreen functional-icons_darkgreen_stroke.png
mycp stroke gray functional-icons_gray_stroke.png
mycp stroke gray_triangle functional-icons_gray_stroke_triangle.png
mycp stroke lightorange_left functional-icons_lightorange_left_stroke.png
mycp stroke white functional-icons_white_stroke.png
mycp stroke brown_right functional-icons_brown_right_stroke.png

## Natural
mygroup natural poi_peak2.png
mycp natural cave_entrance poi_cave.png
mycp natural geyser water_geyser.png  #scale 0.375
mycp natural hot_spring water_hot_spring.png  #scale 0.375
mycp natural peak_big functional-icons_peak_big.png  #needs black icon!  #scale 0.5
mycp natural peak functional-icons_peak.png  #needs black icon!  #scale 0.5
mycp natural peak_night_big functional-icons_peak_night_big.png  #For night orienteering use orange similar to contour lines (=day version with color #CC6600)  #scale 0.5
mycp natural peak_night functional-icons_peak_night.png  #For night orienteering use orange similar to contour lines (=day version with color #CC6600)  #scale 0.5
mycp natural saddle functional-icons_saddle.png
mycp natural sinkhole functional-icons_sinkhole.png
mycp natural spring water_spring.png  #scale 0.375
mycp natural stone functional-icons_stone.png  #scale 0.375
mycp natural tree_broadleaved functional-icons_tree_broadleaved.png
mycp natural tree_cypress functional-icons_tree_cypress.png
mycp natural tree functional-icons_tree.png  #scale 0.25
mycp natural tree_leafless functional-icons_tree_leafless.png
mycp natural tree_needleleaved functional-icons_tree_needleleaved.png
mycp natural tree_palm functional-icons_tree_palm.png
mycp natural volcano_active_big functional-icons_volcano_active_big.png
mycp natural volcano_active functional-icons_volcano_active.png
mycp natural volcano_big functional-icons_volcano_big.png
mycp natural volcano functional-icons_volcano.png  #Is poi_peak.png with color #D40000  #scale 0.5
mycp waterway rapids barrier_rapids.png  #scale 0.375
mycpname waterfall water_waterfall.png  #scale 0.375


## Location dots
mygroup administrative poi_boundary_administrative.png
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
mycp place city poi_city.png  #scale 0.375
mycp place town poi_town.png  #scale .25

## Barrier dots
mycp barrier small_black_1 functional-icons_point_black_1.png  #scale 0.25
mycp barrier small_black_2 functional-icons_point_black_2.png  #scale 0.25
mycp barrier small_black_3 functional-icons_point_black_3.png  #scale 0.25
mycp barrier small_black_4 functional-icons_point_black_4.png  #scale 0.25
mycp barrier small_white_1 functional-icons_point_white_1.png  #scale 0.25
mycp barrier small_white_2 functional-icons_point_white_2.png  #scale 0.25
mycp barrier small_white_3 functional-icons_point_white_3.png  #scale 0.25
mycp barrier small_white_4 functional-icons_point_white_4.png  #scale 0.25
mycp barrier small_red_1 functional-icons_point_red_1.png  #scale 0.25
mycp barrier small_red_2 functional-icons_point_red_2.png  #scale 0.25
mycp barrier small_red_3 functional-icons_point_red_3.png  #scale 0.25
mycp barrier small_red_4 functional-icons_point_red_4.png  #scale 0.25

## Emergency + Health
mygroup emergency emergency_emergency_phone.png
mycp amenity fire_station emergency_firestation4.png
mycp amenity police emergency_police3.png
mycp emergency fire_hydrant emergency_fire_hydrant.png
mycp emergency phone emergency_emergency_phone.png

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
mycp drinking_water yes overlays_drinking_water_yes.png
mycp drinking_water no overlays_drinking_water_no.png

mygroup healthcare health_pharmacy.png
mycp amenity dentist health_dentist.png
mycp amenity doctors health_doctors.png
mycp amenity hospital health_hospital2.png
mycpname clinic health_hospital.png
mycp amenity nursing_home health_nursing_home.png
mycp amenity pharmacy health_pharmacy2.png
mycp amenity veterinary health_veterinary.png


## Traffic + Transportation
mygroup transportation transport_taxi_rank.png
mygroup road_obstacle transport_speedbump.png
mygroup personal_transport shopping_car.png
mygroup air_transport transport_aerodrome.png
mygroup water_transport transport_ferry_terminal.png
mygroup bicycle_transport shopping_bicycle.png
mygroup aerialway_transport transport_aerialway_station.png
mycp highway crossing_bg functional-icons_highway_crossing_bg.png
mycp highway crossing_traffic_signals functional-icons_highway_crossing_traffic_signals.png
mycp highway crossing transport_zebra_crossing2.png
mycp highway crossing_uncontrolled functional-icons_highway_crossing_uncontrolled.png
mycp highway crossing_unmarked functional-icons_highway_crossing_unmarked.png
mycp highway ford transport_ford.png
mycp highway milestone functional-icons_milestone.png
mycp highway mini_roundabout transport_miniroundabout_anticlockwise.png
mycp highway noexit functional-icons_noexit.png
mycp highway passing_place functional-icons_passing_place.png
mycp highway speed_camera transport_speedcamera.png
mycp highway steps transport_highway_steps.png
mycp highway traffic_signals functional-icons_traffic_lights.png
mycp traffic_calming bump transport_speedbump.png
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
mycp harbour yes poi_harbour.png

mygroup fuel transport_fuel.png
mygroup filling_station transport_fuel.png
mycp amenity charging_station transport_charging_station.png
mycp amenity fuel_lpg transport_fuel_lpg.png
mycp amenity fuel transport_fuel.png

mygroup parking transport_parking.png
mycp amenity parking transport_parking.png
mycp amenity parking_private transport_parking_private2.png
mycp amenity parking_paid transport_parking_car_paid.png
mycp amenity parking_multi_storey transport_parking_multi-storey.png
mycp amenity parking_multi_storey_paid transport_parking_multi-storey_paid.png
mycp amenity parking_underground transport_parking_underground.png
mycp amenity parking_underground_paid transport_parking_underground_paid.png
mycp amenity bicycle_parking transport_parking_bicycle.png
mycp bicycle_parking bg transport_parking_bicycle_bg.png
mycp bicycle_parking stands transport_parking_bicycle_stands.png
mycp bicycle_parking wall_loops transport_parking_bicycle_wall_loops.png
mycp bicycle_parking rack transport_parking_bicycle_rack.png
mycp bicycle_parking anchors transport_parking_bicycle_anchors.png
mycp bicycle_parking building transport_parking_bicycle_building.png
mycp bicycle_parking bollard transport_parking_bicycle_bollard.png
mycp bicycle_parking informal transport_parking_bicycle_informal.png
mycp amenity motorcycle_parking transport_parking_motorcycle.png
mycp amenity motorcycle_parking_paid transport_parking_motorcycle_paid.png

mygroup public_transport transport_bus_stop.png
mycp amenity bus_station transport_bus_station2.png
mycpname public_transport_station transport_bus_station.png
mycpname public_transport_stop_position transport_bus_stop2.png
mycp highway bus_stop transport_bus_stop.png
mycp highway bus_stop_small functional-icons_bus_stop_small.png
mycp highway bus_stop_round_small functional-icons_bus_stop_round_small.png
mycp highway bus_stop_round_big functional-icons_bus_stop_round_big.png
mycp highway bus_stop_round_small_night functional-icons_bus_stop_round_small_night.png
mycp highway bus_stop_round_big_night functional-icons_bus_stop_round_big_night.png
mycp public_transport platform transport_bus_stop.png
mycp amenity ferry_terminal transport_ferry_terminal.png
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
mycp waterway lock_gate functional-icons_lock_gate.png  #scale 0.5
mycp waterway dock transport_dock.png

mycpname halt_small functional-icons_halt.png  #scale 0.25
mycpname halt transport_halt.png  #scale 0.25
mycp railway level_crossing functional-icons_level_crossing.png  #scale 0.5
mycp railway platform transport_train_station2.png
mycp railway station_disused functional-icons_train_station_disused.png
mycp railway station_small_disused functional-icons_station_small_disused.png
mycp railway station_small functional-icons_station_small.png  #scale 0.375
mycp railway station_subway transport_station_subway.png
mycp railway station transport_train_station.png
mycp railway tram_stop_round_big functional-icons_blue_stop_round_big.png
mycp railway tram_stop_round_big_night functional-icons_blue_stop_round_big_night.png
mycp railway tram_stop_round_small functional-icons_blue_stop_round_small.png
mycp railway tram_stop_round_small_night functional-icons_blue_stop_round_small_night.png
mycp railway tram_stop transport_tram_stop.png

mycp railway subway_entrance functional-icons_subway_entrance.png
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

mycp aerialway station_small functional-icons_halt.png  #scale 0.25
mycp aerialway station transport_aerialway_station.png  #scale 0.375

mycp aeroway aerodrome_abandoned functional-icons_aerodrome_abandoned.png
mycp aeroway aerodrome transport_aerodrome.png
mycp aeroway airport transport_airport.png
mycp aeroway gate transport_airport_gate.png
mycp aeroway helipad transport_helicopter_pad.png


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
mycp barrier toll_booth barrier_toll_booth.png
mycp barrier turnstile barrier_turnstile.png
mycp entrance yes barrier_entrance2.png
mycp entrance exit functional-icons_entrance_exit.png
mycp entrance main functional-icons_entrance3.png
mycp amenity parking_entrance transport_parking_entrance.png
mycp building entrance barrier_entrance.png


## Accommodation
mygroup accomodation accommodation_hotel.png
mycp amenity shelter accommodation_shelter2.png
mycp tourism alpine_hut accommodation_alpinehut.png
mycp tourism apartment accommodation_apartment.png
mycp tourism camp_site accommodation_camping.png
mycp tourism caravan_site accommodation_caravan_park.png
mycp tourism chalet accommodation_chalet.png
mycp tourism guest_house accommodation_bed_and_breakfast.png
mycp tourism hostel accommodation_hostel.png
mycp tourism hotel accommodation_hotel.png
mycp tourism motel accommodation_motel.png
mycpname wilderness_hut accommodation_wilderness_hut.png


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
mycp attraction water_slide tourist_water_slide.png
mycp tourism aquarium tourist_aquarium.png
mycp tourism artwork tourist_artwork.png
mycp tourism attraction tourist_attraction.png
mycp tourism information tourist_information.png
mycp tourism museum tourist_museum.png
mycp tourism picnic_site tourist_picnic.png
mycp tourism theme_park tourist_theme_park.png
mycp tourism viewpoint tourist_view_point.png
mycp tourism zoo tourist_zoo.png
mycpname city_wall tourist_city_wall.png
mycpname clock tourist_clock.png

## Entertainment
mygroup entertainment tourist_cinema.png
mygroup club tourist_night_club.png
mycp amenity arts_centre tourist_art_gallery2.png
mycp amenity casino tourist_casino.png
mycp amenity cinema tourist_cinema.png
mycp amenity nightclub tourist_night_club.png
mycp amenity stripclub tourist_night_club.png
mycp amenity theatre tourist_theatre.png


## Historic
mygroup historic tourist_archaeological2.png
mycp historic archaeological_site tourist_archaeological2.png
mycp historic battlefield tourist_battlefield.png
mycp historic boundary_stone poi_boundary_administrative.png
mycp historic cannon tourist_cannon.png
mycp historic castle tourist_castle2.png
mycpname city_gate barrier_sally_port.png
mycp historic fort tourist_castle2.png
mycp historic memorial tourist_memorial.png
mycp historic mine poi_mine_abandoned.png
mycp historic monument tourist_monument.png
mycp historic ruins tourist_ruin.png
mycp historic rune_stone tourist_rune_stone.png
mycp historic ship tourist_ship.png
mycp historic wayside_cross tourist_wayside_cross.png
mycp historic wayside_shrine tourist_wayside_shrine.png
mycpname wreck tourist_wreck.png
mycpname palaeontological_site tourist_palaeontological_site.png
mycp building pyramid tourist_pyramid.png
mycpname tomb tourist_memorial.png

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
mycp sport hockey sport_hockey.png
mycp sport horse_racing sport_horse_racing.png
mycp sport motor sport_motorracing.png
mycp sport paragliding sport_paragliding.png
mycp sport rugby_league sport_rugby_league.png
mycp sport rugby_union sport_rugby_union.png
mycp sport sailing sport_sailing.png
mycp sport scuba_diving sport_scuba_diving.png  #derived from NPS public library
mycp sport shooting sport_shooting.png
mycp sport skateboard sport_skateboard.png
mycp sport skating sport_iceskating.png
mycp sport skiing sport_skiing_downhill.png
mycp sport soccer sport_soccer.png
mycp sport stadium sport_stadium.png
mycp sport surfing sport_surfing.png
mycp sport swimming sport_swimming_outdoor.png
mycp sport table_tennis sport_table_tennis.png
mycp sport tennis sport_tennis.png
mycp sport volleyball sport_volleyball.png


## Leisure
mygroup leisure sport_playground.png
mycp leisure beach_resort tourist_beach_resort.png
mycp leisure bird_hide poi_tower_lookout.png
mycp leisure fishing sport_fishing.png  #used shop=fish turned by 45 degrees for now
mycp leisure ice_rink sport_iceskating.png
mycp leisure miniature_golf sport_miniature_golf.png
mycp leisure playground sport_playground.png
mycp leisure sports_centre sport_leisure_centre2.png
mycp leisure water_park sport_swimming_outdoor.png
mycp amenity sauna sport_sauna.png

mygroup geocache poi_point_of_interest.png
mycp geocache not_found poi_point_of_interest.png
mycp geocache found poi_point_of_interest.png


## Other amenities
mygroup other amenity_post_office.png
mygroup place_of_worship place_of_worship_unknown.png
mygroup internet_access amenity_internet_access.png
mycp amenity bench functional-icons_bench.png
mycp amenity car_wash amenity_car_wash.png
mycp amenity car_wash_self_service amenity_car_wash_self_service.png
mycp amenity fountain amenity_fountain2.png
mycp amenity fountain_night functional-icons_fountain2_night.png
mycp amenity monastery place_of_worship_monastery.png
mycpname historic_monastery place_of_worship_monastery.png
mycp amenity place_of_worship place_of_worship_unknown.png
mycp amenity post_box amenity_post_box.png
mycp amenity post_office amenity_post_office2.png
mycp amenity prison amenity_prison.png
mycp amenity recycling amenity_recycling.png
mycp amenity telephone amenity_telephone.png
mycp amenity toilets amenity_toilets.png
mycp amenity vehicle_ramp amenity_vehicle_ramp.png
mycpname service_tyres amenity_service_tyres.png
mycp religion christian place_of_worship_christian3.png
mycp religion jewish place_of_worship_jewish3.png
mycp religion muslim place_of_worship_islamic3.png
mycp religion sikh place_of_worship_sikh3.png
mycp religion buddhist place_of_worship_buddhist3.png
mycp religion hindu place_of_worship_hindu3.png
mycp religion shinto place_of_worship_shinto3.png
mycp religion taoist place_of_worship_taoist.png
mycpname brothel amenity_brothel.png
mycpname smoking_area amenity_smoking_area.png
mycpname studio amenity_studio.png
mycpname waste_basket amenity_waste_bin.png
mycpname waste_basket2 amenity_waste_basket.png
mycpname waste_disposal amenity_waste_disposal.png

mycpname internet_access_wlan amenity_internet_access_wlan.png
#! mycp amenity grave_yard place_of_worship_christian3.png  #already defined as icon in the shader section

mygroup craft craft_tailor.png
mycpname craft_beekeeper craft_beekeeper.png
mycpname craft_blacksmith craft_blacksmith.png
mycpname craft_brewery craft_brewery.png
mycpname craft_locksmith craft_locksmith.png
mycpname craft_painter craft_painter.png
mycpname craft_tailor craft_tailor.png

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
mycp office government amenity_public_building.png

mygroup service amenity_service.png
mygroup landuse landuse_landuse.png

## Education
mygroup education education_university.png
mycp amenity college education_college.png
mycpname kindergarten education_kindergarten.png
mycp amenity school education_school.png
mycp amenity university education_university.png


## Man made
mygroup man_made power_station_wind2.png
mygroup transport_construction transport_bridge.png
mygroup water_supply poi_water_tower.png
mygroup power power_station.png
mygroup communication amenity_telephone.png
mygroup trash_disposal landuse_landfill.png
mycpname bridge poi_bridge.png
mycpname tunnel poi_tunnel.png
mycp amenity hunting_stand poi_hunting_stand.png
mycp highway street_lamp functional-icons_street_lamp.png
mycp highway street_lamp_lit functional-icons_street_lamp_lit.png
mycp landuse abandoned functional-icons_abandoned.png
mycp man_made adit poi_adit.png
mycp man_made antenna poi_antenna.png
mycp man_made chimney poi_chimney.png
mycp man_made crane poi_crane.png
mycp man_made mast poi_mast.png
mycp man_made mineshaft poi_mine.png
mycp man_made monitoring_station_radar poi_monitoring_station_radar.png
mycp man_made observatory_astronomical poi_observatory_astronomical.png
mycp man_made observatory poi_observatory.png
mycp man_made petroleum_well poi_petroleum_well.png
mycp man_made survey_point poi_survey_point.png
mycp man_made tower poi_tower.png
mycp man_made tower_type_bell_tower poi_tower_bell_tower.png
mycp man_made tower_type_communication poi_tower_communications2.png
mycp man_made tower_type_cooling poi_tower_cooling.png
mycp man_made tower_type_lighting poi_tower_lighting.png
mycp man_made water_tower poi_water_tower.png
mycp man_made windmill poi_windmill.png
mycp no icon functional-icons_no_icon.png
mycp power station_coal power_station_coal.png
mycp power station_gas power_station_gas.png
mycp power station_geothermal power_station_geothermal.png
mycp power station_nuclear power_station_nuclear.png
mycp power station_oil power_station_oil.png
mycp power station power_station.png
mycp power station_solar power_station_solar.png
mycp power station_water power_station_water2.png
mycp power station_wind power_station_wind.png
mycp power substation power_transformer2.png
mycp power tower_big functional-icons_power_tower_big.png
mycp power tower functional-icons_power_tower.png
mycp power tower_small functional-icons_power_tower_small.png
mycp power tower_small2 functional-icons_power_tower_small2.png
mycp railway buffer_stop poi_buffer_stop.png
mycpname works poi_works.png
mycpname military_bunker poi_military_bunker.png
mygroup military poi_military_bunker.png


## Food and Drink
mygroup restaurants food_restaurant.png
mygroup sustenance food_fastfood.png
mygroup cafe_and_restaurant food_restaurant.png
mycp amenity bar food_bar.png
mycp amenity biergarten food_biergarten.png
mycp amenity cafe food_cafe.png
mycp amenity drinking_water food_drinkingtap.png
mycp amenity fast_food food_fastfood.png
mycp amenity food_court food_fastfood.png
mycp amenity pub food_pub.png
mycp amenity restaurant food_restaurant.png
mycp man_made water_well food_water_well.png

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

## Skimap
mycp skimap overlay_advanced skimap_overlay_advanced.png
mycp skimap overlay_easy skimap_overlay_easy.png
mycp skimap overlay_expert skimap_overlay_expert.png
mycp skimap overlay_extreme skimap_overlay_extreme.png
mycp skimap overlay_freeride skimap_overlay_freeride.png
mycp skimap overlay_intermediate skimap_overlay_intermediate.png
mycp skimap overlay_novice skimap_overlay_novice.png
mycp piste downhill skimap_piste_downhill.png
mycp piste hike skimap_piste_hike.png
mycp piste nordic skimap_piste_nordic.png
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
mycp shop general shopping_convenience.png
mycp shop gift shopping_gift.png
mycp shop greengrocer shopping_greengrocer.png
mycp shop hairdresser shopping_hairdresser.png
mycp shop hardware shopping_diy.png
mycp shop hearing_aids shopping_hearing_aids.png
mycpname ice_cream food_ice_cream.png
mycp shop jewelry shopping_jewelry2.png
mycp shop kiosk shopping_kiosk.png
mycp shop laundry shopping_laundrette.png
mycp shop mall shopping_department_store.png
mycp shop mobile_phone shopping_mobile_phone.png
mycp shop motorcycle shopping_motorcycle.png
mycp shop musical_instrument shopping_music.png
mycp shop optician shopping_opticians.png
mycp shop outdoor shopping_tackle.png
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


# mygroup custom_id icons8 #TODO
mygroup user_defined icons8_user.png
mygroup user_defined_other icons8_user.png
mygroup osmwiki icons8_wikipedia.png
mygroup name_finder icons8_web_search.png
mycp osmand waypoint functional-icons_waypoint.png
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