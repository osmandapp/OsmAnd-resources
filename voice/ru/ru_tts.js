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
var tts;
var dictionary = {};

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Маршрут составляет" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Маршрут пересчитывается" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "расстояние" : "distance.ogg";
	
	// LEFT/RIGHT
	dictionary["prepare"] = tts ? "Приготовьтесь" : "prepare.ogg";
	dictionary["after"] = tts ? "через" : "after.ogg";
	
	dictionary["left"] = tts ? "поверните налево" : "left.ogg";
	dictionary["left_sh"] = tts ? "резко поверните налево" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "плавно поверните налево" : "left_sl.ogg";
	dictionary["right"] = tts ? "поверните направо" : "right.ogg";
	dictionary["right_sh"] = tts ? "резко поверните направо" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "плавно поверните направо" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "держитесь левее" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "держитесь правее" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "держитесь левее" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "держитесь правее" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages
	
	// U-TURNS
	dictionary["make_uturn"] = tts ? "Выполните разворот" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "При возможности, выполните разворот" : "make_uturn_wp.ogg";
	
	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Приготовьтесь въехать на кольцо" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "въедьте на кольцо" : "roundabout.ogg";
	dictionary["then"] = tts ? "затем" : "then.ogg";
	dictionary["and"] = tts ? "и" : "and.ogg";
	dictionary["take"] = tts ? "выполните" : "take.ogg";
	dictionary["exit"] = tts ? "съезд" : "exit.ogg";
	
	dictionary["1na"] = tts ? "одна" : "1na.ogg";
	dictionary["2ve"] = tts ? "две" : "2ve.ogg";
	dictionary["poltora"] = tts ? "полтора" : "1_5.ogg";

	dictionary["1"] = tts ? "1" : "1.ogg";
	dictionary["2"] = tts ? "2" : "2.ogg";

	dictionary["1th"] = tts ? "первый" : "1th.ogg";
	dictionary["2th"] = tts ? "второй" : "2th.ogg";
	dictionary["3th"] = tts ? "третий" : "3th.ogg";
	dictionary["4th"] = tts ? "четвертый" : "4th.ogg";
	dictionary["5th"] = tts ? "пятый" : "5th.ogg";
	dictionary["6th"] = tts ? "шестой" : "6th.ogg";
	dictionary["7th"] = tts ? "седьмой" : "7th.ogg";
	dictionary["8th"] = tts ? "восьмой" : "8th.ogg";
	dictionary["9th"] = tts ? "девятый" : "9th.ogg";
	dictionary["10th"] = tts ? "десятый" : "10th.ogg";
	dictionary["11th"] = tts ? "одиннадцатый" : "11th.ogg";
	dictionary["12th"] = tts ? "двенадцатый" : "12th.ogg";
	dictionary["13th"] = tts ? "тринадцатый" : "13th.ogg";
	dictionary["14th"] = tts ? "четырнадцатый" : "14th.ogg";
	dictionary["15th"] = tts ? "пятнадцатый" : "15th.ogg";
	dictionary["16th"] = tts ? "шестнадцатый" : "16th.ogg";
	dictionary["17th"] = tts ? "семнадцатый" : "17th.ogg";
	
	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Продолжайте движение прямо" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Продолжайте движение" : "follow.ogg";
	
	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "и вы прибудете в пункт назначения" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "вы прибыли в пункт назначения" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "и вы прибудете в промежуточный пункт" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "вы прибыли в промежуточный пункт" : "reached_intermediate.ogg";
	
	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "и вы подъедете к ДЖИ-ПИ-ИКС точке" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "вы проезжаете ДЖИ-ПИ-ИКС точку" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "и вы подъедете к точке из избранного" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "вы проезжаете точку из избранного" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "и вы подъедете к точке ПОИ" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "вы проезжаете точку ПОИ" : "reached_poi.ogg";
	
	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Вы превысили допустимую скорость" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "ограничение скорости" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Внимание" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "камера" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "пограничный пункт" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "железная дорога" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "искуственная неровность" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "пункт оплаты проезда" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "знак Стоп" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "пешеходный переход" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "тоннель" : "tunnel.ogg";
	
	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "потерян сигнал ДЖИ-ПИ-ЭС" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "ДЖИ-ПИ-ЭС сигнал восстановлен" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Вы отклонились от маршрута на" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Вы вернулись на маршрут" : "back_on_route.ogg";
	
	// STREET NAME PREPOSITIONS
	dictionary["on"] = tts ? "по" : "on.ogg";
	dictionary["onto"] = tts ? "на" : "onto.ogg";
	dictionary["to"] = tts ? "до" : "to.ogg";
	dictionary["toward"] = tts ? "к" : "toward.ogg";
	
	// DISTANCE UNIT SUPPORT
	dictionary["metr"] = tts ? "метр" : "metr.ogg";
	dictionary["metra"] = tts ? "метра" : "metra.ogg";
	dictionary["metrov"] = tts ? "метров" : "metrov.ogg";
	dictionary["kilometr"] = tts ? "километр" : "kilometr.ogg";
	dictionary["kilometra"] = tts ? "километра" : "kilometra.ogg";
	dictionary["kilometrov"] = tts ? "километров" : "kilometrov.ogg";
	//dictionary["around_1_kilometer"] = tts ? "около одного километра" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "примерно" : "around.ogg";
	
	dictionary["footov"] = tts ? "футов" : "footov.ogg";
	dictionary["around_1_mile"] = tts ? "около одной мили" : "around_1_mile.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "одна десятая мили" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? " десятых мили" : "tenths_of_a_mile.ogg";
	dictionary["1mile"] = tts ? "миля" : "1mile.ogg";
	dictionary["2mili"] = tts ? "мили" : "2mili.ogg";
	dictionary["5mil"] = tts ? "миль" : "5mil.ogg";
	
	dictionary["yardov"] = tts ? "ярдов" : "yardov.ogg";
	
	// TIME SUPPORT
	dictionary["time"] = tts ? "время" : "time.ogg";
	dictionary["hour"] = tts ? "час" : "hour.ogg";
	dictionary["hours_a"] = tts ? "часа" : "hours_a.ogg";
	dictionary["hours_ov"] = tts ? "часов" : "hours_ov.ogg";
	dictionary["less_a_minute"] = tts ? "менее минуты" : "less_a_minute.ogg";
	dictionary["minute"] = tts ? "минута" : "minute.ogg";
	dictionary["minute_i"] = tts ? "минуты" : "minute_i.ogg";
	dictionary["minutes"] = tts ? "минут" : "minutes.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function plural_mt(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["metr"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["metra"];
	} else {
		return dictionary["metrov"];
	}
}

