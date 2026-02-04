// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar:
//         (X) Correct formation of numbers 21-29
//         (X) Gendered numbering ( 2 hours - dues hores / 2 km - dos km )
//         (X) Article for named exits
//         (X) "and" between hours and minutes
// (X) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "La ruta té" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "S'ha recalculat la ruta" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "distància" : "distance.ogg";
	
	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Prepara't per a" : "prepare.ogg";
	dictionary["after"] = tts ? "després de" : "after.ogg";
	dictionary["in"] = tts ? "d'aquí a " : "in.ogg";
	
	dictionary["left"] = tts ? "gireu a l'esquerra" : "left.ogg";
	dictionary["left_sh"] = tts ? "feu un gir tancat a l'esquerra" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "gireu lleugerament a l'esquerra" : "left_sl.ogg";
	dictionary["right"] = tts ? "gireu a la dreta" : "right.ogg";
	dictionary["right_sh"] = tts ? "feu un gir tancat a la dreta" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "gireu lleugerament a la dreta" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "manteniu-vos a l'esquerra" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "manteniu-vos a la dreta" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "continueu per l'esquerra" : "left_bear.ogg";   // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "continueu per la dreta" : "right_bear.ogg";    // in English the same as right_keep, may be different in other languages
	
	// U-TURNS
	dictionary["make_uturn"] = tts ? "feu mitja volta" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "quan pugueu, feu mitja volta" : "make_uturn_wp.ogg";
	
	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "entreu a la rotonda" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "entreu a la rotonda" : "roundabout.ogg";
	dictionary["then"] = tts ? "i" : "then.ogg";
	dictionary["and"] = tts ? "i" : "and.ogg";
	dictionary["take"] = tts ? "agafeu" : "take.ogg";
	dictionary["exit"] = tts ? "sortida" : "exit.ogg";
	dictionary["the_exit"] = tts ? "la sortida" : "the_exit.ogg";
	
	dictionary["1st"] = tts ? "la primera" : "1st.ogg";
	dictionary["2nd"] = tts ? "la segona" : "2nd.ogg";
	dictionary["3rd"] = tts ? "la tercera" : "3rd.ogg";
	dictionary["4th"] = tts ? "la quarta" : "4th.ogg";
	dictionary["5th"] = tts ? "la cinquena" : "5th.ogg";
	dictionary["6th"] = tts ? "la sisena" : "6th.ogg";
	dictionary["7th"] = tts ? "la setena" : "7th.ogg";
	dictionary["8th"] = tts ? "la vuitena" : "8th.ogg";
	dictionary["9th"] = tts ? "la novena" : "9th.ogg";
	dictionary["10th"] = tts ? "la desena" : "10th.ogg";
	dictionary["11th"] = tts ? "l'onzena" : "11th.ogg";
	dictionary["12th"] = tts ? "la dotzena" : "12th.ogg";
	dictionary["13th"] = tts ? "la tretzena" : "13th.ogg";
	dictionary["14th"] = tts ? "la catorzena" : "14th.ogg";
	dictionary["15th"] = tts ? "la quinzena" : "15th.ogg";
	dictionary["16th"] = tts ? "la setzena" : "16th.ogg";
	dictionary["17th"] = tts ? "la dissetena" : "17th.ogg";
	
	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "continueu recte" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "continueu per la via durant" : "follow.ogg";
	
	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "i arribareu a la vostra destinació" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "heu arribat a la vostra destinació" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "i arribareu al vostre punt intermedi" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "heu arribat al vostre punt intermedi" : "reached_intermediate.ogg";
	
	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "i passareu pel vostre punt G P X intermedi" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "esteu passant pel vostre punt G P X intermedi" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "i passareu pel vostre punt preferit" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "esteu passant pel vostre punt preferit" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "i passareu pel P D I" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "esteu passant pel P D I" : "reached_poi.ogg";
	
	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "estás excediendo el límite de velocidad" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "límit de velocitat" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "atenció" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "radar de velocitat" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "control fronterer" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "pas a nivell" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "ressalt" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "barrera de peatge" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "senyal d'estop" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "pas de vianants" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "túnel" : "tunnel.ogg";
	
	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "s'ha perdut el senyal del G P S" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "s'ha recuperat el senyal del G P S" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "us heu desviat de la ruta" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "heu tornat a la ruta" : "back_on_route.ogg";
	
	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "en direcció a" : "onto.ogg";
	dictionary["on"] = tts ? "per" : "on.ogg";
	dictionary["to"] = tts ? "cap a" : "to.ogg";
	dictionary["toward"] = tts ? "cap a" : "toward.ogg";
	
	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "metres" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "aproximadament un quilòmetre" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "aproximadament" : "around.ogg";
	dictionary["kilometers"] = tts ? "quilòmetres" : "kilometers.ogg";
	
	dictionary["feet"] = tts ? "peus" : "feet.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "dècimes de milla" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "aproximadament una milla" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "milles" : "miles.ogg";
	dictionary["yards"] = tts ? "iardes" : "yards.ogg";
	
	// TIME SUPPORT
	dictionary["time"] = tts ? "temps necessari" : "time.ogg";
	dictionary["1_hour"] = tts ? "una hora" : "1_hour.ogg";
	dictionary["hours"] = tts ? "hores" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "menys d'un minut" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "un minut" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "minuts" : "minutes.ogg";
	
	// NUMBERS
	dictionary["1_masc"] = tts ? "un" : "1_masc.ogg";
	dictionary["1_fem"] = tts ? "una" : "1_fem.ogg";
	dictionary["2_masc"] = tts ? "dos" : "2_masc.ogg";
	dictionary["2_fem"] = tts ? "dues" : "2_fem.ogg";
	dictionary["3"] = tts ? "tres" : "3.ogg";
	dictionary["4"] = tts ? "quatre" : "4.ogg";
	dictionary["5"] = tts ? "cinc" : "5.ogg";
	dictionary["6"] = tts ? "sis" : "6.ogg";
	dictionary["7"] = tts ? "set" : "7.ogg";
	dictionary["8"] = tts ? "vuit" : "8.ogg";
	dictionary["9"] = tts ? "nou" : "9.ogg";
	dictionary["10"] = tts ? "deu" : "10.ogg";
	dictionary["11"] = tts ? "onze" : "11.ogg";
	dictionary["12"] = tts ? "dotze" : "12.ogg";
	dictionary["13"] = tts ? "tretze" : "13.ogg";
	dictionary["14"] = tts ? "catorze" : "14.ogg";
	dictionary["15"] = tts ? "quinze" : "15.ogg";
	dictionary["16"] = tts ? "setze" : "16.ogg";
	dictionary["17"] = tts ? "disset" : "17.ogg";
	dictionary["18"] = tts ? "divuit" : "18.ogg";
	dictionary["19"] = tts ? "dinou" : "19.ogg";
	dictionary["20"] = tts ? "vint" : "20.ogg";
	dictionary["30"] = tts ? "trenta" : "30.ogg";
	dictionary["40"] = tts ? "quaranta" : "40.ogg";
	dictionary["50"] = tts ? "cinquanta" : "50.ogg";
	dictionary["60"] = tts ? "seixanta" : "60.ogg";
	dictionary["70"] = tts ? "setanta" : "70.ogg";
	dictionary["80"] = tts ? "vuitanta" : "80.ogg";
	dictionary["90"] = tts ? "noranta" : "90.ogg";
	dictionary["100"] = tts ? "cent" : "100.ogg";
	dictionary["200_masc"] = tts ? "dos-cents" : "200_masc.ogg";
	dictionary["200_fem"] = tts ? "dues-centes" : "200_fem.ogg";
	dictionary["300_masc"] = tts ? "tres-cents" : "300_masc.ogg";
	dictionary["300_fem"] = tts ? "tres-centes" : "300_fem.ogg";
	dictionary["400_masc"] = tts ? "quatre-cents" : "400_masc.ogg";
	dictionary["400_fem"] = tts ? "quatre-centes" : "400_fem.ogg";
	dictionary["500_masc"] = tts ? "cinc-cents" : "500_masc.ogg";
	dictionary["500_fem"] = tts ? "cinc-centes" : "500_fem.ogg";
	dictionary["600_masc"] = tts ? "sis-cents" : "600_masc.ogg";
	dictionary["600_fem"] = tts ? "sis-centes" : "600_fem.ogg";
	dictionary["700_masc"] = tts ? "set-cents" : "700_masc.ogg";
	dictionary["700_fem"] = tts ? "set-centes" : "700_fem.ogg";
	dictionary["800_masc"] = tts ? "vuit-cents" : "800_masc.ogg";
	dictionary["800_fem"] = tts ? "vuit-centes" : "800_fem.ogg";
	dictionary["900_masc"] = tts ? "nou-cents" : "900_masc.ogg";
	dictionary["900_fem"] = tts ? "nou-centes" : "900_fem.ogg";
	dictionary["1000"] = tts ? "mil" : "1000.ogg";
	
	// SPECIAL NUMBERS
	dictionary["20_and"] = tts ? "vint-i-" : "20_and.ogg ";
	dictionary["30_and"] = tts ? "trenta-" : "30.ogg ";
	dictionary["40_and"] = tts ? "quaranta-" : "40.ogg ";
	dictionary["50_and"] = tts ? "cinquanta-" : "50.ogg ";
	dictionary["60_and"] = tts ? "seixanta-" : "60.ogg ";
	dictionary["70_and"] = tts ? "setanta-" : "70.ogg ";
	dictionary["80_and"] = tts ? "vuitanta-" : "80.ogg ";
	dictionary["90_and"] = tts ? "noranta-" : "90.ogg ";
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
	return dictionary["route_is"] + (tts ? ": " : " ") + distance(dist) + (tts ? ". " : " ") + dictionary["time"] + (tts ? ": " : " ") + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
	switch (metricConst) {
		case "km-m":
			if (dist < 17 ) {
				return number_form(Math.round(dist), "m") + " " + dictionary["meters"];
			} else if (dist < 100) {
				return number_form((dist/10.0)*10, "m") + " " + dictionary["meters"];
			} else if (dist < 1000) {
				return number_form((2*dist/100.0)*50, "m") + " " + dictionary["meters"];
			} else if (dist < 1500) {
				return dictionary["around_1_kilometer"];
			} else if (dist < 10000) {
				return dictionary["around"] + " " + number_form(Math.round(dist/1000.0), "m") + " " + dictionary["kilometers"];
			} else {
				return number_form(Math.round(dist/1000.0), "m") + " " + dictionary["kilometers"];
			}
			break;
		case "mi-f":
			if (dist < 91) {
				return number_form(Math.round(2*dist/100.0/0.3048)*50, "m") + " " + dictionary["feet"];
			} else if (dist < 320) {
				return number_form(Math.round(dist/100.0/0.3048)*100, "m") + " " + dictionary["feet"];
			} else if (dist < 1367) {
				return number_form(Math.round(dist/161.0), "f") + " " + dictionary["tenths_of_a_mile"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			} else {
				return number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			}
			break;
		case "mi-m":
			if (dist < 17) {
				return number_form(Math.round(dist), "m") + " " + dictionary["meters"];
			} else if (dist < 100) {
				return number_form((dist/10.0)*10, "m") + " " + dictionary["meters"];
			} else if (dist < 1300) {
				return number_form((2*dist/100.0)*50, "m") + " " + dictionary["meters"];
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			} else {
				return number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			}
			break;
		case "mi-y":
			if (dist < 17) {
				return number_form(Math.round(dist/0.9144), "f") + " " + dictionary["yards"];
			} else if (dist < 100) {
				return number_form(Math.round(dist/10.0/0.9144)*10, "f") + " " + dictionary["yards"];
			} else if (dist < 1300) {
				return number_form(Math.round(2*dist/100.0/0.9144)*50, "f") + " " + dictionary["yards"]; 
			} else if (dist < 2414) {
				return dictionary["around_1_mile"];
			} else if (dist < 16093) {
				return dictionary["around"] + " " + number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			} else {
				return number_form(Math.round(dist/1609.3), "f") + " " + dictionary["miles"];
			}
			break;
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (seconds <= 60) {
		return dictionary["1_minute"];
	} else if (minutes < 60) {
		return number_form(minutes % 60, "m") + " " + dictionary["minutes"]
	} else if (minutes % 60 == 1) {
		return hours(minutes) + " " + dictionary["and"] + " " + dictionary["1_minute"];
	} else {
		return hours(minutes) + " " + dictionary["and"] + " " +  number_form(minutes % 60, "m") + " " + dictionary["minutes"]
	}
}

function hours(minutes) {
	if (minutes < 60) {
		return "";
	} else if (minutes < 120) {
		return dictionary["1_hour"];
	} else {
		var hours = Math.floor(minutes / 60);
		return number_form(hours, "f") + " " + dictionary["hours"];
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? ": " : " ") + distance(dist) + (tts ? ". " : " ") + dictionary["time"] + (tts ? ": " : " ") + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"] + (tts ? ". " : " ");
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
		return dictionary["the_exit"] + " " + exitString;
	} else {
		return dictionary["the_exit"];
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
		return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	}

}

