// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: distance(acc/nom), special plural, onto_pre/post
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Az útvonal" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Újratervezés" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "a távolság" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["prepare"] = tts ? "rövidesen" : "prepare.ogg";
	dictionary["after"] = tts ? "múlva" : "after.ogg";

	dictionary["left"] = tts ? "forduljon balra" : "left.ogg";
	dictionary["left_sh"] = tts ? "forduljon élesen balra" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "forduljon enyhén balra" : "left_sl.ogg";
	dictionary["right"] = tts ? "forduljon jobbra" : "right.ogg";
	dictionary["right_sh"] = tts ? "forduljon élesen jobbra" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "forduljon enyhén jobbra" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "tartson balra" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "tartson jobbra" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "tartson balra" : "left_bear.ogg"; // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "tartson jobbra" : "right_bear.ogg"; // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "Készüljön fel a visszafordulásra" : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? "múlva forduljon vissza" : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "Forduljon vissza" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "Forduljon vissza, amint lehet" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "múlva hajtson be a körforgalomba" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "múlva a körforgalomból" : "roundabout.ogg";
	dictionary["roundabout2"] = tts ? "kijáraton hajtson ki" : "roundabout2.ogg";
	dictionary["then"] = tts ? "majd " : "then.ogg";
	dictionary["and"] = tts ? "és" : "and.ogg";
	dictionary["take"] = tts ? "hajtson ki" : "take.ogg";
	dictionary["exit1"] = tts ? "kijáraton" : "exit1.ogg";
	dictionary["exit2"] = tts ? "kijárat:" : "exit2.ogg";

	dictionary["1st"] = tts ? "az első" : "1st.ogg";
	dictionary["2nd"] = tts ? "a második" : "2nd.ogg";
	dictionary["3rd"] = tts ? "a harmadik" : "3rd.ogg";
	dictionary["4th"] = tts ? "a negyedik" : "4th.ogg";
	dictionary["5th"] = tts ? "az ötödik" : "5th.ogg";
	dictionary["6th"] = tts ? "a hatodik" : "6th.ogg";
	dictionary["7th"] = tts ? "a hetedik" : "7th.ogg";
	dictionary["8th"] = tts ? "a nyolcadik" : "8th.ogg";
	dictionary["9th"] = tts ? "a kilencedik" : "9th.ogg";
	dictionary["10th"] = tts ? "a tizedik" : "10th.ogg";
	dictionary["11th"] = tts ? "a tizenegyedik" : "11th.ogg";
	dictionary["12th"] = tts ? "a tizenkettedik" : "12th.ogg";
	dictionary["13th"] = tts ? "a tizenharmadik" : "13th.ogg";
	dictionary["14th"] = tts ? "a tizennegyedik" : "14th.ogg";
	dictionary["15th"] = tts ? "a tizenötödik" : "15th.ogg";
	dictionary["16th"] = tts ? "a tizenhatodik" : "16th.ogg";
	dictionary["17th"] = tts ? "a tizenhetedik" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Haladjon tovább egyenesen" : "go_ahead.ogg";
	dictionary["follow1"] = tts ? "Menjen tovább" : "follow1.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "és megérkezik az úti célhoz" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "megérkezett az úti célhoz" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "és megérkezik a köztes célponthoz" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "megérkezett a köztes célponthoz" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "és megérkezik a köztes GPX útponthoz" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "megérkezett a köztes GPX útponthoz" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "és megérkezik a kedvenc útpontjához" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "megérkezett a kedvenc útpontjához" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "és megérkezik az érdekes ponthoz" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "megérkezett az érdekes ponthoz" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Túllépte a sebességkorlátozást" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "sebességkorlátozás" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Figyelem" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "traffipax" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "határátkelőhely" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "vasúti átjáró" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "forgalomlassító" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "fizetőkapu" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "stop tábla" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "gyalogosátkelő" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "alagút" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "nem található dzsípíesz jel" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "pozíció meghatározva" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Letért a tervezett útvonalról" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Újra a tervezett útvonalon van" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "irányába" : "onto.ogg";
	dictionary["on"] = tts ? "ezen:" : "on.ogg";
	dictionary["to"] = tts ? "eddig:" : "to.ogg";
	dictionary["toward"] = tts ? "felé" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters_nom"] = tts ? "méter" : "meters_nom.ogg";
	dictionary["meters_acc"] = tts ? "métert" : "meters_acc.ogg";
	dictionary["around_1_kilometer_nom"] = tts ? "körülbelül 1 kilométer" : "1_kilometer_nom.ogg";
	dictionary["around_1_kilometer_acc"] = tts ? "körülbelül 1 kilométert" : "1_kilometer_acc.ogg";
	dictionary["around"] = tts ? "körülbelül" : "around.ogg";
	dictionary["kilometers_nom"] = tts ? "kilométer" : "kilometers_nom.ogg";
	dictionary["kilometers_acc"] = tts ? "kilométert" : "kilometers_acc.ogg";

	dictionary["feet_nom"] = tts ? "láb" : "feet_nom.ogg";
	dictionary["feet_acc"] = tts ? "lábnyit" : "feet_acc.ogg";
	dictionary["tenths_of_a_mile_nom"] = tts ? "tized mérföld" : "tenths_of_a_mile_nom.ogg";
	dictionary["tenths_of_a_mile_acc"] = tts ? "tized mérföldet" : "tenths_of_a_mile_acc.ogg";
	dictionary["around_1_mile_nom"] = tts ? "körülbelül egy mérföld" : "around_1_mile_nom.ogg";
	dictionary["around_1_mile_acc"] = tts ? "körülbelül egy mérföldet" : "around_1_mile_acc.ogg";
	dictionary["miles_nom"] = tts ? "mérföld" : "miles_nom.ogg";
	dictionary["miles_acc"] = tts ? "mérföldet" : "miles_acc.ogg";

	dictionary["yards_nom"] = tts ? "yard" : "yards_nom.ogg";
	dictionary["yards_acc"] = tts ? "yardot" : "yards_acc.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? ", a menetidő " : "time.ogg";
	dictionary["1_hour"] = tts ? "egy óra" : "1_hour.ogg";
	dictionary["hours"] = tts ? "óra" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "kevesebb, mint egy perc" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "egy perc" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "perc" : "minutes.ogg";
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
	return dictionary["route_is"] + " " + distance(dist, "nom") + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist, declension) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1000) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer_" + declension];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_" + declension];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_" + declension];
			}
			break;
		case "mi-f":
			if (dist < 91) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet_" + declension];
			} else if (dist < 320) {
				return (tts ? (Math.round(dist/100.0/0.3048)*100).toString() : ogg_dist(Math.round(dist/100.0/0.3048)*100)) + " " + dictionary["feet_" + declension];
			} else if (dist < 1367) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile_" + declension];
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yards_" + declension];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards_" + declension];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
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
	return (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + distance(dist, "nom") + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow1"] + " " + distance(dist, "acc") + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return (tts ? ", " : " ") + dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return (tts ? ", " : " ") + dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return (tts ? ", " : " ") + dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["after"] + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + (tts ? ", " : " ") + getExitNumber(exitString, exitInt) + take_exit_name(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["after"] + " "
			+ getTurnType(turnType) + (tts ? ", " : " ") + getExitNumber(exitString, exitInt) + take_exit_name(streetName);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + (tts ? ", " : " ") + streetName["toDest"] + " " + dictionary["toward"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
		return nth(exitInt) + " " + dictionary["exit2"];
	} else if (tts) {
		return dictionary["exit2"] + " " + exitString;
	} else {
		return dictionary["exit2"];
	}
}

