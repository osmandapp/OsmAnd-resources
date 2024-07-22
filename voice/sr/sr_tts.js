// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: plural forms for numbers 2-4
// (X) Special grammar: word order with clitics ("onda drži levo")
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
	dictionary["route_calculate"] = tts ? "ruta je preračunata" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "udaljenost je" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Pripremi se da " : "prepare.ogg";
	dictionary["after"] = tts ? "nakon" : "after.ogg";
	dictionary["in"] = tts ? "za" : "in.ogg";

	dictionary["left"] = tts ? "skreni levo" : "left.ogg";
	dictionary["left_sh"] = tts ? "skreni oštro levo" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "skreni blago levo" : "left_sl.ogg";
	dictionary["right"] = tts ? "skreni desno" : "right.ogg";
	dictionary["right_sh"] = tts ? "skreni oštro desno" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "skreni blago desno" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	dictionary["left_keep"] = tts ? "drži levu stranu" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "drži desnu stranu" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "se drži leve strane" : "left_bear.ogg";   // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "se drži desne strane." : "right_bear.ogg";   // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "Uradi polukružno okretanje" : "make_uturn.ogg";
	dictionary["make_uturn_alt"] = tts ? "Vrati se nazad" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "Kada bude moguće, uradi polukružno okretanje" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "Pripremi se za ulazak u kružni tok" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "uđi u kružni tok" : "roundabout.ogg";
	dictionary["then"] = tts ? "zatim" : "then.ogg";
	dictionary["and"] = tts ? "i" : "and.ogg";
	dictionary["and_alt"] = tts ? "pa" : "and.ogg";
	dictionary["take"] = tts ? "izađi na" : "take.ogg";
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
	dictionary["go_ahead"] = tts ? "Nastavi pravo" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Nastavi još" : "follow.ogg";

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "i stižeš do odredišta" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "Stigao si na odredište" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "i stižeš si na međuodredište" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "stigao si na međuodredište" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "i stižeš do međuodredišta" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "Stigao si na međuodredište" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "i stižeš do omiljenog mesta" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "Stigao si na omiljeno mesto" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "i stižeš do tačke interesa" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "Stigao si do tačke interesa" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "prekoračio si dozvoljenu brzinu" : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "Dozvoljena brzina je" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "Pažnja" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "prekršajna kamera" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "carina" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "pružni prelaz" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "ležeći policajac" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "naplata putarine" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "znak stop" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "pešački prelaz" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunel" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "dži pi es signal je izgubljen" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "dži pi es signal je ponovo pronađen" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "Skrenuo si sa rute za" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "vratio si se na rutu" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "u ulicu" : "onto.ogg";
	dictionary["on"] = tts ? "ulicom" : "on.ogg";
	dictionary["to"] = tts ? "u" : "to.ogg";
	dictionary["toward"] = tts ? "pravac" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meter_nom"] = tts ? "metar" : "meter_nom.ogg";
	dictionary["meter_gen"] = tts ? "metra" : "meter_gen.ogg";
	dictionary["meter_acc"] = tts ? "metra" : "meter_acc.ogg";
	dictionary["meters_2-4"] = tts ? "metra" : "meter_2-4.ogg";
	dictionary["meters"] = tts ? "metara" : "meters.ogg";
	dictionary["around_1_kilometer_nom"] = tts ? "približno jedan kilometar" : "around_1_kilometer.ogg";
	dictionary["around_1_kilometer_gen"] = tts ? "jednog kilometra" : "around_1_kilometer.ogg";
	dictionary["around_1_kilometer_acc"] = dictionary["around_1_kilometer_nom"];
	dictionary["around"] = tts ? "približno" : "around.ogg";
	dictionary["kilometer_nom"] = tts ? "kilometar" : "kilometer_nom.ogg";
	dictionary["kilometer_gen"] = tts ? "kilometra" : "kilometer_gen.ogg";
	dictionary["kilometer_acc"] = tts ? "kilometra" : "kilometer_acc.ogg";
	dictionary["kilometers_2-4"] = tts ? "kilometra" : "kilometers_2-4.ogg";
	dictionary["kilometers"] = tts ? "kilometara" : "kilometers.ogg";

	dictionary["feet"] = tts ? "stopa" : "feet.ogg";
	dictionary["1_tenth_of_a_mile_nom"] = tts ? "jedna desetina milje" : "1_tenth_of_a_mile.ogg";
	dictionary["1_tenth_of_a_mile_gen"] = tts ? "jedne desetine milje" : "1_tenth_of_a_mile.ogg";
	dictionary["1_tenth_of_a_mile_acc"] = tts ? "jednu desetinu milje" : "1_tenth_of_a_mile.ogg";
	dictionary["tenths_of_a_mile_2-4"] = tts ? "desetine milje" : "tenths_of_a_mile_2-4.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "desetina milje" : "tenths_of_a_mile.ogg";
	dictionary["around_1_mile_nom"] = tts ? "približno jedna milja" : "around_1_mile.ogg";
	dictionary["around_1_mile_gen"] = tts ? "približno jednu milju" : "around_1_mile.ogg";
	dictionary["around_1_mile_acc"] = tts ? "jednu milju" : "around_1_mile.ogg";
	dictionary["mile_nom"] = tts ? "milja" : "mile_nom.ogg";
	dictionary["mile_gen"] = tts ? "milje" : "mile_gen.ogg";
	dictionary["mile_acc"] = tts ? "milju" : "mile_acc.ogg";
	dictionary["miles_2-4"] = tts ? "milje" : "miles_2-4.ogg";
	dictionary["miles"] = tts ? "milja" : "miles.ogg";
	dictionary["yard_nom"] = tts ? "jard" : "yard.ogg";
	dictionary["yard_gen"] = tts ? "jarda" : "yard.ogg";
	dictionary["yard_acc"] = tts ? "jard" : "yard.ogg";
	dictionary["yards"] = tts ? "jardi" : "yards.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "vreme putovanja" : "time.ogg";
	dictionary["1_hour"] = tts ? "jedan sat" : "1_hour.ogg";
	dictionary["hour"] = tts ? "sat" : "hours_2-4.ogg";
	dictionary["hours_2-4"] = tts ? "sata" : "hours_2-4.ogg";
	dictionary["hours"] = tts ? "sati" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "manje od jedne minute" : "less_a_minute.ogg";
	dictionary["minute"] = tts ? "minuta" : "minute.ogg";
	dictionary["1_minute"] = tts ? "jedna minuta" : "1_minute.ogg";
	dictionary["minutes_2-4"] = tts ? "minuta" : "minutes_2-4.ogg";
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
	dictionary["2_f_nom"] = tts ? "dva" : "2_f_nom.ogg";
	dictionary["2_f_acc"] = dictionary["2_f_gen"] = dictionary["2_f_nom"];
}


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function num_str(number, gender /*of the object being counted*/, grm_case) {
	//only needed for numbers ending in 1 and 2
	var thousands = Math.floor(number / 1000) * 1000;
	var hundreds  = Math.floor((number - thousands) / 100) * 100;
	var tens      = Math.floor((number - thousands - hundreds) / 10) * 10;
	var ones      = Math.floor(number - thousands - hundreds - tens);

	return ((thousands+hundreds+tens) ? (thousands+hundreds+tens).toString() + " " : "") + dictionary[ones.toString()+"_"+gender+"_"+grm_case];
}

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
}

