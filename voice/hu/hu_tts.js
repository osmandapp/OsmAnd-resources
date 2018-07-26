
// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: distance(acc/nom), special plural, onto_pre/post

var metricConst;
var dictionary = {};
// TODO set this as a boolena flag to determine if we need to return tts prompts or ogg file names
var tts;
//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
dictionary["route_is"] = "Az útvonal ";
dictionary["route_calculate"] = "Újratervezés";
dictionary["distance"] = "a távolság ";

// LEFT/RIGHT
dictionary["prepare"] = " ";
dictionary["after"] = "múlva ";

dictionary["left"] = "fordulj balra";
dictionary["left_sh"] = "fordulj élesen balra";
dictionary["left_sl"] = "fordulj enyhén balra";
dictionary["right"] = "fordulj jobbra";
dictionary["right_sh"] = "fordulj élesen jobbra";
dictionary["right_sl"] = "fordulj enyhén jobbra";
dictionary["left_keep"] = "tarts balra";
dictionary["right_keep"] = "tarts jobbra";
dictionary["left_bear"] = "tarts balra";    // in English the same as left_keep, may be different in other languages
dictionary["right_bear"] = "tarts jobbra";  // in English the same as right_keep, may be different in other languages

// U-TURNS
dictionary["prepare_make_uturn"] = "Készülj fel a visszafordulásra ";
dictionary["make_uturn1"] = "múlva fordulj vissza ";
dictionary["make_uturn2"] = "Fordulj vissza";
dictionary["make_uturn_wp"] = "Fordulj vissza, amint lehet";

// ROUNDABOUTS
dictionary["prepare_roundabout"] = "múlva hajts be a körforgalomba ";
dictionary["roundabout"] = "múlva a körforgalomból ";
dictionary["roundabout2"] = "kijáraton hajts ki";
dictionary["then"] = "majd ";
dictionary["and"] = " és ";
dictionary["take"] = "hajts ki ";
dictionary["exit"] = "kijáraton ";

dictionary["1st"] = "az első ";
dictionary["2nd"] = "a második ";
dictionary["3rd"] = "a harmadik ";
dictionary["4th"] = "a negyedik ";
dictionary["5th"] = "az ötödik ";
dictionary["6th"] = "a hatodik ";
dictionary["7th"] = "a hetedik ";
dictionary["8th"] = "a nyolcadik ";
dictionary["9th"] = "a kilencedik ";
dictionary["10th"] = "a tizedik ";
dictionary["11th"] = "a tizenegyedik ";
dictionary["12th"] = "a tizenkettedik ";
dictionary["13th"] = "a tizenharmadik ";
dictionary["14th"] = "a tizennegyedik ";
dictionary["15th"] = "a tizenötödik ";
dictionary["16th"] = "a tizenhatodik ";
dictionary["17th"] = "a tizenhetedik ";

// STRAIGHT/FOLLOW
dictionary["go_ahead"] = "Haladj tovább egyenesen";
dictionary["follow"] = "Menj tovább ";

// ARRIVE
dictionary["and_arrive_destination"] = "és megérkezel az uticélhoz ";
dictionary["reached_destination"] = "megérkeztél az uticélhoz ";
dictionary["and_arrive_intermediate"] = "és megérkezel a köztes célponthoz ";
dictionary["reached_intermediate"] = "megérkeztél a köztes célponthoz ";

// NEARBY POINTS
dictionary["and_arrive_waypoint"] = "és megérkezel a köztes GPX útponthoz ";
dictionary["reached_waypoint"] = "megérkeztél a köztes GPX útponthoz ";
dictionary["and_arrive_favorite"] = "és megérkezel a kedvencedhez ";
dictionary["reached_favorite"] = "megérkeztél a kedvenc útponthoz ";
dictionary["and_arrive_poi"] = "és megérkezel a POI-hoz ";
dictionary["reached_poi"] = "megérkeztél a POI-hoz ";

// ATTENTION
//dictionary["exceed_limit"] = "Túllépted a sebességhatárt ";
dictionary["exceed_limit"] = "sebességhatár ";
dictionary["attention"] = "figyelem, ";
dictionary["speed_camera"] = "traffipax";
dictionary["border_control"] = "határellenőrzés";
dictionary["railroad_crossing"] = "vasúti átjáró";
dictionary["traffic_calming"] = "forgalomlassító";
dictionary["toll_booth"] = "fizetőkapu";
dictionary["stop"] = "stop tábla";
dictionary["pedestrian_crosswalk"] = "gyalogos átkelő";
dictionary["tunnel"] = "alagút";

// OTHER PROMPTS
dictionary["location_lost"] = "nem található dzsípíesz jel";
dictionary["location_recovered"] = "pozíció meghatározva";
dictionary["off_route"] = "Letértél a tervezett útvonalról ";
dictionary["back_on_route"] = "Ön visszatér az útvonalon";

// STREET NAME PREPOSITIONS
dictionary["onto"] = "irányába ";
dictionary["on"] = ", ezen: ";
dictionary["to"] = ", eddig: ";
dictionary["toward"] = ", felé ";

// DISTANCE UNIT SUPPORT
dictionary["meters_nom"] = "méter";
dictionary["meters_acc"] = "métert";
dictionary["1_kilometer_nom"] = "1 kilométer";
dictionary["1_kilometer_acc"] = "1 kilométert";
dictionary["1_5_kilometer_nom"] = "másfél kilométer";
dictionary["1_5_kilometer_acc"] = "másfél kilométert";
dictionary["around"] = " ";
dictionary["kilometers_nom"] = "kilométer";
dictionary["kilometers_acc"] = "kilométert";

