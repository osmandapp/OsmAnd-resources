
// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: distance(nominative/dative), street name (male/female/nothing)

var dictionary = {};
var metricConst;
var tts;
//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
dictionary["route_is1"] = "Su biàgiu est ";
dictionary["route_is2"] = "longu";
dictionary["route_calculate"] = "Ricàlculu àndala";
dictionary["distance"] = "distàntzia ";


// LEFT/RIGHT
//dictionary["prepare"] = "Preparàdebos ";
dictionary["after"] = "a pustis de ";
dictionary["in"] = "a pustis de ";

dictionary["left"] = "bortare a manca";
dictionary["left_sh"] = "bortare istrintu a manca";
dictionary["left_sl"] = "bortare de pagu a manca";
dictionary["right"] = "bortare a destra";
dictionary["right_sh"] = "bortare istrintu a destra";
dictionary["right_sl"] = "bortare de pagu a destra";
dictionary["left_keep"] = "mantènnere sa manca";
dictionary["right_keep"] = "mantènnere sa destra";
dictionary["left_bear"] = "mantènnere sa manca";  // in English the same as left_keep, may be different in other languages
dictionary["right_bear"] = "mantènnere sa destra";   // in English the same as right_keep, may be different in other languages

// U-TURNS
dictionary["make_uturn1"] = "faghide una furriadura a u";
dictionary["make_uturn2"] = "Preparade·bos a una furriadura a U";
dictionary["make_uturn_wp"] = "In su primu momentu possìbile, fàghere una furriada a u";

// ROUNDABOUTS
dictionary["prepare_roundabout"] = "intrare in una rutunda";
dictionary["roundabout"] = "intrade in sa rutunda, ";
dictionary["then"] = ", pustis";
dictionary["and"] = " e ";
dictionary["take"] = "pigade sa ";
dictionary["exit"] = "essida";

dictionary["1st"] = "prima ";
dictionary["2nd"] = "segunda ";
dictionary["3rd"] = "tertza ";
dictionary["4th"] = "cuàrta ";
dictionary["5th"] = "cuìnta ";
dictionary["6th"] = "sesta ";
dictionary["7th"] = "sètima ";
dictionary["8th"] = "otàva ";
dictionary["9th"] = "nona ";
dictionary["10th"] = "dètzima ";
dictionary["11th"] = "undighèsima ";
dictionary["12th"] = "doighèsima ";
dictionary["13th"] = "treighèsima ";
dictionary["14th"] = "batordighèsima ";
dictionary["15th"] = "bindighèsima ";
dictionary["16th"] = "seighèsima ";
dictionary["17th"] = "deghesetèsima ";

// STRAIGHT/FOLLOW
dictionary["go_ahead"] = "Sighide deretu";
dictionary["follow"] = "Sighide pro ";

// ARRIVE
dictionary["and_arrive_destination"] = "e ais a arribare a destinatzione ";
dictionary["reached_destination"] = "arribados a destinatzione ";
dictionary["and_arrive_intermediate"] = "e ais a arribare a su puntu mesanu "; // !!! no apostrophe
dictionary["reached_intermediate"] = "arribados a su puntu mesanu ";

// NEARBY POINTS
dictionary["and_arrive_waypoint"] = "e ais a arribare a su puntu mesanu ";
dictionary["reached_waypoint"] = "seis arribados a su puntu mesanu ";
dictionary["and_arrive_favorite"] = "e ais a arribare a su preferidu ";
dictionary["reached_favorite"] = "seis arribados a su preferidu ";
dictionary["and_arrive_poi"] = "e ais a arribare a su puntu de interesse ";
dictionary["reached_poi"] = "seis arribados a su puntu de interesse ";

// ATTENTION
//dictionary["exceed_limit"] = "ais barigadu su lìmite de lestresa ";
dictionary["exceed_limit"] = "lìmite de lestresa ";
dictionary["attention"] = "atentzione , ";
dictionary["speed_camera"] = "autovelox";
dictionary["border_control"] = "dogana";
dictionary["railroad_crossing"] = "coladòrgiu a livellu";
dictionary["traffic_calming"] = "minimadore de lestresa";
dictionary["toll_booth"] = "casellu";
dictionary["stop"] = "istop";
dictionary["pedestrian_crosswalk"] = "atraessamentu pedonale";
dictionary["tunnel"] = "galleria";

// OTHER PROMPTS
dictionary["location_lost"] = "Sinnale GPS pèrdidu";
dictionary["location_recovered"] = "Sinnale GPS torradu";
dictionary["off_route"] = "seis essidos dae s'àndala ";
dictionary["back_on_route"] = "seis torrados in s'àndala";

// STREET NAME PREPOSITIONS
dictionary["onto"] = "in ";
dictionary["on"] = "in ";
dictionary["to"] = "pro ";
dictionary["toward"] = "pro ";

