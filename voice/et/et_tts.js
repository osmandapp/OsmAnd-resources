
// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: distance(Case), special after(Dist), street name (nominative/genitive/allative/adessive/terminative)
// TODO: connect street declination code into new v103 turn_street and follow_street code

var dictionary = {};
var metricConst;
var tts;

function populateDictionary(tts) {
	//// STRINGS
	////////////////////////////////////////////////////////////////
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Tee-kond on " : "route_is.ogg";
	dictionary["long"] = tts ? "pikk, " : "long.ogg"; // Comma!
	dictionary["route_calculate"] = tts ? "Mõtlesin ümber." : "route_calculate.ogg";
	dictionary["distance"] = tts ? "Tee-pikkus on " : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Valmistuge " : "prepare.ogg";
	dictionary["after"] = tts ? "pärast " : "after.ogg";
	dictionary["in"] = tts ? " " : "in.ogg";

	dictionary["left"] = tts ? "keerake vasakule" : "left.ogg";
	dictionary["left_sh"] = tts ? "keerake järsult vasakule" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "keerake pisut vasakule" : "left_sl.ogg";
	dictionary["right"] = tts ? "keerake paremale" : "right.ogg";
	dictionary["right_sh"] = tts ? "keerake järsult paremale" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "keerake pisut paremale" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "hoidke vasakule" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "hoidke paremale" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "hoidke vasakule" : "left_bear.ogg";   // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "hoidke paremale" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Keerake tagasi" : "make_uturn.ogg";
	dictionary["make_uturn_inf"] = tts ? "keerame tagasi" : "make_uturn_inf.ogg";
	dictionary["make_uturn_wp"] = tts ? "Kui võimalik, keerake tagasi" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Valmistuge sõitma ring-ristmikule" : "prepare_roundabout.ogg";
	dictionary["prepare_walk_roundabout"] = tts ? "Valmistuge kõndima ring-ristmikule" : "prepare_walk_roundabout.ogg";
	dictionary["roundabout"] = tts ? "sõitke ring-ristmikule" : "roundabout.ogg";
	dictionary["walk_roundabout"] = tts ? "kõndige ring-ristmikule" : "walk_roundabout.ogg";
	dictionary["then"] = tts ? ", siis " : "then.ogg";
	dictionary["and"] = tts ? " ja " : "and.ogg";
	dictionary["take"] = tts ? "valige " : "take.ogg";
	dictionary["exit"] = tts ? "välja-sõit" : "exit.ogg";

	dictionary["1st"] = tts ? "esimene " : "1st.ogg";
	dictionary["2nd"] = tts ? "teine " : "2nd.ogg";
	dictionary["3rd"] = tts ? "kolmas " : "3rd.ogg";
	dictionary["4th"] = tts ? "neljas " : "4th.ogg";
	dictionary["5th"] = tts ? "viies " : "5th.ogg";
	dictionary["6th"] = tts ? "kuues " : "6th.ogg";
	dictionary["7th"] = tts ? "seitsmes " : "7th.ogg";
	dictionary["8th"] = tts ? "kaheksas " : "8th.ogg";
	dictionary["9th"] = tts ? "üheksas " : "9th.ogg";
	dictionary["10th"] = tts ? "kümnes " : "10th.ogg";
	dictionary["11th"] = tts ? "üheteistkümnes " : "11th.ogg";
	dictionary["12th"] = tts ? "kaheteistkümnes " : "12th.ogg";
	dictionary["13th"] = tts ? "kolmeteistkümnes " : "13th.ogg";
	dictionary["14th"] = tts ? "neljateistkümnes " : "14th.ogg";
	dictionary["15th"] = tts ? "viieteistkümnes " : "15th.ogg";
	dictionary["16th"] = tts ? "kuueteistkümnes " : "16th.ogg";
	dictionary["17th"] = tts ? "seitsmeteistkümnes " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Liikuge otse" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Jätkake " : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "ja jõuate sihtkohta " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Oletegi kohal: " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "ja jõuate tee-tähiseni " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "Tee-tähis " : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "ja jõuate tee-tähiseni " : "and_arrive_waypoint.ogg";   // NB! Is "GPX" necessary here?
	dictionary["reached_waypoint"] = tts ? "Tee-tähis " : "reached_waypoint.ogg";                   // NB! And here?
	dictionary["and_arrive_favorite"] = tts ? "and pass favorite " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "you are passing favorite " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "and pass POI " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "you are passing POI " : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Ületate piir-kiirust." : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "piir-kiirust " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Tähelepanu! " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "kiiruskaamera" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "piirikontrolli" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "raudteeülesõit" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "liikluse rahunemine" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "tolliputka" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "stoppmärk" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "jalakäijate ülekäigurada" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunnel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "Geepe-essi levi pole." : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "Geepe-essi levi taastus." : "location_recovered.ogg";
	dictionary["you_are"] = tts ? "Olete " : "you_are.ogg";
	dictionary["off_route"] = tts ? "plaanitud teest kõrvale kaldunud " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "olete tagasi liinil" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	// TODO:
	// Relevant declination in Estonian:
	//
	// nominative - nimetav (X)
	// genitive - omastav (of X) - ending varies, but is always a vowel
	// allative - alaleütlev (onto X) - ending "-le"
	// adessive - alalütlev (on X) - ending "-l"
	// terminative - rajav (until X, to X) - ending "-ni"
	//
	// The logic (in decline_street/2 below):
	// "tee" means "road" (thus, no additions there),
	// "pst" at the end of a street name means "puiestee" (alley),
	// "mnt" means "maantee" (main road),
	// a numbered road, if its number has at least 4 digits, is "tee" and the numbers are spelt out separately,
	// otherwise "maantee" (smaller roads have big numbers in Estonia),
	// if the name of a road ends in a number, but is not wholly numeric, it is "maantee",
	// other named roads are under "tänav" (street).
	// Those ending with a vowel are assumed to be in genitive case, this affects the word order.
	dictionary["onto_road"] = tts ? "teele " : "onto_road.ogg";
	dictionary["on_road"] = tts ? "teel " : "on_road.ogg";
	dictionary["to_road"] = tts ? "teeni " : "to_road.ogg";

	dictionary["onto_main_road"] = tts ? "maanteele " : "onto_main_road.ogg";
	dictionary["on_main_road"] = tts ? "maanteel " : "on_main_road.ogg";
	dictionary["to_main_road"] = tts ? "maanteeni " : "to_main_road.ogg";

	dictionary["onto_alley"] = tts ? "puiesteele " : "onto_alley.ogg";
	dictionary["on_alley"] = tts ? "puiesteel " : "on_alley.ogg";
	dictionary["to_alley"] = tts ? "puiesteeni " : "to_alley.ogg";

	dictionary["onto_alley2"] = tts ? "alleele " : "onto_alley2.ogg";
	dictionary["on_alley2"] = tts ? "alleel " : "on_alley2.ogg";
	dictionary["to_alley2"] = tts ? "alleeni " : "to_alley2.ogg";

	dictionary["onto_street"] = tts ? "tänavale " : "onto_street.ogg";
	dictionary["on_street"] = tts ? "tänaval " : "on_street.ogg";
	dictionary["to_street"] = tts ? "tänavani " : "to_street.ogg";

	dictionary["onto"] = tts ? "onto " : "onto.ogg";
	dictionary["on"] = tts ? "on " : "on.ogg";
	dictionary["to"] = tts ? "to " : "to.ogg";
	dictionary["toward"] = tts ? "suunas" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "meetrit" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "umbes üks kilomeeter" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "ligikaudu" : "around.ogg";
	dictionary["kilometers"] = tts ? "kilomeetrit" : "kilometers.ogg";

	dictionary["feet"] = tts ? "jalga" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "üks kümnendik miili" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "kümnendikku miili" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "umbes üks miil" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "miili" : "miles.ogg";

	dictionary["yards"] = tts ? "jardi" : "yards.ogg";

	// Distance units in genitive case
	dictionary["of_meters"] = tts ? "meetri" : "of_meters.ogg";
	dictionary["of_around_1_kilometer"] = tts ? "umbes ühe kilomeetri" : "of_around_1_kilometer.ogg";
	dictionary["of_kilometers"] = tts ? "kilomeetri" : "of_kilometers.ogg";

	dictionary["of_feet"] = tts ? "jala" : "of_feet.ogg";
	dictionary["of_1_tenth_of_a_mile"] = tts ? "ühe kümnendiku miili" : "of_1_tenth_of_a_mile.ogg";
	dictionary["of_tenths_of_a_mile"] = tts ? "kümnendiku miili" : "of_tenths_of_a_mile.ogg";
	dictionary["of_around_1_mile"] = tts ? "umbes ühe miili" : "of_around_1_mile.ogg";
	dictionary["of_miles"] = tts ? "miili" : "of_miles.ogg";

	dictionary["of_yards"] = tts ? "jardi" : "of_yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "aeg " : "time.ogg";
	dictionary["1_hour"] = tts ? "üks tund " : "1_hour.ogg";
	dictionary["hours"] = tts ? "tundi " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "vähem kui minut" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "üks minut" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minutit" : "minutes.ogg";

	// Numbers in the genitive case.
	dictionary["of_1"] = tts ? "ühe" : "of_1.ogg";
	dictionary["of_2"] = tts ? "kahe" : "of_2.ogg";
	dictionary["of_3"] = tts ? "kolme" : "of_3.ogg";
	dictionary["of_4"] = tts ? "nelja" : "of_4.ogg";
	dictionary["of_5"] = tts ? "viie" : "of_5.ogg";
	dictionary["of_6"] = tts ? "kuue" : "of_6.ogg";
	dictionary["of_7"] = tts ? "seitsme" : "of_7.ogg";
	dictionary["of_8"] = tts ? "kaheksa" : "of_8.ogg";
	dictionary["of_9"] = tts ? "üheksa" : "of_9.ogg";
	dictionary["of_10"] = tts ? "kümne" : "of_10.ogg";
	dictionary["of_11"] = tts ? "üheteistkümne" : "of_11.ogg";
	dictionary["of_12"] = tts ? "kaheteistkümne" : "of_12.ogg";
	dictionary["of_13"] = tts ? "kolmeteistkümne" : "of_13.ogg";
	dictionary["of_14"] = tts ? "neljateistkümne" : "of_14.ogg";
	dictionary["of_15"] = tts ? "viieteistkümne" : "of_15.ogg";
	dictionary["of_16"] = tts ? "kuueteistkümne" : "of_16.ogg";
	dictionary["of_17"] = tts ? "seitsmeteistkümne" : "of_17.ogg";
	dictionary["of_18"] = tts ? "kaheksateistkümne" : "of_18.ogg";
	dictionary["of_19"] = tts ? "üheksateistkümne" : "of_19.ogg";
	dictionary["of_tens"] = tts ? "kümne" : "of_tens.ogg";
	dictionary["of_100"] = tts ? "saja" : "of_100.ogg";
	dictionary["of_1000"] = tts ? "tuhande" : "of_1000.ogg";
}


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

