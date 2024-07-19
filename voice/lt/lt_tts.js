// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: special plural forms 1) "_1" – 1, 21, 31, ..., 91; 2) "_2-9" - 2-9, 22-29, 32-39, ... 92-99; 3) "_0,1_" - 0, 10-20, 30, ..., 90, 100, ...
// (X) Special grammar: grammatical gender (e.g. feminine (moteriška) "2 miles" = "dvi mylios", masculine (vyriška) "2 km" = "du km")
// (X) Special grammar: now use genitive (kilmininkas) with numbers, but better use grammatical case depending on context (e.g. nominative (vardininkas) "1 km" with distance = "atstumas yra vienas km", genitive (kilmininkas) with "in" = "už vieno km", accusative (galininkas) with "after" = "įveikę vieną km"). For OGG voices to reduce number of files, you may want switch all grammatical cases into genitive (kilmininkas).
// (X) Support announcing highway exits
//
// 2024 implemented by Mindaugas B.

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	// ROUTE CALCULATED
	//dictionary["route_is"] = tts ? "Kelionės ilgis yra" : "route_is.ogg";  // "Kelionės ilgis yra" or "nukeliautimas atstumas yra" would require nominative (vardininkas) grammatical case
	dictionary["route_is"] = tts ? "Iki kelionės tikslo yra" : "route_is.ogg";  // this would require nominative (vardininkas) grammatical case
	//dictionary["route_is"] = tts ? "Kelionė yra" : "route_is.ogg";  //  compatible with genitive (kilmininkas) grammatical case;
	//dictionary["route_is"] = tts ? "Nukeliautumėte" : "route_is.ogg";  // this would require accusative (galininkas) grammatical case; Google TTS incorectly stress ...liaU... – correct is ...liAu...
	//dictionary["route_is"] = tts ? "Įveiktumėte" : "route_is.ogg";  // this would require accusative (galininkas) grammatical case
	dictionary["route_calculate"] = tts ? "Kelionės planas atnaujintas" : "route_calculate.ogg";
	//dictionary["distance"] = tts ? "Atstumas" : "distance.ogg";  // "atstumas" would require nominative (vardininkas) grammatical case
	//dictionary["distance"] = tts ? "Tikslas yra už" : "distance.ogg";  // compatible with genitive (kilmininkas) grammatical case
    dictionary["distance"] = tts ? "Įveiktumėte" : "distance.ogg";  // this would require accusative (galininkas) grammatical case

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "ruoškitės, " : "prepare.ogg";
	//dictionary["after"] = tts ? "vėliau, už " : "after.ogg";  // similar to "prepare", i.e. "after" is for longer distance than "in"; next number is in genitive (kilmininkas) grammatical case
	//dictionary["after"] = tts ? "nuvažiavę" : "after.ogg";  // suitable for driving, but not for pedestrians; this would require accusative (galininkas) grammatical case
	dictionary["after"] = tts ? "įveikę" : "after.ogg";  // suitable for both driving ans pedestrians; this would require accusative (galininkas) grammatical case
	dictionary["in"] = tts ? "už" : "in.ogg"; // next number must be in genitive (kilmininkas) grammatical case

	dictionary["left"] = tts ? "pasukite kairėn" : "left.ogg";
	dictionary["left_sh"] = tts ? "staigiai pasukite kairėn" : "left_sh.ogg";
	//dictionary["left_sl"] = tts ? "pasukite nežymiai kairėn" : "left_sl.ogg";
	dictionary["left_sl"] = tts ? "pasukite kairiau" : "left_sl.ogg";
	dictionary["right"] = tts ? "pasukite dešinėn" : "right.ogg";
	dictionary["right_sh"] = tts ? "staigiai pasukite dešinėn" : "right_sh.ogg";
	//dictionary["right_sl"] = tts ? "pasukite nežymiai dešinėn" : "right_sl.ogg";
	dictionary["right_sl"] = tts ? "pasukite dešiniau" : "right_sl.ogg";
	// Note: "left_keep"/"right_keep" is a turn type aiding lane selection, while "left_bear"/"right_bear" is as brief "then..." preparation for the turn-after-next. In some languages l/r_keep may not differ from l/r_bear.
	// Besides, both "left_keep"/"right_keep" and "left_bear"/"right_bear" maybe used to indicate side of final destination then it is close, e.g.
    // "after + 500 m + left_keep + and_arrive_destination", "in + 150 m + [turn] left [,] + then + right_bear + and_arrive_destination"
	// Also, "left_keep"/"right_keep" are turns when attached road doesn't have lanes or prev segment has more then 1 turn to the active lane
	dictionary["left_keep"] = tts ? "laikykitės kairės" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "laikykitės dešinės" : "right_keep.ogg";
	// seems "bear" is used only as second close turn ogether with word "then", may not be related to lanes
	dictionary["left_bear"] = tts ? "ruoškitės į kairę" : "left_bear.ogg";  // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "ruoškitės į dešinę" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	//dictionary["prepare_make_uturn"] = tts ? "po to reikės apsisukti" : "prepare_make_uturn.ogg";
	dictionary["make_uturn"] = tts ? "apsisukite" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "kai galėsite, apsisukite" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "pasieksite žiedinę sankryžą" : "prepare_roundabout.ogg";  // "after" + $distance + "prepare_roundabout" = "vėliau, už" + $atstumo + "pasieksite žiedinę sankryžą"
	dictionary["roundabout"] = tts ? "žiede" : "roundabout.ogg";  // "in" + $distance + "roundabout" + "take" + "nth" + "exit" ... = "už" + $atstumo + "žiedinė sankryža, joje" + "išsukite" + "n-tame" + "išvažiavime"
	dictionary["then"] = tts ? "po to" : "then.ogg";
	dictionary["and"] = tts ? "ir" : "and.ogg";  // "... and take 1st exit onto ... towards" = "ir po to išsukite pirmajame išvažiavime į ... link ..."
	dictionary["take"] = tts ? "išsukite" : "take.ogg";  // "Take 2nd exit onto ..." = "išsukite antrajame išvažiavime į ..."
	dictionary["exit"] = tts ? "išvažiavime" : "exit.ogg";

	dictionary["1st"] = tts ? "pirmajame" : "1st.ogg";  // locative (inessive; vietininkas) grammatical case
	dictionary["2nd"] = tts ? "antrajame" : "2nd.ogg";
	dictionary["3rd"] = tts ? "trečiajame" : "3rd.ogg";
	dictionary["4th"] = tts ? "ketvirtajame" : "4th.ogg";
	dictionary["5th"] = tts ? "penktajame" : "5th.ogg";
	dictionary["6th"] = tts ? "šeštajame" : "6th.ogg";
	dictionary["7th"] = tts ? "septintajame" : "7th.ogg";
	dictionary["8th"] = tts ? "aštuntajame" : "8th.ogg";
	dictionary["9th"] = tts ? "devintajame" : "9th.ogg";
	dictionary["10th"] = tts ? "dešimtajame" : "10th.ogg";
	dictionary["11th"] = tts ? "vienuoliktajame" : "11th.ogg";
	dictionary["12th"] = tts ? "dvyliktajame" : "12th.ogg";
	dictionary["13th"] = tts ? "tryliktajame" : "13th.ogg";
	dictionary["14th"] = tts ? "keturioliktajame" : "14th.ogg";
	dictionary["15th"] = tts ? "penkioliktajame" : "15th.ogg";
	dictionary["16th"] = tts ? "šešioliktajame" : "16th.ogg";
	dictionary["17th"] = tts ? "septynioliktajame" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "Judėkite tiesiai" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "Toliau judėkite" : "follow.ogg";  // Continue for $distance to ... ; requires accusative (galininkas) grammatical case

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "ir atvyksite į galutinę vietą" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "jau atvykote į galutinę vietą" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "ir pasieksite tarpinį sustojimą" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "jūs pasiekėte tarpinį sustojimą" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "ir pasieksite gė pė iks kelio tašką" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "judate pro gė pė iks kelio tašką" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "ir atvyksite į savo įsimintą vietą" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "judate pro savo įsimintą vietą" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "ir atvyksite į lankytiną vietą" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "jūs esate lankytinoje vietoje" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "Jūs viršijote leistiną greitį, kuris yra" : "exceed_limit.ogg";  // this would require nominative (vardininkas) grammatical case
	//dictionary["exceed_limit"] = tts ? "leistinas greitis yra" : "exceed_limit.ogg";  // this would require nominative (vardininkas) grammatical case
	dictionary["exceed_limit"] = tts ? "greitis ribojamas iki" : "exceed_limit.ogg"; // next number must be in genitive (kilmininkas) grammatical case
	dictionary["attention"] = tts ? "Dėmesio" : "attention.ogg";
	dictionary["attention_alt"] = tts ? "Atsargiai" : "attention_alt.ogg";
	dictionary["speed_camera"] = tts ? "greičio matuoklis" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "pasienio kontrolė" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "geležinkelio pervaža" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "gulintis policininkas" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "rinkliavos punktas" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "Stop ženklas" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "pėsčiųjų perėja" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "tunelis" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "nėra gė pė es signalo" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "gė pė es ryšys atstatytas" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "nuklydote nuo kelio, jis yra už" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "sugrįžote į kelią" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "į" : "onto.ogg"; // turn into different street/road, change street/road name
	dictionary["on"] = tts ? "per" : "on.ogg";  // is used if you turn together with your current street, i.e. street name does not change. E.g. "continue for $distance on $road"
	dictionary["to"] = tts ? "iki" : "to.ogg";  // change street, go till crossroad with some road/street or destination, e.g. "continue for $distance to [crossroad with] $road"
	dictionary["toward"] = tts ? "link" : "toward.ogg";  // take exit [number] onto [street] toward [city]

	// DISTANCE UNIT SUPPORT
	dictionary["meters_1_nom"] = tts ? "metras" : "meters_1_nom.ogg";  // nominative (vardininkas) with "distance": atstumas yra [1, 21, ..., 91]-as metras
	dictionary["meters_1_gen"] = tts ? "metro" : "meters_1_gen.ogg";   // genitive (kilmininkas) with "in": už [1, 21, ..., 91]-o metro
	dictionary["meters_1_acc"] = tts ? "metrą" : "meters_1_acc.ogg";   // accusative (galininkas) with "after [driving]": įveikę [1, 21, ..., 91]-ą metrą
	dictionary["meters_2_nom"] = tts ? "metrai" : "meters_nom.ogg";  // nominative (vardininkas) with "distance": atstumas yra [2-9, 22-29, ..., 92-99] metrai
	dictionary["meters_2_gen"] = tts ? "metrų" : "meters_2_gen.ogg";   // genitive (kilmininkas) with "in": už [2-9, 22-29, ..., 92-99]-ų metrų
	dictionary["meters_2_acc"] = tts ? "metrus" : "meters_2_acc.ogg";   // accusative (galininkas) with "after [driving]": įveikę [2-9, 22-29, ..., 92-99] metrus)
	dictionary["meters_0_nom"] = dictionary["meters_2_gen"];  // nominative (vardininkas) with "distance": atstumas yra [10, 11, ..., 19, 20, 30, ..., 90] metrų
	dictionary["meters_0_gen"] = dictionary["meters_2_gen"];   // genitive (kilmininkas) with "in": už [10, 11, ..., 19, 20, 30, ..., 90] metrų
	dictionary["meters_0_acc"] = dictionary["meters_2_gen"];   // accusative (galininkas) with "after": įveikę [10, 11, ..., 19, 20, 30, ..., 90] metrų
	dictionary["around_1_kilometer_nom"] = tts ? "maždaug vienas kilometras" : "around_1_kilometer_nom.ogg";
	dictionary["around_1_kilometer_gen"] = tts ? "maždaug vieno kilometro" : "around_1_kilometer_gen.ogg";
	dictionary["around_1_kilometer_acc"] = tts ? "maždaug vieną kilometrą" : "around_1_kilometer_acc.ogg";
	dictionary["around"] = tts ? "maždaug" : "around.ogg";
	dictionary["kilometers_1_nom"] = tts ? "kilometras" : "kilometers_1_nom.ogg";  // nominative (vardininkas) with "distance": atstumas yra [1, 21, ..., 91]-as kilometras
	dictionary["kilometers_1_gen"] = tts ? "kilometro" : "kilometers_1_gen.ogg";   // genitive (kilmininkas) with "in": už [1, 21, ..., 91]-o kilometro
	dictionary["kilometers_1_acc"] = tts ? "kilometrą" : "kilometers_1_acc.ogg";   // accusative (galininkas) with "after [driving]": įveikę [1, 21, ..., 91]-ą kilometrą
	dictionary["kilometers_2_nom"] = tts ? "kilometrai" : "kilometers_nom.ogg";  // nominative (vardininkas) with "distance": atstumas yra [2-9, 22-29, ..., 92-99] kilometrai
	dictionary["kilometers_2_gen"] = tts ? "kilometrų" : "kilometers_2_gen.ogg";   // genitive (kilmininkas) with "in": už [2-9, 22-29, ..., 92-99]-ų kilometrų
	dictionary["kilometers_2_acc"] = tts ? "kilometrus" : "kilometers_2_acc.ogg";   // accusative (galininkas) with "after [driving]": įveikę [2-9, 22-29, ..., 92-99] kilometrus)
	dictionary["kilometers_0_nom"] = dictionary["kilometers_2_gen"];  // nominative (vardininkas) with "distance": atstumas yra [10, 11, ..., 19, 20, 30, ..., 90] kilometrų
	dictionary["kilometers_0_gen"] = dictionary["kilometers_2_gen"];   // genitive (kilmininkas) with "in": už [10, 11, ..., 19, 20, 30, ..., 90] kilometrų
	dictionary["kilometers_0_acc"] = dictionary["kilometers_2_gen"];   // accusative (galininkas) with "after": įveikę [10, 11, ..., 19, 20, 30, ..., 90] kilometrų

	dictionary["feet"] = tts ? "pėdų" : "feet.ogg";  // always rounded to 50
	dictionary["1_tenth_of_a_mile_nom"] = tts ? "dešimtadalis mylios" : "1_tenth_of_a_mile_nom.ogg";
	dictionary["1_tenth_of_a_mile_gen"] = tts ? "dešimtadalio mylios" : "1_tenth_of_a_mile_gen.ogg";
	dictionary["1_tenth_of_a_mile_acc"] = tts ? "dešimtadalį mylios" : "1_tenth_of_a_mile_acc.ogg";
	dictionary["tenths_of_a_mile_nom"] = tts ? "dešimtadaliai mylios" : "tenths_of_a_mile_nom.ogg";
	dictionary["tenths_of_a_mile_gen"] = tts ? "dešimtadalių mylios" : "tenths_of_a_mile_gen.ogg";
	dictionary["tenths_of_a_mile_acc"] = tts ? "dešimtadalius mylios" : "tenths_of_a_mile_acc.ogg";
	dictionary["around_1_mile_nom"] = tts ? "maždaug viena mylia" : "around_1_mile_nom.ogg";
	dictionary["around_1_mile_gen"] = tts ? "maždaug vienos mylios" : "around_1_mile_gen.ogg";
	dictionary["around_1_mile_acc"] = tts ? "maždaug vieną mylią" : "around_1_mile_acc.ogg";
	dictionary["miles_1_nom"] = tts ? "mylia" : "miles_1_nom.ogg";
	dictionary["miles_1_gen"] = tts ? "mylios" : "miles_1_gen.ogg";
	dictionary["miles_1_acc"] = tts ? "mylią" : "miles_1_acc.ogg";
	dictionary["miles_2_nom"] = tts ? "mylios" : "miles_2_nom.ogg";  // writing is same as dictionary["miles_1_nom"], but pronoucation (stress) is different
	dictionary["miles_2_gen"] = tts ? "mylių" : "miles_2_gen.ogg";
	dictionary["miles_2_acc"] = tts ? "mylias" : "miles_2_acc.ogg";
	dictionary["miles_0_nom"] = tts ? "mylių" : "miles_0_nom.ogg";  // writing is same as dictionary["miles_2_gen"], but pronoucation (stress) is different
	dictionary["miles_0_gen"] = dictionary["miles_2_gen"];
	dictionary["miles_0_acc"] = dictionary["miles_0_nom"];

	dictionary["yards_1_nom"] = tts ? "jardas" : "yards_1_nom.ogg";  // 1, 21
	dictionary["yards_1_gen"] = tts ? "jardo" : "yards_1_gen.ogg";
	dictionary["yards_1_acc"] = tts ? "jardą" : "yards_1_acc.ogg";
	dictionary["yards_2_nom"] = tts ? "jardai " : "yards_2_nom.ogg";
	dictionary["yards_2_gen"] = tts ? "jardų " : "yards_2_gen.ogg";
	dictionary["yards_2_acc"] = tts ? "jardus " : "yards_2_acc.ogg";
	dictionary["yards_0_nom"] = dictionary["yards_2_gen"];
	dictionary["yards_0_gen"] = dictionary["yards_2_gen"];
	dictionary["yards_0_acc"] = dictionary["yards_2_gen"];

	// TIME SUPPORT
	//dictionary["time"] = tts ? "trukmė" : "time.ogg";  // would require nominative (vardininkas) grammatical case
	//dictionary["time"] = tts ? "tikslą pasiektumėte po" : "time.ogg";  // to use with genitive (kilmininkas) grammatical case
	//dictionary["time"] = tts ? "kelionė truks" : "time.ogg";  // would require accusative (galininkas) grammatical case
	dictionary["time"] = tts ? "užtruktumėte" : "time.ogg";  // would require accusative (galininkas) grammatical case
	dictionary["time_alt"] = tts ? "atvyktumėte po" : "time_alt.ogg";  // to use with genitive (kilmininkas) grammatical case
	dictionary["1_hour_nom"] = tts ? "viena valanda" : "1_hour_nom.ogg";  // viena valanda - only 1h...
	dictionary["1_hour_gen"] = tts ? "vienos valandos" : "1_hour_gen.ogg";  // [po] vienos valandos
	dictionary["1_hour_acc"] = tts ? "vieną valandą" : "1_hour_acc.ogg";  // [per] vieną valandą
	dictionary["hours_1_nom"] = tts ? "valanda" : "hours_1_nom.ogg";  // n-dešimt viena valanda - 21h, 31h, ... 91h
	dictionary["hours_1_gen"] = tts ? "valandos" : "hours_1_gen.ogg";  // [po] 21-os valandos; writing is same as "hours_2_nom", but stress differ: valandOs
	dictionary["hours_1_acc"] = tts ? "valandą" : "hours_1_acc.ogg";  // [per] 21-ą valandą
	dictionary["hours_2_nom"] = tts ? "valandos" : "hours_2_nom.ogg";  // suitable for 2-9, 22-29, 32-39, ...h; writing is same as "hours_1_gen", but stress differ: vAlandos
	dictionary["hours_2_gen"] = tts ? "valandų" : "hours_2_gen.ogg";  // suitable for 2-20, 22-30, 32-40 h
	dictionary["hours_2_acc"] = tts ? "valandas" : "hours_2_acc.ogg";  // suitable for 2-9, 22-29, 32-39, ...h;
	dictionary["hours_0_nom"] = dictionary["hours_2_gen"];
	dictionary["hours_0_gen"] = dictionary["hours_2_gen"];  // suitable for 2-20, 22-30, 32-40 h
	dictionary["hours_0_acc"] = dictionary["hours_2_gen"];
	dictionary["less_a_minute_nom"] = tts ? "mažiau nei viena minutė" : "less_a_minute_nom.ogg";
	dictionary["less_a_minute_gen"] = tts ? "mažiau nei vienos minutės" : "less_a_minute_gen.ogg";
	dictionary["less_a_minute_acc"] = tts ? "mažiau nei vieną minutę" : "less_a_minute_acc.ogg";
	dictionary["1_minute_nom"] = tts ? "viena minutė" : "1_minute_nom.ogg";
	dictionary["1_minute_gen"] = tts ? "vienos minutės" : "1_minute_gen.ogg";
	dictionary["1_minute_acc"] = tts ? "vieną minutę" : "1_minute_acc.ogg";
	dictionary["minutes_1_nom"] = tts ? "minutė" : "minutes_1_nom.ogg";  // suitable for 1, 21, 31 min...
	dictionary["minutes_1_gen"] = tts ? "minutės" : "minutes_1_gen.ogg";
	dictionary["minutes_1_acc"] = tts ? "minutę" : "minutes_1_acc.ogg";
	dictionary["minutes_2_nom"] = tts ? "minutės" : "minutes_2_nom.ogg";
	dictionary["minutes_2_gen"] = tts ? "minučių" : "minutes_2_gen.ogg";  // here suitable for 2-20, 22-30, 32-40 h; not only 2-9, 21-29, 32-39
	dictionary["minutes_2_acc"] = tts ? "minutes" : "minutes_2_acc.ogg";
	dictionary["minutes_0_nom"] = dictionary["minutes_2_gen"];  // minučių
	dictionary["minutes_0_gen"] = dictionary["minutes_2_gen"];  // minučių
	dictionary["minutes_0_acc"] = dictionary["minutes_2_gen"];  // minučių

	// NUMBERS
	// 1 and 2 vary between grammatical cases and gender
	dictionary["1_m_nom"] = tts ? "vienas" : "1_m_nom.ogg";  // masculine (vyriška), nominative (vardininkas)
	dictionary["1_m_gen"] = tts ? "vieno" : "1_m_gen.ogg";  // masculine (vyriška), genitive (kilmininkas)
	dictionary["1_m_acc"] = tts ? "vieną" : "1_acc.ogg";  // both genders, accusative (galininkas)
	dictionary["1_f_nom"] = tts ? "viena" : "1_f_nom.ogg";  // feminine (moteriška), nominative (vardininkas)
	dictionary["1_f_gen"] = tts ? "vienos" : "1_f_gen.ogg";  // feminine (moteriška), genitive (kilmininkas)
	dictionary["1_f_acc"] = dictionary["1_m_acc"];
	dictionary["2_m_nom"] = tts ? "du" : "2_m_nom.ogg";  // masculine (vyriška)
	dictionary["2_m_gen"] = tts ? "dviejų" : "2_gen.ogg";  // both genders, genitive (kilmininkas)
	dictionary["2_m_acc"] = dictionary["2_m_nom"];
	dictionary["2_f_nom"] = tts ? "dvi" : "2_f_nom.ogg";  // feminine (moteriška)
	dictionary["2_f_gen"] = dictionary["2_m_gen"];
	dictionary["2_f_acc"] = dictionary["2_f_nom"];
	dictionary["3_m_nom"] = tts ? "trys" : "3_nom.ogg";  // both genders the same for 3
	dictionary["3_m_gen"] = tts ? "trijų" : "3_gen.ogg";
	dictionary["3_m_acc"] = tts ? "tris" : "3_acc.ogg";
	dictionary["3_f_nom"] = dictionary["3_m_nom"];
	dictionary["3_f_gen"] = dictionary["3_m_gen"];
	dictionary["3_f_acc"] = dictionary["3_m_acc"];
	dictionary["4_m_nom"] = tts ? "keturi" : "4_m_nom.ogg"; // masculine (vyriška)
	dictionary["4_m_gen"] = tts ? "keturių" : "4_gen.ogg";
	dictionary["4_m_acc"] = tts ? "keturis" : "4_m_acc.ogg";
	dictionary["4_f_nom"] = tts ? "keturios" : "4_f_nom.ogg";  // feminine (moteriška)
	dictionary["4_f_gen"] = dictionary["4_m_gen"];
	dictionary["4_f_acc"] = tts ? "keturias" : "4_f_acc.ogg";
	dictionary["5_m_nom"] = tts ? "penki" : "5_m_nom.ogg";
	dictionary["5_m_gen"] = tts ? "penkių" : "5_gen.ogg";
	dictionary["5_m_acc"] = tts ? "penkis" : "5_m_acc.ogg";
	dictionary["5_f_nom"] = tts ? "penkios" : "5_f_nom.ogg";
	dictionary["5_f_gen"] = dictionary["5_m_gen"];
	dictionary["5_f_acc"] = tts ? "penkias" : "5_f_acc.ogg";
	dictionary["6_m_nom"] = tts ? "šeši" : "6_m_nom.ogg";
	dictionary["6_m_gen"] = tts ? "šešių" : "6_gen.ogg";
	dictionary["6_m_acc"] = tts ? "šešis" : "6_m_acc.ogg";
	dictionary["6_f_nom"] = tts ? "šešios" : "6_f_nom.ogg";
	dictionary["6_f_gen"] = dictionary["6_m_gen"];
	dictionary["6_f_acc"] = tts ? "šešias" : "6_f_acc.ogg";
	dictionary["7_m_nom"] = tts ? "septyni" : "7_m_nom.ogg";
	dictionary["7_m_gen"] = tts ? "septynių" : "7_gen.ogg";
	dictionary["7_m_acc"] = tts ? "septynis" : "7_m_acc.ogg";
	dictionary["7_f_nom"] = tts ? "septynios" : "7_f_nom.ogg";
	dictionary["7_f_gen"] = dictionary["7_m_gen"];
	dictionary["7_f_acc"] = tts ? "septynias" : "7_f_acc.ogg";
	dictionary["8_m_nom"] = tts ? "aštuoni" : "8_m_nom.ogg";
	dictionary["8_m_gen"] = tts ? "aštuonių" : "8_gen.ogg";
	dictionary["8_m_acc"] = tts ? "aštuonis" : "8_m_acc.ogg";
	dictionary["8_f_nom"] = tts ? "aštuonios" : "8_f_nom.ogg";
	dictionary["8_f_gen"] = dictionary["8_m_gen"];
	dictionary["8_f_acc"] = tts ? "aštuonias" : "8_f_acc.ogg";
	dictionary["9_m_nom"] = tts ? "devyni" : "9_m_nom.ogg";
	dictionary["9_m_gen"] = tts ? "devynių" : "9_gen.ogg";
	dictionary["9_m_acc"] = tts ? "devynis" : "9_m_acc.ogg";
	dictionary["9_f_nom"] = tts ? "devynios" : "9_f_nom.ogg";
	dictionary["9_f_gen"] = dictionary["9_m_gen"];
	dictionary["9_f_acc"] = tts ? "devynias" : "9_f_acc.ogg";
    // 1_, _0, _00, _000 does not differ between genders
	dictionary["10_nom"] = tts ? "dešimt" : "10_nom.ogg";
	dictionary["10_gen"] = tts ? "dešimties" : "10_gen.ogg";
	dictionary["10_acc"] = tts ? "dešimtį" : "10_acc.ogg";
	dictionary["11_nom"] = tts ? "vienuolika" : "11_nom.ogg";
	dictionary["11_gen"] = tts ? "vienuolikos" : "11_gen.ogg";
	dictionary["11_acc"] = tts ? "vienuoliką" : "11_acc.ogg";
	dictionary["12_nom"] = tts ? "dvylika" : "12_nom.ogg";
	dictionary["12_gen"] = tts ? "dvylikos" : "12_gen.ogg";
	dictionary["12_acc"] = tts ? "dvyliką" : "12_acc.ogg";
	dictionary["13_nom"] = tts ? "trylika" : "13_nom.ogg";
	dictionary["13_gen"] = tts ? "trylikos" : "13_gen.ogg";
	dictionary["13_acc"] = tts ? "tryliką" : "13_acc.ogg";
	dictionary["14_nom"] = tts ? "keturiolika" : "14_nom.ogg";
	dictionary["14_gen"] = tts ? "keturiolikos" : "14_gen.ogg";
	dictionary["14_acc"] = tts ? "keturioliką" : "14_acc.ogg";
	dictionary["15_nom"] = tts ? "penkiolika" : "15_nom.ogg";
	dictionary["15_gen"] = tts ? "penkiolikos" : "15_gen.ogg";
	dictionary["15_acc"] = tts ? "penkioliką" : "15_acc.ogg";
	dictionary["16_nom"] = tts ? "šešiolika" : "16_nom.ogg";
	dictionary["16_gen"] = tts ? "šešiolikos" : "16_gen.ogg";
	dictionary["16_acc"] = tts ? "šešioliką" : "16_acc.ogg";
	dictionary["17_nom"] = tts ? "septyniolika" : "17_nom.ogg";
	dictionary["17_gen"] = tts ? "septyniolikos" : "17_gen.ogg";
	dictionary["17_acc"] = tts ? "septynioliką" : "17_acc.ogg";
	dictionary["18_nom"] = tts ? "aštuoniolika" : "18_nom.ogg";
	dictionary["18_gen"] = tts ? "aštuoniolikos" : "18_gen.ogg";
	dictionary["18_acc"] = tts ? "aštuonioliką" : "18_acc.ogg";
	dictionary["19_nom"] = tts ? "devyniolika" : "19_nom.ogg";
	dictionary["19_gen"] = tts ? "devyniolikos" : "19_gen.ogg";
	dictionary["19_acc"] = tts ? "devynioliką" : "19_acc.ogg";
	dictionary["20"] = tts ? "dvidešimt" : "20.ogg";
	dictionary["30"] = tts ? "trisdešimt" : "30.ogg";
	dictionary["40"] = tts ? "keturiasdešimt" : "40.ogg";
	dictionary["50"] = tts ? "penkiasdešimt" : "50.ogg";
	dictionary["60"] = tts ? "šešiasdešimt" : "60.ogg";
	dictionary["70"] = tts ? "septyniasdešimt" : "70.ogg";
	dictionary["80"] = tts ? "aštuoniasdešimt" : "80.ogg";
	dictionary["90"] = tts ? "devyniasdešimt" : "90.ogg";
	dictionary["100_1_nom"] = tts ? "šimtas" : "100_1_nom.ogg";
	dictionary["100_1_gen"] = tts ? "šimto" : "100_1_gen.ogg";
	dictionary["100_1_acc"] = tts ? "šimtą" : "100_1_acc.ogg";
	dictionary["100_2_nom"] = tts ? "šimtai" : "100_2_nom.ogg";
	dictionary["100_2_gen"] = tts ? "šimtų" : "100_2_gen.ogg";
	dictionary["100_2_acc"] = tts ? "šimtus" : "100_2_acc.ogg";
	dictionary["1000_1_nom"] = tts ? "tūkstantis" : "1000_1_nom.ogg";
	dictionary["1000_1_gen"] = tts ? "tūkstančio" : "1000_1_gen.ogg";
	dictionary["1000_1_acc"] = tts ? "tūkstantį" : "1000_1_acc.ogg";
	dictionary["1000_2_nom"] = tts ? "tūkstančiai" : "1000_2_nom.ogg";
	dictionary["1000_2_gen"] = tts ? "tūkstančių" : "1000_2_gen.ogg";
	dictionary["1000_2_acc"] = tts ? "tūkstančius" : "1000_2_acc.ogg";

	// ADITIONAL NON-STANDARD STRINGS for ROAD/STREET NAMES
	dictionary["street_gen"] = tts ? "gatvės" : "street_gen.ogg";
	dictionary["street_acc"] = tts ? "gatvę" : "street_acc.ogg";
	dictionary["square_gen"] = tts ? "aikštės" : "square_gen.ogg";
	dictionary["square_acc"] = tts ? "aikštę" : "square_acc.ogg";
	dictionary["alley_gen"] = tts ? "alėjos" : "alley_gen.ogg";
	dictionary["alley_acc"] = tts ? "alėją" : "alley_acc.ogg";
	dictionary["avenue_gen"] = tts ? "prospekto" : "avenue_gen.ogg";
	dictionary["avenue_acc"] = tts ? "prospektą" : "avenue_acc.ogg";
	dictionary["highroad_gen"] = tts ? "plento" : "highroad_gen.ogg";
	dictionary["highroad_acc"] = tts ? "plentą" : "highroad_acc.ogg";
	dictionary["by-street_gen"] = tts ? "skersgatvio" : "by-street_gen.ogg";
	dictionary["by-street_acc"] = tts ? "skersgatvį" : "by-street_acc.ogg";
	// dictionary["bypass_nom"] = tts ? "aplinkkelis" : "bypass_nom.ogg";
	dictionary["bypass_gen"] = tts ? "aplinkkelio" : "bypass_gen.ogg";
	dictionary["bypass_acc"] = tts ? "aplinkkelį" : "bypass_acc.ogg";
	dictionary["road_gen"] = tts ? "kelio" : "road_gen.ogg";
	dictionary["road_acc"] = tts ? "kelią" : "road_acc.ogg";
	dictionary["road_number_gen"] = tts ? "kelio numeriu" : "road_number_gen.ogg";
	dictionary["road_number_acc"] = tts ? "kelią numeriu" : "road_number_acc.ogg";

}


