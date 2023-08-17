// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// N/B This is a set of beeps, principally intended for cycling, so the following criteria don't really apply.
//
// ( ) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// ( ) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// ( ) Street name and prepositions (onto / on / to) and street destination (toward) support
// ( ) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)
// (N/A) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;
var turn_warning_meters = 300;
var turn_warning_feet = 985;
var turn_warning_yards = 330;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	dictionary["squawk"] = "squawk.ogg";
	dictionary["low_one"] = "square.440.1.ogg";
	dictionary["low_half"] = "square.440.half.ogg";
	dictionary["low_quarter"] = "square.440.quarter.ogg";
	dictionary["mid_one"] = "square.660.1.ogg";
	dictionary["mid_half"] = "square.660.half.ogg";
	dictionary["mid_quarter"] = "square.660.quarter.ogg";
	dictionary["high_one"] = "square.880.1.ogg";
	dictionary["high_half"] = "square.880.half.ogg";
	dictionary["high_quarter"] = "square.880.quarter.ogg";
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
	return dictionary["squawk"];
}

function distance(dist) {
	return " ";
}

function time(seconds) {
	return " ";
}

function hours(minutes) {
	return " ";
}

function route_recalc(dist, seconds) {
	return dictionary["squawk"];
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["mid_one"];
	} else {
		return " ";
	}
}

function follow_street(streetName) {
	return " ";
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType);
	} else {
		switch (metricConst) {
			case "km-m":
				if (dist < turn_warning_meters) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-f":
				if (dist < turn_warning_feet) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-m":
				if (dist < turn_warning_meters) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-y":
				if (dist < turn_warning_yards) {
					return getTurnType_short(turnType);
				}
				break;
		}			
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType);
	} else {
		switch (metricConst) {
			case "km-m":
				if (dist < turn_warning_meters) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-f":
				if (dist < turn_warning_feet) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-m":
				if (dist < turn_warning_meters) {
					return getTurnType_short(turnType);
				}
				break;
			case "mi-y":
				if (dist < turn_warning_yards) {
					return getTurnType_short(turnType);
				}
				break;
		}			
	}
}

function take_exit_name(streetName) {
	return " ";
}

function getExitNumber(exitString, exitInt) {
	return " ";
}

function getTurnType(turnType) {
	switch (turnType) {
		case "left":
			return dictionary["low_one"];
			break;
		case "left_sh":
			return dictionary["low_one"];
			break;
		case "left_sl":
			return dictionary["low_one"];
			break;
		case "right":
			return dictionary["high_one"];
			break;
		case "right_sh":
			return dictionary["high_one"];
			break;
		case "right_sl":
			return dictionary["high_one"];
			break;
		case "left_keep":
			return " ";
			break;
		case "right_keep":
			return " ";
			break;
	}
}

function getTurnType_short(turnType) {
	switch (turnType) {
		case "left":
			return dictionary["low_quarter"];
			break;
		case "left_sh":
			return dictionary["low_quarter"];
			break;
		case "left_sl":
			return dictionary["low_quarter"];
			break;
		case "right":
			return dictionary["high_quarter"];
			break;
		case "right_sh":
			return dictionary["high_quarter"];
			break;
		case "right_sl":
			return dictionary["high_quarter"];
			break;
		case "left_keep":
			return " ";
			break;
		case "right_keep":
			return " ";
			break;
	}
}

function then() {
	return " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return nth(exit);
	} else {
		return nth_short(exit);
	}
}

function turn_street(streetName) {
	return " ";
}

function assemble_street_name(streetName) {
	return " ";
}

function nth(exit) {
	var series_of_beeps;
	for (var i = 0; i <= exit; i++) {
		series_of_beeps += (dictionary["mid_half"] + " ");
	}
	return series_of_beeps;	
}

function nth_short(exit) {
	var series_of_beeps;
	for (var i = 0; i <= exit; i++) {
		series_of_beeps += (dictionary["mid_quarter"] + " ");
	}
	return series_of_beeps;	
}

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["low_half"] + " " + dictionary["mid_half"] + " " + dictionary["high_half"];
	} else {
		return " ";
	}
}

function bear_left(streetName) {
	return " ";
}

function bear_right(streetName) {
	return " ";
}

function prepare_make_ut(dist, streetName) {
	return dictionary["low_quarter"] + " " + dictionary["mid_quarter"] + " " + dictionary["high_quarter"];
}

function prepare_turn(turnType, dist, streetName) {
	switch (metricConst) {
		case "km-m":
			if (dist < turn_warning_meters) {
				return getTurnType_short(turnType);
			}
			break;
		case "mi-f":
			if (dist < turn_warning_feet) {
				return getTurnType_short(turnType);
			}
			break;
		case "mi-m":
			if (dist < turn_warning_meters) {
				return getTurnType_short(turnType);
			}
			break;
		case "mi-y":
			if (dist < turn_warning_yards) {
				return getTurnType_short(turnType);
			}
			break;
	}			
}

function prepare_roundabout(dist, exit, streetName) {
	return nth_short(exit);
}

function and_arrive_destination(dest) {
	return " ";
}

function and_arrive_intermediate(dest) {
	return " ";
}

function and_arrive_waypoint(dest) {
	return " ";
}

function and_arrive_favorite(dest) {
	return " ";
}

function and_arrive_poi(dest) {
	return " ";
}

function reached_destination(dest) {
	return dictionary["squawk"];
}


function reached_waypoint(dest) {
	return dictionary["squawk"];
}

function reached_intermediate(dest) {
	return dictionary["squawk"];
}

function reached_favorite(dest) {
	return dictionary["squawk"];
}

function reached_poi(dest) {
	return dictionary["squawk"];
}

function location_lost() {
	return dictionary["squawk"];
}

function location_recovered() {
	return dictionary["squawk"];
}

function off_route(dist) {
	return dictionary["squawk"];
}

function back_on_route() {
	return dictionary["squawk"];
}

function make_ut_wp() {
	return dictionary["squawk"];
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["squawk"];
}

function attention(type) {
	return dictionary["squawk"];
}

function getAttentionString(type) {
/*	switch (type) {
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
	} */
	return " ";
}

// DISTANCE MEASURE
function ogg_dist(distance) {
	return " ";
}
