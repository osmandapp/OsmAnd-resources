
// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)

var metricConst;
var tts;
var dictionary = {};
//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is1"] = tts ? "De berekende afstand is " : "route_is1.ogg";
	dictionary["route_is2"] = tts ? "lang" : "route_is2.ogg";
	dictionary["route_calculate"] = tts ? "Afstand is opnieuw berekend" : "route_calculate.ogg";
	dictionary["distance"] = tts ? ", de nieuwe afstand is " : "distance.ogg";
	
	// LEFT/RIGHT
	dictionary["prepare"] = tts ? "Verder op " : "prepare.ogg";
	// Verder op should officially be spelled as verderop but is not pronounced correctly
	// by tts voices when spelled that way. Please leave it like this.
	dictionary["after"] = tts ? "Na " : "after.ogg";
	
	dictionary["left"] = tts ? "links afslaan" : "left.ogg";
	dictionary["left_sh"] = tts ? "scherpe bocht naar links" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "links afbuigen" : "left_sl.ogg";
	dictionary["right"] = tts ? "rechts afslaan" : "right.ogg";
	dictionary["right_sh"] = tts ? "scherpe bocht naar rechts" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "rechts afbuigen" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "links aanhouden" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "rechts aanhouden" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "links aanhouden" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "rechts aanhouden" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages
	
	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "Keer om na " : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? "omkeren " : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "keer nu om" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "Indien mogelijk, nu omkeren" : "make_uturn_wp.ogg";
	
	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Neem de rotonde na " : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "de rotonde oprijden en neem dan de " : "roundabout.ogg";
	dictionary["then"] = tts ? "dan " : "then.ogg";
	dictionary["and"] = tts ? " en " : "and.ogg";
	dictionary["take"] = tts ? "Neem de " : "take.ogg";
	dictionary["exit"] = tts ? "afslag" : "exit.ogg";
	
	dictionary["1st"] = tts ? "eerste " : "1st.ogg";
	dictionary["2nd"] = tts ? "tweede " : "2nd.ogg";
	dictionary["3rd"] = tts ? "derde " : "3rd.ogg";
	dictionary["4th"] = tts ? "vierde " : "4th.ogg";
	dictionary["5th"] = tts ? "vijfde " : "5th.ogg";
	dictionary["6th"] = tts ? "zesde " : "6th.ogg";
	dictionary["7th"] = tts ? "zevende " : "7th.ogg";
	dictionary["8th"] = tts ? "achtste " : "8th.ogg";
	dictionary["9th"] = tts ? "negende  " : "9th.ogg";
	dictionary["10th"] = tts ? "tiende " : "10th.ogg";
	dictionary["11th"] = tts ? "elfde " : "11th.ogg";
	dictionary["12th"] = tts ? "twaalfde " : "12th.ogg";
	dictionary["13th"] = tts ? "dertiende " : "13th.ogg";
	dictionary["14th"] = tts ? "viertiende " : "14th.ogg";
	dictionary["15th"] = tts ? "vijftiende " : "15th.ogg";
	dictionary["16th"] = tts ? "zestiende " : "16th.ogg";
	dictionary["17th"] = tts ? "zeventiende " : "17th.ogg";
	
	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Deze weg blijven volgen" : "go_ahead.ogg";
	dictionary["follow1"] = tts ? "De weg  " : "follow1.ogg";
	dictionary["follow2"] = tts ? "volgen" : "follow2.ogg";
	
	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "dan heb je je bestemming " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "je hebt je Bestemming " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "en dan heb je je routepunt " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "je hebt je routepunt " : "reached_intermediate.ogg";
	dictionary["reached"] = tts ? "bereikt" : "reached.ogg";
	
	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "en dan heb je je GPX routepunt " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "je hebt je GPX routepunt " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "en dan heb je je favoriet " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "je hebt je favoriet " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "en dan heb je je POI " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "je hebt je POI " : "reached_poi.ogg";
	
	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "je overschrijdt de maximumsnelheid " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "maximumsnelheid " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "let op , " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "snelheidscontrole" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "grenscontrole" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "spoorweg overgang" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "verkeersdrempel" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "tol poort" : "toll_booth.ogg";
	// de spatie is nodig voor een betere uitspraak
	dictionary["stop"] = tts ? "stop teken" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "zebra pad" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunnel" : "tunnel.ogg";
	
	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "G P S  signaal verloren" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "g p s signaal hersteld" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "je bent afgeweken van de route vanaf " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "je bent weer op de route" : "back_on_route.ogg";
	
	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "naar " : "onto.ogg";
	dictionary["toward"] = tts ? "richting  " : "toward.ogg";
	
	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "meter" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "ongeveer een kilometer" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "ongeveer " : "around.ogg";
	dictionary["kilometers"] = tts ? "kilometer" : "kilometers.ogg";
	
	dictionary["feet"] = tts ? "voet " : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "een tiende mijl" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "tiende mijl" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "ongeveer een mijl" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "mijlen" : "miles.ogg";
	
	dictionary["yards"] = tts ? "yards" : "yards.ogg";
	
	// TIME SUPPORT
	dictionary["time"] = tts ? ", tijd tot bestemming " : "time.ogg";
	dictionary["1_hour"] = tts ? "een uur " : "1_hour.ogg";
	dictionary["hours"] = tts ? "uur " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "minder dan een minuut" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "een minuut" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minuten" : "minutes.ogg";
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
	return dictionary["route_is1"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1000) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + dictionary["kilometers"];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + dictionary["kilometers"];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet"];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile"];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(dist/0.9144)) + " " + dictionary["yards"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist((dist/10.0/0.9144)*10)) + " " + dictionary["yards"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist((2*dist/10.0/0.9144)*10)) + " " + dictionary["yards"]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
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

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow1"] + " " + distance(dist) + " " + dictionary["follow2"] + " " + turn_street(streetName);
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
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
}

function take_exit(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["on"] + " " + dictionary["exit"] + " "
			+ take_exit_name(streetName)
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType)
			+ dictionary["on"] + " " + dictionary["exit"] + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
      		return streetName["toRef"] + " " + streetName["toStreetName"] + dictionary["toward"] + " " + streetName["toDest"];
    } else {
      		return streetName["toRef"] + " " + streetName["toStreetName"]
	}
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
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
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
		return streetName["toRef"] + " " + dictionary["onto"] + " " + streetName["toDest"];
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
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
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
	return dictionary["prepare_make_ut"] + " " + distance(dist);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["prepare_roundabout"] + " " + distance(dist); 
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
	return dictionary["and_arrive_waypoint"] + " " + dest + " " + dictionary["reached"];
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest + " " + dictionary["reached"];
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest + " " + dictionary["reached"];
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest + " " + dictionary["reached"];
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest + " " + dictionary["reached"];
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest + " " + dictionary["reached"];
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest + " " + dictionary["reached"];
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest + " " + dictionary["reached"];
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist);
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	// make_ut_wp -- ["make_uturn_wp"].
	return dictionary["make_uturn_wp"];
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
		return "70.ogg "+ ogg_dist(distance - 70);
	} else if (distance < 90) {
		return "80.ogg " + ogg_dist(distance - 80);
	} else if (distance < 100) {
		return "90.ogg " + ogg_dist(distance - 90);
	} else if (distance < 200) {
		return "100.ogg " + ogg_dist(distance - 100);
	} else if (distance < 300) {
		return "200.ogg " + ogg_dist(distance - 200);
	} else if (distance < 400) {
		return "300.ogg "+ ogg_dist(distance - 300);
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
