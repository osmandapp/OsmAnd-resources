// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet)
// (X) Special grammar: (NEARBY POINTS)
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "கணிக்கப்பட்ட பயண தூரம்" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "புதிய வழி கணிக்கப்பட்டது" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "தூரம்" : "distance.ogg";
    dictionary["trip_duration"] = tts ? "பயண நேரம்" : "trip_duration.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Prepare to" : "prepare.ogg";
	dictionary["after"] = tts ? "பிறகு" : "after.ogg";
	dictionary["in"] = tts ? "இல்" : "in.ogg";

	dictionary["left"] = tts ? "இடதுபுறம் திரும்பவும்" : "left.ogg";
	dictionary["left_sh"] = tts ? "உடனடி இடதுபுறத்தில் திரும்பவும்" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "கொஞ்சம் இடதுபுறம் திரும்பவும்" : "left_sl.ogg";
	dictionary["right"] = tts ? "வலதுபுறம் திரும்பவும்" : "right.ogg";
	dictionary["right_sh"] = tts ? "உடனடி வலதுபுறத்தில் திரும்பவும்" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "கொஞ்சம் வலதுபுறம் திரும்பவும்" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "இடதுபுற லேனில் தொடருங்கள்" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "வலதுபுற லேனில் தொடருங்கள்" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "இடதுபுற லேனில் தொடருங்கள்" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "வலதுபுற லேனில் தொடருங்கள்" : "right_bear.ogg";  // in English the same as right_keep, may be different in other anguages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "U turn செய்யவும்" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "வாய்ப்பிருக்கும்போது U turn செய்யவும்" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "ரவுன்டானாவில் நுழையவும்" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "ரவுன்டானாவில் நுழையவும்" : "roundabout.ogg";
	dictionary["then"] = tts ? "பிறகு" : "then.ogg";
	// dictionary["and"] = tts ? "and" : "and.ogg";
	dictionary["take"] = tts ? "எடுக்கவும்" : "take.ogg";
	dictionary["exit"] = tts ? "exit" : "exit.ogg";

	dictionary["1st"] = tts ? "முதலாவது" : "1st.ogg";
	dictionary["2nd"] = tts ? "இரண்டாவது" : "2nd.ogg";
	dictionary["3rd"] = tts ? "மூன்றாவது" : "3rd.ogg";
	dictionary["4th"] = tts ? "நான்காவது" : "4th.ogg";
	dictionary["5th"] = tts ? "ஐந்தாவது" : "5th.ogg";
	dictionary["6th"] = tts ? "ஆறாவது" : "6th.ogg";
	dictionary["7th"] = tts ? "ஏழாவது" : "7th.ogg";
	dictionary["8th"] = tts ? "எட்டாவது" : "8th.ogg";
	dictionary["9th"] = tts ? "ஒன்பதாவது" : "9th.ogg";
	dictionary["10th"] = tts ? "பத்தாவது" : "10th.ogg";
	dictionary["11th"] = tts ? "பதினோராவது" : "11th.ogg";
	dictionary["12th"] = tts ? "பன்னிரண்டாவது" : "12th.ogg";
	dictionary["13th"] = tts ? "பதிமூன்றாவது" : "13th.ogg";
	dictionary["14th"] = tts ? "பதிநான்காவது" : "14th.ogg";
	dictionary["15th"] = tts ? "பதிநைந்தாவது" : "15th.ogg";
	dictionary["16th"] = tts ? "பதினாறாவது" : "16th.ogg";
	dictionary["17th"] = tts ? "பதினேழாவது" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "நேராக செல்லவும்" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "சென்ற உடன்" : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "நீங்கள் சேருமிடம் வரும்" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "நீங்கள் போகவேண்டிய இடம்" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "இடைநிலை நிறுத்தம் வரும்" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "இடைநிலை நிறுத்தம்" : "reached_intermediate.ogg";
    dictionary["arrived"] = tts ? "வந்துவிட்டது" : "arrived.ogg";

	// NEARBY POINTS
    dictionary["passing_by"] = tts ? "நீங்கள் கடப்பது" : "passing.ogg";
    dictionary["arriving"] = tts ? "வருகிறது" : "arriving.ogg";
    dictionary["poi"] = tts ? "p o i" : "poi.ogg";
    dictionary["favorite"] = tts ? "ஃபேவரைட்" : "favorite.ogg";
    dictionary["waypoint"] = tts ? "GPX வழிப்புள்ளி" : "waypoint.ogg";
	dictionary["and_arrive_waypoint"] = tts ? "and pass GPX waypoint" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "You are passing GPX waypoint" : "reached_waypoint.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "You are exceeding the speed limit" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "வேக வரம்பு" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "கவனம்" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "speed கேமரா" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "சோதனைச் சாவடி" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "ரயில்வே க்ராசிங்" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "வேகத்தடை" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "சுங்கச்சாவடி" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "stop sign" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "பாதசாரிகள் கடக்குமிடம்" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "சுரங்கச் சாலை" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "g p s signal இழந்தது" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "g p s signal கிடைத்துவிட்டது" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "பாதை தவறி சென்ற தூரம்" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "சரியான வழிதடத்தில் மீண்டும் சேர்ந்துவிட்டீர்கள்" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "இல் செல்ல" : "onto.ogg";
	dictionary["on"] = tts ? "இல்" : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "to" : "to.ogg";
	dictionary["toward"] = tts ? "நோக்கி செல்லும்" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "மீட்டர்" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "சுமார் ஒரு கிலோமீட்டர்" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "சுமார்" : "around.ogg";
	dictionary["kilometers"] = tts ? "கிலோமீட்டர்" : "kilometers.ogg";

	dictionary["feet"] = tts ? "அடி" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "one tenth of a mile" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "tenths of a mile" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "சுமார் ஒரு மைல்" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "மைல்" : "miles.ogg";
	dictionary["yards"] = tts ? "yards" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "நேரம்" : "time.ogg";
	dictionary["1_hour"] = tts ? "ஒரு மணி நேரம்" : "1_hour.ogg";
	dictionary["hours"] = tts ? "மணிநேரம்" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "ஒரு நிமிடத்திற்கும் குறைவாக" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "ஒரு நிமிடம்" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "நிமிடம்" : "minutes.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + ", " + dictionary["trip_duration"] + " " + time(timeVal) + (tts ? ". " : " ");
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
	return dictionary["route_calculate"] + (tts ? ", " : " ") + dictionary["distance"] + " " + distance(dist) + ", " + dictionary["trip_duration"] + ", " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
        sentence = distance(dist) + " " + dictionary["follow"];
        if (follow_street(streetName).length != 0)
            sentence = follow_street(streetName) + dictionary["in"] + " " + sentence;
        return sentence;
        //return follow_street(streetName) + " " + distance(dist) + " " + dictionary["follow"];
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["to"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"] ||
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return assemble_street_name(streetName) + " " + dictionary["on"];
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		//return dictionary["to"] + " " + assemble_street_name(streetName);
        return " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
        if (turn_street(streetName).length != 0)
            return turn_street(streetName) + dictionary["on"] + " " + getTurnType(turnType);
        return getTurnType(turnType);
	} else {
		//return distance(dist) + " " + dictionary["in"] + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName);
        if (turn_street(streetName).length != 0)
            return distance(dist) + dictionary["in"] + " " + turn_street(streetName) + dictionary["on"] + (tts ? ", " : " ") + ", " + getTurnType(turnType);
        return distance(dist) + dictionary["in"] + " " + turn_street(streetName) + (tts ? ", " : " ") + ", " + getTurnType(turnType);
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
        return getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName) + " " + dictionary["onto"] + " " + getTurnType(turnType);
	} else {
		return take_exit_name(streetName) + " " + getExitNumber(exitString, exitInt) + " " + dictionary["onto"] + " " + distance(dist) + " " + dictionary["in"] + (tts ? ", " : " ") + getTurnType(turnType);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		//return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
        return (tts ? ", " : " ") + streetName["toDest"] + " " + dictionary["toward"] + " " + streetName["toStreetName"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
		return nth(exitInt) + " " + dictionary["exit"];
	} else if (tts) {
		return dictionary["exit"] + " " + exitString;
	} else {
		return dictionary["exit"];
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
	return (tts ? ", " : " ") + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
        return turn_street(streetName) + dictionary["onto"] + " " + nth(exit) + " " + " " + dictionary["exit"] + " " + dictionary["take"];
	} else {
		return  distance(dist) + " " + dictionary["in"] + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["then"] + " " + turn_street(streetName) + " " + nth(exit) + " " + dictionary["exit"] + " " + dictionary["take"];
	}
}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return streetName["toDest"] + " " + dictionary["toward"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return assemble_street_name(streetName);
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
		return assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
        return assemble_street_name(streetName);
		//return assemble_street_name(streetName) + " " + dictionary["onto"];
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "") {
		return streetName["toRef"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] == "") {
		return streetName["toDest"] + " " + dictionary["toward"] + " " + streetName["toStreetName"];
	} else if (streetName["toRef"] != "") {
		return streetName["toDest"]+ " " + dictionary["toward"] + " " + streetName["toRef"] + dictionary["in"] ;
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
		return turn_street(streetName) + " " + dictionary["in"] + " " + dictionary["make_uturn"];
	} else {
		return distance(dist) + dictionary["in"]  + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return distance(dist) + " " + dictionary["after"] + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return turn_street(streetName) + " " + distance(dist) + " " + dictionary["after"] + (tts ? ", " : " ") + getTurnType(turnType);
}

function prepare_roundabout(dist, exit, streetName) {
	return distance(dist) + " " + dictionary["after"] + " " + dictionary["prepare_roundabout"];
}

function and_arrive_destination(dest) {
	return ", " + dictionary["and_arrive_destination"] + " " + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["waypoint"] + " " + dest + ", " + dictionary["arriving"];
}

function and_arrive_favorite(dest) {
	return dictionary["favorite"] + " " + dest + ", " + dictionary["arriving"];
}

function and_arrive_poi(dest) {
	return dictionary["poi"] + " " + dest + ", " + dictionary["arriving"];
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + ", " + dest + ", " + dictionary["arrived"];
}

function reached_waypoint(dest) {
	return dictionary["passing_by"] + " " + dictionary["waypoint"] + ", " + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + ", " + dest + ", " + dictionary["arrived"];
}

function reached_favorite(dest) {
	return dictionary["passing_by"] + " " + dictionary["favorite"] + ", " + dest;
}

function reached_poi(dest) {
	return dictionary["passing_by"] + " " + dictionary["poi"] + ", " + dest;
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
