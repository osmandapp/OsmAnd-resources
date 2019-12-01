// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: special plural 1 2 5
var metricConst;
var tts;
var dictionary = {};

//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
function populateDictionary(tts) {
	dictionary["route_is"] = tts ? "Довжина маршруту, " : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Перерахунок маршруту, " : "route_calculate.ogg";
	dictionary["distance"] = tts ? "відстань - " : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "після " : "after.ogg";
	dictionary["in"] = tts ? "в" : "in.ogg";
	dictionary["cherez"] = tts ? "через " : "cherez.ogg";

	dictionary["left"] = tts ? "поверніть ліворуч" : "left.ogg";
	dictionary["left_sh"] = tts ? "різко поверніть ліворуч" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "плавно поверніть ліворуч" : "left_sl.ogg";
	dictionary["right"] = tts ? "поверніть праворуч" : "right.ogg";
	dictionary["right_sh"] = tts ? "різко поверніть праворуч" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "плавно поверніть праворуч" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "тримайтеся лівіше" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "тримайтеся правіше" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "тримайтеся лівіше" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "тримайтеся правіше" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Розверніться" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "При можливості розверніться" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["roundabout"] = tts ? "кругове перехрестя" : "roundabout.ogg";
	dictionary["then"] = tts ? "потім " : "then.ogg";
	dictionary["and"] = tts ? " і " : "and.ogg";
	dictionary["take"] = tts ? "виберіть " : "take.ogg";
	dictionary["exit"] = tts ? "з''їзд " : "exit.ogg";

	dictionary["1th"] = tts ? "перший " : "1th.ogg";
	dictionary["2th"] = tts ? "другий " : "2th.ogg";
	dictionary["3th"] = tts ? "третій " : "3th.ogg";
	dictionary["4th"] = tts ? "четвертий " : "4th.ogg";
	dictionary["5th"] = tts ? "п''ятий " : "5th.ogg";
	dictionary["6th"] = tts ? "шостий " : "6th.ogg";
	dictionary["7th"] = tts ? "сьомий " : "7th.ogg";
	dictionary["8th"] = tts ? "восьмий " : "8th.ogg";
	dictionary["9th"] = tts ? "дев_ятий " : "9th.ogg";
	dictionary["10th"] = tts ? "десятий " : "10th.ogg";
	dictionary["11th"] = tts ? "одинадцятий " : "11th.ogg";
	dictionary["12th"] = tts ? "дванадцятий " : "12th.ogg";
	dictionary["13th"] = tts ? "тринадцятий " : "13th.ogg";
	dictionary["14th"] = tts ? "чотирнадцятий " : "14th.ogg";
	dictionary["15th"] = tts ? "п''ятнадцятий " : "15th.ogg";
	dictionary["16th"] = tts ? "шістнадцятий " : "16th.ogg";
	dictionary["17th"] = tts ? "сімнадцятий " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Далі прямо" : "go_ahead.ogg";
	dictionary["go_ahead_m"] = tts ? "Продовжуйте рух, " : "go_ahead_m.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "і ви прибудете до пункту призначення " : "and_arrive_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "і ви прибудете до проміжного пункту " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "ви прибули до проміжного пункту " : "reached_intermediate.ogg";
	dictionary["reached_destination"] = tts ? "ви прибули до пункту призначення " : "reached_destination.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "і ви прибудете до проміжної точки " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "ви прибули до проміжної точки " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "і ви прибудете до вибраної точки " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "ви прибули до вибраної точки " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? " і ви прибудете до точки POI " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "ви прибули до точки POI " : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Перевищення швидкості " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "обмеження швидкості " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Увага, " : "attention.ogg";
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
	dictionary["off_route"] = tts ? "Ви відхилились від маршруту на " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Ви повернулись на маршрут." : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["on"] = tts ? "по " : "on.ogg";
	dictionary["onto"] = tts ? "на " : "onto.ogg";
	dictionary["to"] = tts ? "до " : "to.ogg";
	dictionary["toward"] = tts ? "до " : "toward.ogg";

	// DISTANCE UNIT SUPPORT

	dictionary["metriv"] = tts ? "м" : "metriv.ogg";
	dictionary["kilometr"] = tts ? "км, " : "kilometr.ogg";
	dictionary["kilometry"] = tts ? "км, " : "kilometry.ogg";
	dictionary["kilometriv"] = tts ? "км, " : "kilometriv.ogg";
	dictionary["around_1_kilometer"] = tts ? "біля одного кілометру" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "приблизно " : "around.ogg";

	dictionary["footov"] = tts ? "футів" : "footov.ogg";
	dictionary["around_1_mile"] = tts ? "приблизно однієї милі" : "around_1_mile.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "одна десята милі" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? " десятих милі" : "tenths_of_a_mile.ogg";
	dictionary["1mile"] = tts ? "миля" : "1mile.ogg";
	dictionary["2mili"] = tts ? "милі" : "2mili.ogg";
	dictionary["5mil"] = tts ? "миль" : "5mil.ogg";

	dictionary["yardov"] = tts ? "ярдів" : "yardov.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "час - " : "time.ogg";
	dictionary["less_a_minute"] = tts ? "менше хвилини  " : "less_a_minute.ogg";
	dictionary["hour"] = tts ? "год " : "hour.ogg";
	dictionary["1_hour"] = tts ? "одна година " : "hour.ogg";
	dictionary["hours_a"] = tts ? "год " : "hours_a.ogg";
	dictionary["hours_ov"] = tts ? "год " : "hours_ov.ogg";
	dictionary["1_minute"] = tts ? "одна хвилина " : "minute.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : "");
}