// DISTANCE UNIT SUPPORT
dictionary["meters"] = "metros";
dictionary["meters_nominativ"] = "metros";
dictionary["meters_dativ"] = "metros";
dictionary["around_1_kilometer"] = "pagu prus o mancu unu chilòmetru ";
dictionary["around_1_kilometer_nominativ"] = "pagu prus o mancu unu chilòmetru";
dictionary["around_1_kilometer_dativ"] = "pagu prus o mancu unu chilòmetru";
dictionary["around"] = "pagu prus o mancu ";
dictionary["kilometers"] = "chilòmetros";
dictionary["kilometers_nominativ"] = "chilòmetros";
dictionary["kilometers_dativ"] = "chilòmetros";

dictionary["feet"] = "pedes ";
dictionary["feet_nominativ"] = "pedes";
dictionary["feet_dativ"] = "pedes";
dictionary["1_tenth_of_a_mile"] = "unu dètzimu de mìgliu";
dictionary["1_tenth_of_a_mile_nominativ"] = "unu dètzimu de mìgliu";
dictionary["1_tenth_of_a_mile_dativ"] = "unu dètzimu de mìgliu";
dictionary["tenths_of_a_mile"] = "dètzimos de mìgliu";
dictionary["tenths_of_a_mile_nominativ"] = "dètzimos de mìgliu";
dictionary["tenths_of_a_mile_dativ"] = "dètzimos de mìgliu";
dictionary["around_1_mile"] = "pagu prus o mancu unu mìgliu";
dictionary["miles"] = "mìglios";
dictionary["miles_nominativ"] = "mìglios";
dictionary["miles_dativ"] = "mìglios";
dictionary["yards"] = "iardas";
dictionary["yards_nominativ"] = "iardas";
dictionary["yards_dativ"] = "iardas";

// TIME SUPPORT
dictionary["time"] = "tempus netzessàriu ";
dictionary["1_hour"] = "un ora ";
dictionary["hours"] = "oras ";
dictionary["less_a_minute"] = "de mancu de unu minutu";
dictionary["1_minute"] = "unu minutu";
dictionary["minutes"] = "minutos";


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
}

	
function isFeminine(streetName) {
	var endings = ["strasse","straße","bahn","chaussee","gasse","zeile","allee","tangente","spange","0","1","2","3","4","5","6","7","8","9"];
	for (str in endings) {
		if (streetName["toRef"].endsWith(str) || streetName["toStreetName"].endsWith(str)) {
			return true;
		}
	}
	return false;
}

function isMasculine(streetName) {
	var endings = ["istrada","istrada","autoistrada","chaussee", "gùturu","zeile", "viale","diga","0","1","2","3","4","5","6","7","8","9",];
	for (str in endings) {
		if (streetName["toStreetName"].endsWith(str)) {
			return true;
		}
	}
	return false;

}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is1"] + dictionary["route_is2"] + " " + distance(dist, "nominativ") + " " + dictionary["route_is2"] + " " + dictionary["time"] + " " + time(timeVal) + ". ";
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
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist, "nominativ") + " " + dictionary["time"] + " " + time(seconds) + ". ";
}

function go_ahead(dist, streetName) {
	// go_ahead(Dist, Street) -- ['follow1', D, 'follow2'| Sgen]:- distance(Dist, nominativ) -- D, follow_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist, "nominativ") + " " + dictionary["follow2"] + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && (streetName["toStreetName"] === streetName["fromStreetName"] || streetName["toStreetName"] === "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	// turn(Turn, Dist, Street) -- ['after', D, M, ' '| Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "dativ") + " " + getTurnType(turnType) + " " + turn_street(streetName); 
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
		return dictionary["in"] + " " + distance(dist, "dativ") + " " + dictionary["roundabout"] + " " + dictionary["then"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	

// turn_street(voice(['', '', D], _), ['toward', D]) :- tts.
// turn_street(Street, ['onto', 'die ', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_female(Street), assemble_street_name(Street, SName).
// turn_street(Street, ['onto', 'den ', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_male(Street), assemble_street_name(Street, SName). // Most Refs are female, hence this check only after female check
// turn_street(Street, ['onto', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_nothing(Street), assemble_street_name(Street, SName).

	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "" && streetName["toRef"] != "") {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
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
		return streetName["toRef"] + dictionary["toward"] + streetName["toDest"];
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
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "dativ") + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
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
	// prepare_make_ut(Dist, Street) -- ['prepare', 'after', D, 'make_uturn2' | Sgen] :- distance(Dist, dativ) -- D, turn_street(Street, Sgen).

	return dictionary["after"] + " " + distance(dist, "dativ") + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ['prepare', 'after', D, M | Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist, "dativ") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["after"] + " " + distance(dist, "dativ") + " " + dictionary["prepare_roundabout"]; 
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
	return dictionary["and_arrive_intermediate"] + " " + dest + " ";
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
	return dictionary["reached_destination"] + " " + dest + " ";
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest + " ";
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
	return dictionary["off_route"] + " " + distance(dist, "dativ");
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_ut_wp"];
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