//// COMMAND BUILDING / WORD ORDER
////////////////////////////////////////////////////////////////
function num_str(number, gender /*of the object being counted*/, grm_case) {
	// should work with numbers up to 110 000 - is is unlikely to need higher
	var ten_thousands = Math.floor(number / 10000) * 10000;
	var thousands = Math.floor((number - ten_thousands) / 1000) * 1000;
	var hundreds  = Math.floor((number - ten_thousands - thousands) / 100) * 100;
	var tens      = Math.floor((number - ten_thousands - thousands - hundreds) / 10) * 10;
	var ones      = Math.floor( number - ten_thousands - thousands - hundreds - tens);

	if (ten_thousands == 10000) {  // 1n___ - n-iolika tūkstančių
		var result = dictionary["1"+(thousands/1000).toString()+"_"+grm_case] + " " + dictionary["1000_2_gen"] + " ";
	} else if (ten_thousands < 100000 && ten_thousands > 19999 && thousands == 0) {  // n0___ - n-dešimt tūkstančių
		var result = dictionary[(ten_thousands/1000).toString()] + " " + dictionary["1000_2_gen"] + " ";
	} else if (ten_thousands < 100000 && ten_thousands > 19999 && thousands > 0) {  // nm___ - n-dešimt m tūkstančių
		var result = dictionary[(ten_thousands/1000).toString()] + " ";
	} else if (ten_thousands > 99999 && thousands > 0) {
		var result = (ten_thousands/1000).toString() + " ";
	} else if (ten_thousands > 99999 && thousands == 0) {
		var result = ten_thousands.toString() + " ";
	} else {
		var result = "";
    }

	if (ten_thousands != 10000 && thousands > 1999) {
		result = result + dictionary[(thousands/1000).toString()+"_m_"+grm_case] + " " + dictionary["1000_2_"+grm_case] + " ";
	} else if (ten_thousands != 10000 && thousands == 1000) {
		result = result + dictionary["1000_1_"+grm_case] + " ";
	}

	if (hundreds > 199) {
		result = result + dictionary[(hundreds/100).toString()+"_m_"+grm_case] + " " + dictionary["100_2_"+grm_case] + " ";
	} else if (hundreds == 100) {
		result = result + dictionary["100_1_"+grm_case] + " ";
	}

	if (tens > 19) {
		result = result + dictionary[tens.toString()] + " ";
	} else if (tens == 10 && ones > 0) {
		result = result + dictionary[(tens+ones).toString()+"_"+grm_case] + " ";
	} else if (tens == 10) {
		result = result + dictionary["10_"+grm_case] + " ";
	}

	if (ones && tens != 10) {
		result = result + dictionary[ones.toString()+"_"+gender+"_"+grm_case];
	}

	if (result.slice(-1) == " ") {
        result = result.slice(0, -1);
    }

	return result;
}

