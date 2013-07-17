#!/bin/bash

mygroup() {
 	echo "${2}  style-icons/mm_${1}.png"
 	cp ../png/mdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mm_${1}.png
 	cp ../png/hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mm_${1}.png
 	cp ../png/xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mm_${1}.png
 	cp ../png/xhdpi/${2} ../../rendering_styles/style-icons/drawable-mdpi/mx_${1}.png
 	cp ../png/x2-hdpi/${2} ../../rendering_styles/style-icons/drawable-hdpi/mx_${1}.png
 	cp ../png/x2-xhdpi/${2} ../../rendering_styles/style-icons/drawable-xhdpi/mx_${1}.png
}


mycp() {
	mygroup ${1}_${2} $3
}



## Shaders !
mygroup landuse mm_landuse_coniferous.png
mycp landuse grass mm_landuse_grass.png
mycp landuse forest  mm_landuse_coniferous.png # KEEP SHADERS!
mycp natural beach  mm_tourist_beach.png # KEEP SHADERS!
mycp landuse cemetery mm_place_of_worship_christian3.png  # KEEP SHADERS!
mycp amenity grave_yard mm_place_of_worship_christian3.png #  KEEP SHADERS!
mycp natural scrub mm_landuse_scrub.png # KEEP SHADERS!
mycp natural swamp mm_landuse_swamp.png # KEEP SHADERS!
mycp tourism zoo mm_tourist_zoo.png # KEEP SHADERS!
mycp military danger_area mm_poi_mine.png # KEEP SHADERS!
mycp natural glacier mm_poi_peak2.png  # KEEP SHADERS! ? not really good icon
# mycp natural wetland  # KEEP SHADERS!
# mycp natural marsh  # KEEP SHADERS! ?
# mycp natural mud  KEEP SHADERS!
# mycp natural scrub  KEEP SHADERS!
# mycp landuse orchard  KEEP SHADERS!
# mycp landuse vineyard  KEEP SHADERS!
# mycp leisure nature_reserve  KEEP SHADERS!
# mycp landuse quarry  KEEP SHADERS!


## Place-dots
mygroup administrative mm_poi_boundary_administrative.png
#! mycp place city  SHOULD KEEP CURRENT: city_night  (functional icon, not picture)
#! mycp place city  SHOULD KEEP CURRENT: city  (functional icon, not picture)
#! mycp place town  SHOULD KEEP CURRENT: town_night  (functional icon, not picture)
#! mycp place town  SHOULD KEEP CURRENT: town  (functional icon, not picture)


## Transportation 
mycp highway traffic_signals mm_transport_traffic_lights.png
mycp highway mini_roundabout mm_transport_miniroundabout_anticlockwise.png
mycp highway ford mm_transport_ford.png

mycp amenity bus_station mm_transport_bus_station.png
mycp highway bus_stop mm_transport_bus_stop.png
mycp public_transport platform mm_transport_bus_stop.png
mygroup public_transport mm_transport_bus_stop.png

mygroup fuel mm_transport_fuel.png
mycp amenity fuel mm_transport_fuel.png
mycp amenity taxi mm_transport_taxi_rank.png
mycp amenity bicycle_rental mm_transport_rental_bicycle.png
mycp amenity car_rental mm_transport_rental_car.png
mycp amenity car_sharing mm_transport_car_share.png

mycp amenity parking mm_transport_parking.png
mygroup parking mm_transport_parking.png
mygroup transportation mm_transport_taxi_rank.png
mycp amenity bicycle_parking mm_transport_parking_bicycle.png
mycp railway station mm_transport_train_station.png
mycp railway platform mm_transport_train_station2.png
#! mycp railway halt mm_transport_train_station2.png #completely different?
mycp railway tram_stop mm_transport_tram_stop.png
#! mycp railway level_crossing  MISSING: railway/level_crossing
mycp railway subway_entrance mm_transport_subway.png
#! mycp aerialway station  MISSING: aerialway/station: station_small
mycp railway subway mm_transport_subway.png
mycp aeroway helipad mm_transport_helicopter_pad.png
mycp aeroway aerodrome mm_transport_aerodrome.png
mycp aeroway airport mm_transport_airport.png


## Barrier
mygroup barrier mm_barrier_bollard.png
mycp highway gate mm_barrier_gate.png
mycp barrier gate mm_barrier_gate.png
mycp barrier lift_gate mm_barrier_lift_gate.png
mycp barrier sally_port mm_barrier_bollard.png
mycp barrier bollard mm_barrier_bollard.png
mycp barrier block mm_barrier_blocks.png
mycp barrier kissing_gate mm_barrier_kissing_gate.png
mycp barrier toll_booth mm_barrier_toll_booth.png
mycp barrier border_control mm_barrier_lift_gate.png
mycp barrier entrance mm_barrier_entrance.png
mycp building entrance mm_barrier_entrance.png #in-building feature, render only from zoom 18 (could do the same for aeroway/gate)


