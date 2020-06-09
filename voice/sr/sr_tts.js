// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: plural forms for numbers 2-4
// (X) Special grammar: word order with clitics ("onda se držite levo")
// (X) Special grammar: grammatical gender and case for numbers ending with 1 and 2 ("udaljenost je jedna milja", "nakon jedne milje", "za jednu milju" etc.)
// (X) Support announcing highway exits

/* jshint -W069 */

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	dictionary["route_is"] = tts ? "ruta je" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "ruta preračunata" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "udaljenost je" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Pripremite se da " : "prepare.ogg";
	dictionary["after"] = tts ? "nakon" : "after.ogg";
	dictionary["in"] = tts ? "za" : "in.ogg";

	dictionary["left"] = tts ? "skrenite levo" : "left.ogg";
	dictionary["left_sh"] = tts ? "skrenite oštro levo" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "skrenite blago levo" : "left_sl.ogg";
	dictionary["right"] = tts ? "skrenite desno" : "right.ogg";
	dictionary["right_sh"] = tts ? "skrenite oštro desno" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "skrenite blago desno" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "držite se leve strane" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "držite se desne strane" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "se držite leve strane" : "left_bear.ogg";   // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "se držite desne strane" : "right_bear.ogg";   // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Okrenite se nazad" : "make_uturn.ogg";
	dictionary["make_uturn_alt"] = tts ? "se okrenite nazad" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "Kada bude moguće, okrenite se nazad" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Pripremite se za ulazak u kružni tok" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "uđite u kružni tok" : "roundabout.ogg";
	dictionary["then"] = tts ? ", onda " : "then.ogg";
	dictionary["and"] = tts ? " i " : "and.ogg";
	dictionary["and_alt"] = tts ? "te" : "and.ogg";
	dictionary["take"] = tts ? "izađite na" : "take.ogg";
	dictionary["exit"] = tts ? "izlaz" : "exit.ogg";

	dictionary["1st"] = tts ? "prvi" : "1st.ogg";
	dictionary["2nd"] = tts ? "drugi" : "2nd.ogg";
	dictionary["3rd"] = tts ? "treći" : "3rd.ogg";
	dictionary["4th"] = tts ? "četvrti" : "4th.ogg";
	dictionary["5th"] = tts ? "peti" : "5th.ogg";
	dictionary["6th"] = tts ? "šesti" : "6th.ogg";
	dictionary["7th"] = tts ? "sedmi" : "7th.ogg";
	dictionary["8th"] = tts ? "osmi" : "8th.ogg";
	dictionary["9th"] = tts ? "deveti" : "9th.ogg";
	dictionary["10th"] = tts ? "deseti" : "10th.ogg";
	dictionary["11th"] = tts ? "jedanaesti" : "11th.ogg";
	dictionary["12th"] = tts ? "dvanaesti" : "12th.ogg";
	dictionary["13th"] = tts ? "trinaesti" : "13th.ogg";
	dictionary["14th"] = tts ? "četrnaesti" : "14th.ogg";
	dictionary["15th"] = tts ? "petnaesti" : "15th.ogg";
	dictionary["16th"] = tts ? "šesnaesti" : "16th.ogg";
	dictionary["17th"] = tts ? "sedamnaesti" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Idite pravo" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Nastavite" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "i stići ćete do odredišta " : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Stigli ste do svog odredišta " : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "i stići ćete do međuodredišta " : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "stigli ste do međuodredišta " : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "i proći ćete ge pe iks međutačku " : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "prolazite ge pe iks međutačku " : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "i proći ćete spašenu tačku " : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "prolazite spašenu tačku " : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "i proći ćete tačku interesa " : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "prolazite tačku interesa " : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "prekoračili ste dozvoljenu brzinu " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "ograničenje brzine " : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Pažnja, " : "attention.ogg";
	dictionary["speed_camera"] = tts ? "nadzor brzine" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "granična kontrola" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "železnički prelaz" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "mere smirenja saobraćaja" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "naplata putarine" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "znak stop" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "pešački prelaz" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "dži pi es signal je izgubljen" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "dži pi es signal je ponovo pronađen" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "sišli ste sa rute pre" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "vratili ste se na rutu" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "na" : "onto.ogg";
	dictionary["on"] = tts ? "na" : "on.ogg";
	dictionary["to"] = tts ? "u" : "to.ogg";
	dictionary["toward"] = tts ? "pravac" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meter_nom"] = tts ? "metar" : "meter_nom.ogg";
	dictionary["meter_gen"] = tts ? "metra" : "meter_gen.ogg";
	dictionary["meter_acc"] = tts ? "metar" : "meter_acc.ogg";
	dictionary["meters_2-4"] = tts ? "metra" : "meter_2-4.ogg";
	dictionary["meters"] = tts ? "metara" : "meters.ogg";
	dictionary["around_1_kilometer_nom"] = tts ? "približno jedan kilometar" : "around_1_kilometer.ogg";
	dictionary["around_1_kilometer_gen"] = tts ? "približno jednog kilometra" : "around_1_kilometer.ogg";
	dictionary["around_1_kilometer_acc"] = dictionary["around_1_kilometer_nom"];
	dictionary["around"] = tts ? "približno" : "around.ogg";
	dictionary["kilometer_nom"] = tts ? "kilometar" : "kilometer_nom.ogg";
	dictionary["kilometer_gen"] = tts ? "kilometra" : "kilometer_gen.ogg";
	dictionary["kilometer_acc"] = tts ? "kilometar" : "kilometer_acc.ogg";
	dictionary["kilometers_2-4"] = tts ? "kilometra" : "kilometers_2-4.ogg";
	dictionary["kilometers"] = tts ? "kilometara" : "kilometers.ogg";

	dictionary["feet"] = tts ? "stopa" : "feet.ogg";
	dictionary["1_tenth_of_a_mile_nom"] = tts ? "jedna desetina milje" : "1_tenth_of_a_mile.ogg";
	dictionary["1_tenth_of_a_mile_gen"] = tts ? "jedne desetine milje" : "1_tenth_of_a_mile.ogg";
	dictionary["1_tenth_of_a_mile_acc"] = tts ? "jednu desetinu milje" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile_2-4"] = tts ? "desetine milje" : "tenths_of_a_mile_2-4.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "desetina milje" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile_nom"] = tts ? "približno jedna milja" : "around_1_mile.ogg";
	dictionary["around_1_mile_gen"] = tts ? "približno jedne milje" : "around_1_mile.ogg";
	dictionary["around_1_mile_acc"] = tts ? "približno jednu milju" : "around_1_mile.ogg";
	dictionary["mile_nom"] = tts ? "milja" : "mile_nom.ogg";
	dictionary["mile_gen"] = tts ? "milje" : "mile_gen.ogg";
	dictionary["mile_acc"] = tts ? "milju" : "mile_acc.ogg";
	dictionary["miles_2-4"] = tts ? "milje" : "miles_2-4.ogg";
	dictionary["miles"] = tts ? "milja" : "miles.ogg";
	dictionary["yard_nom"] = tts ? "jard" : "yard.ogg";
	dictionary["yard_gen"] = tts ? "jarda" : "yard.ogg";
	dictionary["yard_acc"] = tts ? "jard" : "yard.ogg";
	dictionary["yards"] = tts ? "jarda" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "vreme je" : "time.ogg";
	dictionary["1_hour"] = tts ? "jedan sat" : "1_hour.ogg";
	dictionary["hour"] = tts ? "sat" : "hours_2-4.ogg";
	dictionary["hours_2-4"] = tts ? "sata" : "hours_2-4.ogg";
	dictionary["hours"] = tts ? "sati" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "manje od jedne minute" : "less_a_minute.ogg";
	dictionary["minute"] = tts ? "minuta" : "minute.ogg";
	dictionary["1_minute"] = tts ? "jedna minuta" : "1_minute.ogg";
	dictionary["minutes_2-4"] = tts ? "minute" : "minutes_2-4.ogg";
	dictionary["minutes"] = tts ? "minuta" : "minutes.ogg";

	// NUMBERS
	dictionary["1_m_nom"] = tts ? "jedan" : "1_m_nom.ogg";
	dictionary["1_m_gen"] = tts ? "jednog" : "1_m_gen.ogg";
	dictionary["1_m_acc"] = dictionary["1_m_nom"];
	dictionary["1_f_nom"] = tts ? "jedna" : "1_f_nom.ogg";
	dictionary["1_f_gen"] = tts ? "jedne" : "1_f_gen.ogg";
	dictionary["1_f_acc"] = tts ? "jednu" : "1_f_acc.ogg";
	dictionary["2_m_nom"] = tts ? "dva" : "2_m_nom.ogg";
	dictionary["2_m_acc"] = dictionary["2_m_gen"] = dictionary["2_m_nom"];
	dictionary["2_f_nom"] = tts ? "dve" : "2_f_nom.ogg";
	dictionary["2_f_acc"] = dictionary["2_f_gen"] = dictionary["2_f_nom"];
}