function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist, "nom") + (tts ? ", " : " ") + dictionary["time"] + " " + time(timeVal, "acc") + (tts ? ". " : " ");
}

function distance(dist, grm_case) {
	var kms = Math.round(dist/1000.0);
	var miles = Math.round(dist/1609.3);
	switch (metricConst) {
		case "km-m":
			if (dist < 2)
				return num_str(1, "m", grm_case) + " " + dictionary["meters_1_"+grm_case];
			if (dist < 9.5 )  // 2-9
				return num_str(Math.round(dist), "m", grm_case) + " " + dictionary["meters_2_"+grm_case];
			if (dist < 21 )  // 10-20
				return num_str(Math.round(dist), "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 100)
				return num_str(Math.round(dist/10.0)*10, "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 950)
				return num_str(Math.round(2*dist/100.0)*50, "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 1500)
				return dictionary["around_1_kilometer_"+grm_case];
			if (dist < 9500)
				return dictionary["around"] + " " + num_str(kms, "m", grm_case) + " " + dictionary["kilometers_2_"+grm_case];
			if (kms > 20 && kms % 10 == 1)
				return num_str(kms, "m", grm_case) + " " + dictionary["kilometers_1_"+grm_case];
			if (kms > 20 && kms % 10 > 1)
				return num_str(kms, "m", grm_case) + " " + dictionary["kilometers_2_"+grm_case];
			return num_str(kms, "m", grm_case) + " " + dictionary["kilometers_0_"+grm_case];
		case "mi-f":
			if (dist < 160)  // feets rounded to 5O
				return num_str(Math.round(2*dist/100.0/0.3048)*50, "f", grm_case) + " " + dictionary["feet"];
			if (dist < 241)
				return dictionary["1_tenth_of_a_mile_"+grm_case];
			if (dist < 1529)  // 0.2-0.9 of a mile
				return num_str(Math.round(dist/161.0), "m", grm_case) + " " + dictionary["tenths_of_a_mile_"+grm_case];
			if (dist < 2414)  // 1 mile
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)  // < 2.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (dist < 15288)  // < 9.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (miles > 20 && miles % 10 == 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_1_"+grm_case];
			if (miles > 20 && miles % 10 > 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			return num_str(miles, "f", grm_case) + " " + dictionary["miles_0_"+grm_case];
		case "mi-m":
			if (dist < 2)
				return num_str(1, "m", grm_case) + " " + dictionary["meters_1_"+grm_case];
			if (dist < 9.5 )  // 2-9
				return num_str(Math.round(dist), "m", grm_case) + " " + dictionary["meters_2_"+grm_case];
			if (dist < 21 )  // 10-20
				return num_str(Math.round(dist), "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 100)
				return num_str(Math.round(dist/10.0)*10, "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 1300)
				return num_str(Math.round(2*dist/100.0)*50, "m", grm_case) + " " + dictionary["meters_0_"+grm_case];
			if (dist < 2414)  // 1 mile
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)  // < 2.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (dist < 15288)  // < 9.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (miles > 20 && miles % 10 == 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_1_"+grm_case];
			if (miles > 20 && miles % 10 > 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			return num_str(miles, "f", grm_case) + " " + dictionary["miles_0_"+grm_case];
		case "mi-y":
			if (dist < 2 )  // 1 yard
				return num_str(1, "m", grm_case) + " " + dictionary["yards_1_"+grm_case];
			if (dist < 8.7)  // < 9.5 yards
				return num_str(Math.round(dist/0.9144), "m", grm_case) + " " + dictionary["yards_2_"+grm_case];
			if (dist < 17)  // < 19 yards
				return num_str(Math.round(dist/0.9144), "m", grm_case) + " " + dictionary["yards_0_"+grm_case];
			if (dist < 100)
				return num_str(Math.round(dist/10.0/0.9144)*10, "m", grm_case) + " " + dictionary["yards_0_"+grm_case];
			if (dist < 1300)
				return num_str(Math.round(2*dist/100.0/0.9144)*50, "m", grm_case) + " " + dictionary["yards_0_"+grm_case];
			if (dist < 2414)  // 1 mile
				return dictionary["around_1_mile_"+grm_case];
			if (dist < 4024)  // < 2.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (dist < 15288)  // < 9.5 miles
				return dictionary["around"] + " " + num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			if (miles > 20 && miles % 10 == 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_1_"+grm_case];
			if (miles > 20 && miles % 10 > 1)
				return num_str(miles, "f", grm_case) + " " + dictionary["miles_2_"+grm_case];
			return num_str(miles, "f", grm_case) + " " + dictionary["miles_0_"+grm_case];
	}
}

function time(seconds, grm_case) {
	var minutes = Math.round(seconds/60.0);
	var hrs = Math.floor(seconds / 3600);
	if (seconds < 30)
		return dictionary["less_a_minute_"+grm_case];
	if (minutes % 60 == 0)
		return hours(minutes, grm_case);
	if (minutes % 60 == 1)
		return (hrs ? hours(minutes, grm_case) + " " : "") + dictionary["1_minute_"+grm_case];
	if (minutes % 60 > 1 && minutes % 60 < 10)
		return (hrs ? hours(minutes, grm_case) + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minutes_2_"+grm_case];
	if (minutes % 60 > 20 && minutes % 10 == 1)
		return (hrs ? hours(minutes, grm_case) + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minutes_1_"+grm_case];
	if (minutes % 60 > 20 && minutes % 10 > 1)
		return (hrs ? hours(minutes, grm_case) + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minutes_2_"+grm_case];
	return (hrs ? hours(minutes, grm_case) + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minutes_0_"+grm_case];
}

function hours(minutes, grm_case) {
	var hours = Math.floor(minutes / 60);
	if (hours < 1)  // 0h
		return "";
	if (hours < 2) // 1h
		return dictionary["1_hour_"+grm_case];
	if (hours < 10)  // 2-9h
		return num_str(hours, "f", grm_case) + " " + dictionary["hours_2_"+grm_case];
	if (hours % 60 > 20 && hours % 10 == 1)  // 21, 31, ..., 91h
		return num_str(hours, "f", grm_case) + " " + dictionary["hours_1_"+grm_case];
	if (hours % 60 > 20 && hours % 10 > 1)  // 22-29, 32-29, ..., 92-99h
		return num_str(hours, "f", grm_case) + " " + dictionary["hours_2_"+grm_case];
	return num_str(hours, "f", grm_case) + " " + dictionary["hours_0_"+grm_case];
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? ". " : " ") + dictionary["distance"] + " " + distance(dist, "acc") + (tts ? ", " : " ") + dictionary["time_alt"] + " " + time(seconds, "gen") + (tts ? ". " : " ");
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
		return dictionary["to"] + " " + modify_street_name(streetName["toDest"], "gen");
	if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]
		|| (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == ""))
		return dictionary["on"] + " " + assemble_street_name(streetName, "acc");
	if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]))
		return dictionary["to"] + " " + assemble_street_name(streetName, "gen");
	return "";
}

function turn(turnType, dist, streetName) {
	if (dist == -1)
		return getTurnType(turnType) + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "gen") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + (tts ? ", " : " ") + dictionary["take"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	} else {
		return dictionary["in"] + " " + distance(dist, "gen") + (tts ? ", " : " ")
			+ getTurnType(turnType) + " " + dictionary["and"] + " " + dictionary["take"] + " " + getExitNumber(exitString, exitInt) + " " + take_exit_name(streetName);
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"] + " " + dictionary["toward"] + " " + modify_street_name(streetName["toDest"], "gen");
	} else if (streetName["toStreetName"] != "") {
		return (tts ? ", " : " ") + streetName["toStreetName"];
	} else {
		return "";
	}
}

function getExitNumber(exitString, exitInt) {
	if (exitInt > 0 && exitInt < 18) {
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
	return dictionary["in"] + " " + distance(dist, "gen") + " " + dictionary["roundabout"] + " " + dictionary["take"] + " " + nth(exit) + " " + dictionary["exit"] + " " + turn_street(streetName);
}

function turn_street(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] == "" && streetName["toStreetName"] == "" && streetName["toRef"] == "") || !tts)
		return "";
	if (streetName["toStreetName"] == "" && streetName["toRef"] == "")
		return dictionary["toward"] + " " + modify_street_name(streetName["toDest"], "gen");
	if (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])
		return dictionary["on"] + " " + assemble_street_name(streetName, "acc");
	if ((streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"])
		|| (streetName["toStreetName"] == "" && streetName["toRef"] == streetName["fromRef"]))
		return dictionary["on"] + " " + assemble_street_name(streetName, "acc");
	if (!(streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == streetName["fromStreetName"]))
		return dictionary["onto"] + " " + assemble_street_name(streetName, "acc");
	return "";
}

function assemble_street_name(streetName, grm_case) {
	if (streetName["toDest"] == "")
		return modify_street_name(streetName["toRef"], grm_case)  + " " + modify_street_name(streetName["toStreetName"], grm_case);
	if (streetName["toRef"] == "")
		return modify_street_name(streetName["toStreetName"], grm_case) + " " + dictionary["toward"] + " " + modify_street_name(streetName["toDest"], "gen");
	if (streetName["toRef"] != "")
		return modify_street_name(streetName["toRef"], grm_case) + " " + dictionary["toward"] + " " + modify_street_name(streetName["toDest"], "gen");
	return "";
}

function modify_street_name(street_name, grm_case) {
	// If street name starts with single letter(s) - drop it because they sounds weird in TTS.
	// Usually this is initials of person name, e.g. "M. K. Čiurlionio g."
	while (street_name.length > 3 && /[A-Z]/.test(street_name.charAt(0)) && street_name.substring(1, 3) == ". " && street_name.endsWith(' g.'))
		street_name = street_name.substring(3);
    // remove initials in middle of street name, e.g. remove middle "S" from "S. Dariaus ir S. Girėno g."
	var initial_in_middle = street_name.search(' ir [/A-Z/]. ');
	if (initial_in_middle > 3 && street_name.endsWith(' g.'))
		street_name = street_name.substring(0, initial_in_middle + 3) + street_name.substring(initial_in_middle + 6);
	// " g." ending means "street" in Lithuanian - replace it with "gatvė"
	if (street_name.endsWith(' g.'))
		street_name = street_name.replace(new RegExp("g." + '$'), dictionary["street_"+grm_case]);
	// " a." ending means "square" in Lithuanian - replace it with "aikštė"
	if (street_name.endsWith(' a.'))
		street_name = street_name.replace(new RegExp("a." + '$'), dictionary["square_"+grm_case]);
	// " al." ending means "alley" in Lithuanian - replace it with "alėja"
	if (street_name.endsWith(' al.'))
		street_name = street_name.replace(new RegExp("al." + '$'), dictionary["alley_"+grm_case]);
	// " pr." ending means "avenue" in Lithuanian - replace it with "prospektas"
	if (street_name.endsWith(' pr.'))
		street_name = street_name.replace(new RegExp("pr." + '$'), dictionary["avenue_"+grm_case]);
	// " pl." ending means "highroad" in Lithuanian - replace it with "plentas"
	if (street_name.endsWith(' pl.'))
		street_name = street_name.replace(new RegExp("pl." + '$'), dictionary["highroad_"+grm_case]);
	// " skg." ending means "by-street" in Lithuanian - replace it with "skersgatvis"
	if (street_name.endsWith(' skg.'))
		street_name = street_name.replace(new RegExp("skg." + '$'), dictionary["by-street_"+grm_case]);
	// " aplink." ending means "bypass" in Lithuanian - replace it with "aplinkkelis"
	if (street_name.endsWith(' aplink.'))
		street_name = street_name.replace(new RegExp("aplink." + '$'), dictionary["bypass_"+grm_case]);
	// " aplinkl." is used in openstreetmap for "aplinkelis" (one K), though this is incorrect - should be "aplinkkelis" (two K)
	if (street_name.endsWith(' aplinkl.'))
		street_name = street_name.replace(new RegExp("aplinkl." + '$'), dictionary["bypass_"+grm_case]);

	// Say "[turn] on/onto road number X" instead of plain number "[turn] on/onto X"
	if (isNumeric(street_name))
		street_name = dictionary["road_number_"+grm_case] + " " + street_name;
    // Google TTS does not say road names (e.g. A1), so split name into letter and number
	if (/[A-Z]/.test(street_name.charAt(0)) && isNumeric(street_name.substring(1)))
		street_name = dictionary["road_"+grm_case] + " " + street_name.substring(0, 1) + " " + street_name.substring(1);
	return street_name;
}

function isNumeric(str) {
  if (typeof str != "string")
	  return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
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
	return dictionary["in"] + " " + distance(dist, "gen") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function bear_left(streetName) {
	return dictionary["left_bear"];
}

function bear_right(streetName) {
	return dictionary["right_bear"];
}

function prepare_make_ut(dist, streetName) {
	return dictionary["after"] + " " + distance(dist, "acc") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	return dictionary["after"] + " " + distance(dist, "acc") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
	return dictionary["after"] + " " + distance(dist, "acc") + " " + dictionary["prepare_roundabout"];
}

function and_arrive_destination(dest) {
	return dictionary["and_arrive_destination"] + " " + modify_street_name(dest, 'acc');
}

function and_arrive_intermediate(dest) {
	return dictionary["and_arrive_intermediate"] + " " + modify_street_name(dest, 'acc');
}

function and_arrive_waypoint(dest) {
	return dictionary["and_arrive_waypoint"] + " " + modify_street_name(dest, 'acc');
}

function and_arrive_favorite(dest) {
	return dictionary["and_arrive_favorite"] + " " + modify_street_name(dest, 'acc');
}

function and_arrive_poi(dest) {
	return dictionary["and_arrive_poi"] + " " + modify_street_name(dest, 'acc');
}

function reached_destination(dest) {
	return dictionary["reached_destination"] + " " + modify_street_name(dest, 'acc');
}

function reached_waypoint(dest) {
	return dictionary["reached_waypoint"] + " " + modify_street_name(dest, 'acc');
}

function reached_intermediate(dest) {
	return dictionary["reached_intermediate"] + " " + modify_street_name(dest, 'acc');
}

function reached_favorite(dest) {
	return dictionary["reached_favorite"] + " " + modify_street_name(dest, 'acc');
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
	return dictionary["exceed_limit"] + " " + num_str(maxSpeed, 'm', 'gen');
}

function speed_camera_alarm(dist, maxSpeed) {
	return dictionary["attention"] +
		(tts ? ", " : " ") + dictionary["speed_camera"] +
		(tts ? ", " : " ") + dictionary["in"] + " " + distance(dist, "gen") +
		(tts ? ", " : " ") + dictionary["exceed_limit"] + " " + num_str(maxSpeed, 'm', 'gen');
}

function attention(type) {
	switch (type) {
    	case "TRAFFIC_CALMING":
			return dictionary["attention_alt"] + (tts ? ", " : " ") + getAttentionString(type);
    	case "PEDESTRIAN":
			return dictionary["attention_alt"] + (tts ? ", " : " ") + getAttentionString(type);
		case "RAILWAY":
			return dictionary["attention_alt"] + (tts ? ", " : " ") + getAttentionString(type);
		default:
			return dictionary["attention"] + (tts ? ", " : " ") + getAttentionString(type);
    }
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