function plural_km(dist) {
	if (dist % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["kilometr"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["kilometra"];
	} else {
		return dictionary["kilometrov"];
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

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 20) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + plural_mt(dist);
			} else if (dist < 100) { 
				var distance = Math.round(dist/10.0)*10; //Приводим к шагу значений в 10 метров
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + plural_mt(distance);
			} else if (dist < 750) {
				var distance = Math.round(dist/50.0)*50;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + plural_mt(distance);
			} else if ((dist >= 750 && dist < 950) || (dist >= 1050 && dist < 1250)) {
				return dictionary["around"] + " " + dictionary["1"] + " " + dictionary["kilometr"];
			} else if (dist >= 950 && dist < 1050) {
				return dictionary["1"] + " " + dictionary["kilometr"];
			} else if ((dist >= 1450 && dist < 1550)) {
				return dictionary["poltora"] + " " + dictionary["kilometra"];
			} else if ((dist >= 1250 && dist < 1450) || (dist >= 1550 &&dist < 1750)) {
				return dictionary["around"] + " " + dictionary["poltora"] + " " + dictionary["kilometra"];
			} else if (dist >= 1750 && dist < 2000) {
				return dictionary["around"] + " " + dictionary["2"] + " " + dictionary["kilometra"];
			} else {
				var dst = Math.round(dist/1000.0);
				return (tts ? dst.toString() : ogg_dist(dst)) + " " + plural_km(dst);
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["footov"];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile"];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-m":
			if (dist < 100) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + plural_mt(dist);
			} else if (dist < 1300) {
				var distance = Math.round(dist/10.0)*10;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + plural_mt(distance);
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yardov"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yardov"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards"]; 
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
		return dictionary["minute_i"];
	} else {
		return dictionary["minutes"];
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
		return hours(minutes) + " " + dictionary["1na"] + " " + dictionary["minute"];
	} else if (minutes % 60 == 2 && tts) {
		return hours(minutes) + " " + dictionary["2ve"] + " " + dictionary["minute_i"];
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
	} else {
		var hours = minutes / 60;
        	return (!tts ? ogg_dist(Math.floor(hours)) : Math.floor(hours).toString()) + " " + plural_hs(Math.floor(hours)); 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
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
		return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["after"] + " " + distance(dist) + " "
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return dictionary["onto"] + " " + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return dictionary["onto"] + " " + streetName["toStreetName"];
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
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["prepare_roundabout"] + " " + dictionary["after"] + " " + distance(dist) + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"]; 
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

function speed_camera_alarm(dist, maxSpeed) {
	return dictionary["attention"] +
		(tts ? ", " : " ") + dictionary["speed_camera"] +
		(tts ? ", " : " ") + dictionary["distance"] + " " + distance(dist) +
		(tts ? ", " + dictionary["exceed_limit"] + " " + maxSpeed.toString() : "");
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