function num_str(number, gender /*of the object being counted*/, grm_case) {
	//only needed for numbers ending in 1 and 2
	
	var thousands = Math.floor(number / 1000) * 1000;
	var hundreds  = Math.floor((number - thousands) / 100) * 100;
	var tens      = Math.floor((number - thousands - hundreds) / 10) * 10;
	var ones      = Math.floor(number - thousands - hundreds - tens);

	return ((thousands+hundreds+tens) ? (thousands+hundreds+tens).toString() + " " : "") + dictionary[ones.toString()+"_"+gender+"_"+grm_case];
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
	return dictionary["route_is"] + " " + distance(dist, "nom") + (tts ? ", " : " ") + dictionary["time"] + " " + time(timeVal) + (tts ? ". " : " ");
}

function distance(dist, grm_case) {
	var kms = Math.round(dist/1000.0);
	var miles = Math.round(dist/1609.3);
	switch (metricConst) {
		case "km-m":
			if (dist < 2 )
				return (tts ? num_str(1, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meter_"+grm_case];
			if (dist < 3 )
				return (tts ? num_str(2, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meters_2-4"];
			if (dist < 5 )
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_2-4"];
			if (dist < 17 )
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			if (dist < 100)
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			if (dist < 1000)
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			if (dist < 1500)
				return dictionary["around_1_kilometer_"+grm_case];
			if (dist < 4500)
				return dictionary["around"] + " " + (tts ? kms.toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_2-4"];
			if (dist < 10000)
				return dictionary["around"] + " " + (tts ? kms.toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
			if (kms > 20 && kms % 10 == 1)
				return (tts ? num_str(kms, "m", grm_case) : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometer_"+grm_case];
			if (kms > 20 && kms % 10 == 2)
				return (tts ? num_str(kms, "m", grm_case) : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_2-4"];
			if (kms > 20 && kms % 10 > 2 && kms % 10 < 5)
				return (tts ? kms.toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers_2-4"];
			return (tts ? kms.toString() : ogg_dist(Math.round(dist/1000.0))) + " " + dictionary["kilometers"];
		case "mi-f":
			if (dist < 160)
				return (tts ? (Math.round(2*dist/100.0/0.3048)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.3048)*50)) + " " + dictionary["feet"];
			if (dist < 241)
				return dictionary["1_tenth_of_a_mile_"+grm_case];
			if (dist < 403)
				return (tts ? num_str(2, "f", grm_case) : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile_2-4"];
			if (dist < 725)
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile_2-4"];
			if (dist < 1529)
				return (tts ? Math.round(dist/161.0).toString() : ogg_dist(Math.round(dist/161.0))) + " " + dictionary["tenths_of_a_mile"];
			if (dist < 2414)
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)
				return dictionary["around"] + " " + (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 7242)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 16093)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			if (miles > 20 && miles % 10 == 1)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["mile_"+grm_case];
			if (miles > 20 && miles % 10 == 2)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (miles > 20 && miles % 10 > 2 && kms % 10 < 5)
				return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
		case "mi-m":
			if (dist < 2 )
				return (tts ? num_str(1, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meter_"+grm_case];
			if (dist < 3 )
				return (tts ? num_str(2, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meters_2-4"];
			if (dist < 5 )
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters_2-4"];
			if (dist < 17)
				return (tts ? Math.round(dist).toString() : ogg_dist(Math.round(dist))) + " " + dictionary["meters"];
			if (dist < 100)
				return (tts ? (Math.round(dist/10.0)*10).toString() : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meters"];
			if (dist < 1300)
				return (tts ? (Math.round(2*dist/100.0)*50).toString() : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meters"];
			if (dist < 2414)
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)
				return dictionary["around"] + " " + (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 7242)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 16093)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			if (miles > 20 && miles % 10 == 1)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["mile_"+grm_case];
			if (miles > 20 && miles % 10 == 2)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (miles > 20 && miles % 10 > 2 && kms % 10 < 5)
				return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
		case "mi-y":
			if (dist < 2 )
				return (tts ? num_str(1, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["yard_"+grm_case];
			if (dist < 3 )
				return (tts ? num_str(2, "m", grm_case) : ogg_dist(dist)) + " " + dictionary["yards"];
			if (dist < 17)
				return (tts ? Math.round(dist/0.9144).toString() : ogg_dist(Math.round(dist/0.9144))) + " " + dictionary["yards"];
			if (dist < 100)
				return (tts ? (Math.round(dist/10.0/0.9144)*10).toString() : ogg_dist(Math.round(dist/10.0/0.9144)*10)) + " " + dictionary["yards"];
			if (dist < 1300)
				return (tts ? (Math.round(2*dist/100.0/0.9144)*50).toString() : ogg_dist(Math.round(2*dist/100.0/0.9144)*50)) + " " + dictionary["yards"]; 
			if (dist < 2414)
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)
				return dictionary["around"] + " " + (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 7242)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (dist < 16093)
				return dictionary["around"] + " " + (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
			if (miles > 20 && miles % 10 == 1)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["mile_"+grm_case];
			if (miles > 20 && miles % 10 == 2)
				return (tts ? num_str(miles, "f", grm_case) : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			if (miles > 20 && miles % 10 > 2 && kms % 10 < 5)
				return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles_2-4"];
			return (tts ? miles.toString() : ogg_dist(Math.round(dist/1609.3))) + " " + dictionary["miles"];
	}
}

function time(seconds) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round(((seconds/300.0) * 5));
	var hrs = Math.floor(seconds / 3600);
	if (seconds < 30)
		return dictionary["less_a_minute"];
	if (minutes % 60 == 0 && tts)
		return hours(minutes);
	if (minutes % 60 == 1 && tts)
		return (hrs ? hours(minutes) + " " : "") + dictionary["1_minute"];
	if (minutes % 60 == 2 && tts)
		return (hrs ? hours(minutes) + " " : "") + num_str(2, "f", "nom") + " " + dictionary["minutes_2-4"];
	if (minutes % 60 > 2 && minutes % 60 < 5 && tts)
		return (hrs ? hours(minutes) + " " : "") + (minutes % 60) + " " + dictionary["minutes_2-4"];
	if (tts && minutes % 60 > 11 && minutes % 10 == 1)
		return (hrs ? hours(minutes) + " " : "") + num_str(minutes % 60, "f", "nom") + " " + dictionary["minute"];
	if (tts && minutes % 60 > 12 && minutes % 10 == 2)
		return (hrs ? hours(minutes) + " " : "") + num_str(minutes % 60, "f", "nom") + " " + dictionary["minutes_2-4"];
	if (tts)
		return (hrs ? hours(minutes) + " " : "") + (minutes % 60) + " " + dictionary["minutes"];
	if (!tts && seconds < 300)
		return ogg_dist(minutes) + dictionary["minutes"];
	if (!tts && oggMinutes % 60 > 0)
		return hours(oggMinutes) + " " + ogg_dist(oggMinutes % 60) + dictionary["minutes"];
	if (!tts)
		return hours(oggMinutes);
	return "";
}

function hours(minutes) {
	var hours = Math.floor(minutes / 60);
	if (minutes < 60)
		return "";
	if (minutes < 120)
		return dictionary["1_hour"];
	if (minutes < 180)
		return (tts ? num_str(hours, "m", "nom") : ogg_dist(hours)) + " " + dictionary["hours_2-4"]; 
	if (minutes < 300)
		return (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours_2-4"]; 
	return (tts ? hours.toString() : ogg_dist(hours)) + " " + dictionary["hours"]; 
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? ", " : " ") + dictionary["distance"] + " " + distance(dist, "nom") + (tts ? ", " : " ") + dictionary["time"] + " " + time(seconds) + (tts ? ". " : " ");
}

function go_ahead(dist, streetName) {
	if (dist == -1)
		return dictionary["go_ahead"];
	return dictionary["follow"] + " " + distance(dist, "acc") + " " + follow_street(streetName);
	
// go_ahead(Dist, Street) -- ["follow", D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).
// follow_street("", []).
// follow_street(voice(["","",""],_), []).
// follow_street(voice(["", "", D], _), ["to", D]) :- tts.
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["to", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || Object.keys(streetName).length == 0 || !tts)
		return "";
	if (streetName["toStreetName"] === "" && streetName["toRef"] === "")
		return dictionary["to"] + " " + streetName["toDest"];
	if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]
		|| (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == ""))
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]))
		return dictionary["to"] + " " + assemble_street_name(streetName);
	return "";
}

function turn(turnType, dist, streetName) {
	if (dist == -1)
		return getTurnType(turnType) + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + getTurnType(turnType) + " " + turn_street(streetName); 
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	} else {
		return dictionary["in"] + " " + distance(dist) + " "
			+ getTurnType(turnType) + " " + dictionary["onto"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
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

function getTurnType(turnType) {
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
		case "left_sh":
			return dictionary["left_sh"];
		case "left_sl":
			return dictionary["left_sl"];
		case "right":
			return dictionary["right"];
		case "right_sh":
			return dictionary["right_sh"];
		case "right_sl":
			return dictionary["right_sl"];
		case "left_keep":
			return dictionary["left_keep"];
		case "right_keep":
			return dictionary["right_keep"];
	}
}

function then() {
	// then -- ["then"].
	return dictionary["then"];
}

function roundabout(dist, angle, exit, streetName) {
	// roundabout(Dist, _Angle, Exit, Street) -- ["in", D, "roundabout", "and", "take", E, "exit" | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
// roundabout(_Angle, Exit, Street) -- ["take", E, "exit" | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).
	if (dist == -1)
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["and_alt"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
}

function turn_street(streetName) {
	// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts)
		return "";
	if (streetName["toStreetName"] === "" && streetName["toRef"] === "")
		return dictionary["toward"] + " " + streetName["toDest"];
	if (streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] === "" && streetName["toRef"] === streetName["fromRef"]))
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]))
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	return "";
}

function assemble_street_name(streetName) {
// assemble_street_name(voice([Ref, Name, ""], _), Concat) :- atom_concat(Ref, " ", C1), atom_concat(C1, Name, Concat).
// assemble_street_name(voice(["", Name, Dest], _), [C1, "toward", Dest]) :- atom_concat(Name, " ", C1).
// assemble_street_name(voice([Ref, _, Dest], _), [C1, "toward", Dest]) :- atom_concat(Ref, " ", C1).
	if (streetName["toDest"] === "")
		return streetName["toRef"] + " " + streetName["toStreetName"];
	if (streetName["toRef"] === "")
		return streetName["toStreetName"] + " " + dictionary["toward"] + " " + streetName["toDest"];
	if (streetName["toRef"] != "")
		return streetName["toRef"] + " " + dictionary["toward"] + " " + streetName["toDest"];
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

function make_ut(dist, streetName) {
	// make_ut(Dist, Street) --  ["in", D, "make_uturn" | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
// make_ut(Street) -- ["make_uturn" | Sgen] :- turn_street(Street, Sgen).
	if (dist == -1)
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + dictionary["make_uturn_alt"] + " " + turn_street(streetName);
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
	return dictionary["after"] + " " + distance(dist, "gen") + " " + dictionary["make_uturn_alt"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist, "gen") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["prepare_roundabout"] + " " + dictionary["after"] + " " + distance(dist, "gen"); 
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
	return dictionary["off_route"] + " " + distance(dist, "gen");
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
		case "SPEED_LIMIT":
			return "";
		case "BORDER_CONTROL":
			return dictionary["border_control"];
		case "RAILWAY":
			return dictionary["railroad_crossing"];
		case "TRAFFIC_CALMING":
			return dictionary["traffic_calming"];
		case "TOLL_BOOTH":
			return dictionary["toll_booth"];
		case "STOP":
			return dictionary["stop"];
		case "PEDESTRIAN":
			return dictionary["pedestrian_crosswalk"];
		case "MAXIMUM":
			return "";
		case "TUNNEL":
			return dictionary["tunnel"];
		default:
			return "";
	}
}

function ogg_dist(distance) {
	if (distance == 0)
		return "";
	if (distance < 20)
		return Math.floor(distance).toString() + ".ogg ";
	if (distance < 1000 && (distance % 50) == 0)
		return distance.toString() + ".ogg ";
	if (distance < 30)
		return "20.ogg " + ogg_dist(distance - 20);
	if (distance < 40)
		return "30.ogg " + ogg_dist(distance - 30);
	if (distance < 50)
		return "40.ogg " + ogg_dist(distance - 40);
	if (distance < 60)
		return "50.ogg " + ogg_dist(distance - 50);
	if (distance < 70)
		return "60.ogg " + ogg_dist(distance - 60);
	if (distance < 80)
		return "70.ogg "+ ogg_dist(distance - 70);
	if (distance < 90)
		return "80.ogg " + ogg_dist(distance - 80);
	if (distance < 100)
		return "90.ogg " + ogg_dist(distance - 90);
	if (distance < 200)
		return "100.ogg " + ogg_dist(distance - 100);
	if (distance < 300)
		return "200.ogg " + ogg_dist(distance - 200);
	if (distance < 400)
		return "300.ogg "+ ogg_dist(distance - 300);
	if (distance < 500)
		return "400.ogg " + ogg_dist(distance - 400);
	if (distance < 600)
		return "500.ogg " + ogg_dist(distance - 500);
	if (distance < 700)
		return "600.ogg " + ogg_dist(distance - 600);
	if (distance < 800)
		return "700.ogg " + ogg_dist(distance - 700);
	if (distance < 900)
		return "800.ogg " + ogg_dist(distance - 800);
	if (distance < 1000)
		return "900.ogg " + ogg_dist(distance - 900);
	return ogg_dist(distance/1000) + "1000.ogg " + ogg_dist(distance % 1000);
}
