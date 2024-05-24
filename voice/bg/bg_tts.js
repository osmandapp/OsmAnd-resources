// Update contributed by Koceto1973, 2023-04-01.
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
	dictionary["route_is"] = tts ? "маршрутът е" : "route_is.ogg" ;
	dictionary["route_calculate"] = tts ? "пре изчислен маршрут" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "разстояние " : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = "Prepare to "
	dictionary["after"] = tts ? "след " : "after.ogg";
	dictionary["in"] = tts ? "до " : "in.ogg";

	dictionary["left"] = tts ? "за вийте наляво" : "left.ogg";
	dictionary["left_sh"] = tts ? "за вийте пълен ляв" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "за вийте леко наляво" : "left_sl.ogg";
	dictionary["right"] = tts ? "за вийте надясно" : "right.ogg";
	dictionary["right_sh"] = tts ? "за вийте пълен десен" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "за вийте леко надясно" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "дръжте в ляво" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "дръжте в дясно" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "дръжте в ляво" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "дръжте в дясно" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "пра вете обратен завой" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "пра вете обратен завой когато е възможно" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "навлизате в кр ъгово кръстовище" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "влезте в кр ъгово кръстовище, " : "roundabout.ogg";
	dictionary["then"] = tts ? "след това" : "then.ogg";
	dictionary["and"] = tts ? " и " : "and.ogg";
	dictionary["take"] = tts ? "пое мете по " : "take.ogg";
	dictionary["exit"] = tts ? "изход" : "exit.ogg";

	dictionary["1st"] = tts ? "първи " : "1st.ogg";
	dictionary["2nd"] = tts ? "втори " : "2nd.ogg";
	dictionary["3rd"] = tts ? "трети " : "3rd.ogg";
	dictionary["4th"] = tts ? "четвърти " : "4th.ogg";
	dictionary["5th"] = tts ? "пети " : "5th.ogg";
	dictionary["6th"] = tts ? "шести " : "6th.ogg";
	dictionary["7th"] = tts ? "седми " : "7th.ogg";
	dictionary["8th"] = tts ? "осми " : "8th.ogg";
	dictionary["9th"] = tts ? "девети " : "9th.ogg";
	dictionary["10th"] = tts ? "десети " : "10th.ogg";
	dictionary["11th"] = tts ? "единадесети " : "11th.ogg";
	dictionary["12th"] = tts ? "дванадесети " : "12th.ogg";
	dictionary["13th"] = tts ? "тринадесети " : "13th.ogg";
	dictionary["14th"] = tts ? "четеринадесети " : "14th.ogg";
	dictionary["15th"] = tts ? "петнадесети " : "15th.ogg";
	dictionary["16th"] = tts ? "шестнадесети " : "16th.ogg";
	dictionary["17th"] = tts ? "седемнадесети " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "продъл жете направо " : "go_ahead.ogg";
	dictionary["follow"] = tts ? "продъл жете за " : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "и пристигате в дести нацията" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "достигнахте до дести нацията" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "и пристигате в междинна дестинация" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "достигнахте до междинна дестинация" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "и пристигате в маршр утна точка" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "достигнахте до маршр утна точка" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "и пристигате в предпочитание" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "достигнахте до предпочитание" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "и пристигате до точка от интерес" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "достигнахте точка от интерес" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = "you are exceeding the speed limit "
	dictionary["exceed_limit"] = tts ? "надвишавате ограничението за скорост от" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "внимание, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "радар за скорост" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "граничен контрол" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "пресичане на железопътна линия" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "забавяне на трафика" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "тол кабина" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "знак стоп" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "пешеходна пътека" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "тунел" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "изгубен сателитен сигнал" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "възстановен сателитен сигнал" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "бяхте извън маршрута за" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "отново сте по маршрута" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "през " : "onto.ogg";
	dictionary["on"] = tts ? "по " : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "към " : "to.ogg";
	dictionary["toward"] = tts ? "по посока на " : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "метрa" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "около един кило метър" : "around_1_kilometer.ogg";
	dictionary["around_2_kilometer"] = tts ? "около два кило метра" : "around_2_kilometer.ogg"; // add your two kilometers here!
	dictionary["around"] = tts ? "около " : "around.ogg";
	dictionary["kilometers"] = tts ? "кило метрa" : "kilometers.ogg";

	dictionary["feet"] = tts ? "фута" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "една десета от миля" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "десетки мили" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "около една миля" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "мили" : "miles.ogg";
	dictionary["yards"] = tts ? "ярда" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "времето е " : "time.ogg";
	dictionary["1_hour"] = tts ? "един час " : "1_hour.ogg";
	dictionary["2_hours"] = tts ? "два часа " : "2_hour.ogg"; // add your two hours here!
  dictionary["hours"] = tts ? "часа " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "по-малко от минута" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "една минута" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "минути" : "minutes.ogg";
  dictionary["and"] = tts ? " и " : " and "; // do your and.ogg here!
}

