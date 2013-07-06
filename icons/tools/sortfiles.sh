#!/bin/bash

cp() {
	echo "tag = $1 value = $2 file = $3"
}

## Shaders !
# cp landuse	 forest	KEEPSHADERS!
# cp natural	 beach	KEEPSHADERS!
# cp natural	 wetland	KEEPSHADERS!
# cp natural	 marsh	KEEPSHADERS!
# cp natural	 mud	KEEPSHADERS!
# cp natural	 scrub	KEEPSHADERS!
# cp landuse	 orchard	KEEPSHADERS!
# cp landuse	 vineyard	KEEPSHADERS!
# cp landuse	 cemetery	KEEPSHADERS!
#? cp amenity	 grave_yard	KEEPSHADERS!
# cp natural	 glacier	KEEPSHADERS!
# cp natural	 glacier	KEEPSHADERS!
# cp leisure	 nature_reserve	KEEPSHADERS!
#? cp tourism	 zoo	KEEPSHADERS! 
# cp landuse	 quarry	KEEPSHADERS!
# cp military	 danger_area	KEEPSHADERS!

## place
#! cp place	 city	SHOULDKEEPCURRENT:city_night
#! cp place	 city	SHOULDKEEPCURRENT:city
#! cp place	 town	SHOULDKEEPCURRENT:town_night
#! cp place	 town	SHOULDKEEPCURRENT:town

## Transportation 
cp highway	 traffic_signals	mm_transport_traffic_lights.png
cp highway	 mini_roundabout	mm_transport_miniroundabout_anticlockwise.png
cp highway	 ford	mm_transport_ford.png

cp amenity	 bus_station	mm_transport_bus_station.png
cp highway	 bus_stop	mm_transport_bus_stop.png
cp public_transport platform mm_transport_bus_stop.png

cp amenity	 fuel	mm_transport_fuel.png
cp amenity	 bicycle_rental	mm_transport_rental_bicycle.png
cp amenity	 car_rental	mm_transport_rental_car.png
cp amenity	 car_sharing	mm_transport_car_share.png

cp amenity	 parking	mm_transport_parking.png
cp amenity	 bicycle_parking	mm_transport_parking_bicycle.png
cp railway	 station	mm_transport_train_station.png
#! cp railway	 halt	mm_transport_train_station2.png # ?? completely different
cp railway	 tram_stop	mm_transport_tram_stop.png
#! cp railway	 level_crossing	MISSING:railway/level_crossing
cp railway	 subway_entrance	mm_transport_subway.png
#! cp aerialway	 station	MISSING:transport/aerialway_station
cp aeroway	 helipad	mm_transport_helicopter_pad.png
cp aeroway	 aerodrome	mm_transport_aerodrome.png
cp aeroway	 airport	mm_transport_airport.png


## Barrier
cp highway	 gate	mm_barrier_gate.png
cp barrier	 gate	mm_barrier_gate.png
cp barrier	 lift_gate	mm_barrier_lift_gate.png
cp barrier	 sally_port	mm_barrier_bollard.png
cp barrier	 block	mm_barrier_blocks.png
cp barrier	 kissing_gate	mm_barrier_kissing_gate.png
cp barrier	 toll_booth	mm_barrier_toll_booth.png
cp barrier	 border_control	mm_barrier_lift_gate.png
cp barrier	 entrance	mm_barrier_entrance.png
cp building	 entrance	mm_barrier_entrance.png #? big


## Sustenance
cp amenity	 restaurant	mm_food_restaurant.png
cp amenity	 ice_cream	mm_food_ice_cream.png
cp amenity	 cafe	mm_food_cafe.png
cp amenity	 fast_food	mm_food_fastfood.png
cp amenity	 pub	mm_food_pub.png
cp amenity	 bar	mm_food_bar.png
cp amenity	 biergarten	mm_food_biergarten.png
cp amenity	 drinking_water	mm_food_drinkingtap.png

## Education
cp amenity	 school	mm_education_school.png
cp amenity	 college	mm_education_college.png
cp amenity	 library	mm_amenity_library.png
cp amenity	 kindergarten	mm_education_nursery.ong

