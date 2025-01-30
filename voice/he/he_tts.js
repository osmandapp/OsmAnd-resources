// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// ( ) Special grammar: (please specify which)
// (X) Support announcing highway exits

var metricConst;
var tts;
var dictionary = {};

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
    // ROUTE CALCULATED
    dictionary["route_is"] = tts? "המסלול הוא": "route_is.ogg";
    dictionary["route_calculate"] = tts? "המסלול מחושב מחדש": "route_calculate.ogg";
    dictionary["distance"] = tts? "מרחק": "distance.ogg";

    // LEFT/RIGHT
    dictionary["prepare"] = tts? "היכונו": "prepare.ogg";
    dictionary["after"] = tts? "בעוד": "after.ogg";

    dictionary["left"] = tts? "פנו שמאלה": "left.ogg";
    dictionary["left_sh"] = tts? "פנו שמאלה בחדות": "left_sh.ogg";
    dictionary["left_sl"] = tts? "פנו שמאלה בהדרגה": "left_sl.ogg";
    dictionary["right"] = tts? "פנו ימינה": "right.ogg";
    dictionary["right_sh"] = tts? "פנו ימינה בחדות": "right_sh.ogg";
    dictionary["right_sl"] = tts? "פנו ימינה בהדרגה": "right_sl.ogg";
    // Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
    dictionary["left_keep"] = tts? "הישארו שמאלה": "left_keep.ogg";
    dictionary["right_keep"] = tts? "הישארו ימינה": "right_keep.ogg";
    dictionary["left_bear"] = tts? "הישארו שמאלה": "left_bear.ogg";    // in Hebrew the same as left_keep, may be different in other languages
    dictionary["right_bear"] = tts? "הישארו ימינה": "right_bear.ogg";  // in Hebrew the same as right_keep, may be different in other languages

    // U-TURNS
    dictionary["make_uturn"] = tts? "בצעו פניית פרסה": "make_uturn.ogg";
    dictionary["make_uturn_wp"] = tts? "בצעו פניית פרסה במידת האפשר": "make_uturn_wp.ogg";

    // ROUNDABOUTS
    dictionary["prepare_roundabout"] = tts? "היכונו לכניסה למעגל תנועה": "prepare_roundabout.ogg";
    dictionary["roundabout"] = tts? "היכנסו למעגל תנועה": "roundabout.ogg";
    dictionary["then"] = tts? "לאחר מכן": "then.ogg";
    dictionary["and"] = tts? "ו": "and.ogg";
    dictionary["take"] = tts? "צאו ביציאה": "take.ogg";
    dictionary["exit"] = tts? "היציאה": "exit.ogg";

    dictionary["1"] = tts? "ראשונה": "1.ogg";
    dictionary["2"] = tts? "שנייה": "2.ogg";
    dictionary["3"] = tts? "שלישית": "3.ogg";
    dictionary["4"] = tts? "רביעית": "4.ogg";
    dictionary["5"] = tts? "חמישית": "5.ogg";
    dictionary["6"] = tts? "שישית": "6.ogg";
    dictionary["7"] = tts? "שביעית": "7.ogg";
    dictionary["8"] = tts? "שמינית": "8.ogg";
    dictionary["9"] = tts? "תשיעית": "9.ogg";
    dictionary["10"] = tts? "עשירית": "10.ogg";
    dictionary["11"] = tts? "אחת עשרה": "11.ogg";
    dictionary["12"] = tts? "שתים עשרה": "12.ogg";
    dictionary["13"] = tts? "שלוש עשרה": "13.ogg";
    dictionary["14"] = tts? "ארבע עשרה": "14.ogg";
    dictionary["15"] = tts? "חמש עשרה": "15.ogg";
    dictionary["16"] = tts? "שש עשרה": "16.ogg";
    dictionary["17"] = tts? "שבע עשרה": "17.ogg";

    // STRAIGHT/FOLLOW
    dictionary["go_ahead"] = tts? "המשיכו ישר": "go_ahead.ogg";
    dictionary["follow"] = tts? "המשיכו ישר": "follow.ogg";

    // ARRIVE
    dictionary["and_arrive_destination"] = tts? "והגעתם ליעד": "and_arrive_destination.ogg";
    dictionary["reached_destination"] = tts? "הגעתם ליעד": "reached_destination.ogg";
    dictionary["and_arrive_intermediate"] = tts? "והגעתם לנקודת ביניים": "and_arrive_intermediate.ogg";
    dictionary["reached_intermediate"] = tts? "הגעתם לנקודת ביניים": "reached_intermediate.ogg";

    // NEARBY POINTS
    dictionary["and_arrive_waypoint"] = tts? "והגעתם לנקודת ציון ב-GPX": "and_arrive_waypoint.ogg";
    dictionary["reached_waypoint"] = tts? "הגעתם לנקודת ציון ב-GPX": "reached_waypoint.ogg";
    dictionary["and_arrive_favorite"] = tts? "והגעתם לנקודת עניין מועדפת": "and_arrive_favorite.ogg";
    dictionary["reached_favorite"] = tts? "הגעתם לנקודת עניין מועדפת": "reached_favorite.ogg";
    dictionary["and_arrive_poi"] = tts? "והגעתם לנקודת עניין": "and_arrive_poi.ogg";
    dictionary["reached_poi"] = tts? "הגעתם לנקודת עניין": "reached_poi.ogg";

    // ATTENTION
    dictionary["exceed_limit"] = tts? "הגבלת מהירות": "exceed_limit.ogg";
    dictionary["attention"] = tts? "שים לב": "attention.ogg";
    dictionary["speed_camera"] = tts? "מצלמה": "speed_camera.ogg";
    dictionary["border_control"] = tts? "מעבר גבול": "border_control.ogg";
    dictionary["railroad_crossing"] = tts? "מסילת רכבת": "railroad_crossing.ogg";
    dictionary["traffic_calming"] = tts? "האטת תנועה": "traffic_calming.ogg";
    dictionary["toll_booth"] = tts? "עמדת תשלום": "toll_booth.ogg";
    dictionary["stop"] = tts? "תמרור עצור": "stop.ogg";
    dictionary["pedestrian_crosswalk"] = tts? "מעבר חצייה": "pedestrian_crosswalk.ogg";
    dictionary["tunnel"] = tts? "מנהרה": "tunnel.ogg";

    // OTHER PROMPTS
    dictionary["location_lost"] = tts? "אבד אות GPS": "location_lost.ogg";
    dictionary["location_recovered"] = tts? "אות GPS חזר": "location_recovered.ogg";
    dictionary["off_route"] = tts? "סטית מהמסלול ב": "off_route.ogg";
    dictionary["back_on_route"] = tts? "חזרת למסלול": "back_on_route.ogg";

    // STREET NAME PREPOSITIONS
    dictionary["on"] = tts? "על": "on.ogg";
    dictionary["onto"] = tts? "ל": "onto.ogg";
    dictionary["to"] = tts? "עד": "to.ogg";
    dictionary["toward"] = tts? "לכיוון": "toward.ogg";

    // DISTANCE UNIT SUPPORT
    dictionary["meter"] = tts? "מטר": "meter.ogg";
    dictionary["meters"] = tts? "מטרים": "meters.ogg";
    dictionary["kilometer"] = tts? "קילומטר": "kilometer.ogg";
    dictionary["kilometers"] = tts? "קילומטרים": "kilometers.ogg";
    dictionary["around_1_kilometer"] = tts? "בערך קילומטר אחד": "around_1_kilometer.ogg";

    dictionary["feet"] = tts? "רגל": "feet.ogg";
    dictionary["around_1_mile"] = tts? "בערך מייל אחד": "around_1_mile.ogg";
    dictionary["tenths_of_a_mile"] = tts? "עשיריות מייל": "tenths_of_a_mile.ogg";
    dictionary["mile"] = tts? "מייל": "mile.ogg";
    dictionary["miles"] = tts? "מיילים": "miles.ogg";

    dictionary["yards"] = tts? "יארד": "yards.ogg";

    // TIME SUPPORT
    dictionary["time"] = tts? "זמן": "time.ogg";
    dictionary["hour"] = tts? "שעה": "hour.ogg";
    dictionary["hours"] = tts? "שעות": "hours.ogg";
    dictionary["less_a_minute"] = tts? "פחות מדקה": "less_a_minute.ogg";
    dictionary["minute"] = tts? "דקה": "minute.ogg";
    dictionary["minutes"] = tts? "דקות": "minutes.ogg";
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
    return dictionary["route_is"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(timeVal) + (tts? ". ": " ");
}

