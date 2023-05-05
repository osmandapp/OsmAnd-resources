// 日本語音声 ver 4.5.0-3 絶壁ヒナギク
// Basis contributed by Zeppeki Hinagiku, adjusted Hardy Mueller, 2023-04-01.
//
// 録音音声
//    type-A ゆっくり(棒読みちゃん)
//    type-B さとうささら(CeVIO Creative Studio FREE)
//    type-C 弦巻マキ(VOICEROID+ 民安ともえ EX) Official
//    type-D 紲星あかり(VOICEROID2)
// 以下備忘録
// 文字コードはUTF-8で保存。
// 文法に関してはほぼ問題なし、相変わらずat(で、)を使う良い文脈が思いつかない。
// 『+ " " +』を抜くと上手く再生されない事が(特にogg版で)あるので絶対抜いてはいけない。
// 『+ " " +』は『(tts ? "。" : " ")』や『(tts ? "、" : " ")』で代替可能で、後者二つの句読点はポーズを入れたいときに使う。
// 代わりに入れるなら抜いた事にはならないハズ(簡単には確認済み)。
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
	// TTSエンジンなら『、』または『。』で適切なウエイトが入れられるが、体感では長さは変わらない様な気がする。
	dictionary["route_is"] = tts ? "ルートを設定しました" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "リルートします" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "距離" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "次の地点は" : "prepare.ogg";
	dictionary["after"] = tts ? "のち" : "after.ogg";
	dictionary["in"] = tts ? "そこから" : "in.ogg";

	dictionary["left"] = tts ? "左方向です" : "left.ogg";
	dictionary["left_sh"] = tts ? "左後ろ側へ曲がってください" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "左へ進んで下さい" : "left_sl.ogg";
	dictionary["right"] = tts ? "右方向です" : "right.ogg";
	dictionary["right_sh"] = tts ? "右後ろ側へ曲がってください" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "右へ進んで下さい" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "左よりに進んで下さい" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "右よりに進んで下さい" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "左へ向かいます" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "右へ向かいます" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Uターンして下さい" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "可能であればUターンして下さい" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	// take.oggは環状交差点の出口選択用(take the ??th exit),exitに「出口です」で日本語文法的に必要なかった
	dictionary["prepare_roundabout"] = tts ? "環状交差点に入ります。交差点内は十分に徐行して下さい" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "環状交差点に入って下さい" : "roundabout.ogg";
	dictionary["then"] = tts ? "さらに" : "then.ogg";
	dictionary["and"] = tts ? "そのご" : "and.ogg";
	dictionary["take"] = tts ? "選択してください" : "take.ogg";
	dictionary["exit"] = tts ? "出口は" : "exit.ogg";

	dictionary["1st"] = tts ? "1番目です" : "1st.ogg";
	dictionary["2nd"] = tts ? "2番目です" : "2nd.ogg";
	dictionary["3rd"] = tts ? "3番目です" : "3rd.ogg";
	dictionary["4th"] = tts ? "4番目です" : "4th.ogg";
	dictionary["5th"] = tts ? "5番目です" : "5th.ogg";
	dictionary["6th"] = tts ? "6番目です" : "6th.ogg";
	dictionary["7th"] = tts ? "7番目です" : "7th.ogg";
	dictionary["8th"] = tts ? "8番目です" : "8th.ogg";
	dictionary["9th"] = tts ? "9番目です" : "9th.ogg";
	dictionary["10th"] = tts ? "10番目です" : "10th.ogg";
	dictionary["11th"] = tts ? "11番目です" : "11th.ogg";
	dictionary["12th"] = tts ? "12番目です" : "12th.ogg";
	dictionary["13th"] = tts ? "13番目です" : "13th.ogg";
	dictionary["14th"] = tts ? "14番目です" : "14th.ogg";
	dictionary["15th"] = tts ? "15番目です" : "15th.ogg";
	dictionary["16th"] = tts ? "16番目です" : "16th.ogg";
	dictionary["17th"] = tts ? "17番目です" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "まっすぐ進んで下さい" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "道なりに進んで下さい" : "follow.ogg";  // "Follow the course of the road for" perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "目的地周辺です" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "目的地に到着しました" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "経由地点周辺です" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "経由地点に到着しました" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "GPX経由地点が近くにあります" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "GPX経由地点を通過します" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "お気に入り地点が近くにあります" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "お気に入り地点を通過します" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "ポイが近くにあります" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "ポイを通過します" : "reached_poi.ogg";

	// ATTENTION
	dictionary["exceed_limit"] = tts ? "ここの制限速度は" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "ご注意下さい" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "スピードカメラがあります" : "speed_camera.ogg";
	// border_controlを『出入国管理』に変更『国境検問所』あるいは『出入国管理施設』とも言うらしい。
	// 昔は『国境検問所』にしていたし、そっちの可能性も有るのでogg古い方も同梱。
	// https://eow.alc.co.jp/search?q=border+control
	// ちなみに『国境検問所』に戻し、N2TTSに『こっきょうけんもんじょ』と読ませるには
	// 『国境 検問徐』と間に半角スペースを入れて『所』の代わりに『徐』という字にすると良い。
	dictionary["border_control"] = tts ? "出入国管理があります" : "border_control.ogg"; //国境検問所の所をしょとN2TTSが読むため。半角スペースは国境をこっきょうと読ませるため
	dictionary["railroad_crossing"] = tts ? "踏切があります" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "減速隊があります" : "traffic_calming.ogg"; // Googleテキスト読み上げエンジンは減速帯を『げんそくおび』と読むので。
	dictionary["toll_booth"] = tts ? "りょうきんじょがあります" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "一次停止です" : "stop.ogg"; // 発音に関してGoogleテキストはこれが一番近いが、N2 TTSはどうにもならない。
	dictionary["pedestrian_crosswalk"] = tts ? "横断歩道があります" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "トンネルがあります" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "GPS信号を見失いました" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "GPS信号を見つけました" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "ルートを外れました" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "ルートに戻りました" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "え、入ります。" : "onto.ogg";
	dictionary["on"] = tts ? "状です。" : "on.ogg"; // 『上』って書くと絶対『うえ』って読むパターンがあるので音読みで後半が上がる『状』を充てている。
	dictionary["to"] = tts ? "へ、向かいます。" : "to.ogg";
	dictionary["toward"] = tts ? "方面です。" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meters"] = tts ? "メートル" : "meters.ogg";
	dictionary["around_1_kilometer"] = tts ? "およそ1キロメートル" : "around_1_kilometer.ogg";
	dictionary["around"] = tts ? "およそ" : "around.ogg";
	dictionary["kilometers"] = tts ? "キロメートル" : "kilometers.ogg";

	dictionary["feet"] = tts ? "フィート" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "10ぶんの1マイル" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "10ぶんの" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile"] = tts ? "およそ1マイル" : "around_1_mile.ogg";
	dictionary["miles"] = tts ? "マイル" : "miles.ogg";
	dictionary["yards"] = tts ? "ヤード" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "所要時間は" : "time.ogg";
	dictionary["1_hour"] = tts ? "1時間" : "1_hour.ogg";
	dictionary["hours"] = tts ? "時間" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "1分未満" : "less_a_minute.ogg";
	dictionary["1_minute"] = tts ? "1分" : "1_minute.ogg";
	dictionary["minutes"] = tts ? "分" : "minutes.ogg";


	// 日本語用独自追加
	// zzz_atを使うと自然な日本語になるけれど、keep_left keep_rightだけおかしくなる／400m先で左寄りに進んで下さい×・400m左寄りに進んで下さい○
	// とりあえず空白1秒おくことで両立できるようにしていた
	// 他にN2 TTSでは『。』が適度なウェイトになるが、Google読み上げエンジンでは『。』がウェイトにならないので対処法思い浮かばず(古い経験則)
	//dictionary["zzz_at"] = tts ? "を" : "zzz_at.ogg";
	dictionary["kmh"] = tts ? "キロです" : "kmh.ogg";
	dictionary["mph"] = tts ? "マイルです" : "mph.ogg";
	dictionary["courteous"] = tts ? "です" : "courteous.ogg";
	// ogg専用
	dictionary["gotoexit"] = tts ? "そこから出口へ向かいます" : "gotoexit.ogg";

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

