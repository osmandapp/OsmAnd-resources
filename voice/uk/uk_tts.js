// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: special plural 1 2 5
// (X) Support announcing highway exits

var metricConst;
var tts;
var dictionary = {};

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Довжина маршруту" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Перерахунок маршруту" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "відстань" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "після" : "after.ogg";
	dictionary["in"] = tts ? "в" : "in.ogg";
	dictionary["cherez"] = tts ? "через" : "cherez.ogg";

	dictionary["left"] = tts ? "поверніть ліворуч" : "left.ogg";
	dictionary["left_sh"] = tts ? "різко поверніть ліворуч" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "плавно поверніть ліворуч" : "left_sl.ogg";
	dictionary["right"] = tts ? "поверніть праворуч" : "right.ogg";
	dictionary["right_sh"] = tts ? "різко поверніть праворуч" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "плавно поверніть праворуч" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "тримайтеся лівіше" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "тримайтеся правіше" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "тримайтеся лівіше" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "тримайтеся правіше" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Розверніться" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "При можливості розверніться" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["roundabout"] = tts ? "кругове перехрестя" : "roundabout.ogg";
	dictionary["then"] = tts ? "потім" : "then.ogg";
	dictionary["and"] = tts ? "і" : "and.ogg";
	dictionary["take"] = tts ? "виберіть " : "take.ogg";
	dictionary["exit"] = tts ? "з''їзд" : "exit.ogg";

	dictionary["1th"] = tts ? "перший" : "1th.ogg";
	dictionary["2th"] = tts ? "другий" : "2th.ogg";
	dictionary["3th"] = tts ? "третій" : "3th.ogg";
	dictionary["4th"] = tts ? "четвертий" : "4th.ogg";
	dictionary["5th"] = tts ? "п''ятий" : "5th.ogg";
	dictionary["6th"] = tts ? "шостий" : "6th.ogg";
	dictionary["7th"] = tts ? "сьомий" : "7th.ogg";
	dictionary["8th"] = tts ? "восьмий" : "8th.ogg";
	dictionary["9th"] = tts ? "дев_ятий" : "9th.ogg";
	dictionary["10th"] = tts ? "десятий" : "10th.ogg";
	dictionary["11th"] = tts ? "одинадцятий" : "11th.ogg";
	dictionary["12th"] = tts ? "дванадцятий" : "12th.ogg";
	dictionary["13th"] = tts ? "тринадцятий" : "13th.ogg";
	dictionary["14th"] = tts ? "чотирнадцятий" : "14th.ogg";
	dictionary["15th"] = tts ? "п''ятнадцятий" : "15th.ogg";
	dictionary["16th"] = tts ? "шістнадцятий" : "16th.ogg";
	dictionary["17th"] = tts ? "сімнадцятий" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Далі прямо" : "go_ahead.ogg";
	dictionary["go_ahead_m"] = tts ? "Продовжуйте рух" : "go_ahead_m.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "і ви прибудете до пункту призначення" : "and_arrive_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "і ви прибудете до проміжного пункту" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "ви прибули до проміжного пункту" : "reached_intermediate.ogg";
	dictionary["reached_destination"] = tts ? "ви прибули до пункту призначення" : "reached_destination.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "і ви прибудете до проміжної точки" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "ви прибули до проміжної точки" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "і ви прибудете до вибраної точки" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "ви прибули до вибраної точки" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? " і ви прибудете до точки POI" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "ви прибули до точки POI" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Перевищення швидкості" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "обмеження швидкості" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Увага" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "камера контролю швидкості" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "прикордонний контроль" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "залізничний переїзд" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "заспокоювач трафіку" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "місце оплати проїзду" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "знак зупинки" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "пішохідний перехід" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "тунель" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "втрачено сигнал GPS" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "Відновлено сигнал GPS" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Ви відхилились від маршруту на" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Ви повернулись на маршрут." : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["on"] = tts ? "по" : "on.ogg";
	dictionary["onto"] = tts ? "на" : "onto.ogg";
	dictionary["to"] = tts ? "до" : "to.ogg";
	dictionary["toward"] = tts ? "до" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["metr"] = tts ? "метр" : "metr.ogg";
	dictionary["metry"] = tts ? "метри" : "metr.ogg";
	dictionary["metriv"] = tts ? "метрів" : "metriv.ogg";
	dictionary["kilometr"] = tts ? "кілометр, " : "kilometr.ogg";
	dictionary["kilometry"] = tts ? "кілометри, " : "kilometry.ogg";
	dictionary["kilometriv"] = tts ? "кілометрів, " : "kilometriv.ogg";
	dictionary["around_1_kilometer"] = tts ? "біля одного кілометру" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "приблизно" : "around.ogg";

	// Imperial units.
	dictionary["foot"] = tts ? "фут" : "foot.ogg";
	dictionary["footy"] = tts ? "фути" : "footy.ogg";
	dictionary["footiv"] = tts ? "футів" : "footov.ogg";

	dictionary["yard"] = tts ? "ярд" : "yard.ogg";
	dictionary["yardy"] = tts ? "ярди" : "yardy.ogg";
	dictionary["yardiv"] = tts ? "ярдів" : "yardiv.ogg";

	dictionary["around_1_mile"] = tts ? "приблизно однієї милі" : "around_1_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? " десятих милі" : "tenths_of_a_mile.ogg";
	dictionary["1mile"] = tts ? "миля" : "1mile.ogg";
	dictionary["2mili"] = tts ? "милі" : "2mili.ogg";
	dictionary["5mil"] = tts ? "миль" : "5mil.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "час - " : "time.ogg";
	dictionary["less_a_minute"] = tts ? "менше хвилини  " : "less_a_minute.ogg";
	dictionary["hour"] = tts ? "год" : "hour.ogg";
	dictionary["1_hour"] = tts ? "одна година" : "hour.ogg";
	dictionary["hours_a"] = tts ? "год" : "hours_a.ogg";
	dictionary["hours_ov"] = tts ? "год" : "hours_ov.ogg";
	dictionary["1_minute"] = tts ? "одна хвилина" : "minute.ogg";
	dictionary["minute"] = tts ? "хвилина" : "minute.ogg";
	dictionary["minute_y"] = tts ? "хвилини" : "minute_y.ogg";
	dictionary["minutes"] = tts ? "хвилин" : "minutes.ogg";
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
	return dictionary["route_is"] + (tts ? ", " : " ") + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function plural_mt(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["metr"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["metry"];
	} else {
		return dictionary["metriv"];
	}
}