## Sustenance
mygroup restaurants mm_food_restaurant.png
mygroup sustenance mm_food_fastfood.png
mycp amenity restaurant mm_food_restaurant.png
mycp amenity ice_cream mm_food_ice_cream.png
mycp amenity cafe mm_food_cafe.png
mycp amenity fast_food mm_food_fastfood.png
mycp amenity food_court mm_food_fastfood.png
mycp amenity pub mm_food_pub.png
mycp amenity bar mm_food_bar.png
mycp amenity biergarten mm_food_biergarten.png
mycp amenity drinking_water mm_food_drinkingtap.png


## Education
mygroup education mm_education_university.png
mycp amenity school mm_education_school.png
mycp amenity university mm_education_university.png
mycp amenity college mm_education_college.png
mycp amenity library mm_amenity_library.png
mycp amenity kindergarten mm_education_nursery2.png


## Man_made
#! mycp power tower SHOULD KEEP CURRENT: power_tower  (functional icon, not picture)
mygroup man_made mm_power_station_wind.png
mygroup military mm_poi_military_bunker.png
mycp power generator mm_power_station_wind.png
mycp man_made lighthouse mm_transport_lighthouse.png
mycp man_made water_tower mm_water_tower.png
mycp man_made mineshaft mm_poi_mine.png
mycp man_made windmill mm_tourist_windmill.png


## Emergency
mycp amenity fire_station mm_amenity_firestation3.png
mycp emergency phone mm_transport_emergency_phone.png
mygroup emergency mm_transport_emergency_phone.png


## Health 
mygroup healthcare mm_health_pharmacy.png
mycp amenity pharmacy mm_health_pharmacy.png
mycp amenity hospital mm_health_hospital.png
mycp amenity veterinary mm_health_veterinary.png
mycp amenity doctors mm_health_doctors.png
mycp amenity dentist mm_health_dentist.png


## Entertainment/Other
# mygroup custom_id mm_icons8 #TODO
mygroup user_defined mm_icons8_user.png
mygroup osmwiki mm_icons8_wikipedia.png
mygroup other mm_amenity_post_office.png
mygroup office mm_amenity_public_building2.png
mygroup geocache mm_poi_point_of_interest.png
mygroup entertainment mm_tourist_cinema.png
mygroup null mm_icons8_worldwide_location.png
mygroup name_finder mm_icons8_web_search.png
mycp amenity cinema mm_tourist_cinema.png
mycp amenity theatre mm_tourist_theatre.png
mycp amenity casino mm_tourist_casino.png
mycp geocache not_found mm_poi_point_of_interest.png
mycp geocache found mm_poi_point_of_interest.png
mycp office government mm_amenity_public_building.png
mycp amenity public_building mm_amenity_public_building.png
mycp amenity arts_centre mm_tourist_art_gallery2.png
mycp amenity arts_centre mm_tourist_art_gallery2.png


## Amenities
mycp amenity bench mm_amenity_bench.png
mycp amenity embassy mm_poi_embassy.png
#! mycp amenity grave_yard  USES SHADER: grave_yard
mycp amenity police mm_amenity_police2.png
mycp amenity post_box mm_amenity_post_box.png
mycp amenity post_office mm_amenity_post_office.png
mycp amenity prison mm_amenity_prison.png
mycp amenity recycling mm_amenity_recycling.png
mycp amenity telephone mm_amenity_telephone.png
mycp amenity toilets mm_amenity_toilets.png
mycp amenity place_of_worship mm_place_of_worship_unknown.png
mycp amenity fountain mm_amenity_fountain2.png
mycp amenity marketplace mm_shopping_marketplace.png
mycp amenity townhall mm_amenity_town_hall2.png
mycp amenity courthouse mm_amenity_court.png


## Finance
mycp amenity atm mm_money_atm.png
mycp amenity bureau_de_change mm_money_currency_exchange.png
mycp amenity bank mm_money_bank2.png
mycp amenity vending_machine mm_shopping_vending_machine.png
mygroup finance mm_money_bank2.png


## Natural

#! mycp natural peak  MISSING: Important for night view to have ORANGE peak_night version! (Use day version with color #FF6600)
#! mycp natural volcano  MISSING: Could use mm_poi_peak.png with color #D40000
#! mycp natural spring  MISSING: spring
#! mycp natural tree  MISSING: tree
#! mycp natural tree  MISSING: tree
mygroup natural mm_poi_peak2.png
mycp natural cave_entrance mm_poi_cave.png
mycp natural peak mm_functional-icons_peak2.png
mycp natural peak_night mm_functional-icons_peak2_night.png
#mycp natural peak mm_poi_peak2.png


## Leisure
mygroup leisure mm_amenity_playground.png
mycp leisure marina mm_transport_marina.png
mycp leisure ice_rink mm_sport_iceskating.png
mycp leisure slipway mm_transport_slipway.png
mycp leisure playground mm_amenity_playground.png
#! mycp leisure fishing mm_sport_leisure_centre.png #no good icon for leisure=fishing. Could use shop=seafood icon, but in leisure-green.
mycp leisure water_park mm_sport_swimming_outdoor.png
mycp leisure sports_centre mm_sport_leisure_centre.png
mycp leisure bird_hide mm_poi_tower_lookout.png
#! mycp waterway lock_gate  MISSING: lock_gate