//+ " " +抜きテスト
function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + (tts ? "。" : " ") + distance(dist) + (tts ? "、" : " ") + dictionary["time"] + (tts ? "、" : " ") + time(timeVal);
}

function distance(dist) {
	// 日本語だと数字と単位(m、km、ft、mile)を離すとtts読み上げがおかしくなるので単位前の" "を削除…したいんだけれど、思案中
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
				return dictionary["1_tenth_of_a_mile"] + " ";
			} else if (dist < 1529) {
	            // マイル呼称 英語版原文文法
	            //return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
	            // 下は日本語版「十分の～マイル」例「十分の三マイル」
				return dictionary["tenths_of_a_mile"] + " " + (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["miles"];
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
	// 読み上げ時単位が数字の直後に付いていれば『○○分』を『ふん』と『ぷん』を読み分けてくれるので+ " " +を『分』の発音の手前だけ抜く。
	// 余計なところを抜くと、ogg版で数字を読み上げなくなるので注意。
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	if (seconds < 30) {
		return dictionary["less_a_minute"];
	} else if (minutes % 60 == 0 && tts) {
		return hours(minutes);
	} else if (minutes % 60 == 1 && tts) {
		return hours(minutes) + " " + dictionary["1_minute"];
	} else if (tts) {
		return hours(minutes) + " " + (minutes % 60) + dictionary["minutes"];
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
	return dictionary["route_calculate"] + (tts ? "。" : " ") + dictionary["distance"] + " " + distance(dist) + (tts ? "、" : " ") + dictionary["time"] + " " + time(seconds);
}

function go_ahead(dist, streetName) {
	if (dist == -1) {
		return dictionary["go_ahead"];
	} else {
		return distance(dist) + (tts ? "、" : " ") + dictionary["follow"] + (tts ? "。" : " ") + follow_street(streetName);
	}
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		return streetName["toDest"] + " " + dictionary["to"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"] || 
			(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == "")) {
		return assemble_street_name(streetName) + dictionary["on"];
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		return assemble_street_name(streetName) + " " + dictionary["to"];
	}
}

function turn(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + (tts ? "。" : " ") + turn_street(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ") + getTurnType(turnType) + (tts ? "。" : " ") + turn_street(streetName); 
	}
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	// 日本語では前の方にある『+ " " + dictionary["onto"]』(～へ、入ります)を最後部に入れ替え
	// さらにTTSと非TTSで条件分岐
	if (tts && dist == -1 && streetName["toStreetName"] == "") {
	// これから入る通りの名前が空ならばonto(～へ、入ります)は不要。
		return getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else if (tts && dist == -1) {
		return getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName) + " " + dictionary["onto"];
	} else if (!tts && dist == -1) {
		return getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt);
	} else if (tts && streetName["toStreetName"] == "") {
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ")
			+ getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else if (!tts) {
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ")
			+ getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt);
	// ここまでが大幅変更分
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ")
			+ getTurnType(turnType) + (tts ? "、" : " ") + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName) + " " + dictionary["onto"];
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return streetName["toDest"] + " " + dictionary["toward"] + " " + streetName["toStreetName"];
	} else if (streetName["toStreetName"] != "") {
		return streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (!tts && exitInt > 0 && exitInt < 18) {
			return dictionary["exit"] + " " + nth(exitInt);
	} else if (!tts) {
	// 1～17番以外の数字または文字(上の条件に該当しない)で、かつoggの場合『そこから出口へ向かいます』とだけ発声。
			return dictionary["gotoexit"];
	} else {
			return dictionary["exit"] + " " + exitString + " " + dictionary["courteous"] + (tts ? "。" : " ");
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
	return dictionary["then"] + (tts ? "、" : " ");
}

function roundabout(dist, angle, exit, streetName) {
	// 文法的に不要なdictionary["take"](take.ogg)を抜き"、"や"。"で適切な遅延を入れて誤魔化す
	if (dist == -1) {
		return dictionary["exit"] + " " + nth(exit) + (tts ? "。" : " ") + turn_street(streetName);
	} else {
	//	return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ") + dictionary["roundabout"] + (tts ? "。" : " ") + dictionary["and"] + " " + nth(exit) + " " + dictionary["exit"] + (tts ? "。" : " ") + turn_street(streetName);
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ") + dictionary["roundabout"] + (tts ? "。" : " ") + dictionary["and"] + (tts ? "、" : " ") + dictionary["exit"] + " " + nth(exit) + (tts ? "。" : " ") + turn_street(streetName);
	}
}

function turn_street(streetName) {
	// 日本語でtoward(～方面です)とonto(～へ、入ります)を正しい順番で発話するにはここを直す必要がある
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts) {
		return "";
	} else if (streetName["toStreetName"] == "" && streetName["toRef"] == "") {
		// toStreetName(直後に入る通り)と、toRef(現在走行中の通り)が空(=="")の場合、toDest(目的地方面の通り)の後に「toward(方面です)」をstreetNameに代入する。
		return streetName["toDest"] + " " + dictionary["toward"];
	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		// 『fromRef(現在走行中の通り)とtoStreetName(直後に入る通り)』がtoRef(直後に入る道)とfromStreetName(今まで来た道)と変更がない場合streetNameに「on(上です)」を付与する。	} else if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) {
		return assemble_street_name(streetName) + dictionary["on"];
	} else if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"])) {
		// fromRef(前参照)とtoStreetName(直後に入る通り)が同じで尚且つ、toRef(後参照)とfromStreetName(今来た道)が同じ場合
		// さらにtoStreetName(直後に入る通り)が空("")でなおかつtoRef(後参照)がfromRef(前参照)と同じ場合to「on(上です)」をstreetNameに付与する。
		return assemble_street_name(streetName) + dictionary["on"];
	} else if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])) {
		// toRef(後参照)とfromRef(前参照)が同じで、toStreetName(直後に入る通り)がfromStreetName(今まで来た道)が同じであるという条件を満たさない場合、streetNameに「onto(へ、入ります)」を付与する。
		return assemble_street_name(streetName) + " " + dictionary["onto"];
	}
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "") {
		return streetName["toRef"] + streetName["toStreetName"];
	} else if (streetName["toRef"] == "") {
		return streetName["toDest"] + dictionary["toward"] + streetName["toStreetName"];
	} else if (streetName["toRef"] != "") {
		return streetName["toDest"] + dictionary["toward"] + streetName["toRef"];
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
	// この記述が以前から正しく動作しているかどうか不明。
	// どんなUターンが必要な状況(道路の形など)で発声しているかのサンプルや詳細が分かれば、zzz_at.oggなどを使って適切な文法に直せる可能性がある。
	if (dist == -1) {
		return dictionary["make_uturn"] + (tts ? "。" : " ") + turn_street(streetName) ;
	} else {
		return dictionary["in"] + " " + distance(dist) + (tts ? "、" : " ") + dictionary["make_uturn"] + (tts ? "。" : " ") + turn_street(streetName);
	}
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	// 以下の3つは「～のち、××」を自然に読ませるため、dictionary["after"]の前の" "を抜いたが、抜くとダメかも？
	return distance(dist) + " " + dictionary["after"] + (tts ? "、" : " ") + dictionary["make_uturn"] + (tts ? "。" : " ") + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return distance(dist) + " " + dictionary["after"] + (tts ? "、" : " ") + getTurnType(turnType) + (tts ? "。" : " ") + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return distance(dist) + " " + dictionary["after"] + (tts ? "、" : " ") + dictionary["prepare_roundabout"]; 
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + (tts ? "。" : " ") + dest;
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + (tts ? "。" : " ") + dest;
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + (tts ? "。" : " ") + dest;
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + (tts ? "。" : " ") + dest;
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + (tts ? "。" : " ") + dest;
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + (tts ? "。" : " ") + dest;
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + (tts ? "。" : " ") + dest;
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + (tts ? "。" : " ") + dest;
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + (tts ? "。" : " ") + dest;
}