function distance(dist) {
    switch (metricConst) {
        case "km-m":
            if (dist < 20) {
                return (tts? Math.round(dist).toString(): ogg_dist(Math.round(dist))) + " " + (dist === 1? dictionary["meter"]: dictionary["meters"]);
            } else if (dist < 100) {
                var distance = Math.round(dist / 10.0) * 10;
                return (tts? distance.toString(): ogg_dist(distance)) + " " + dictionary["meters"];
            } else if (dist < 750) {
                var distance = Math.round(dist / 50.0) * 50;
                return (tts? distance.toString(): ogg_dist(distance)) + " " + dictionary["meters"];
            } else if (dist < 1000) {
                return dictionary["around_1_kilometer"];
            } else {
                var dst = Math.round(dist / 1000.0);
                return (tts? dst.toString(): ogg_dist(dst)) + " " + (dst === 1? dictionary["kilometer"]: dictionary["kilometers"]);
            }
            break;
        case "mi-f":
            if (dist < 91) {
                return (tts? (Math.round(2 * dist / 100.0 / 0.3048) * 50).toString(): ogg_dist(Math.round(2 * dist / 100.0 / 0.3048) * 50)) + " " + dictionary["feet"];
            } else if (dist < 320) {
                return (tts? (Math.round(dist / 100.0 / 0.3048) * 100).toString(): ogg_dist(Math.round(dist / 100.0 / 0.3048) * 100)) + " " + dictionary["feet"];
            } else if (dist < 1367) {
                return (tts? Math.round(dist / 161.0).toString(): ogg_dist(Math.round(dist / 161.0))) + " " + dictionary["tenths_of_a_mile"];
            } else if (dist < 2414) {
                return dictionary["around_1_mile"];
            } else {
                return (tts? Math.round(dist / 1609.3).toString(): ogg_dist(Math.round(dist / 1609.3))) + " " + (Math.round(dist / 1609.3) === 1? dictionary["mile"]: dictionary["miles"]);
            }
            break;
        case "mi-m":
            if (dist < 100) {
                return (tts? Math.round(dist).toString(): ogg_dist(Math.round(dist))) + " " + (dist === 1? dictionary["meter"]: dictionary["meters"]);
            } else if (dist < 1300) {
                var distance = Math.round(dist / 10.0) * 10;
                return (tts? distance.toString(): ogg_dist(distance)) + " " + dictionary["meters"];
            } else if (dist < 2414) {
                return dictionary["around_1_mile"];
            } else {
                return (tts? Math.round(dist / 1609.3).toString(): ogg_dist(Math.round(dist / 1609.3))) + " " + (Math.round(dist / 1609.3) === 1? dictionary["mile"]: dictionary["miles"]);
            }
            break;
        case "mi-y":
            if (dist < 17) {
                return (tts? Math.round(dist / 0.9144).toString(): ogg_dist(Math.round(dist / 0.9144))) + " " + dictionary["yards"];
            } else if (dist < 100) {
                return (tts? (Math.round(dist / 10.0 / 0.9144) * 10).toString(): ogg_dist(Math.round(dist / 10.0 / 0.9144) * 10)) + " " + dictionary["yards"];
            } else if (dist < 1300) {
                return (tts? (Math.round(2 * dist / 100.0 / 0.9144) * 50).toString(): ogg_dist(Math.round(2 * dist / 100.0 / 0.9144) * 50)) + " " + dictionary["yards"];
            } else if (dist < 2414) {
                return dictionary["around_1_mile"];
            } else {
                return (tts? Math.round(dist / 1609.3).toString(): ogg_dist(Math.round(dist / 1609.3))) + " " + (Math.round(dist / 1609.3) === 1? dictionary["mile"]: dictionary["miles"]);
            }
            break;
    }
}