function follow_street(streetName) {
	if ((streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || Object.keys(streetName).length == 0 || !tts)
		return "";
	if (streetName["toStreetName"] == "" && streetName["toRef"] == "")
		return dictionary["to"] + " " + streetName["toDest"];
	if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]
		|| (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == ""))
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]))
		return dictionary["to"] + " " + assemble_street_name(streetName);
	return "";
}

function turn(turnType, dist, streetName) {
	if (dist == -1)
		return getTurnType(turnType) + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + getTurnType(turnType) + " " + turn_street(streetName); 
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
	return (tts ? ", " : " ") + dictionary["then"] + " ";
}

function roundabout(dist, angle, exit, streetName) {
	if (dist == -1)
		return dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + dictionary["roundabout"] + (tts ? ", " : " ") + dictionary["and_alt"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts)
		return "";
	if (streetName["toStreetName"] == "" && streetName["toRef"] == "")
		return dictionary["toward"] + " " + streetName["toDest"];
	if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]) 
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"]))
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]))
		return dictionary["onto"] + " " + assemble_street_name(streetName);
	return "";
}

function assemble_street_name(streetName) {
	if (streetName["toDest"] == "")
		return streetName["toRef"] + " " + streetName["toStreetName"];
	if (streetName["toRef"] == "")
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
	if (dist == -1)
		return dictionary["make_uturn"] + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "acc") + " " + dictionary["make_uturn_alt"] + " " + turn_street(streetName);
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist, "gen") + " " + dictionary["make_uturn_alt"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist, "gen") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["prepare_roundabout"] + " " + dictionary["after"] + " " + distance(dist, "gen"); 
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
	return dictionary["off_route"] + " " + distance(dist, "gen");
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
		return "70.ogg " + ogg_dist(distance - 70);
	if (distance < 90)
		return "80.ogg " + ogg_dist(distance - 80);
	if (distance < 100)
		return "90.ogg " + ogg_dist(distance - 90);
	if (distance < 200)
		return "100.ogg " + ogg_dist(distance - 100);
	if (distance < 300)
		return "200.ogg " + ogg_dist(distance - 200);
	if (distance < 400)
		return "300.ogg " + ogg_dist(distance - 300);
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