//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////

// sets metricConst as km-m, mi-f, mi-m or mi-y
function setMetricConst(metrics) {
	metricConst = metrics;
}

// sets tts as mode
function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

// Маршрута е .... , времето е ...
function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
}

// approx. distance
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
			} else if (dist < 2500) {
				return dictionary["around_2_kilometer"];
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

// time spell
function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + dictionary["and"] + dictionary["1_minute"];
	} else if (tts) {
		return hours(minutes) != ""  ? 
			hours(minutes) + dictionary["and"] + (minutes % 60) + dictionary["minutes"] : 
			(minutes % 60) + dictionary["minutes"];
	} else if (!tts && seconds < 300) {
		return ogg_dist(minutes) + dictionary["minutes"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + ogg_dist(oggMinutes % 60) + dictionary["minutes"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

// time spell
function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else {
		var hours = Math.floor(minutes / 60);
				if ( hours == 2 )
					return tts ? dictionary["2_hours"] : ogg_dist(hours) + " " + dictionary["hours"];
				else 
        	return (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
	}
}

// Преизислен маршрут, разстояние ...., времето е ....
function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

// продължете направо
// или
// продължете за .... 
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
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? ", " : " ")
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
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
		return nth(exitInt) + " " + dictionary["exit"];
	} else if (tts) {
		return dictionary["exit"] + " " + exitString;
	} else {
		return dictionary["exit"];
	}
}

// за вийте ...
// или
// дръжте ...
function getTurnType(turnType) {
	switch (turnType) {
		case "left":
			return dictionary["left"]; // за вийте наляво
			break;
		case "left_sh":
			return dictionary["left_sh"]; // за вийте пълен ляв
			break;
		case "left_sl":
			return dictionary["left_sl"]; // за вийте леко наляво
			break;
		case "right":
			return dictionary["right"]; // за вийте надясно
			break;
		case "right_sh":
			return dictionary["right_sh"]; // за вийте пълен десен
			break;
		case "right_sl":
			return dictionary["right_sl"]; // за вийте леко надясно
			break;
		case "left_keep":
			return dictionary["left_keep"]; // дръжте в ляво
			break;
		case "right_keep":
			return dictionary["right_keep"]; // дръжте в дясно
			break;
	}
}

// след това
function then() {
	return dictionary["then"];
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
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

// пореден изход
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
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

// дръжте в ляво
function bear_left(streetName) {
	return dictionary["left_bear"];
}

// дръжте в дясно
function bear_right(streetName) {
	return dictionary["right_bear"];
}

// след ... направете обратен завой 
function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

// след ... 
function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

// след ... навлизате в кръгово кръстовище
function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_roundabout"]; 
}

// пристигнахте в дестинация ...
function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest;
}

// пристигнахте в междинна дестинация ...
function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + dest;
}

// пристигнахте в маршрутна точка ...
function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest;
}

// пристигнахте в предпочитание ...
function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest;
}

// пристигнахте до точка от интерес ...
function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest;
}

// достигнахте до дестинация ...
function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest;
}

// достигнахте до маршрутна точка ....
function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest;
}

// достигнахте до междинна дестинация ....
function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest;
}

// достигнахте до предпочитание ...
function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest;
}

// достигнахте точка от интерес ...
function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest;
}

// изгубен сателитен сигнал
function location_lost() {
	return dictionary["location_lost"];
}

// възстановен сателитен сигнал
function location_recovered() {
	return dictionary["location_recovered"];
}

// бяхте извън маршута за ....
function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist);
}

// отново сте по маршрута
function back_on_route() {
	return dictionary["back_on_route"];
}

// направете обратен завой когато е възможно
function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}

// TRAFFIC WARNINGS
// надвишавате ограничението за скорост от ...
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + " " + maxSpeed.toString();
}

// внимание, нещо си ...
function attention(type) {
	return dictionary["attention"] + " " + getAttentionString(type);
}

// това за което внимаваме
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