function time(seconds) {
    var minutes = Math.round(seconds / 60.0);
    if (seconds < 30) {
        return dictionary["less_a_minute"];
    } else if (minutes % 60 == 0 && tts) {
        return hours(minutes);
    } else if (minutes % 60 == 1 && tts) {
        return hours(minutes) + " " + dictionary["1"] + " " + dictionary["minute"];
    } else if (minutes % 60 == 2 && tts) {return hours(minutes) + " " + dictionary["2"] + " " + dictionary["minutes"];
    } else if (tts) {
        return hours(minutes) + " " + (minutes % 60).toString() + " " + dictionary["minutes"];
    } else { // No tts
        var oggMinutes = Math.round(((seconds / 300.0) * 5));
        if (seconds < 300) {
            return minutes.toString() + ".ogg " + dictionary["minutes"];
        } else if (oggMinutes % 60 > 0) {
            return hours(oggMinutes) + " " + (oggMinutes % 60).toString() + ".ogg " + dictionary["minutes"];
        } else {
            return hours(oggMinutes);
        }
    }
}

function hours(minutes) {
    if (minutes < 60) {
        return "";
    } else {
        var hours = minutes / 60;
        return (!tts? ogg_dist(Math.floor(hours)): Math.floor(hours).toString()) + " " + (hours === 1? dictionary["hour"]: dictionary["hours"]);
    }
}