function plural_km(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["kilometr"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["kilometry"];
	} else {
		return dictionary["kilometriv"];
	}
}

function plural_yd(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["yard"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["yardy"];
	} else {
		return dictionary["yardiv"];
	}
}

function plural_ft(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["foot"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["footy"];
	} else {
		return dictionary["footiv"];
	}
}

function plural_mi(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["1mile"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["2mili"];
	} else {
		return dictionary["5mil"];
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
		return hours(minutes) + " " + (minutes % 60).toString() + " " + plural_mn(minutes % 60);
	} else if (!tts && seconds < 300) {
		return minutes.toString() + ".ogg " + plural_mn(minutes);
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + (oggMinutes % 60).toString() + ".ogg " + plural_mn(oggMinutes % 60);
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
		var hours = minutes / 60;
        return Math.floor(hours).toString() + (!tts ? ".ogg " : " ") + plural_hs(Math.floor(hours)); 
	}
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + plural_mt(dist);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + plural_mt(dist);
			} else if (dist < 1000) {
				var distance = Math.round(2*dist/100.0)*50;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + plural_mt(dist);
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + plural_km(dist/1000.0);
			}
			break;
		case "mi-f":
			if (dist < 91) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["footov"];
			} else if (dist < 320) {
				return (tts ? (Math.round(dist/100.0/0.3048)*100).toString() : ogg_dist(Math.round(dist/100.0/0.3048)*100)) + " " + dictionary["footov"];
			} else if (dist < 1367) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + plural_mt(dist);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + plural_mt(dist);
			} else if (dist < 1300) {
				var distance = Math.round(2*dist/100.0)*50;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + plural_mt(dist);
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + plural_yd(dist/0.9144);
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + plural_yd(Math.round(dist/10.0/0.9144)*10);
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + plural_yd(Math.round(2*dist/100.0/0.9144)*50);
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + plural_mi(dist/1609.3);
			}
			break;
	}
}

function plural_hs(time) {
	if (time % 10 == 1 && (time % 100 > 20 || time % 100 < 10)) {
		return dictionary["hour"];
	} else if (time % 10 > 1 && time % 10 < 5 && (time % 100 > 20 || time % 100 < 10)) {
		return dictionary["hours_a"];
	} else {
		return dictionary["hours_ov"];
	}
}

function plural_mn(time) {
	if (time % 10 == 1 && (time % 100 > 20 || time % 100 < 10)) {
		return dictionary["minute"];
	} else if (time % 10 > 1 && time % 10 < 5 && (time % 100 > 20 || time % 100 < 10)) {
		return dictionary["minute_y"];
	} else {
		return dictionary["minutes"];
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? ", " : " ") + dictionary["distance"] + (tts ? " - " : " ") + distance(dist) + " " + dictionary["and"] + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["go_ahead_m"] + (tts ? ", " : " ") + distance(dist) + " " + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["cherez"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["cherez"] + " " + distance(dist) + " "
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
		return dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
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
			return dictionary["1th"];
		case (2):
			return dictionary["2th"];
		case (3):
			return dictionary["3th"];
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

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["cherez"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["cherez"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName); 
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
