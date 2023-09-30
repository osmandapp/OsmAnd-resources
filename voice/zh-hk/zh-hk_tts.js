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
	dictionary["route_is1"] = tts ? "路程" : "route_is1.ogg";
	dictionary["route_is2"] = tts ? "遠" : "route_is2.ogg";
	dictionary["route_calculate"] = tts ? "路線重新計算" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "距離" : "distance.ogg";

	// LEFT/RIGHT
	dictionary["prepare"] = tts ? "請準備" : "prepare.ogg";
	dictionary["after"] = tts ? "後" : "after.ogg";
	dictionary["in"] = tts ? "在" : "in.ogg";

	dictionary["left"] = tts ? "左轉" : "left.ogg";
	dictionary["left_sh"] = tts ? "向左急轉" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "稍向左轉" : "left_sl.ogg";
	dictionary["right"] = tts ? "右轉" : "right.ogg";
	dictionary["right_sh"] = tts ? "向右急轉" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "稍向右轉" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "靠左" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "靠右" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "靠左" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "靠右" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["prepare_make_uturn"] = tts ? "準備掉頭" : "prepare_make_uturn.ogg";
	dictionary["make_uturn1"] = tts ? "後請掉頭" : "make_uturn1.ogg";
	dictionary["make_uturn2"] = tts ? "請掉頭" : "make_uturn2.ogg";
	dictionary["make_uturn_wp"] = tts ? "可以嘅話, 請掉頭" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "後進入迴旋處" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "後進入迴旋處, 然後在" : "roundabout.ogg";
	dictionary["then"] = tts ? "然後" : "then.ogg";
	dictionary["and"] = tts ? "同埋" : "and.ogg";
	dictionary["take"] = tts ? "行" : "take.ogg";
	dictionary["exit"] = tts ? "出口離開" : "exit.ogg";

	dictionary["1st"] = tts ? "第一個" : "1st.ogg";
	dictionary["2nd"] = tts ? "第二個" : "2nd.ogg";
	dictionary["3rd"] = tts ? "第三個" : "3rd.ogg";
	dictionary["4th"] = tts ? "第四個" : "4th.ogg";
	dictionary["5th"] = tts ? "第五個" : "5th.ogg";
	dictionary["6th"] = tts ? "第六個" : "6th.ogg";
	dictionary["7th"] = tts ? "第七個" : "7th.ogg";
	dictionary["8th"] = tts ? "第八個" : "8th.ogg";
	dictionary["9th"] = tts ? "第九個" : "9th.ogg";
	dictionary["10th"] = tts ? "第十個" : "10th.ogg";
	dictionary["11th"] = tts ? "第十一個" : "11th.ogg";
	dictionary["12th"] = tts ? "第十二個" : "12th.ogg";
	dictionary["13th"] = tts ? "第十三個" : "13th.ogg";
	dictionary["14th"] = tts ? "第十四個" : "14th.ogg";
	dictionary["15th"] = tts ? "第十五個" : "15th.ogg";
	dictionary["16th"] = tts ? "第十六個" : "16th.ogg";
	dictionary["17th"] = tts ? "第十七個" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "一直向前行" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "繼續向前行" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "並到達目的地" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "你已抵達目的地" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "並到達中途目的地" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "你已抵達中途目的地" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "並到達GPX航點" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "你已抵達GPX航點" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "並到達收藏點" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "你已抵達收藏點" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "並到達興趣點" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "你已抵達興趣點" : "reached_poi.ogg";

	// ATTENTION
	dictionary["exceed_limit"] = tts ? "已超速" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "注意" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "快相機" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "邊境管制" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "鐵路平交道" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "減速壆" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "收費亭" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "停止標誌" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "行人過路處" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "隧道" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "接收唔到 G P S 信號" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "G P S 信號已恢復" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "你已偏離路線" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "你已返回原來路線" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "落喺" : "onto.ogg";
	dictionary["on"] = tts ? "喺" : "on.ogg";
	dictionary["to"] = tts ? "去" : "to.ogg";
	dictionary["toward"] = tts ? "向" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "公尺" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "約一公里" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "約" : "around.ogg";
	dictionary["kilometers"] = tts ? "公里" : "kilometers.ogg";

	dictionary["feet"] = tts ? "英呎" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "零點一英里" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "零點一英里" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "約一英里" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "英里" : "miles.ogg";
	dictionary["yards"] = tts ? "英碼" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "所需時間" : "time.ogg";
	dictionary["1_hour"] = tts ? "一小時" : "1_hour.ogg";
	dictionary["hours"] = tts ? "小時" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "不到一分鐘" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "一分鐘" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "分鐘" : "minutes.ogg";
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
	return dictionary["route_is1"] + " " + distance(dist) + " " + dictionary["route_is2"] + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
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
	return dictionary["route_calculate"] + " " + dictionary["distance"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
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
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
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
		return dictionary["make_uturn2"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["make_uturn1"] + " " + turn_street(streetName);
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