function route_recalc(dist, seconds) {
    return dictionary["route_calculate"] + " " + distance(dist) + " " + dictionary["time"] + " " + time(seconds) + (tts? ". ": " ");
}

function go_ahead(dist, streetName) {
    if (dist == -1) {
        return dictionary["go_ahead"];
    } else {
        return dictionary["follow"] + " " + distance(dist) + " " + follow_street(streetName);
    }
}

function follow_street(streetName) {
    if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 ||!tts) {
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
    if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") ||!tts) {
        return "";
    } else if (streetName["toDest"]!= "") {
        return dictionary["onto"] + " " + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
    } else if (streetName["toStreetName"]!= "") {
        return dictionary["onto"] + " " + streetName["toStreetName"];
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
    return dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
    if (dist == -1) {
        return dictionary["take"] + " " + nth(exit) + " " + turn_street(streetName);
    } else {
        return dictionary["after"] + " " + distance(dist) + " " + dictionary["roundabout"] + (tts? ", ": " ") + dictionary["and"] + " " + dictionary["take"] + " " + nth(exit) + " " + turn_street(streetName);
    }

}

function turn_street(streetName) {
    if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 ||!tts) {
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
    } else if (streetName["toRef"]!= "") {
        return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
    }
}

function nth(exit) {
    switch (exit) {
        case (1):
            return dictionary["1"];
        case (2):
            return dictionary["2"];
        case (3):
            return dictionary["3"];
        case (4):
            return dictionary["4"];
        case (5):
            return dictionary["5"];
        case (6):
            return dictionary["6"];
        case (7):
            return dictionary["7"];
        case (8):
            return dictionary["8"];
        case (9):
            return dictionary["9"];
        case (10):
            return dictionary["10"];
        case (11):
            return dictionary["11"];
        case (12):
            return dictionary["12"];
        case (13):
            return dictionary["13"];
        case (14):
            return dictionary["14"];
        case (15):
            return dictionary["15"];
        case (16):
            return dictionary["16"];
        case (17):
            return dictionary["17"];
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

function attention(type) {
    return dictionary["attention"] + (tts? ", ": " ") + getAttentionString(type);
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
        return ogg_dist(distance / 1000) + "1000.ogg " + ogg_dist(distance % 1000);
    }
}