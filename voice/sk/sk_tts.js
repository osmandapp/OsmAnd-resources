// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: special plural, 1, 2, 3_4, 5+, accusative/locative/instrumental exists in the language but avoided in this file

//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
var metricConst;
var dictionary = {};
var tts;

function populateDictionary(tts) {
	dictionary["route_is"] = tts ? "Cesta je dlhá " : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Cesta prepočítaná" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "vzdialenosť " : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "Čoskoro o " : "after.ogg";
	dictionary["in"] = tts ? "O " : "in.ogg";

	dictionary["left"] = tts ? "zahnite doľava" : "left.ogg";
	dictionary["left_sh"] = tts ? "zahnite prudko doľava" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "zahnite mierne doľava" : "left_sl.ogg";
	dictionary["right"] = tts ? "zahnite doprava" : "right.ogg";
	dictionary["right_sh"] = tts ? "zahnite prudko doprava" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "zahnite mierne doprava" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "držte sa vľavo" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "držte sa vpravo" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "sa držte vľavo" : "left_bear.ogg";      // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "sa držte vpravo" : "right_bear.ogg";    // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "sa budete otáčať naspäť" : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? "sa otočte naspäť" : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "otočte sa naspäť" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "keď to bude možné, otočte sa naspäť" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "vojdete do kruhového objazdu" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? " vojdite do kruhového objazdu" : "roundabout.ogg";
	dictionary["then"] = tts ? ", potom " : "then.ogg";
	dictionary["and"] = tts ? " a " : "and.ogg";
	dictionary["take1"] = tts ? "opustite ho cez " : "take1.ogg";
	dictionary["exit"] = tts ? "výjazd" : "exit.ogg";
	dictionary["take2"] = tts ? "choďte cez " : "take2.ogg";

	dictionary["1st"] = tts ? "prvý " : "1st.ogg";
	dictionary["2nd"] = tts ? "druhý " : "2nd.ogg";
	dictionary["3rd"] = tts ? "tretí " : "3rd.ogg";
	dictionary["4th"] = tts ? "štvrtý " : "4th.ogg";
	dictionary["5th"] = tts ? "piaty " : "5th.ogg";
	dictionary["6th"] = tts ? "šiesty " : "6th.ogg";
	dictionary["7th"] = tts ? "siedmy " : "7th.ogg";
	dictionary["8th"] = tts ? "ôsmy " : "8th.ogg";
	dictionary["9th"] = tts ? "deviaty " : "9th.ogg";
	dictionary["10th"] = tts ? "desiaty " : "10th.ogg";
	dictionary["11th"] = tts ? "jedenásty " : "11th.ogg";
	dictionary["12th"] = tts ? "dvanásty " : "12th.ogg";
	dictionary["13th"] = tts ? "trinásty " : "13th.ogg";
	dictionary["14th"] = tts ? "štrnásty " : "14th.ogg";
	dictionary["15th"] = tts ? "pätnásty " : "15th.ogg";
	dictionary["16th"] = tts ? "šestnásty " : "16th.ogg";
	dictionary["17th"] = tts ? "sedemnásty " : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Pokračujte rovno" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Pokračujte " : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "a dorazíte do cieľa " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "dorazili ste do cieľa " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "a prejdete Vaším prechodným bodom " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "dorazili ste k Vášmu prechodnému bodu " : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "a prejdete prechodným bodom GPX " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "dorazili ste k prechodnému bodu GPX " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "a prejdete obľúbeným bodom " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "dorazili ste k obľúbenému bodu " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "a prejdete bodom záujmu " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "dorazili ste k bodu záujmu " : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Prekročili ste maximálnu povolenú rýchlosť" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "Povolená rýchlosť " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Pozor, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "rýchlostný radar" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "hraničná kontrola" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "železničné priecestie" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "spomaľovač" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "mýtna búdka" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "značka stop" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "priechod pre chodcov" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "Strata signálu GPS" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "Obnovenie signálu GPS" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Idete odchylne od trasy už " : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Vrátili ste sa na trasu." : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? " na cestu " : "onto.ogg";
	dictionary["on"] = tts ? " po " : "on.ogg";
	dictionary["to"] = tts ? " k " : "to.ogg";
	dictionary["toward"] = tts ? " smerom na " : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["around"] = tts ? "približne " : "around.ogg";
	dictionary["meters"] = tts ? "metrov" : "meters.ogg";
	dictionary["kilometer"] = tts ? "jeden kilometer" : "kilometer.ogg";
	dictionary["kilometers2"] = tts ? "dva kilometre" : "kilometers2.ogg";
	dictionary["kilometers3_4"] = tts ? "kilometre" : "kilometers3_4.ogg";
	dictionary["kilometers5"] = tts ? "kilometrov" : "kilometers5.ogg";

	dictionary["feet"] = tts ? "stôp" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "desatinu míle" : "1_tenth_of_a_mile.ogg";
	dictionary["half_a_mile"] = tts ? "menej ako pol míle" : "half_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "desatín míle" : "tenths_of_a_mile.ogg";
	dictionary["mile"] = tts ? "jednu míľu" : "mile.ogg";
	dictionary["miles2"] = tts ? "dve míle" : "miles2.ogg";
	dictionary["miles3_4"] = tts ? "míle" : "miles3_4.ogg";
	dictionary["miles5"] = tts ? "míľ" : "miles5.ogg";

	dictionary["yards"] = tts ? "yardov" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "doba potrebná " : "time.ogg";
	dictionary["hours1"] = tts ? "jedna hodina " : "hours1.ogg";
	dictionary["hours2"] = tts ? "dve hodiny " : "hours2.ogg";
	dictionary["hours3_4"] = tts ? "hodiny " : "hours3_4.ogg";
	dictionary["hours5"] = tts ? "hodín " : "hours5.ogg";
	dictionary["less_a_minute"] = tts ? "menej než minúta" : "less_a_minute.ogg";
	dictionary["minutes1"] = tts ? "jedna minúta" : "minutes1.ogg";
	dictionary["minutes2"] = tts ? "dve minúty" : "minutes2.ogg";
	dictionary["minutes3_4"] = tts ? "minúty" : "minutes3_4.ogg";
	dictionary["minutes5"] = tts ? "minút" : "minutes5.ogg";
}

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
				return dictionary["kilometer"];
			} else if (dist < 2500) {
				return dictionary["kilometers2"];
			} else if (dist < 4500) {
				return (tts ? Math.round((dist/1000.0)).toString() : ogg_dist((dist/1000.0))) + " " + dictionary["kilometers3_4"];
			} else if (tts) {
				return Math.round(dist/1000.0).toString() + " " + dictionary["kilometers5"];
			} else if (!tss && Math.round(dist/1000.0) < 20) {
				return ogg_dist(Math.round(dist/1000.0)) + " " + dictionary["kilometers5"];	
			} else if (!tss && (Math.round((dist/5000.0) * 5)) < 100) {
				return dictionary["around"] + " " + ogg_dist(Math.round((dist/5000.0) * 5)) + " " + dictionary["kilometers5"];
			} else if (!tts && (Math.round((dist/50000.0) * 50)) < 1000) {
				return dictionary["around"] + " " + ogg_dist(Math.round((dist/50000.0) * 50)) + " " + dictionary["kilometers5"];
			} else {
				return dictionary["around"] + " " + ogg_dist(Math.round((dist/1000000.0) * 1000)) + " " + dictionary["kilometers5"];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet"];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile"];
			} else if (dist < 805) {
				return dictionary["half_a_mile"];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["miles2"];
			} else if (dist < 8045) {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles3_4"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles5"];
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
				return dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["miles2"];
			} else if (dist < 8045) {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles3_4"];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles5"];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(dist/0.9144)) + " " + dictionary["yards"];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards"];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards"]; 
			} else if (dist < 2414) {
				return dictionary["mile"];
			} else if (dist < 4022) {
				return dictionary["miles2"];
			} else if (dist < 8045) {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles3_4"];
			}  else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(dist/1609.3)) + " " + dictionary["miles5"];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 45) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["minutes1"];
	} else if (minutes % 60 == 2 && tts) {
		return hours(minutes) + " " + dictionary["minutes2"];
	} else if (minutes % 60 < 5 && tts) {
		return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["minutes3_4"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["minutes5"];
	} else if (!tts && seconds < 90) {
		return dictionary["minutes1"];
	} else if (!tts && seconds < 150) {
		return dictionary["minutes2"];
	} else if (!tts && seconds < 270) {
		return minutes.toString() + ".ogg " + dictionary["minutes3_4"];
	} else if (!tts && seconds < 21*60) {
		return Math.floor(seconds/60).toString() + ".ogg" + " " + dictionary["minutes5"];
	} else if (!tts && seconds < 21 * 3600 && minutes % 60 < 3) {
		return hours(minutes);
	} else if (!tss && seconds < 21 * 3600) {
		var st = minutes % 60;
		var stx = Math.round(st/5.0) * 5;
		return hours(minutes) + " " + stx.toString() + ".ogg" + " " + dictionary["minutes5"];
	} else if (!tts) {
		return dictionary["around"] + " " + hours(Math.round(seconds/18000) * 300);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["hours1"];
	} else if (minutes < 180) {
		return dictionary["hours2"];
	} else if (minutes < 300) {
		return Math.floor(minutes/60).toString() + (!tts ? ".ogg " : " ") + dictionary["3_4_hours"];
	} else if (tts) {
		return Math.floor(minutes/60).toString() + " " + dictionary["hours5"];
	} else if (!tts && minutes < 21 * 60) {
		return Math.floor(minutes/60).toString() + ".ogg" + " " + dictionary["hours5"];
	} else if (!tts) {
		return Math.floor(Math.round((minutes/300.0) * 5)) + ".ogg" + " " + dictionary["hours5"];
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
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
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
		return dictionary["take2"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take1"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
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
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
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
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
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