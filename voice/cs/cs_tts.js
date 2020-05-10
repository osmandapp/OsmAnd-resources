// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: nth(nominative/instrumental), distance(accusative/locative/workaround), special plural 1 2 3_4
// (X) Support announcing highway exits


var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "cesta je dlouhá " : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "cesta přepočtena" : "route_calculate.ogg";
	dictionary["distance"] = tts ? ". cesta je dlouhá " : "distance.ogg";
	
	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "budete odbočovat " : "prepare.ogg";
	dictionary["after"] = tts ? "po " : "after.ogg";
	dictionary["in"] = tts ? "po " : "in.ogg";
	
	dictionary["left"] = tts ? "odbočte doleva" : "left.ogg";
	dictionary["left_sh"] = tts ? "odbočte ostře doleva" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "odbočte mírně doleva" : "left_sl.ogg";
	dictionary["right"] = tts ? "odbočte doprava" : "right.ogg";
	dictionary["right_sh"] = tts ? "odbočte ostře doprava" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "odbočte mírně doprava" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "držte se vlevo" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "držte se vpravo" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "se držte vlevo" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "se držte vpravo" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages
	
	// U-TURNS
	//dictionary["prepare_make_uturn"] = tts ? "se budete otáčet zpět" : "prepare_make_uturn.ogg";
	dictionary["make_uturn"] = tts ? "se otočte zpět" : "make_uturn.ogg";
	dictionary["make_uturn2"] = tts ? "otočte se zpět" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "otočte se, jakmile to bude možné" : "make_uturn_wp.ogg";
	
	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "přijedete na kruhový objezd" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "vjeďte na kruhový objezd" : "roundabout.ogg";
	dictionary["then"] = tts ? ", pak " : "then.ogg";
	dictionary["and"] = tts ? " a " : "and.ogg";
	dictionary["take"] = tts ? "a zvolte " : "take.ogg";
	dictionary["take2"] = tts ? "vyjeďte " : "take2.ogg";
	dictionary["exit"] = tts ? "výjezd" : "exit.ogg";
	dictionary["exit2"] = tts ? "výjezdem" : "exit2.ogg";
	
	dictionary["1st"] = tts ? "první " : "1st.ogg";
	dictionary["2nd"] = tts ? "druhý " : "2nd.ogg";
	dictionary["3rd"] = tts ? "třetí " : "3rd.ogg";
	dictionary["4th"] = tts ? "čtvrtý " : "4th.ogg";
	dictionary["5th"] = tts ? "pátý " : "5th.ogg";
	dictionary["6th"] = tts ? "šestý " : "6th.ogg";
	dictionary["7th"] = tts ? "sedmý " : "7th.ogg";
	dictionary["8th"] = tts ? "osmý " : "8th.ogg";
	dictionary["9th"] = tts ? "devátý " : "9th.ogg";
	dictionary["10th"] = tts ? "desátý " : "10th.ogg";
	dictionary["11th"] = tts ? "jedenáctý " : "11th.ogg";
	dictionary["12th"] = tts ? "dvanáctý " : "12th.ogg";
	dictionary["13th"] = tts ? "třináctý " : "13th.ogg";
	dictionary["14th"] = tts ? "čtrnáctý " : "14th.ogg";
	dictionary["15th"] = tts ? "patnáctý " : "15th.ogg";
	dictionary["16th"] = tts ? "šestnáctý " : "16th.ogg";
	dictionary["17th"] = tts ? "sedmnáctý " : "17th.ogg";
	
	dictionary["1st_inst"] = tts ? "prvním " : "1st_inst.ogg";
	dictionary["2nd_inst"] = tts ? "druhým " : "2nd_inst.ogg";
	dictionary["3rd_inst"] = tts ? "třetím " : "3rd_inst.ogg";
	dictionary["4th_inst"] = tts ? "čtvrtým " : "4th_inst.ogg";
	dictionary["5th_inst"] = tts ? "pátým " : "5th_inst.ogg";
	dictionary["6th_inst"] = tts ? "šestým " : "6th_inst.ogg";
	dictionary["7th_inst"] = tts ? "sedmým " : "7th_inst.ogg";
	dictionary["8th_inst"] = tts ? "osmým " : "8th_inst.ogg";
	dictionary["9th_inst"] = tts ? "devátým " : "9th_inst.ogg";
	dictionary["10th_inst"] = tts ? "desátým " : "10th_inst.ogg";
	dictionary["11th_inst"] = tts ? "jedenáctým " : "11th_inst.ogg";
	dictionary["12th_inst"] = tts ? "dvanáctým " : "12th_inst.ogg";
	dictionary["13th_inst"] = tts ? "třináctým " : "13th_inst.ogg";
	dictionary["14th_inst"] = tts ? "čtrnáctým " : "14th_inst.ogg";
	dictionary["15th_inst"] = tts ? "patnáctým " : "15th_inst.ogg";
	dictionary["16th_inst"] = tts ? "šestnáctým " : "16th_inst.ogg";
	dictionary["17th_inst"] = tts ? "sedmnáctým " : "17th_inst.ogg";
	
	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "pokračujte rovně" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "pokračujte " : "go_ahead_m.ogg";
	
	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "a dorazíte do cíle " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "dorazili jste do cíle " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "a dorazíte do mezicíle " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "dorazili jste do mezicíle " : "reached_intermediate.ogg";
	
	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "a projedete GPX mezicílem " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "projeli jste GPX mezicílem " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "a projedete oblíbeným bodem " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "projeli jste oblíbeným bodem " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "a projedete bodem zájmu " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "projeli jste bodem zájmu " : "reached_poi.ogg";
	
	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "překračujete povolenou rychlost " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "rychlostní limit " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "pozor, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "měření rychlosti" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "hraniční kontrola" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "železniční přejezd" : "railroad_crossing.ogg";
	//není jen zpomalovač, ale i šikana a ochranný ostrůvek; viz issue #5605
	dictionary["traffic_calming"] = tts ? "zklidnění dopravy" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "mýtná brána" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "stopka" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "přechod pro chodce" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunel" : "tunnel.ogg";
	
	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "signál G.P.S. ztracen" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "signál G.P.S. obnoven" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "nacházíte se " : "off_route.ogg";
	dictionary["off_route2"] = tts ? " mimo trasu" : "off_route2.ogg";
	dictionary["back_on_route"] = tts ? "vrátili jste se zpět na trasu" : "back_on_route.ogg";
	
	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "na: " : "onto.ogg";
	dictionary["on"] = tts ? "na: " : "on.ogg";
	dictionary["to"] = tts ? "na: " : "to.ogg";
	dictionary["toward"] = tts ? "ve směru: " : "toward.ogg";
	
	// DISTANCE UNIT SUPPORT
	dictionary["meters_accusative"] = tts ? "metrů" : "meters_accusative.ogg";
	dictionary["around_1_kilometer_accusative"] = tts ? "přibližně jeden kilometr" : "around_1_kilometer_accusative.ogg";
	dictionary["around_2_kilometers_accusative"] = tts ? "přibližně dva kilometry" : "around_2_kilometers_accusative.ogg";
	dictionary["around"] = tts ? "přibližně " : "around.ogg";
	dictionary["kilometers_accusative3_4"] = tts ? "kilometry" : "kilometers_accusative3_4.ogg";
	dictionary["kilometers_accusative5"] = tts ? "kilometrů" : "kilometers_accusative5.ogg";
	
	dictionary["meters_locative"] = tts ? "metrech" : "meters_locative.ogg";
	dictionary["around_1_kilometer_locative"] = tts ? "přibližně jednom kilometru" : "around_1_kilometer_locative.ogg";
	dictionary["around_2_kilometers_locative"] = tts ? "přibližně dvou kilometrech" : "around_2_kilometers_locative.ogg";
	dictionary["kilometers_locative"] = tts ? "kilometrech" : "kilometers_locative.ogg";
	
	dictionary["farther_workaround"] = tts ? "dál " : "farther_workaround.ogg";
	dictionary["around_workaround"] = tts ? "dál přibližně " : "around_workaround.ogg";
	
	dictionary["feet_accusative"] = tts ? "stop" : "feet_accusative.ogg";
	dictionary["1_tenth_of_a_mile_accusative"] = tts ? "desetinu míle" : "1_tenth_of_a_mile_accusative.ogg";
	dictionary["tenths_of_a_mile_accusative"] = tts ? "desetiny míle" : "tenths_of_a_mile_accusative.ogg";
	dictionary["around_1_mile_accusative"] = tts ? "přibližně jednu míli" : "around_1_mile_accusative.ogg";
	dictionary["miles_accusative"] = tts ? "mil" : "miles_accusative.ogg";
	
	dictionary["feet_locative"] = tts ? "stopách" : "feet_locative.ogg";
	dictionary["1_tenth_of_a_mile_locative"] = tts ? "desetině míle" : "1_tenth_of_a_mile_locative.ogg";
	dictionary["tenths_of_a_mile_locative"] = tts ? "desetinách míle" : "tenths_of_a_mile_locative.ogg";
	dictionary["around_1_mile_locative"] = tts ? "přibližně jedné míli" : "around_1_mile_locative.ogg";
	dictionary["miles_locative"] = tts ? "mílích" : "miles_locative.ogg";
	
	dictionary["yards_accusative"] = tts ? "jardů" : "yards_accusative.ogg";
	dictionary["yards_locative"] = tts ? "jardech" : "yards_locative.ogg";
	
	// TIME SUPPORT
	dictionary["time"] = tts ? "potřebná doba: " : "time.ogg";
	dictionary["1_hour"] = tts ? "jedna hodina " : "1_hour.ogg";
	dictionary["2_hours"] = tts ? "dvě hodiny " : "2_hours.ogg";
	dictionary["3_4_hours"] = tts ? "hodiny " : "3_4_hours.ogg";
	dictionary["hours"] = tts ? "hodin " : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "méně než jedna minuta" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "jedna minuta" : "1_minute.ogg";
	dictionary["2_minutes"] = tts ? "dvě minuty" : "2_minutes.ogg";
	dictionary["3_4_minutes"] = tts ? "minuty" : "3_4_minutes.ogg";
	dictionary["minutes"] = tts ? "minut" : "minutes.ogg";
}

