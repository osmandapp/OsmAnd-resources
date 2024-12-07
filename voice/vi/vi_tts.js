// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// ( ) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)
// (X) Support announcing highway exits
//
// Initial version courtesy of user Duc9101

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "Quãng đường di chuyển là" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "Quãng đường đã được tính lại" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "khoảng cách là" : "distance.ogg";
	dictionary["after1"] = tts ? "rồi" : "after1.ogg"

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Chuẩn bị" : "prepare.ogg";
	dictionary["after"] = tts ? "sau" : "after.ogg";
	dictionary["in"] = tts ? "đi tiếp" : "in.ogg";

	dictionary["left"] = tts ? "rẽ trái" : "left.ogg";
	dictionary["left_sh"] = tts ? "ngoặt trái" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "đi chếch sang trái" : "left_sl.ogg";
	dictionary["right"] = tts ? "rẽ phải" : "right.ogg";
	dictionary["right_sh"] = tts ? "ngoặt phải" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "đi chếch sang phải" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "tiếp tục đi ở bên trái" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "tiếp tục đi ở bên phải" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "hướng về bên trái" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "hướng về bên phải" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Quay đầu xe" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "Khi có thể, hãy quay đầu xe" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Sẽ đến vòng xuyến" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "vào vòng xuyến" : "roundabout.ogg";
	dictionary["then"] = tts ? "sau đó" : "then.ogg";
	dictionary["and"] = tts ? "và" : "and.ogg";
	dictionary["take"] = tts ? "đi theo" : "take.ogg";
	dictionary["exit"] = tts ? "lối ra" : "exit.ogg";

	dictionary["1st"] = tts ? "thứ nhất" : "1st.ogg";
	dictionary["2nd"] = tts ? "thứ hai" : "2nd.ogg";
	dictionary["3rd"] = tts ? "thứ ba" : "3rd.ogg";
	dictionary["4th"] = tts ? "thứ tư" : "4th.ogg";
	dictionary["5th"] = tts ? "thứ năm" : "5th.ogg";
	dictionary["6th"] = tts ? "thứ sáu" : "6th.ogg";
	dictionary["7th"] = tts ? "thứ bảy" : "7th.ogg";
	dictionary["8th"] = tts ? "thứ tám" : "8th.ogg";
	dictionary["9th"] = tts ? "thứ chín" : "9th.ogg";
	dictionary["10th"] = tts ? "số 10" : "10th.ogg";
	dictionary["11th"] = tts ? "số 11" : "11th.ogg";
	dictionary["12th"] = tts ? "số 12" : "12th.ogg";
	dictionary["13th"] = tts ? "số 13" : "13th.ogg";
	dictionary["14th"] = tts ? "số 14" : "14th.ogg";
	dictionary["15th"] = tts ? "số 15" : "15th.ogg";
	dictionary["16th"] = tts ? "số 16" : "16th.ogg";
	dictionary["17th"] = tts ? "số 17" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Đi thẳng" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Tiếp tục đi" : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "và đến điểm đến của bạn" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Bạn đã đến nơi" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "và đến điểm đến trung gian của bạn" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "bạn đã đến điểm đến trung gian" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "và đi qua điểm dừng chân" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "bạn đang đi qua điểm dừng chân" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "và đi qua điểm đến yêu thích" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "bạn đang đi qua điểm đến yêu thích" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "và đi qua điểm quan tâm" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "bạn đang đi qua điểm quan tâm" : "reached_poi.ogg";

	// ATTENTION
	dictionary["exceed_limit1"] = tts ? "bạn đang vượt quá tốc độ tối đa cho phép là" : "exceed_limit.ogg";
	dictionary["exceed_limit2"] = tts ? "tốc độ tối đa là" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Chú ý" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "ca-me-ra bắn tốc độ" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "trạm kiểm soát biên giới" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "nơi giao cắt với đường sắt" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "gờ giảm tốc" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "trạm thu phí" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "biển báo phải dừng" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "nhường đường cho người đi bộ" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "đường hầm" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "mất tín hiệu định vị" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "tín hiệu định vị được khôi phục" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Bạn đã rời khỏi lộ trình" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "Bạn đã quay lại lộ trình" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "vào" : "onto.ogg";
	dictionary["on"] = tts ? "vào" : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "đến" : "to.ogg";
	dictionary["toward"] = tts ? "theo hướng về" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "mét" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "khoảng một ki-lô-mét" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "khoảng" : "around.ogg";
	dictionary["kilometers"] = tts ? "ki-lô-mét" : "kilometers.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "thời gian di chuyển là" : "time.ogg";
	dictionary["1_hour"] = tts ? "một tiếng" : "1_hour.ogg";
	dictionary["hours"] = tts ? "tiếng" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "chưa đến một phút" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "một phút" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "phút" : "minutes.ogg";
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
	return dictionary["route_is"] + " " + distance(dist) + "." + " " + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist) {
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
	return dictionary["route_calculate"] + (tts ? ", " : " ") + dictionary["distance"] + " " + distance(dist) + "." + " " + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
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
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["after1"]  + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["after1"]  + " " + getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
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
		return dictionary["exit"] + " " + nth(exitInt);
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
		return dictionary["take"] + " " + dictionary["exit"] + " " + nth(exit)  + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["after1"] + " " + dictionary["roundabout"] + " " + dictionary["and"] + " " + dictionary["take"] + " " + dictionary["exit"] + " " + nth(exit) + " " + turn_street(streetName);
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

function make_ut(dist, streetName) {
	if (dist == -1) {
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + dictionary["after1"] + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist) + (tts ? ", " : " ") + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + (tts ? ", " : " ") + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + (tts ? ", " : " ") + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + (tts ? ", " : " ") + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + (tts ? ", " : " ") + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + (tts ? ", " : " ") + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + (tts ? ", " : " ") + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + (tts ? ", " : " ") + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + (tts ? ", " : " ") + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + (tts ? ", " : " ") + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + (tts ? ", " : " ") + dest;
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
	return dictionary["exceed_limit1"] + " " + maxSpeed.toString();
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