function getTurnType(turnType) {
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
	return dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit1"] + (tts ? ", " : " ") + turn_street(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["roundabout2"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return streetName["toDest"] + " " + dictionary["toward"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return (tts ? ", " : " ") + dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return assemble_street_name(streetName) + " " + dictionary["toward"];
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] == "") {
		return streetName["toStreetName"] + (tts ? ", " : " ") + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + streetName["toDest"];
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
	if (dist == -1) {
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["prepare_make_uturn"] + " " + distance(dist, "nom") + " " + dictionary["after"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return distance(dist, "nom") + " " + dictionary["after"] + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return distance(dist, "nom") + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + (tts ? ": " : " ") + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + (tts ? ": " : " ") + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + (tts ? ": " : " ") + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + (tts ? ": " : " ") + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + (tts ? ": " : " ") + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + (tts ? ": " : " ") + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + (tts ? ": " : " ") + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + (tts ? ": " : " ") + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + (tts ? ": " : " ") + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + (tts ? ": " : " ") + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist, "acc");
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

function attention(type) {
	return dictionary["attention"] + (tts ? ", " : " ") + getAttentionString(type);
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

function ogg_dist(distance) {
	if (distance == 0) {
		return "";
	} else if (distance < 20) {
		return Math.floor(distance).toString() + ".ogg ";
	} else if (distance < 1000 && (distance % 50) == 0) {
		return distance.toString() + ".ogg ";
	} else if (distance < 30) {
		return "20.ogg " + ogg_dist(distance - 20);
	} else if (distance < 40) {
		return "30.ogg " + ogg_dist(distance - 30);
	} else if (distance < 50) {
		return "40.ogg " + ogg_dist(distance - 40);
	} else if (distance < 60) {
		return "50.ogg " + ogg_dist(distance - 50);
	} else if (distance < 70) {
		return "60.ogg " + ogg_dist(distance - 60);
	} else if (distance < 80) {
		return "70.ogg " + ogg_dist(distance - 70);
	} else if (distance < 90) {
		return "80.ogg " + ogg_dist(distance - 80);
	} else if (distance < 100) {
		return "90.ogg " + ogg_dist(distance - 90);
	} else if (distance < 200) {
		return "100.ogg " + ogg_dist(distance - 100);
	} else if (distance < 300) {
		return "200.ogg " + ogg_dist(distance - 200);
	} else if (distance < 400) {
		return "300.ogg " + ogg_dist(distance - 300);
	} else if (distance < 500) {
		return "400.ogg " + ogg_dist(distance - 400);
	} else if (distance < 600) {
		return "500.ogg " + ogg_dist(distance - 500);
	} else if (distance < 700) {
		return "600.ogg " + ogg_dist(distance - 600);
	} else if (distance < 800) {
		return "700.ogg " + ogg_dist(distance - 700);
	} else if (distance < 900) {
		return "800.ogg " + ogg_dist(distance - 800);
	} else if (distance < 1000) {
		return "900.ogg " + ogg_dist(distance - 900);
	} else {
		return ogg_dist(distance/1000) + "1000.ogg " + ogg_dist(distance % 1000);
	}
}