function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}


function route_new_calc(dist, timeVal) {
	// route_new_calc(Dist, Time) -- ['route_is1', D, 'route_is2', ', ', 'time', T, '. '] :- distance(Dist, nominativ) -- D, time(Time) -- T.
	return dictionary["route_is"] + " " + distance(dist, "accusative", false) + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist, declension, isWorkaround) {
	var accusative = declension === "accusative";
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (isWorkaround ? dictionary["farther_workaround"] + " " : "") + (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1000) {
				return (isWorkaround ? dictionary["farther_workaround"] + " " : "") + (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer_" + declension];
			} else if (dist < 2500) {
				return dictionary["around_2_kilometers_" + declension];
			} else if (dist < 4500) {
				return (isWorkaround ? dictionary["around_workaround"] + " " : "") + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_" + declension + (accusative ? "3_4" : "")];
			} else if (dist < 10000) {
				return (isWorkaround ? dictionary["around_workaround"] + " " : "") + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_" + declension + (accusative ? "5" : "")];
			} else {
				return (isWorkaround ? dictionary["farther_workaround"] + " " : "") + (tts ? Math.round(dist/1000.0).toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_" + declension + (accusative ? "5" : "")];
			}
			break;
		case "mi-f":
			if (dist < 160) {
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet_" + declension];
			} else if (dist < 241) {
				return dictionary["1_tenth_of_a_mile_" + declension];
			} else if (dist < 1529) {
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile_" + declension];
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_" + declension];
			} else if (dist < 100) {
				return (isWorkaround ? dictionary["farther_workaround"] + " " : "") + (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1000) {
				return (isWorkaround ? dictionary["farther_workaround"] + " " : "") + (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters_" + declension];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist((2*dist/100.0)*50)) + " " + dictionary["meters_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yards_" + declension];
			} else if (dist < 100) {
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards_" + declension];
			} else if (dist < 1300) {
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards_" + declension]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile_" + declension];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			} else {
				return (tts ? Math.round(dist/1609.3).toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_" + declension];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (seconds < 90) {
		return dictionary["1_minute"];
	} else if (seconds < 150) {
		return dictionary["2_minutes"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["1_minute"];
	} else if (minutes % 60 == 2 && tts) {
		return hours(minutes) + " " + dictionary["2_minutes"];
	} else if (minutes % 60 < 5 && tts) {
		return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["3_4_minutes"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["minutes"];
	} else if (!tts && seconds < 270) {
		return minutes.toString() + ".ogg " + dictionary["3_4_minutes"];
	} else if (!tts && oggMinutes % 60 > 0) {
		return hours(oggMinutes) + " " + (oggMinutes % 60).toString() + ".ogg " + dictionary["minutes"];
	} else if (!tts) {
		return hours(oggMinutes);
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else if (minutes < 180) {
		return dictionary["2_hours"];
	} else if (minutes < 300) {
		return Math.floor(minutes/60).toString() + " " + dictionary["3_4_hours"];
	} else {
		var hours = minutes / 60;
        return Math.floor(hours).toString() + (!tts ? ".ogg " : " ") + dictionary["hours"]; 
	}
}


function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist, "accusative", false) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return dictionary["follow"] + " " + distance(dist, "accusative", true) + " " + follow_street(streetName);
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
		return dictionary["after"] + " " + distance(dist, "locative", false) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	} else {
		return dictionary["after"] + " " + distance(dist) + " "
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"]
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
		return dictionary["take2"] + " " + nth(exit, "_inst") + " " + dictionary["exit2"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "locative", false) + " " + dictionary["roundabout"] + " " + dictionary["take"] + " " + nth(exit, "") + " " + dictionary["exit"] + " " + turn_street(streetName);
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

function nth(exit, declension) {
	switch (exit) {
		case (1):
			return dictionary["1st" + declension];
		case (2):
			return dictionary["2nd" + declension];
		case (3):
			return dictionary["3rd" + declension];
		case (4):
			return dictionary["4th" + declension];
		case (5):
			return dictionary["5th" + declension];
		case (6):
			return dictionary["6th" + declension];
		case (7):
			return dictionary["7th" + declension];
		case (8):
			return dictionary["8th" + declension];
		case (9):
			return dictionary["9th" + declension];
		case (10):
			return dictionary["10th" + declension];
		case (11):
			return dictionary["11th" + declension];
		case (12):
			return dictionary["12th" + declension];
		case (13):
			return dictionary["13th" + declension];
		case (14):
			return dictionary["14th" + declension];
		case (15):
			return dictionary["15th" + declension];
		case (16):
			return dictionary["16th" + declension];
		case (17):
			return dictionary["17th" + declension];
	}
}

function make_ut(dist, streetName) {
	// make_ut(Dist, Street) --  ["in", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1) {
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "locative", false) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
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
	return dictionary["after"] + " " + distance(dist, "locative", false) + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist, "locative", false) + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["after"] + " " + distance(dist, "locative", false) + " " + dictionary["prepare_roundabout"]; 
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
	return dictionary["off_route"] + " " + distance(dist, "accusative", false) + " " + dictionary["off_route2"];
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
