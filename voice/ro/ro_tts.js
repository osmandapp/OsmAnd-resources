// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: 
//         (X) Gendered numbering ( 2 hours - două ore / 2 km - doi km )
//         (X) "de" preposition on numbers bigger than 20
//         (X) Added "and" between hours and minutes
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Lungimea traseului este de" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Traseu recalculat" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "distanța" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["after"] = tts ? "peste" : "after.ogg";
	dictionary["in"] = tts ? "în" : "in.ogg";

	dictionary["left"] = tts ? "virați la stânga" : "left.ogg";
	dictionary["left_sh"] = tts ? "virați strâns la stânga" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "virați ușor la stânga" : "left_sl.ogg";
	dictionary["right"] = tts ? "virați la dreapta" : "right.ogg";
	dictionary["right_sh"] = tts ? "virați strâns la dreapta" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "virați ușor la dreapta" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "încadrați-vă pe partea stângă" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "încadrați-vă pe partea dreaptă" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "țineți stânga" : "left_bear.ogg";
	dictionary["right_bear"] = tts ? "țineți dreapta" : "right_bear.ogg";

	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "Pregătiți-vă să întoarceți" : "prepare_make_uturn.ogg";
	dictionary["make_uturn"] = tts ? "Întoarceți" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "Întoarceți când aveți posibilitatea" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "pregătiți-vă să intrați în sensul giratoriu" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "veți intra în sensul giratoriu pe care-l veți părăsi pe la" : "roundabout.ogg";
	dictionary["then"] = tts ? "apoi" : "then.ogg";
	dictionary["take"] = tts ? "luați-o pe" : "take.ogg";
	dictionary["exit"] = tts ? "ieșire" : "exit.ogg";

	dictionary["1st"] = tts ? "prima" : "1st.ogg";
	dictionary["2nd"] = tts ? "a doua" : "2nd.ogg";
	dictionary["3rd"] = tts ? "a treia" : "3rd.ogg";
	dictionary["4th"] = tts ? "a patra" : "4th.ogg";
	dictionary["5th"] = tts ? "a cincea" : "5th.ogg";
	dictionary["6th"] = tts ? "a șasea" : "6th.ogg";
	dictionary["7th"] = tts ? "a șaptea" : "7th.ogg";
	dictionary["8th"] = tts ? "a opta" : "8th.ogg";
	dictionary["9th"] = tts ? "a noua" : "9th.ogg";
	dictionary["10th"] = tts ? "a zecea" : "10th.ogg";
	dictionary["11th"] = tts ? "a unsprezecea" : "11th.ogg";
	dictionary["12th"] = tts ? "a douăsprezecea" : "12th.ogg";
	dictionary["13th"] = tts ? "a treisprezecea" : "13th.ogg";
	dictionary["14th"] = tts ? "a paisprezecea" : "14th.ogg";
	dictionary["15th"] = tts ? "a cinsprezecea" : "15th.ogg";
	dictionary["16th"] = tts ? "a șaisprezecea" : "16th.ogg";
	dictionary["17th"] = tts ? "a șaptesprezecea" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Mergeți înainte" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Mergeți tot înainte" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "și ajungeți la destinație" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Ați ajuns la destinație" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "și ajungeți la punctul intermediar" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "Ați ajuns la punctul intermediar" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "și treceți pe lângă punctul G P X intermediar" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "Ați ajuns la punctul G P X intermediar" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "și treceți pe lângă marcajul favorit" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "Ați ajuns la marcajul favorit" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "și treceți pe lângă punctul de interes" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "Ați ajuns la punctul de interes" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "limita de viteză depăşită" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "limita de viteză" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Atenţie" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "radar" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "vamă" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "trecere la nivel" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "denivelare pentru limitarea vitezei" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "taxă rutieră" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "Stop" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "trecere de pietoni" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "semnal gps pierdut" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "semnal gps recuperat" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "aţi deviat de la rută" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "sunteți din nou pe rută" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "pe" : "onto.ogg";
	dictionary["to"] = tts ? "către" : "to.ogg";
	dictionary["on"] = tts ? "pe" : "on.ogg";
	dictionary["toward"] = tts ? "spre" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "metri" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "circa un kilometru" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "circa" : "around.ogg";
	dictionary["kilometers"] = tts ? "kilometri" : "kilometers.ogg";

	dictionary["feet"] = tts ? "picioare" : "feet.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "zecimi de milă" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "circa o milă" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "mile" : "miles.ogg";

	dictionary["yards"] = tts ? "iarzi" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "timpul necesar" : "time.ogg";
	dictionary["1_hour"] = tts ? "o oră" : "1_hour.ogg";
	dictionary["hours"] = tts ? "ore" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "mai puțin de un minut" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "un minut" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minute" : "minutes.ogg";
    
    // GENDERED NUMBERS
    dictionary["1_masc"] = tts ? "un" : "1_masc.ogg";
    dictionary["1_fem"] = tts ? "o" : "1_fem.ogg";
    dictionary["2_fem"] = tts ? "două" : "2_fem.ogg";
    dictionary["12_fem"] = tts ? "douăsprezece" : "12_fem.ogg";
    dictionary["x1_fem"] = tts ? "una" : "x1_fem.ogg";
    
    // PREPOSITIONS
    dictionary["of"] = tts ? "de" : "of.ogg";
    dictionary["and"] = tts ? "și" : "and.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + (tts ? ", " : " ") + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return (tts ? number_form(Math.round(dist), "m") : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? number_form(Math.round(dist/10.0)*10, "m") : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1000) {
				return (tts ? number_form(Math.round(2*dist/100.0)*50, "m") : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + (tts ? number_form(Math.round(dist/1000.0), "m") : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
			} else {
				return (tts ? number_form(Math.round(dist/1000.0), "m") : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
			}
			break;
		case "mi-f":
			if (dist < 91) {
				return (tts ? number_form(Math.round(2*dist/100.0/0.3048)*50, "n") : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet"];
			} else if (dist < 320) {
				return (tts ? (Math.round(dist/100.0/0.3048)*100).toString() : ogg_dist(Math.round(dist/100.0/0.3048)*100)) + " " + dictionary["feet"];
			} else if (dist < 1367) {
				return (tts ? number_form(Math.round(dist/161.0), "f") : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return (tts ? number_form(Math.round(dist), "m") : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			} else if (dist < 100) {
				return (tts ? number_form(Math.round(dist/10.0)*10, "m") : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			} else if (dist < 1300) {
				return (tts ? number_form(Math.round(2*dist/100.0)*50, "m") : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return (tts ? number_form(Math.round(dist/0.9144), "m") : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yards"];
			} else if (dist < 100) {
				return (tts ? number_form(Math.round(dist/10.0/0.9144)*10, "m") : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards"];
			} else if (dist < 1300) {
				return (tts ? number_form(Math.round(2*dist/100.0/0.9144)*50, "m") : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards"]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			} else {
				return (tts ? number_form(Math.round(dist/1609.3), "f") : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
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
		return hours(minutes) + " " + number_form(minutes % 60, "n") + " " + dictionary["minutes"];
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
		return dictionary["1_hour"] + " " + dictionary["and"];
	} else {
		var hours = Math.floor(minutes / 60);
        return (tts ? number_form(hours, "f") : ogg_dist(hours)) + " " + dictionary["hours"] + " " + dictionary["and"]; 
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
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " "
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
	return (tts ? ", " : " ") + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
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

//This function should be used whenever you need to insert a number into the sentence
function number_form(number, nounGender) {
    var numeral = "";
    
    //Gender specific numeral formation
    if (nounGender == "f") {
        if (number == 1) {
            numeral += dictionary["1_fem"];
        } else if (number == 2) {
            numeral += dictionary["2_fem"];
        } else if (number == 12) {
            numeral += dictionary["12_fem"];
        } else if ((number % 10 == 1) && (number % 100 != 11)) {
            numeral += (Math.round(number/10.0)*10).toString() + " " + dictionary["and"] + " " + dictionary["x1_fem"];
        } else if ((number % 10 == 2) && (number % 100 != 12)) {
            numeral += (Math.round(number/10.0)*10).toString() + " " + dictionary["and"] + " " + dictionary["2_fem"];
        } else if (number % 100 == 12) {
            numeral += (Math.round(number/100.0)*100).toString() + " " + dictionary["and"] + " " + dictionary["12_fem"];
        } else {
            numeral += number.toString();
        }
    } else if (nounGender == "n") {
        if (number == 1) {
            numeral += dictionary["1_masc"];
        }else if (number == 2) {
            numeral += dictionary["2_fem"];
        } else if (number == 12) {
            numeral += dictionary["12_fem"];
        } else if ((number % 10 == 2) && (number % 100 != 12)) {
            numeral += (Math.round(number/10.0)*10).toString() + " " + dictionary["and"] + " " + dictionary["2_fem"];
        } else if (number % 100 == 12) {
            numeral += (Math.round(number/100.0)*100).toString() + " " + dictionary["and"] + " " + dictionary["12_fem"];
        } else {
            numeral += number.toString();
        }
    } else { //masculine or default
        if (number == 1) {
            numeral += dictionary["1_masc"];
        } else {
            numeral += number.toString();
        }
    } 
    
    //"de" preposition adding
    if (((number % 100 == 0) && (number != 0)) || (number % 100 > 19)) {
        numeral += " " + dictionary["of"];
    }
    
    return numeral;
}

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["make_uturn_wp"] + " " + turn_street(streetName);
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
	return dictionary["after"] + " " + distance(dist) + " " + dictionary["prepare_make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + " " + getTurnType(turnType) + " " + turn_street(streetName);
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