function turn_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
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
		return streetName["toStreetName"] + " " + dictionary["toward"] + streetName["toDest"];
	} else if (streetName["toRef"] != "") {
		return streetName["toRef"] + dictionary["toward"] + streetName["toDest"];
	}
	return "";
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
	if (number == 0) {
		return "";
	} else if (number == 1) {
		return nounGender == "f" ? dictionary["1_fem"] : dictionary["1_masc"];
	} else if (number == 2) {
		return nounGender == "f" ? dictionary["2_fem"] : dictionary["2_masc"];
	} else if (number < 20) {
		return dictionary[number];
	} else if (number == 20) {
		return dictionary["20"];
	} else if (number < 30) {
		return dictionary["20_and"] + number_form(number - 20, nounGender);
	} else if (number == 30) {
		return dictionary["30"];
	} else if (number < 40) {
		return dictionary["30_and"] + number_form(number - 30, nounGender);
	} else if (number == 40) {
		return dictionary["40"];
	} else if (number < 50) {
		return dictionary["40_and"] + number_form(number - 40, nounGender);
	} else if (number == 50) {
		return dictionary["50"];
	} else if (number < 60) {
		return dictionary["50_and"] + number_form(number - 50, nounGender);
	} else if (number == 60) {
		return dictionary["60"];
	} else if (number < 70) {
		return dictionary["60_and"] + number_form(number - 60, nounGender);
	} else if (number == 70) {
		return dictionary["70"];
	} else if (number < 80) {
		return dictionary["70_and"] + number_form(number - 70, nounGender);
	} else if (number == 80) {
		return dictionary["80"];
	} else if (number < 90) {
		return dictionary["80_and"] + number_form(number - 80, nounGender);
	} else if (number == 90) {
		return dictionary["90"];
	} else if (number < 100) {
		return dictionary["90_and"] + number_form(number - 90, nounGender);
	} else if (number == 100) {
		return dictionary["100"];
	} else if (number < 200) {
		return dictionary["100"] + " " + number_form(number - 100, nounGender);
	} else if (number == 200) {
		return (nounGender == "f" ? dictionary["200_fem"] : dictionary["200_masc"]);
	} else if (number < 300) {
		return (nounGender == "f" ? dictionary["200_fem"] : dictionary["200_masc"]) + " " + number_form(number - 200, nounGender);
	} else if (number == 300) {
		return (nounGender == "f" ? dictionary["300_fem"] : dictionary["300_masc"]);
	} else if (number < 400) {
		return (nounGender == "f" ? dictionary["300_fem"] : dictionary["300_masc"]) + " " + number_form(number - 300, nounGender);
	} else if (number == 400) {
		return (nounGender == "f" ? dictionary["400_fem"] : dictionary["400_masc"]);
	} else if (number < 500) {
		return (nounGender == "f" ? dictionary["400_fem"] : dictionary["400_masc"]) + " " + number_form(number - 400, nounGender);
	} else if (number == 500) {
		return (nounGender == "f" ? dictionary["500_fem"] : dictionary["500_masc"]);
	} else if (number < 600) {
		return (nounGender == "f" ? dictionary["500_fem"] : dictionary["500_masc"]) + " " + number_form(number - 500, nounGender);
	} else if (number == 600) {
		return (nounGender == "f" ? dictionary["600_fem"] : dictionary["600_masc"]);
	} else if (number < 700) {
		return (nounGender == "f" ? dictionary["600_fem"] : dictionary["600_masc"]) + " " + number_form(number - 600, nounGender);
	} else if (number == 700) {
		return (nounGender == "f" ? dictionary["700_fem"] : dictionary["700_masc"]);
	} else if (number < 800) {
		return (nounGender == "f" ? dictionary["700_fem"] : dictionary["700_masc"]) + " " + number_form(number - 700, nounGender);
	} else if (number == 800) {
		return (nounGender == "f" ? dictionary["800_fem"] : dictionary["800_masc"]);
	} else if (number < 900) {
		return (nounGender == "f" ? dictionary["800_fem"] : dictionary["800_masc"]) + " " + number_form(number - 800, nounGender);
	} else if (number == 900) {
		return (nounGender == "f" ? dictionary["900_fem"] : dictionary["900_masc"]);
	} else if (number < 1000) {
		return (nounGender == "f" ? dictionary["900_fem"] : dictionary["900_masc"]) + " " + number_form(number - 900, nounGender);
	} else if (number < 2000) {
		return dictionary["1000"] + " " + number_form(number % 1000, nounGender);
	} else {
		return number_form(Math.floor(number/1000), nounGender) + " " + dictionary["1000"] + " " + number_form(number % 1000, nounGender);
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
	return dictionary["left_bear"] + (tts ? ". " : " ");
}

