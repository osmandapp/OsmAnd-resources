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
	dictionary["route_is"] = tts ? "La kurso estas" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "La kurso rekalkuliĝas" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "distanco" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Pretiĝu sin" : "prepare.ogg";
	dictionary["after"] = tts ? "post" : "after.ogg";
	dictionary["in"] = tts ? "en" : "in.ogg";

	dictionary["left"] = tts ? "turniĝu maldekstren" : "left.ogg";
	dictionary["left_sh"] = tts ? "turniĝegu maldekstren" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "turniĝetu maldekstren" : "left_sl.ogg";
	dictionary["right"] = tts ? "turniĝu dekstren" : "right.ogg";
	dictionary["right_sh"] = tts ? "turniĝegu dekstren" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "turniĝetu dekstren" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "teniĝu maldekstre" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "teniĝu dekstre" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "teniĝu maldekstre" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "teniĝu dekstre" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Turniĝu malantaŭen" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "Kiam eble, turniĝu malantaŭen" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Pretiĝu por enigi en trafikcirklon" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "enigu en trafikcirklon" : "roundabout.ogg";
	dictionary["then"] = tts ? "do" : "then.ogg";
	dictionary["and"] = tts ? "kaj" : "and.ogg";
	dictionary["take"] = tts ? "veturi per" : "take.ogg";
	dictionary["the"] = tts ? "la" : "the.ogg";
	dictionary["exit"] = tts ? "elveturejo" : "exit.ogg";
	dictionary["exit_acc"] = tts ? "elveturejon" : "exit_acc.ogg"; //accusative case
	dictionary["onto_exit"] = tts ? "sur la" : "onto_x.ogg"; // only used for exits, which can be conjugated

	dictionary["1a"] = tts ? "unua" : "1a.ogg";
	dictionary["2a"] = tts ? "dua" : "2a.ogg";
	dictionary["3a"] = tts ? "tria" : "3a.ogg";
	dictionary["4a"] = tts ? "kvara" : "4a.ogg";
	dictionary["5a"] = tts ? "kvina" : "5a.ogg";
	dictionary["6a"] = tts ? "sesa" : "6a.ogg";
	dictionary["7a"] = tts ? "sepa" : "7a.ogg";
	dictionary["8a"] = tts ? "oka" : "8a.ogg";
	dictionary["9a"] = tts ? "naŭa" : "9a.ogg";
	dictionary["10a"] = tts ? "deka" : "10a.ogg";
	dictionary["11a"] = tts ? "dek-unua" : "11a.ogg";
	dictionary["12a"] = tts ? "dek-dua" : "12a.ogg";
	dictionary["13a"] = tts ? "dek-tria" : "13a.ogg";
	dictionary["14a"] = tts ? "dek-kvara" : "14a.ogg";
	dictionary["15a"] = tts ? "dek-kvina" : "15a.ogg";
	dictionary["16a"] = tts ? "dek-sesa" : "16a.ogg";
	dictionary["17a"] = tts ? "dek-sepa" : "17a.ogg";

	dictionary["1an"] = tts ? "unuan" : "1an.ogg";
	dictionary["2an"] = tts ? "duan" : "2an.ogg";
	dictionary["3an"] = tts ? "trian" : "3an.ogg";
	dictionary["4an"] = tts ? "kvaran" : "4an.ogg";
	dictionary["5an"] = tts ? "kvinan" : "5an.ogg";
	dictionary["6an"] = tts ? "sesan" : "6an.ogg";
	dictionary["7an"] = tts ? "sepan" : "7an.ogg";
	dictionary["8an"] = tts ? "okan" : "8an.ogg";
	dictionary["9an"] = tts ? "naŭan" : "9an.ogg";
	dictionary["10an"] = tts ? "dekan" : "10an.ogg";
	dictionary["11an"] = tts ? "dek-unuan" : "11an.ogg";
	dictionary["12an"] = tts ? "dek-duan" : "12an.ogg";
	dictionary["13an"] = tts ? "dek-trian" : "13an.ogg";
	dictionary["14an"] = tts ? "dek-kvaran" : "14an.ogg";
	dictionary["15an"] = tts ? "dek-kvinan" : "15an.ogg";
	dictionary["16an"] = tts ? "dek-sesan" : "16an.ogg";
	dictionary["17an"] = tts ? "dek-sepan" : "17an.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Daŭru iri antaŭen" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Daŭru iri" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "kaj alvenu ĉe la celloko" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "vi alvenis ĉe la celloko" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "kaj alvenu ĉe la meza punkto" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "vi alvenis ĉe la meza punkto" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "kaj alvenu ĉe la GPX-navigadpunkto" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "vi traveturas la GPX-navigadpunkton" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "kaj alvenu ĉe la ŝatata punkto" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "vi traveturas la ŝatatan punkton" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "kaj alvenu ĉe la interesejo" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "vi traveturas la interesejon" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Вы превысили допустимую скорость" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "rapidlimo" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Atentu" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "rapid-kontrolilo" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "landlima trairejo" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "fervoja transirejo" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "trafik-trankviligilo" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "kasejo de la pagenda vojo" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "halt-signo" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "vojkruco por piedirantoj" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunelo" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "signalo de G-P-S perditis" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "signalo de G-P-S restaŭritis" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Vi deviis el la kurso je" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Vi revenis en la kurson" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["on"] = tts ? "sur" : "on.ogg";
	dictionary["onto"] = tts ? "sur la vojon" : "onto.ogg"; // literally "onto the way", used with street names which can't be conjugated
	dictionary["to"] = tts ? "al la vojon" : "to.ogg";
	dictionary["toward"] = tts ? "al" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "metroj" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "ĉirkau unu kilometro" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "ĉirkau" : "around.ogg";
	dictionary["kilometers"] = tts ? "kilometroj" : "kilometers.ogg";

	dictionary["feet"] = tts ? "futoj" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "unu dekono de mejlo" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? " dekonoj de mejlo" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "ĉirkau unu mejlo" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "mejloj" : "miles.ogg";
	dictionary["yards"] = tts ? "jardoj" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "tempo" : "time.ogg";
	dictionary["1_hour"] = tts ? "unu horo" : "1_hour.ogg";
	dictionary["hours"] = tts ? "horoj" : "hours_a.ogg";
	dictionary["less_a_minute"] = tts ? "malpli ol minuto" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "unu minuto" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minutoj" : "minutes.ogg";

	dictionary["the_time_is"] = tts ? "la tempo estas" : "the_time_is.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["the_time_is"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1000) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet"];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile"];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yards"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards"]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
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
	return dictionary["route_calculate"] + (tts ? ", " : " ") + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist) + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto_exit"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " "
			+ getTurnType(turnType) + " " + dictionary["onto_exit"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
		return dictionary["the"] + nth_acc(exitInt) + " " + dictionary["exit_acc"];
	} else if (tts) {
		return dictionary["exit_acc"] + " " + exitString;
	} else {
		return dictionary["exit_acc"];
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
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] == "") {
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	}
}

