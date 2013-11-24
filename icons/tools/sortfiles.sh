#!/bin/bash

mygroup() {
 	echo "${2}  style-icons/mm_${1}.png"
 	cp ../png/mdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mm_${1}.png
 	cp ../png/hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mm_${1}.png
 	cp ../png/xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mm_${1}.png
 	cp ../png/big-mdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mx_${1}.png
 	cp ../png/big-hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mx_${1}.png
 	cp ../png/big-xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mx_${1}.png
}


mycp() {
	mygroup ${1}_${2} $3
}



## Shaders ! # copy all shaders untouched
cp ../png/mdpi/h_* ../../rendering_styles/style-icons/drawable-mdpi/
cp ../png/hdpi/h_* ../../rendering_styles/style-icons/drawable-hdpi/
cp ../png/xhdpi/h_* ../../rendering_styles/style-icons/drawable-xhdpi/

mygroup landuse landuse_coniferous.png
mycp landuse grass landuse_grass.png
mycp landuse forest landuse_coniferous.png               # Keep shaders with background color, cannot be replaced by icons!
mycp natural beach tourist_beach.png                     # Keep shaders with background color, cannot be replaced by icons!
mycp landuse cemetery place_of_worship_christian3.png    # Keep shaders with background color, cannot be replaced by icons!
mycp amenity grave_yard place_of_worship_christian3.png  # Keep shaders with background color, cannot be replaced by icons!
mycp natural scrub landuse_scrub.png                     # Keep shaders with background color, cannot be replaced by icons!
mycp natural swamp landuse_swamp.png                     # Keep shaders with background color, cannot be replaced by icons!
mycp tourism zoo tourist_zoo.png                         # Keep shaders with background color, cannot be replaced by icons!
mycp military danger_area poi_mine.png                   # Keep shaders with background color, cannot be replaced by icons!
mycp natural glacier poi_peak2.png                       # Keep shaders with background color, cannot be replaced by icons!


## Natural
mygroup natural poi_peak2.png
mycp natural peak functional-icons_peak.png  #needs black icon!  #scale 0.5
mycp natural peak_night functional-icons_peak_night.png  #For night orienteering use orange similar to contour lines (=day version with color #CC6600)  #scale 0.5
mycp natural volcano functional-icons_volcano.png  #Is poi_peak.png with color #D40000  #scale 0.5
mycp natural cave_entrance poi_cave.png
mycp natural spring functional-icons_spring.png  #scale 0.375
mycp natural tree functional-icons_tree.png  #scale 0.25


## Location dots
mygroup administrative poi_boundary_administrative.png
mycp place city_night functional-icons_city_night.png  #scale 0.375
mycp place city functional-icons_city.png  #scale 0.375
mycp place town_night functional-icons_town_night.png  #scale 0.25
mycp place town functional-icons_town.png  #scale .25


## Emergency + Health
mygroup emergency emergency_emergency_phone.png
mycp emergency phone emergency_emergency_phone.png
mycp amenity police emergency_police2.png
mycp amenity fire_station emergency_firestation3.png

mygroup healthcare health_pharmacy.png
mycp amenity pharmacy health_pharmacy.png
mycp amenity hospital health_hospital.png
mycp amenity veterinary health_veterinary.png
mycp amenity doctors health_doctors.png
mycp amenity dentist health_dentist.png


## Traffic + Transportation
mygroup transportation transport_taxi_rank.png
mycp highway traffic_signals transport_traffic_lights.png
mycp highway mini_roundabout transport_miniroundabout_anticlockwise.png
mycp highway ford transport_ford.png
mycp highway crossing transport_zebra_crossing.png
mycp traffic_calming bump transport_speedbump.png

mygroup fuel transport_fuel.png
mycp amenity fuel transport_fuel.png

mygroup parking transport_parking.png
mycp amenity parking transport_parking.png
mycp amenity parking_private transport_parking_private2.png
mycp amenity parking_paid transport_parking_car_paid.png
mycp amenity bicycle_parking transport_parking_bicycle.png

mygroup public_transport transport_bus_stop.png
mycp amenity bus_station transport_bus_station.png
mycp highway bus_stop transport_bus_stop.png
mycp highway bus_stop_small functional-icons_bus_stop_small.png
mycp public_transport platform transport_bus_stop.png
mycp amenity taxi transport_taxi_rank.png

mycp amenity bicycle_rental transport_rental_bicycle.png
mycp amenity car_rental transport_rental_car.png
mycp amenity car_sharing transport_car_share.png

mycp leisure marina transport_marina.png
mycp leisure slipway transport_slipway.png
mycp man_made lighthouse transport_lighthouse.png
mycp waterway lock_gate functional-icons_lock_gate.png  #scale 0.5