function route_new_calc(dist, timeVal) {
	// route_new_calc(Dist, Time) -- ['route_is1', D, 'route_is2', ', ', 'time', T, '. '] :- distance(Dist, nominativ) -- D, time(Time) -- T.
	return dictionary["route_is"] + " " + distance(dist, "nom") + " " + dictionary["long"] + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
}

function decline_string(value, declension) {
	switch(declension) {
		case "nom":
			return value;
		case "gen":
			return "of_" + value;
		case "-le":
			return "onto_" + value;
		case "-l":
			return "on_" + value;
		case "-ni":
			return "to_" + value;
		case "inf":
			return "inf_" + value;
	}
}

function decline_street(street, declension) {
	var type = getStreetType(street);
	if (streetType == "tee") {
		return street + " " + decline_string("road", declension);
	} else if (type == "maantee") {
		return street + " " + decline_string("main_road", declension);
	} else if (type == "puiestee") {
		return street + " " + decline_string("alley", declension);
	} else if (type == "allee") {
		return street + " " + decline_string("alley2", declension);
	} else if (ends_with_vowel(street)) {
		return street + " " + decline_string("street", declension);
	} else if (parseInt(street) <= 999 || !isNaN(street.slice(-1))) {
		return street + " " + decline_string("main_road", declension);
	} else if (parseInt(street) > 999) {
		return street + " " + decline_string("road", declension);
	} else {
		return street + " " + decline_string("street", declension);
	}
}