## Man_made
#! cp power	 tower	SHOULDKEEPCURRENT:power_tower
cp power	 generator	mm_power_station_wind.png
cp man_made	 lighthouse	mm_transport_lighthouse.png
cp man_made	 water_tower	mm_water_tower.png
cp man_made	 mineshaft	mm_poi_mine.png
cp man_made	 windmill	mm_tourist_windmill.png


## Emergency
cp amenity	 fire_station	mm_amenity_firestation3.png
cp emergency	 phone	mm_transport_emergency_phone.png

## Health 
cp amenity	 pharmacy	mm_health_pharmacy.png
cp amenity	 hospital	mm_health_hospital.png
cp amenity	 veterinary	mm_health_veterinary.png
cp amenity	 doctors	mm_health_doctors.png
cp amenity	 dentist	mm_health_dentist.png

## Entertainment/Other
cp amenity	 cinema	mm_tourist_cinema.png
cp amenity	 theatre	mm_tourist_theatre.png

cp amenity	 embassy	mm_poi_embassy.png
#! cp amenity	 grave_yard	MISSING(USESSHADER):grave_yard
cp amenity	 police	mm_amenity_police2.png
cp amenity	 post_box	mm_amenity_post_box.png
cp amenity	 post_office	mm_amenity_post_office.png
cp amenity	 prison	mm_amenity_prison.png
cp amenity	 recycling	mm_amenity_recycling.png
cp amenity	 telephone	mm_amenity_telephone.png
cp amenity	 toilets	mm_amenity_toilets.png
cp amenity	 place_of_worship	mm_place_of_worship_unknown.png
cp amenity	 fountain	mm_amenity_fountain2.png
cp amenity	 marketplace	mm_shopping_marketplace.png
cp amenity	 townhall	mm_amenity_town_hall2.png
cp amenity	 courthouse	mm_amenity_court.png

## Finance
cp amenity	 atm	mm_money_atm.png
cp amenity	 bureau_de_change	mm_money_currency_exchange.png
cp amenity	 bank	mm_money_bank2.png
cp amenity	 bench	mm_amenity_bench.png
cp amenity	 vending_machine	mm_shopping_vending_machine.png


## Leisure/Natural
#! cp natural	 peak	MISSING:IMPORTANTfornightviewtohaveORANGEpeak_nightversion!!(Usedayversionwithcolor#FF6600)
#! cp natural	 volcano	MISSING:volcano(could use mm_poi_peak.png withcolor# D40000)
#! cp natural	 spring	MISSING:spring
#! cp natural	 tree	MISSING:tree
#! cp natural	 tree	MISSING:tree
cp natural	 cave_entrance	mm_poi_cave.png
cp natural	 peak	mm_poi_peak2.png

cp leisure	 marina	mm_transport_marina.png
cp leisure	 slipway	mm_transport_slipway.png
cp leisure	 playground	mm_amenity_playground.png
#! cp leisure	 fishing	mm_sport_leisure_centre.png #?
cp leisure	 water_park	mm_sport_swimming_outdoor.png
cp leisure	 sports_centre	mm_sport_leisure_centre.png
cp leisure	 bird_hide	mm_poi_tower_lookout.png
#! cp waterway	 lock_gate	MISSING:lock_gate


## Historic
cp historic	 castle	mm_tourist_castle2.png
cp historic	 monument	mm_tourist_monument.png
cp historic	 memorial	mm_tourist_memorial.png
cp historic	 battlefield	mm_tourist_battlefield.png
cp historic	 fort	mm_tourist_castle2.png
cp historic	 ruins	mm_tourist_ruin.png
cp historic	 archaeological_site	mm_tourist_archaeological2.png
cp historic	 wreck	mm_tourist_wreck.png
cp historic	 wayside_cross	mm_tourist_wayside_cross.png
cp historic	 wayside_shrine	mm_tourist_wayside_shrine.png
cp historic	 boundary_stone	mm_poi_boundary_administrative.png
cp historic	 mine	mm_poi_mine_abandoned.png