mycp railway station transport_train_station.png
mycp railway station_small functional-icons_station_small.png  #scale 0.375
mycp railway platform transport_train_station2.png
mycp railway halt functional-icons_halt.png  #scale 0.25
mycp railway tram_stop transport_tram_stop.png
mycp railway level_crossing functional-icons_level_crossing.png  #scale 0.5
mycp railway subway_entrance transport_subway.png

mycp aerialway station_small functional-icons_halt.png  #scale 0.25
mycp aerialway station functional-icons_station_small.png  #scale 0.375

mycp aeroway helipad transport_helicopter_pad.png
mycp aeroway aerodrome transport_aerodrome.png
mycp aeroway airport transport_airport.png
mycp aeroway gate transport_airport_gate.png


## Barrier
mygroup barrier barrier_bollard.png
mycp highway gate barrier_gate.png
mycp barrier gate barrier_gate.png
mycp barrier lift_gate barrier_lift_gate.png
mycp barrier sally_port barrier_bollard.png
mycp barrier bollard barrier_bollard.png
mycp barrier block barrier_blocks.png
mycp barrier kissing_gate barrier_kissing_gate.png
mycp barrier toll_booth barrier_toll_booth.png
mycp barrier border_control barrier_lift_gate.png
mycp barrier entrance barrier_entrance.png
mycp building entrance barrier_entrance.png


## Accommodation
mygroup accomodation accommodation_hotel.png
mycp tourism camp_site accommodation_camping.png
mycp tourism caravan_site accommodation_caravan_park.png
mycp tourism alpine_hut accommodation_alpinehut.png
mycp tourism chalet accommodation_chalet.png
mycp tourism guest_house accommodation_bed_and_breakfast.png
mycp tourism hostel accommodation_hostel.png
mycp tourism hotel accommodation_hotel.png
mycp tourism motel accommodation_motel.png
mycp amenity shelter accommodation_shelter2.png


## Tourism
mygroup sightseeing tourist_castle2.png
mygroup tourism tourist_museum.png
mygroup for_tourists tourist_view_point.png
mycp tourism picnic_site tourist_picnic.png
mycp tourism museum tourist_museum.png
mycp tourism information tourist_information.png
mycp tourism viewpoint tourist_view_point.png
mycp tourism theme_park tourist_theme_park.png
mycp tourism zoo tourist_zoo.png


## Entertainment
mygroup entertainment tourist_cinema.png
mycp amenity arts_centre tourist_art_gallery2.png
mycp amenity casino tourist_casino.png
mycp amenity cinema tourist_cinema.png
mycp amenity theatre tourist_theatre.png
mycp amenity nightclub tourist_night_club.png
mycp amenity stripclub tourist_night_club.png


## Historic
mygroup historic tourist_archaeological2.png
mycp historic castle tourist_castle2.png
mycp historic monument tourist_monument.png
mycp historic memorial tourist_memorial.png
mycp historic battlefield tourist_battlefield.png
mycp historic fort tourist_castle2.png
mycp historic ruins tourist_ruin.png
mycp historic archaeological_site tourist_archaeological2.png
mycp historic wreck tourist_wreck.png
mycp historic wayside_cross tourist_wayside_cross.png
mycp historic wayside_shrine tourist_wayside_shrine.png
mycp historic boundary_stone poi_boundary_administrative.png
mycp historic mine poi_mine_abandoned.png


## Sport
mygroup sport sport_swimming_outdoor.png
mycp leisure stadium sport_stadium.png
mycp sport horse_racing sport_horse_racing.png
mycp sport soccer sport_soccer.png
mycp sport skating sport_iceskating.png
mycp sport archery sport_archery.png
mycp sport baseball sport_baseball.png
mycp sport stadium sport_stadium.png
mycp sport canoe sport_canoe.png
mycp sport tennis sport_tennis.png
mycp sport shooting sport_shooting.png
mycp sport golf sport_golf.png
mycp sport skiing sport_skiing_downhill.png
mycp sport swimming sport_swimming_outdoor.png
mycp sport diving sport_diving.png
mycp sport scuba_diving sport_scuba_diving.png  #derived from NPS public library
mycp sport billiard sport_snooker.png
mycp sport gymnastics sport_gymnasium.png


## Leisure
mygroup leisure sport_playground.png
mycp leisure playground sport_playground.png
mycp leisure water_park sport_swimming_outdoor.png
mycp leisure sports_centre sport_leisure_centre.png
mycp leisure ice_rink sport_iceskating.png
mycp leisure fishing sport_fishing.png  #used shop=fish turned by 45 degrees for now
mycp leisure bird_hide poi_tower_lookout.png

mygroup geocache poi_point_of_interest.png
mycp geocache not_found poi_point_of_interest.png
mycp geocache found poi_point_of_interest.png


