// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "The trip is " : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "route recalculated" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "distance " : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Prepare to " : "prepare.ogg";
	dictionary["after"] = tts ? "after " : "after.ogg";
	dictionary["in"] = tts ? "in " : "in.ogg";

	dictionary["left"] = tts ? "turn left" : "left.ogg";
	dictionary["left_sh"] = tts ? "turn sharply left" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "turn slightly left" : "left_sl.ogg";
	dictionary["right"] = tts ? "turn right" : "right.ogg";
	dictionary["right_sh"] = tts ? "turn sharply right" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "turn slightly right" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "keep left" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "keep right" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "keep left" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "keep right" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Make a U turn" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "When possible, please make a U turn" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "enter a roundabout" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "enter the roundabout, " : "roundabout.ogg";
	dictionary["then"] = tts ? ", then " : "then.ogg";
	dictionary["and"] = tts ? " and " : "and.ogg";
	dictionary["take"] = tts ? "take the " : "take.ogg";
	dictionary["exit"] = tts ? "exit" : "exit.ogg";

	dictionary["1st"] = tts ? "first " : "1st.ogg";
	dictionary["2nd"] = tts ? "second " : "2nd.ogg";
	dictionary["3rd"] = tts ? "third " : "3rd.ogg";
	dictionary["4th"] = tts ? "fourth " : "4th.ogg";
	dictionary["5th"] = tts ? "fifth " : "5th.ogg";
	dictionary["6th"] = tts ? "sixth " : "6th.ogg";
	dictionary["7th"] = tts ? "seventh " : "7th.ogg";
	dictionary["8th"] = tts ? "eighth " : "8th.ogg";
	dictionary["9th"] = tts ? "nineth " : "9th.ogg";
	dictionary["10th"] = tts ? "tenth " : "10th.ogg";
	dictionary["11th"] = tts ? "eleventh " : "11th.ogg";
	dictionary["12th"] = tts ? "twelfth " : "12th.ogg";
	dictionary["13th"] = tts ? "thirteenth " : "13th.ogg";
	dictionary["14th"] = tts ? "fourteenth " : "14th.ogg";
	dictionary["15th"] = tts ? "fifteenth " : "15th.ogg";
	dictionary["16th"] = tts ? "sixteenth " : "16th.ogg";
	dictionary["17th"] = tts ? "seventeenth " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Go straight ahead" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Continue for " : "follow.ogg";  // 'Follow the course of the road for' perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "and arrive at your destination " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "you have reached your destination " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "and arrive at your intermediate destination " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "you have reached your intermediate destination " : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "and pass GPX waypoint " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "you are passing GPX waypoint " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "and pass favourite " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "you are passing favourite " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "and pass POI " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "you are passing POI " : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "you are exceeding the speed limit " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "speed limit " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "attention, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "speed camera" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "border control" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "railway crossing" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "traffic calming" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "toll barrier" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "stop sign" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "pedestrian crossing" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunnel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "g p s signal lost" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "g p s signal recovered" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "you have been off the route for " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "you are back on the route" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "onto " : "onto.ogg";
	dictionary["on"] = tts ? "on " : "on.ogg";
	dictionary["to"] = tts ? "to " : "to.ogg";
	dictionary["toward"] = tts ? "towards " : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "metres" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "about 1 kilometre" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "about " : "around.ogg";
	dictionary["kilometers"] = tts ? "kilometres" : "kilometers.ogg";

	dictionary["feet"] = tts ? "feet " : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "one tenth of a mile" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "tenths of a mile" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "about 1 mile" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "miles" : "miles.ogg";

	dictionary["yards"] = tts ? "yards" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "time is " : "time.ogg";
	dictionary["1_hour"] = tts ? "one hour " : "1_hour.ogg";
	dictionary["hours"] = tts ? "hours " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "less than a minute" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "one minute" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minutes" : "minutes.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
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
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist) + " " + follow_street(streetName);
	}
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
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + ", " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	} else {
		return dictionary["in"] + " " + distance(dist) + ", "
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return ", " + streetName["toStreetName"] + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return ", " + streetName["toStreetName"]
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
			return nth(exitInt) + " " + dictionary["exit"];
	} else if (tts) {
			return  dictionary["exit"] + " " + exitString;
	} else {
			return dictionary["exit"];
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
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}
}

function turn_street(streetName) {
// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
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
// make_ut(Dist, Street) --  ["in", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
// bear_left(_Street) -- ["left_bear"].
	return dictionary["left_bear"];
}

function bear_right(streetName) {
// bear_right(_Street) -- ["right_bear"].
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
// prepare_make_ut(Dist, Street) -- ["after", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist) + ", " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
// and_arrive_intermediate(D) -- ["and_arrive_intermediate"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

function and_arrive_waypoint(dest) {
// and_arrive_waypoint(D) -- ["and_arrive_waypoint"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

function and_arrive_favorite(dest) {
// and_arrive_favorite(D) -- ["and_arrive_favorite"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_favorite"] + " " + dest;
}

function and_arrive_poi(dest) {
// and_arrive_poi(D) -- ["and_arrive_poi"|Ds] :- name(D, Ds).
	return dictionary["and_arrive_poi"] + " " + dest;
}

function reached_destination(dest) {
// reached_destination(D) -- ["reached_destination"|Ds] :- name(D, Ds).
	return dictionary["reached_destination"] + " " + dest;
}

function reached_waypoint(dest) {
// reached_waypoint(D) -- ["reached_waypoint"|Ds] :- name(D, Ds).
	return dictionary["reached_waypoint"] + " " + dest;
}

function reached_intermediate(dest) {
// reached_intermediate(D) -- ["reached_intermediate"|Ds] :- name(D, Ds).
	return dictionary["reached_intermediate"] + " " + dest;
}

function reached_favorite(dest) {
// reached_favorite(D) -- ["reached_favorite"|Ds] :- name(D, Ds).
	return dictionary["reached_favorite"] + " " + dest;
}

function reached_poi(dest) {
// reached_poi(D) -- ["reached_poi"|Ds] :- name(D, Ds).
	return dictionary["reached_poi"] + " " + dest;
}

function location_lost() {
// location_lost -- ["location_lost"].
	return dictionary["location_lost"];
}

function location_recovered() {
// location_recovered -- ["location_recovered"].
	return dictionary["location_recovered"];
}

function off_route(dist) {
// off_route(Dist) -- ["off_route", D] :- distance(Dist) -- D.
	return dictionary["off_route"] + " " + distance(dist);
}

function back_on_route() {
// back_on_route -- ["back_on_route"].
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	// make_ut_wp -- ["make_uturn_wp"].
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