## Tourism/acommodation
cp amenity	 shelter	mm_accommodation_shelter2.png
cp tourism	 camp_site	mm_accommodation_camping.png
cp tourism	 caravan_site	mm_accommodation_caravan_park.png
cp tourism	 picnic_site	mm_tourist_picnic.png
cp tourism	 alpine_hut	mm_accommodation_alpinehut.png
cp tourism	 chalet	mm_accommodation_chalet.png
cp tourism	 guest_house	mm_accommodation_bed_and_breakfast.png
cp tourism	 hostel	mm_accommodation_hostel.png
cp tourism	 hotel	mm_accommodation_hotel.png
cp tourism	 motel	mm_accommodation_motel.png
cp tourism	 museum	mm_tourist_museum.png
cp tourism	 information	mm_tourist_information.png
cp tourism	 viewpoint	mm_tourist_viewpoint.png # ?view_point
cp tourism	 theme_park	mm_tourist_theme_park.png
cp tourism	 zoo	mm_tourist_zoo.png
#! cp geocache	 found	MISSING:geocache(found)
#! cp geocache notfound	MISSING:geocache(notfound)

## Sport 
cp sport	 horse_racing	mm_sport_horse_racing.png
cp sport	 soccer	mm_sport_soccer.png
cp sport	 archery	mm_sport_archery.png
cp sport	 baseball	mm_sport_baseball.png
cp sport	 stadium	mm_sport_stadium.png
cp sport	 canoe	mm_sport_canoe.png
cp sport	 tennis	mm_sport_tennis.png
cp sport	 shooting	mm_sport_shooting.png
cp sport	 golf	mm_sport_golf.png
cp sport	 swimming	mm_sport_swimming_outdoor.png
cp sport	 skiing	mm_sport_skiing_downhill.png
cp sport	 diving	mm_sport_diving.png
cp sport	 scuba_diving	MISSING:sport/scuba_diving


## SHOPS
cp shop	 bakery	mm_shopping_bakery.png
cp shop	 butcher	mm_shopping_butcher2.png
cp shop	 clothes	mm_shopping_clothes.png
cp shop	 doityourself	mm_shopping_diy.png
cp shop	 boutique	mm_shopping_clothes.png
cp shop	 bicycle	mm_shopping_bicycle.png
cp shop	 car	mm_shopping_car.png
cp shop	 car_repair	mm_shopping_car_repair.png
cp shop	 convenience	mm_shopping_convenience.png
cp shop	 department_store	mm_shopping_department_store.png
cp shop	 electronics	mm_shopping_hifi.png
cp shop	 general	mm_shopping_convenience.png
cp shop	 general	mm_shopping_convenience.png
cp shop	 outdoor	mm_shopping_tackle.png
cp shop	 florist	mm_shopping_florist.png
cp shop	 hairdresser	mm_shopping_hairdresser.png
cp shop	 mall	mm_shopping_department_store.png
cp shop	 supermarket	mm_shopping_supermarket.png
cp shop	 alcohol	mm_shopping_alcohol.png
cp shop	 kiosk	mm_shopping_kiosk.png
cp shop	 musical_instrument	mm_shopping_music.png
cp shop	 optician	mm_health_opticians.png
cp shop	 video	mm_shopping_video_rental.png
cp shop	 confectionery	mm_shopping_confectionery.png
cp shop	 laundry	mm_shopping_laundrette.png
cp shop	 tobacco	mm_shopping_tobacco.png
cp shop	 motorcycle	mm_shopping_motorcycle.png
cp shop	 hardware	mm_shopping_diy.png
cp shop	 copyshop	mm_shopping_copyshop.png
cp shop	 greengrocer	mm_shopping_greengrocer.png
cp shop	 mobile_phone	mm_shopping_mobile_phone.png
cp shop	 seafood	mm_shopping_fish.png
cp shop	 garden_centre	mm_shopping_garden_centre.png
cp shop	 gift	mm_shopping_gift.png
cp shop	 hearing_aids	mm_shopping_hearing_aids.png
cp shop	 toys	mm_shopping_toys.png