## Other amenities
mygroup other amenity_post_office.png
mycp amenity bench amenity_bench.png
mycp amenity post_box amenity_post_box.png
mycp amenity post_office amenity_post_office.png
mycp amenity prison amenity_prison.png
mycp amenity recycling amenity_recycling.png
mycp amenity telephone amenity_telephone.png
mycp amenity toilets amenity_toilets.png
mycp amenity fountain amenity_fountain2.png
mycp amenity place_of_worship place_of_worship_unknown.png
mycp religion christian place_of_worship_christian3.png
mycp religion jewish place_of_worship_jewish3.png
mycp religion muslim place_of_worship_islamic3.png
mycp religion sikh place_of_worship_sikh3.png
#! mycp amenity grave_yard place_of_worship_christian3.png  #already defined as icon in the shader section

mygroup finance money_bank2.png
mycp amenity atm money_atm.png
mycp amenity bank money_bank2.png
mycp amenity bureau_de_change money_currency_exchange.png

mygroup office amenity_public_building2.png
mycp amenity embassy amenity_embassy.png
mycp amenity townhall amenity_town_hall2.png
mycp amenity courthouse amenity_court.png
mycp office government amenity_public_building.png
mycp amenity public_building amenity_public_building.png
mycp amenity community_centre amenity_public_building.png
mycp amenity social_centre amenity_public_building.png
mycp amenity library amenity_library.png


## Education
mygroup education education_university.png
mycp amenity kindergarten education_nursery2.png
mycp amenity school education_school.png
mycp amenity college education_college.png
mycp amenity university education_university.png


## Man made
mygroup man_made power_station_wind.png
mycp power tower functional-icons_power_tower.png  #scale 0.5
mycp power generator power_station_wind.png
mycp tower_type communication poi_tower_communications.png
mycp man_made water_tower poi_water_tower.png
mycp man_made mineshaft poi_mine.png
mycp man_made windmill poi_windmill.png
mygroup military poi_military_bunker.png


## Food and Drink
mygroup restaurants food_restaurant.png
mygroup sustenance food_fastfood.png
mycp amenity restaurant food_restaurant.png
mycp amenity cafe food_cafe.png
mycp amenity fast_food food_fastfood.png
mycp amenity food_court food_fastfood.png
mycp amenity pub food_pub.png
mycp amenity bar food_bar.png
mycp amenity biergarten food_biergarten.png
mycp amenity ice_cream food_ice_cream.png
mycp amenity drinking_water food_drinkingtap.png


## Shops
mygroup car_aid shopping_car.png
mygroup food_shop shopping_convenience.png
mygroup shop shopping_department_store.png
mycp shop alcohol shopping_alcohol.png
mycp shop bakery shopping_bakery.png
mycp shop bicycle shopping_bicycle.png
mycp shop boutique shopping_clothes.png
mycp shop butcher shopping_butcher2.png
mycp shop car shopping_car.png
mycp shop car_repair shopping_car_repair.png
mycp shop clothes shopping_clothes.png
mycp shop computer shopping_computer.png
mycp shop confectionery shopping_confectionery.png
mycp shop convenience shopping_convenience.png
mycp shop copyshop shopping_copyshop.png
mycp shop department_store shopping_department_store.png
mycp shop doityourself shopping_diy.png
mycp shop electronics shopping_hifi.png
mycp shop fashion shopping_clothes.png
mycp shop florist shopping_florist.png
mycp shop garden_centre shopping_garden_centre.png
mycp shop general shopping_convenience.png
mycp shop gift shopping_gift.png
mycp shop greengrocer shopping_greengrocer.png
mycp shop hairdresser shopping_hairdresser.png
mycp shop hardware shopping_diy.png
mycp shop hearing_aids shopping_hearing_aids.png
mycp shop jewelry shopping_jewelry2.png
mycp shop kiosk shopping_kiosk.png
mycp shop laundry shopping_laundrette.png
mycp shop mall shopping_department_store.png
mycp amenity marketplace shopping_marketplace.png
mycp shop mobile_phone shopping_mobile_phone.png
mycp shop motorcycle shopping_motorcycle.png
mycp shop musical_instrument shopping_music.png
mycp shop optician shopping_opticians.png
mycp shop outdoor shopping_tackle.png
mycp shop pet shopping_pet2.png
mycp shop seafood shopping_fish.png
mycp shop supermarket shopping_supermarket.png
mycp shop tobacco shopping_tobacco.png
mycp shop toys shopping_toys.png
mycp amenity vending_machine shopping_vending_machine.png
mycp shop video shopping_video_rental.png


# mygroup custom_id icons8 #TODO
mygroup user_defined icons8_user.png
mygroup osmwiki icons8_wikipedia.png
mygroup name_finder icons8_web_search.png
mygroup null icons8_worldwide_location.png