function bear_right(streetName) {
	return dictionary["right_bear"] + (tts ? ". " : " ");
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + dest + (tts ? ". " : " ");
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + dest + (tts ? ". " : " ");
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + dest + (tts ? ". " : " ");
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + dest + (tts ? ". " : " ");
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + dest + (tts ? ". " : " ");
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + dest + (tts ? ". " : " ");
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + dest + (tts ? ". " : " ");
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + dest + (tts ? ". " : " ");
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + dest + (tts ? ". " : " ");
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + " " + dest + (tts ? ". " : " ");
}

function location_lost() {
	return dictionary["location_lost"] + (tts ? ". " : " ");
}

function location_recovered() {
	return dictionary["location_recovered"] + (tts ? ". " : " ");
}

function off_route(dist) {
	return dictionary["off_route"] + " " + distance(dist) + (tts ? ". " : " ");
}

function back_on_route() {
	return dictionary["back_on_route"] + (tts ? ". " : " ");
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"] + (tts ? ". " : " ");
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return dictionary["exceed_limit"] + (tts ? ": " : " ") + number_form(maxSpeed) + (tts ? ". " : " ");
}

function attention(type) {
	return dictionary["attention"] + (tts ? ", " : " ") + getAttentionString(type) + (tts ? ". " : " ") ;
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