function nth(exit) {
	switch (exit) {
		case (1):
			return dictionary["1a"];
		case (2):
			return dictionary["2a"];
		case (3):
			return dictionary["3a"];
		case (4):
			return dictionary["4a"];
		case (5):
			return dictionary["5a"];
		case (6):
			return dictionary["6a"];
		case (7):
			return dictionary["7a"];
		case (8):
			return dictionary["8a"];
		case (9):
			return dictionary["9a"];
		case (10):
			return dictionary["10a"];
		case (11):
			return dictionary["11a"];
		case (12):
			return dictionary["12a"];
		case (13):
			return dictionary["13a"];
		case (14):
			return dictionary["14a"];
		case (15):
			return dictionary["15a"];
		case (16):
			return dictionary["16a"];
		case (17):
			return dictionary["17a"];
	}
}

function nth_acc(exit) { //accusative case
	switch (exit) {
		case (1):
			return dictionary["1an"];
		case (2):
			return dictionary["2an"];
		case (3):
			return dictionary["3an"];
		case (4):
			return dictionary["4an"];
		case (5):
			return dictionary["5an"];
		case (6):
			return dictionary["6an"];
		case (7):
			return dictionary["7an"];
		case (8):
			return dictionary["8an"];
		case (9):
			return dictionary["9an"];
		case (10):
			return dictionary["10an"];
		case (11):
			return dictionary["11an"];
		case (12):
			return dictionary["12an"];
		case (13):
			return dictionary["13an"];
		case (14):
			return dictionary["14an"];
		case (15):
			return dictionary["15an"];
		case (16):
			return dictionary["16an"];
		case (17):
			return dictionary["17an"];
	}
}

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
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
	return dictionary["off_route"] + " " + distance(dist);
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

// DISTANCE MEASURE
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