dictionary["feet_nom"] = "láb";
dictionary["feet_acc"] = "lábnyit";
dictionary["1_tenth_of_a_mile_nom"] = "egytized mérföld";
dictionary["1_tenth_of_a_mile_acc"] = "egytized mérföldet";
dictionary["tenths_of_a_mile_nom"] = "tized mérföld";
dictionary["tenths_of_a_mile_acc"] = "tized mérföldet";
dictionary["around_1_mile_nom"] = "körülbelül egy mérföld";
dictionary["around_1_mile_acc"] = "körülbelül egy mérföldet";
dictionary["miles_nom"] = "mérföld";
dictionary["miles_acc"] = "mérföldet";

dictionary["yards_nom"] = "yard";
dictionary["yards_acc"] = "yardot";

// TIME SUPPORT
dictionary["time"] = ", a menetidő ";
dictionary["1_hour"] = "egy óra ";
dictionary["hours"] = "óra ";
dictionary["less_a_minute"] = "kevesebb, mint egy perc";
dictionary["1_minute"] = "egy perc";
dictionary["minutes"] = "perc";


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist, "nom") + " " + dictionary["time"] + " " + time(timeVal) + ". ";
}

function distance(dist, declension) {

	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return Math.round(dist).toString() + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return Math.round((2*dist/100.0)*50).toString() + " " + dictionary["meters_" + declension];
			} else if (dist < 1000) {
				return Math.round((2*dist/100.0)*50).toString() + " " + dictionary["meters_" + declension];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer_" + declension];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + Math.round(dist/1000.0).toString() + " " + dictionary["kilometers_" + declension];
			} else {
				return Math.round(dist/1000.0).toString() + " " + dictionary["kilometers_" + declension];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return Math.round((2*dist/100.0/0.3048)*50).toString(); + " " + dictionary["feet_" + declension];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile_" + declension];
			} else if (dist < 1529) {
				return Math.round(dist/161.0).toString() + " " + dictionary["tenths_of_a_mile_" + declension];
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			} else {
				return Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return Math.round(dist).toString() + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return Math.round((2*dist/100.0)*50).toString() + " " + dictionary["meters_" + declension];
			} else if (dist < 1300) {
				return Math.round(dist/1609.3).toString() + " " + dictionary["meters_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			} else {
				return Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi/y":
			if (dist < 17) {
				return Math.round(dist/0.9144).toString() + " " + dictionary["yards_" + declension];
			} else if (dist < 100) {
				return Math.round((dist/10.0/0.9144)*10).toString() + " " + dictionary["yards_" + declension];
			} else if (dist < 1300) {
				return Math.round((2*dist/100.0/0.9144)*50).toString() + " " + dictionary["yards_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			} else {
				return Math.round(dist/1609.3).toString() + " " + dictionary["miles_" + declension];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 1) {
		return dictionary["1_minute"];
	} else if (minutes < 60.0) {
		return minutes.toString() + " " + dictionary["minutes"];
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else  {
		return Math.round(minutes/60).toString() + " " + dictionary["hours"];
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + distance(dist, "nom") + " " + dictionary["time"] + " " + time(seconds) + ". ";
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist, "acc") + " " + follow_street(streetName);
	}
	
// go_ahead(Dist, Street) -- ["follow", D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).
// follow_street("", []).
// follow_street(voice(["","",""],_), []).
// follow_street(voice(["", "", D], _), ["to", D]) :- tts.
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["to", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0) {
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
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["after"] + " " + getTurnType(turnType) + " " + turn_street(streetName); 
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
		return distance(dist, "nom") + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["roundabout2"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return streetName["toDest"]  + " " + dictionary["toward"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return assemble_street_name(streetName)  + " " + dictionary["onto"];
	}
	return "";
}

function assemble_street_name(streetName) {
	// // assemble_street_name(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
// // assemble_street_name(voice(["", Name, _], _), Name). // not necessary
// // Next 2 lines for Name taking precedence over Dest...
// //assemble_street_name(voice([Ref, "", Dest], _), [C1, "toward", Dest]) :- atom_concat(Ref, " ", C1).
// //assemble_street_name(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, " ", C1), atom_concat(C1, Name, Concat).
// // ...or next 3 lines for Dest taking precedence over Name
// assemble_street_name(voice([Ref, Name, ""], _), Concat) :- atom_concat(Ref, " ", C1), atom_concat(C1, Name, Concat).
// assemble_street_name(voice(["", Name, Dest], _), [C1, "toward", Dest]) :- atom_concat(Name, " ", C1).
// assemble_street_name(voice([Ref, _, Dest], _), [C1, "toward", Dest]) :- atom_concat(Ref, " ", C1).
	if (streetName["toDest"] === "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] === "") {
		return streetName["toStreetName"] + dictionary["toward"] + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + streetName["toDest"] + " " + dictionary["toward"];
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
	// make_ut(Dist, Street) --  ["in", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return distance(dist, "nom") + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
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
	// prepare_make_ut(Dist, Street) -- ["after", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
	return dictionary["prepare_make_uturn"] + " " + distance(dist, "nom")  + " " + dictionary["after"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return distance(dist, "nom") + " " + dictionary["after"] + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return distance(dist, "nom") + " " + dictionary["prepare_roundabout"]; 
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
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
	// and_arrive_intermediate(D) -- ["and_arrive_intermediate"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_intermediate"] + " " + dest;
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
	return dictionary["reached_destination"] + " " + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest;
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
	return dictionary["off_route"] + " " + distance(dist, "acc");
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	// make_ut_wp -- ["make_uturn_wp"].
	return dictionary["make_ut_wp"];
}


// name(D, [D]) :- tts.
// name(_D, []) :- not(tts).

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