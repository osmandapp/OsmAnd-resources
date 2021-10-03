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
	dictionary["route_is"] = tts ? tts ? "Yolculuk" : "route_is.ogg" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Yenilendi" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "mesafe" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = "Prepare to"
	dictionary["after"] = tts ? "sonra" : "after.ogg";
	dictionary["in"] = tts ? "içinde" : "in.ogg";

	dictionary["left"] = tts ? "sola dön" : "left.ogg";
	dictionary["left_sh"] = tts ? "sola keskin dönüş" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "hafif sola dön" : "left_sl.ogg";
	dictionary["right"] = tts ? "sağa dön" : "right.ogg";
	dictionary["right_sh"] = tts ? "sağa keskin dönüş" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "hafif sağa dön" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "soldan devam edin" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "sağdan devam edin" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "sola dön" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "sağa dön" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Geri dönün" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "İlk fırsatta geri dönün" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "kavşağa girin" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "kavşağa girin" : "roundabout.ogg";
	dictionary["then"] = tts ? "sonra" : "then.ogg";
	dictionary["and"] = tts ? "ve" : "and.ogg";
	dictionary["take"] = tts ? "çıkıştan" : "take.ogg";
	dictionary["exit"] = tts ? "çıkın" : "exit.ogg";

	dictionary["1st"] = tts ? "birinci" : "1st.ogg";
	dictionary["2nd"] = tts ? "ikinci" : "2nd.ogg";
	dictionary["3rd"] = tts ? "üçüncü" : "3rd.ogg";
	dictionary["4th"] = tts ? "dördüncü" : "4th.ogg";
	dictionary["5th"] = tts ? "beşinci" : "5th.ogg";
	dictionary["6th"] = tts ? "altıncı" : "6th.ogg";
	dictionary["7th"] = tts ? "yedinci" : "7th.ogg";
	dictionary["8th"] = tts ? "sekizinci" : "8th.ogg";
	dictionary["9th"] = tts ? "dokuzuncu" : "9th.ogg";
	dictionary["10th"] = tts ? "onuncu" : "10th.ogg";
	dictionary["11th"] = tts ? "onbirinci" : "11th.ogg";
	dictionary["12th"] = tts ? "onikinci" : "12th.ogg";
	dictionary["13th"] = tts ? "onüçüncü" : "13th.ogg";
	dictionary["14th"] = tts ? "ondördüncü" : "14th.ogg";
	dictionary["15th"] = tts ? "onbeşinci" : "15th.ogg";
	dictionary["16th"] = tts ? "onaltıncı" : "16th.ogg";
	dictionary["17th"] = tts ? "onyedinci" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Düz devam edin " : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Devam edin " : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "sonra ulaşacaksınız" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "hedefinize ulaştınız" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "sonra ara noktaya ulaşacaksınız." : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "ara noktaya ulaştınız" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "ve G P X noktasını yaklaştınız" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "G P X noktasını geçiyorsunuz" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "ve favorinize yaklaştınız" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "favorinize vardınız" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "ve P O I noktasına yaklaştınız" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "P O I noktasını geçiyorsunuz" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = "you are exceeding the speed limit"
	dictionary["exceed_limit"] = tts ? "hız sınırı aşıldı" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "dikkat" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "hız kamerası" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "sınır kontrolü" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "demiryolu hemzemini" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "hız kesici" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "gişe" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "dur tabelası" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "yaya geçidi" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tünel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "g p s sinyali kayboldu" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "g p s sinyali bulundu" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "rotadan çıktınız" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "rotaya geri döndünüz" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "yönüne " : "onto.ogg";
	dictionary["on"] = tts ? "yönünde " : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "yönüne " : "to.ogg";
	dictionary["toward"] = tts ? "yönüne " : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "metre" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "1 kilometre" : "around_1_kilometer.ogg"; // Sürekli "Yaklaşık" demesi sinir bozucu
	dictionary["around"] = tts ? " " : "around.ogg"; // Sürekli "Yaklaşık" demesi sinir bozucu
	dictionary["kilometers"] = tts ? "kilometre" : "kilometers.ogg";

	dictionary["feet"] = tts ? "adım" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "milin onda biri" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "milin onda biri" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "bir mil" : "around_1_mile.ogg"; // Sürekli "Yaklaşık" demesi sinir bozucu
	dictionary["miles"] = tts ? "mil" : "miles.ogg";
	dictionary["yards"] = tts ? "kilometre" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "zaman" : "time.ogg";
	dictionary["1_hour"] = tts ? "bir saat" : "1_hour.ogg";
    dictionary["hours"] = tts ? "saat" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "bir dakikadan az" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "bir dakika" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "dakika" : "minutes.ogg";
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
        return  (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
	}
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return distance(dist) + " " + follow_street(streetName) + " " + dictionary["follow"];
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return streetName["toDest"] + " " + dictionary["to"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return   assemble_street_name(streetName) + " " + dictionary["on"];
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return assemble_street_name(streetName) + " " + dictionary["to"];
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return turn_street(streetName) + " " + getTurnType(turnType);
	} else {
		return distance(dist) + " " + dictionary["in"] + " " + turn_street(streetName)+ " " + getTurnType(turnType); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)+ " " + dictionary["onto"]
	} else {
		return distance(dist) + " " + dictionary["in"] + " " + getTurnType(turnType) + " " + getExitNumber(exitString, exitInt) + " " +  take_exit_name(streetName) + " " + dictionary["onto"] 
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + streetName["toDest"] + " " + dictionary["toward"];
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
	return " " + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1) {
		return nth(exit) + " " + dictionary["take"] + " " + turn_street(streetName) + " "  + dictionary["exit"];
	} else {
		return distance(dist)  + " " + dictionary["in"] + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["after"] + " "  + nth(exit) + " " + dictionary["take"] + " " + turn_street(streetName) + " " + dictionary["exit"] ;
	}

}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] === "" && streetName["toRef"] === "") {
		return dictionary["toward"] + " " + streetName["toDest"];
	} else if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) {
		return assemble_street_name(streetName) + " " + dictionary["on"];
	} else if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"])) {
		return assemble_street_name(streetName) + " " + dictionary["on"];
	} else if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])) {
		return  assemble_street_name(streetName)+ " " + dictionary["onto"] ;
	}
	return "";
}