function reached_poi(dest) {
	return dictionary["reached_poi"] + (tts ? "。" : " ") + dest;
}

function location_lost() {
	return dictionary["location_lost"];
}

function location_recovered() {
	return dictionary["location_recovered"];
}

function off_route(dist) {
	return distance(dist) + (tts ? "、" : " ") + dictionary["off_route"];
}

function back_on_route() {
	return dictionary["back_on_route"];
}

function make_ut_wp() {
	return dictionary["make_uturn_wp"];
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
// 日本語だと速度の後に単位が無いと変なので、単位をつける処理も一応可能。
// ただし日本国内なら問題ないが、国境を越えて常用の時速単位がkm/hからmi/hに変わった場合などに恐らく対応出来ない。
// 現状最適なのは『ここの制限速度は50です』と誤魔化すことだと思われる。
// oggは注意喚起(『制限速度を超えています』)だけ発声させる。
// https://wiki.openstreetmap.org/wiki/JA:Key:maxspeed
// https://wiki.openstreetmap.org/wiki/Key:maxspeed
// 上記の仕様を見るに数字の後に『mph』が付いていたらmphを取り除いて『～マイル』
// 『knots』が付いていたらknotsを取り除いて『～ノット』と発声するよう、分岐処理が出来れば最良だと思われる。
// 普通のjavascriptと違うし、どの変数に
	if (tts) {
		return dictionary["exceed_limit"] + (tts ? "、" : " ") + maxSpeed.toString() + " " + dictionary["courteous"];
// 以下はOsmAndの設定で速度単位を『キロメートル毎時』あるいは『その他(マイル毎時)』に設定した場合で分岐する処理
//		switch (metricConst) {
//			case "km-m":
//				return dictionary["exceed_limit"] + (tts ? "、" : " ") + maxSpeed.toString() + dictionary["kmh"];
//				break;
//			case "mi-f":
//				return dictionary["exceed_limit"] + (tts ? "、" : " ") + maxSpeed.toString() + dictionary["mph"];
//				break;
//			case "mi-m":
//				return dictionary["exceed_limit"] + (tts ? "、" : " ") + maxSpeed.toString() + dictionary["mph"];
//				break;
//			case "mi-y":
//				return dictionary["exceed_limit"] + (tts ? "、" : " ") + maxSpeed.toString() + dictionary["mph"];
//				break;
//		}
	} else {
			return dictionary["exceed_limit"];
	}
}

function attention(type) {
	return dictionary["attention"] + (tts ? "、" : " ") + getAttentionString(type);
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