## Historic
mygroup for_tourists mm_tourist_view_point.png
mygroup sightseeing mm_tourist_castle2.png
mygroup historic mm_tourist_archaeological2.png
mycp historic castle mm_tourist_castle2.png
mycp historic monument mm_tourist_monument.png
mycp historic memorial mm_tourist_memorial.png
mycp historic battlefield mm_tourist_battlefield.png
mycp historic fort mm_tourist_castle2.png
mycp historic ruins mm_tourist_ruin.png
mycp historic archaeological_site mm_tourist_archaeological2.png
mycp historic wreck mm_tourist_wreck.png
mycp historic wayside_cross mm_tourist_wayside_cross.png
mycp historic wayside_shrine mm_tourist_wayside_shrine.png
mycp historic boundary_stone mm_poi_boundary_administrative.png
mycp historic mine mm_poi_mine_abandoned.png


## Tourism/acommodation
mygroup tourism mm_tourist_museum.png
mycp amenity shelter mm_accommodation_shelter2.png
mycp tourism camp_site mm_accommodation_camping.png
mycp tourism caravan_site mm_accommodation_caravan_park.png
mycp tourism picnic_site mm_tourist_picnic.png
mycp tourism alpine_hut mm_accommodation_alpinehut.png
mycp tourism chalet mm_accommodation_chalet.png
mycp tourism guest_house mm_accommodation_bed_and_breakfast.png
mycp tourism hostel mm_accommodation_hostel.png
mygroup accomodation mm_accommodation_hotel.png
mycp tourism hotel mm_accommodation_hotel.png
mycp tourism motel mm_accommodation_motel.png
mycp tourism museum mm_tourist_museum.png
mycp tourism information mm_tourist_information.png
mycp tourism viewpoint mm_tourist_view_point.png 
mycp tourism theme_park mm_tourist_theme_park.png
mycp tourism zoo mm_tourist_zoo.png


## Sport 
mygroup sport mm_sport_swimming_outdoor.png
mycp leisure stadium mm_sport_stadium.png
mycp sport horse_racing mm_sport_horse_racing.png
mycp sport soccer mm_sport_soccer.png
mycp sport skating mm_sport_iceskating.png
mycp sport archery mm_sport_archery.png
mycp sport baseball mm_sport_baseball.png
mycp sport stadium mm_sport_stadium.png
mycp sport canoe mm_sport_canoe.png
mycp sport tennis mm_sport_tennis.png
mycp sport shooting mm_sport_shooting.png
mycp sport golf mm_sport_golf.png
mycp sport swimming mm_sport_swimming_outdoor.png
mycp sport skiing mm_sport_skiing_downhill.png
mycp sport diving mm_sport_diving.png
mycp sport billiard mm_sport_snooker.png
mycp sport gymnastics mm_sport_gymnasium.png
#! mycp sport scuba_diving MISSING:sport/scuba_diving


## Shops
mygroup car_aid mm_shopping_car.png
mygroup food_shop mm_shopping_convenience.png
mygroup shop mm_shopping_department_store.png

mycp shop bakery mm_shopping_bakery.png
mycp shop butcher mm_shopping_butcher2.png
mycp shop clothes mm_shopping_clothes.png
mycp shop doityourself mm_shopping_diy.png
mycp shop boutique mm_shopping_clothes.png
mycp shop bicycle mm_shopping_bicycle.png
mycp shop car mm_shopping_car.png
mycp shop car_repair mm_shopping_car_repair.png
mycp shop convenience mm_shopping_convenience.png
mycp shop computer mm_shopping_computer.png
mycp shop department_store mm_shopping_department_store.png
mycp shop electronics mm_shopping_hifi.png
mycp shop jewelry mm_shopping_jewelry2.png
mycp shop general mm_shopping_convenience.png
mycp shop outdoor mm_shopping_tackle.png
mycp shop florist mm_shopping_florist.png
mycp shop hairdresser mm_shopping_hairdresser.png
mycp shop mall mm_shopping_department_store.png
mycp shop supermarket mm_shopping_supermarket.png
mycp shop alcohol mm_shopping_alcohol.png
mycp shop kiosk mm_shopping_kiosk.png
mycp shop musical_instrument mm_shopping_music.png
mycp shop optician mm_health_opticians.png
mycp shop pet mm_shopping_pet2.png
mycp shop video mm_shopping_video_rental.png
mycp shop confectionery mm_shopping_confectionery.png
mycp shop laundry mm_shopping_laundrette.png
mycp shop tobacco mm_shopping_tobacco.png
mycp shop motorcycle mm_shopping_motorcycle.png
mycp shop hardware mm_shopping_diy.png
mycp shop copyshop mm_shopping_copyshop.png
mycp shop greengrocer mm_shopping_greengrocer.png
mycp shop mobile_phone mm_shopping_mobile_phone.png
mycp shop seafood mm_shopping_fish.png
mycp shop garden_centre mm_shopping_garden_centre.png
mycp shop gift mm_shopping_gift.png
mycp shop hearing_aids mm_shopping_hearing_aids.png
mycp shop toys mm_shopping_toys.png