function assemble_street_name(streetName) {
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
	if (dist == -1) {
		return turn_street(streetName) + " " + dictionary["make_uturn"];
	} else {
		return distance(dist) + " " + dictionary["in"] + " " + turn_street(streetName) + " " + dictionary["make_uturn"];
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return distance(dist) + " " + dictionary["after"] + " " + turn_street(streetName) + " " + dictionary["make_uturn"];
}

function prepare_turn(turnType, dist, streetName) {
	return distance(dist) + " " + dictionary["after"] + " " + turn_street(streetName) + " " + getTurnType(turnType);
}

function prepare_roundabout(dist, exit, streetName) {
	return distance(dist) + " " + dictionary["after"] + " " + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dest + " " + dictionary["and_arrive_destination"];
}

function and_arrive_intermediate(dest) {
	return dest + " " + dictionary["and_arrive_intermediate"];
}

function and_arrive_waypoint(dest) {
	return dest + " " + dictionary["and_arrive_waypoint"];
}

function and_arrive_favorite(dest) {
	return dest + " " + dictionary["and_arrive_favorite"];
}

function and_arrive_poi(dest) {
	return dest + " " + dictionary["and_arrive_poi"];
}

function reached_destination(dest) {
	return dest + " " + dictionary["reached_destination"];
}

function reached_waypoint(dest) {
	return dest + " " + dictionary["reached_waypoint"];
}

function reached_intermediate(dest) {
	return dest + " " + dictionary["reached_intermediate"];
}

function reached_favorite(dest) {
	return dest + " " + dictionary["reached_favorite"];
}

function reached_poi(dest) {
	return dest + " " + dictionary["reached_poi"];
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return distance(dist) + " " + dictionary["off_route"];
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