function ends_with_vowel(street) {
	const set = new Set(['a', 'e', 'i', 'o', 'u', 'õ', 'ä', 'ö', 'ü', 'y']);
	return set.has(street.slice(-1));
}

function getStreetType(street) {
	if (street.endsWith(" tee")) {
		return "tee";
	} else if (street.endsWith(" mnt") || street.endsWith(" maantee")) {
		return "maantee";
	} else if (street.endsWith(" pst") || street.endsWith(" puiestee")) {
		return "puiestee";
	} else if (street.endsWith(" allee")) {
		return "allee";
	}
}

function distance(dist, declension) {

	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + decline_string("meters", declension);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + decline_string("meters", declension);
			} else if (dist < 1000) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + decline_string("meters", declension);
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer_" + declension];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + decline_string("kilometers", declension);
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + decline_string("kilometers", declension);
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + decline_string("feet", declension);
			} else if (dist < 241) {
				return decline_string("1_tenth_of_a_mile", declension);
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(dist/161.0)) + " " + decline_string("tenths_of_a_mile", declension);
			} else if (dist < 2414) {
				return decline_string("around_1_mile", declension);
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			}
			break;
		case "mi-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + decline_string("meters", declension);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + decline_string("meters", declension);
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + decline_string("meters", declension); 
			} else if (dist < 2414) {
				return decline_string("around_1_mile", declension);
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(dist/0.9144)) + " " + decline_string("yards", declension);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + decline_string("yards", declension);
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + decline_string("yards", declension); 
			} else if (dist < 2414) {
				return decline_string("around_1_mile", declension);
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + decline_string("miles", declension);
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["1_minute"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60) + " " + dictionary["minutes"];
	} else if (!tts && seconds < 300) {
		return ogg_dist(minutes) + dictionary["minutes"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + ogg_dist(oggMinutes % 60) + dictionary["minutes"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else {
		var hours = Math.floor(minutes / 60);
        return  (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
	}
}

function afterDist(dist) {
	return distance(dist, 'gen') + " " + dictionary["after"];
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + distance(dist, "nom") + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	// go_ahead(Dist, Street) -- ['follow1.ogg', D, 'follow2.ogg'| Sgen]:- distance(Dist, nominativ) -- D, follow_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist, "nom") + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {

// follow_street(Street, ['on', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// follow_street(Street, ['on', SName]) :- tts, Street = voice([R, '', _],[R, _, _]), assemble_street_name(Street, SName).
// follow_street(Street, ['to', 'zur ', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_female(Street), assemble_street_name(Street, SName).
// follow_street(Street, ['to', 'zum ', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_male(Street), assemble_street_name(Street, SName). // Most Refs are female, hence this check only after female check
// follow_street(Street, ['to', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_nothing(Street), assemble_street_name(Street, SName).

	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	// turn(Turn, Dist, Street) -- ['after.ogg', D, M, ' '| Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return afterDist(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
}

function  getTurnType(turnType) {
	// turn("left", ).
// turn("left_sh", ["left_sh"]).
// turn("left_sl", ["left_sl"]).
// turn("right", ["right"]).
// turn("right_sh", ["right_sh"]).
// turn("right_sl", ["right_sl"]).
// turn("left_keep", ["left_keep"]).
// turn("right_keep", ["right_keep"]).
// // Note: turn("left_keep"/"right_keep",[]) is a turn type aiding lane selection, while bear_left()/bear_right() is triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages turn(l/r_keep) may not differ from bear_l/r:
	switch (turnType) {
		case "left":
			return dictionary["left"];
			break;
		case "left_sh":
			return dictionary["left_sh"];
			break;
		case "left_sl":
			return dictionary["left_sl"];
			break;
		case "right":
			return dictionary["right"];
			break;
		case "right_sh":
			return dictionary["right_sh"];
			break;
		case "right_sl":
			return dictionary["right_sl"];
			break;
		case "left_keep":
			return dictionary["left_keep"];
			break;
		case "right_keep":
			return dictionary["right_keep"];
			break;
	}
}

function then() {
	// then -- ["then"].
	return dictionary["then"];
}

function roundabout(dist, angle, exit, streetName) {
	// roundabout(Dist, _Angle, Exit, Street) -- ["in", D, "roundabout", "and", "take", E, "exit" | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
// roundabout(_Angle, Exit, Street) -- ["take", E, "exit" | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return afterDist(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	
if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	}
	return "";
}

function assemble_street_name(streetName) {
// assemble_street_name(voice([Ref, Name, ""], _), Concat) :- atom_concat(Ref, " ", C1), atom_concat(C1, Name, Concat).
// assemble_street_name(voice(["", Name, Dest], _), [C1, "toward", Dest]) :- atom_concat(Name, " ", C1).
// assemble_street_name(voice([Ref, _, Dest], _), [C1, "toward", Dest]) :- atom_concat(Ref, " ", C1).
	if (streetName["toDest"] === "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] === "") {
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	}
}

function nth(exit) {
	switch (exit) {
		case (1):
			return dictionary["1st"];
		case (2):
			return dictionary["2nd"];
		case (3):
			return dictionary["3rd"];
		case (4):
			return dictionary["4th"];
		case (5):
			return dictionary["5th"];
		case (6):
			return dictionary["6th"];
		case (7):
			return dictionary["7th"];
		case (8):
			return dictionary["8th"];
		case (9):
			return dictionary["9th"];
		case (10):
			return dictionary["10th"];
		case (11):
			return dictionary["11th"];
		case (12):
			return dictionary["12th"];
		case (13):
			return dictionary["13th"];
		case (14):
			return dictionary["14th"];
		case (15):
			return dictionary["15th"];
		case (16):
			return dictionary["16th"];
		case (17):
			return dictionary["17th"];
	}
}

function make_ut(dist, streetName) {
// 	make_ut(Dist, Street) --  ['after', D, 'make_uturn1' | Sgen] :- distance(Dist, dativ) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ['make_uturn2' | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + afterDist(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

// bear_left(_Street) -- ["left_bear"].
// bear_right(_Street) -- ["right_bear"].
function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + afterDist(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ['prepare', 'after', D, M | Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return afterDist(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["prepare_roundabout"] + " " + afterDist(dist) + " " + dictionary["then"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"]; 
}

// reached_destination(D) -- ["reached_destination"|Ds] :- name(D, Ds).

// reached_intermediate(D) -- ["reached_intermediate"|Ds] :- name(D, Ds).

// and_arrive_waypoint(D) -- ["and_arrive_waypoint"|Ds] :- name(D, Ds).
// reached_waypoint(D) -- ["reached_waypoint"|Ds] :- name(D, Ds).
// and_arrive_favorite(D) -- ["and_arrive_favorite"|Ds] :- name(D, Ds).
// reached_favorite(D) -- ["reached_favorite"|Ds] :- name(D, Ds).
// and_arrive_poi(D) -- ["and_arrive_poi"|Ds] :- name(D, Ds).
// reached_poi(D) -- ["reached_poi"|Ds] :- name(D, Ds).

// location_lost -- ["location_lost"].
// location_recovered -- ["location_recovered"].
// off_route(Dist) -- ["off_route", D] :- distance(Dist) -- D.
// back_on_route -- ["back_on_route"].
function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest + " " + dictionary["reached"];
}

function and_arrive_intermediate(dest) {
	// and_arrive_intermediate(D) -- ["and_arrive_intermediate"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_intermediate"] + " " + dest + " " + dictionary["reached"];
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest + " " + dictionary["reached"];
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest + " " + dictionary["reached"];
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist, "nom");
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}


// // TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

function attention(type) {
	return dictionary["attention"] + " " + getAttentionString(type);
}

function getAttentionString(type) {
	switch (type) {
		case "SPEED_CAMERA":
			return dictionary["speed_camera"];
			break;
		case "SPEED_LIMIT":
			return "";
			break
		case "BORDER_CONTROL":
			return dictionary["border_control"];
			break;
		case "RAILWAY":
			return dictionary["railroad_crossing"];
			break;
		case "TRAFFIC_CALMING":
			return dictionary["traffic_calming"];
			break;
		case "TOLL_BOOTH":
			return dictionary["toll_booth"];
			break;
		case "STOP":
			return dictionary["stop"];
			break;
		case "PEDESTRIAN":
			return dictionary["pedestrian_crosswalk"];
			break;
		case "MAXIMUM":
			return "";
			break;
		case "TUNNEL":
			return dictionary["tunnel"];
			break;
		default:
			return "";
			break;
	}
}

function ogg_dist(distance, declension) {
	if (distance == 0) {
		return "";
	} else if (distance < 20) {
		return decline_string(Math.floor(distance).toString(), declension) + ".ogg ";
	} else if (distance < 1000 && (distance % 50) == 0) {
		return decline_string(distance.toString(), declension) + ".ogg ";
	} else if (distance < 30) {
		return decline_string("20.ogg", declension) + " " + ogg_dist(distance - 20);
	} else if (distance < 40) {
		return decline_string("30.ogg", declension) + " " + ogg_dist(distance - 30);
	} else if (distance < 50) {
		return decline_string("40.ogg", declension) + " " + ogg_dist(distance - 40);
	} else if (distance < 60) {
		return decline_string("50.ogg", declension) + " " + ogg_dist(distance - 50);
	} else if (distance < 70) {
		return decline_string("60.ogg", declension) + " " + ogg_dist(distance - 60);
	} else if (distance < 80) {
		return decline_string("70.ogg", declension) + " " + ogg_dist(distance - 70);
	} else if (distance < 90) {
		return decline_string("80.ogg", declension) + " " + ogg_dist(distance - 80);
	} else if (distance < 100) {
		return decline_string("90.ogg", declension) + " " + ogg_dist(distance - 90);
	} else if (distance < 200) {
		return decline_string("100.ogg", declension) + " " + ogg_dist(distance - 100);
	} else if (distance < 300) {
		return decline_string("200.ogg", declension) + " " + ogg_dist(distance - 200);
	} else if (distance < 400) {
		return decline_string("300.ogg", declension) + " " + ogg_dist(distance - 300);
	} else if (distance < 500) {
		return decline_string("400.ogg", declension) + " " + ogg_dist(distance - 400);
	} else if (distance < 600) {
		return decline_string("500.ogg", declension) + " " + ogg_dist(distance - 500);
	} else if (distance < 700) {
		return decline_string("600.ogg", declension) + " " + ogg_dist(distance - 600);
	} else if (distance < 800) {
		return decline_string("700.ogg", declension) + " " + ogg_dist(distance - 700);
	} else if (distance < 900) {
		return decline_string("800.ogg", declension) + " " + ogg_dist(distance - 800);
	} else if (distance < 1000) {
		return decline_string("900.ogg", declension) + " " + ogg_dist(distance - 900);
	} else {
		return ogg_dist(distance/1000) + decline_string("1000.ogg") + " " + ogg_dist(distance % 1000);
	}
}