function plural_mt(dist) {
	if (distance % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["metr"];
	} else if (dist % 10 < 5 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["metra"];
	} else {
		return dictionary["metrov"];
	}
}

function plural_km(dist) {
	if (distance % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
		return dictionary["kilometr"];
	} else if (dist % 10 < 6 && dist % 10 > 1 && (dist % 100 > 20 || dist % 100 < 10 )) {
		return dictionary["kilometry"];
	} else {
		return dictionary["kilometriv"];
	}
}

function plural_mi(dist) {
	if (distance % 10 == 1 && (dist % 100 > 20 || dist % 100 < 10)) {
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
		return minutes.toString() + ".ogg "  + plural_mn(minutes);
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
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["metriv"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["metriv"];
			} else if (dist < 1000) {
				var distance = Math.round(2*dist/100.0)*50;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + dictionary["metriv"];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else {
				return (tts ? Math.round(dist/1000.0).toString() : ogg_dist(dist/1000.0)) + " " + plural_km(dist/1000.0);
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["footov"];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile"];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(dist)) + " " + dictionary["metriv"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["metriv"];
			} else if (dist < 1300) {
				var distance = Math.round(2*Dist/100.0)*50;
				return (tts ? distance.toString() : ogg_dist(distance)) + " " + dictionary["metriv"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + plural_mi(dist/1609.3);
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(dist/0.9144)) + " " + dictionary["yardov"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yardov"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yardov"]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + plural_mi(dist/1609.3);
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
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["and"] + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["go_ahead_m"] + " " + distance(dist) + " " + follow_street(streetName);
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
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return dictionary["to"] + " " + assemble_street_name(streetName);
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + turn_street(streetName);
	} else {
		return dictionary["cherez"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
	// turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
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

// roundabout(Dist, _Angle, Exit, Street) -- ['after', D, 'roundabout', 'and', 'take', E, 'exit' | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
// roundabout(_Angle, Exit, Street) -- ['take', E, 'exit' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
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
		return dictionary["on"] + " " + assemble_street_name(streetName);
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"]) {
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
	// make_ut(Dist, Street) --  ["after", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
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
	return dictionary["cherez"] + " " + distance(dist) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["cherez"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ['prepare_roundabout', 'after', D, 'and', 'take', E, 'exit' | Sgen] :- distance(Dist) -- D, nth(_Exit, E), turn_street(_Street, Sgen).
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName); 
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
