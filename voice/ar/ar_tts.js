// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (X) Other prompts: gps lost, off route, back to route
// (X) Street name and prepositions (onto / on / to) and street destination (toward) support
// (X) Distance unit support (meters / feet / yard)
// (X) Special grammar: agreement of number and singular/dual/plural form of unit
// (X) Special grammar: agreement of number and unit gender
// (X) Special grammar: nominative vs. genitive/accusative distinction
// (X) Special grammar: word order with ordinal numbers

/* jshint -W069 */

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
// ROUTE CALCULATED
function populateDictionary(tts) {
	dictionary["route_is"] = tts ? "تَبْلُغُ المَسافة" : "route_is.ogg";
	dictionary["route_calculate"] = tts ? "تمّتْ إعادة حِساب الطريق" : "route_calculate.ogg";
	dictionary["distance"] = tts ? "تَبْلُغُ المَسافة" : "distance.ogg";

	// LEFT/RIGHT
	//dictionary["prepare"] = tts ? "Prepare to " : "prepare.ogg";
	dictionary["after"] = tts ? "بعدَ" : "after.ogg";
	dictionary["in"] = tts ? "في" : "in.ogg";

	dictionary["left"] = tts ? "اِنعطِفْ إلى اليسار" : "left.ogg";
	dictionary["left_sh"] = tts ? "اِتجِهْ إلى اليسار بشكل حاد" : "left_sh.ogg";
	dictionary["left_sl"] = tts ? "اِتجِهْ إلى اليسار قليلا" : "left_sl.ogg";
	dictionary["right"] = tts ? "اِنعطِفْ إلى اليمين" : "right.ogg";
	dictionary["right_sh"] = tts ? "اِتجِهْ إلى اليمين بشكل حاد" : "right_sh.ogg";
	dictionary["right_sl"] = tts ? "اِتجِهْ إلى اليمين قليلا" : "right_sl.ogg";
	dictionary["left_keep"] = tts ? "اِلْزَمِ اليسار" : "left_keep.ogg";
	dictionary["right_keep"] = tts ? "اِلْزَمِ اليمين" : "right_keep.ogg";
	dictionary["left_bear"] = tts ? "اِلْزَمِ اليسار" : "left_bear.ogg";    // in English the same as left_keep, may be different in other languages
	dictionary["right_bear"] = tts ? "اِلْزَمِ اليمين" : "right_bear.ogg";  // in English the same as right_keep, may be different in other languages

	// U-TURNS
	dictionary["make_uturn"] = tts ? "إلْتَف إلى الوراء" : "make_uturn.ogg";
	dictionary["make_uturn_wp"] = tts ? "عندما يكون ذلك ممكنا، يرجى الالْتِفافُ إلى الوراء" : "make_uturn_wp.ogg";

	// ROUNDABOUTS
	dictionary["prepare_roundabout"] = tts ? "استعِدْ للدُخول في المسار الدَّائِري" : "prepare_roundabout.ogg";
	dictionary["roundabout"] = tts ? "أُدخُلْ في المسار الدَّائري، ثُمَّ" : "roundabout.ogg";
	dictionary["then"] = tts ? "، ثُمَّ" : "then.ogg";
	dictionary["and"] = tts ? "وَ" : "and.ogg";
	dictionary["take"] = tts ? "أُسْلُكِ" : "take.ogg";
	dictionary["exit"] = tts ? "المَخرَجَ" : "exit.ogg";

	dictionary["1st"] = tts ? "الأَوَّل" : "1st.ogg";
	dictionary["2nd"] = tts ? "الثاني" : "2nd.ogg";
	dictionary["3rd"] = tts ? "الثالث" : "3rd.ogg";
	dictionary["4th"] = tts ? "الرابع" : "4th.ogg";
	dictionary["5th"] = tts ? "الخامس" : "5th.ogg";
	dictionary["6th"] = tts ? "السادس" : "6th.ogg";
	dictionary["7th"] = tts ? "السابع" : "7th.ogg";
	dictionary["8th"] = tts ? "الثامن" : "8th.ogg";
	dictionary["9th"] = tts ? "التاسع" : "9th.ogg";
	dictionary["10th"] = tts ? "العاشر" : "10th.ogg";
	dictionary["11th"] = tts ? "الحاديَ عشرَ" : "11th.ogg";
	dictionary["12th"] = tts ? "الثانيَ عشرَ" : "12th.ogg";
	dictionary["13th"] = tts ? "الثالثَ عشرَ" : "13th.ogg";
	dictionary["14th"] = tts ? "الرابعَ عشرَ" : "14th.ogg";
	dictionary["15th"] = tts ? "الخامسَ عشرَ" : "15th.ogg";
	dictionary["16th"] = tts ? "السادسَ عشرَ" : "16th.ogg";
	dictionary["17th"] = tts ? "السابعَ عشرَ" : "17th.ogg";

	// STRAIGHT/FOLLOW
	dictionary["go_ahead"] = tts ? "اتجِهْ مُباشَرَةً إلى الأَمام" : "go_ahead.ogg";
	dictionary["follow"] = tts ? "استمْرِرْ لـ" : "follow.ogg";  // 'Follow the course of the road for' perceived as too chatty by many users

	// ARRIVE
	dictionary["and_arrive_destination"] = tts ? "وتَصِلُ إلى وِجهَتِكَ" : "and_arrive_destination.ogg";
	dictionary["reached_destination"] = tts ? "لقد وَصَلْتَ إلى وِجهَتِكَ" : "reached_destination.ogg";
	dictionary["and_arrive_intermediate"] = tts ? "وتَصِلُ إلى وِجهَتِكَ الوسيطة" : "and_arrive_intermediate.ogg";
	dictionary["reached_intermediate"] = tts ? "لقد وَصَلْتَ إلى وِجهَتِكَ الوسيطة" : "reached_intermediate.ogg";

	// NEARBY POINTS
	dictionary["and_arrive_waypoint"] = tts ? "وتمر GPX إحداثية" : "and_arrive_waypoint.ogg";
	dictionary["reached_waypoint"] = tts ? "لقد وَصَلْتَ إلى مَرْحَلة جي بي إكْسْ" : "reached_waypoint.ogg";
	dictionary["and_arrive_favorite"] = tts ? "وتمر المفضلة" : "and_arrive_favorite.ogg";
	dictionary["reached_favorite"] = tts ? "يتم تمرير المفضل" : "reached_favorite.ogg";
	dictionary["and_arrive_poi"] = tts ? "و سوف تَصِلُ إلى نُقطَتِكَ المُفَضَّلَة" : "and_arrive_poi.ogg";
	dictionary["reached_poi"] = tts ? "يتم تمرير البوي" : "reached_poi.ogg";

	// ATTENTION
	//dictionary["exceed_limit"] = tts ? "لقد تجاوزت الحد الأقصى للسرعة " : "exceed_limit.ogg";
	dictionary["exceed_limit"] = tts ? "الحدُّ الأقصى للسرعة" : "exceed_limit.ogg";
	dictionary["attention"] = tts ? "انتباه،" : "attention.ogg";
	dictionary["speed_camera"] = tts ? "هُنَاكَ رادارٌ لِمُرَاقَبَةِ السُّرْعَة" : "speed_camera.ogg";
	dictionary["border_control"] = tts ? "هُنَاكَ نُقْطَةٌ لِمُراقَبَةِ الحُدود" : "border_control.ogg";
	dictionary["railroad_crossing"] = tts ? "نقطة لعبور القطارات" : "railroad_crossing.ogg";
	dictionary["traffic_calming"] = tts ? "مُمَهِّلْ" : "traffic_calming.ogg";
	dictionary["toll_booth"] = tts ? "رَسْمُ مُرورٍ لِلطُّرُقِ" : "toll_booth.ogg";
	dictionary["stop"] = tts ? "لاَفِتَةُ تَوَقُّفْ" : "stop.ogg";
	dictionary["pedestrian_crosswalk"] = tts ? "مَمَرٌّ لِلرَّاجِلِين" : "pedestrian_crosswalk.ogg";
	dictionary["tunnel"] = tts ? "نفق" : "tunnel.ogg";

	// OTHER PROMPTS
	dictionary["location_lost"] = tts ? "إشارَةُ الجي بي أَس فُقِدَتْ" : "location_lost.ogg";
	dictionary["location_recovered"] = tts ? "تَعافَتْ إشارَةُ الجي بي أَسْ" : "location_recovered.ogg";
	dictionary["off_route"] = tts ? "لَقَدْ إِنْحَرَفْتَ عَنِ المَسَارِ بِـ" : "off_route.ogg";
	dictionary["back_on_route"] = tts ? "لقد عُدْتَ إِلى الطريقِ من جديد" : "back_on_route.ogg";

	// STREET NAME PREPOSITIONS
	dictionary["onto"] = tts ? "على" : "onto.ogg";
	dictionary["on"] = tts ? "على" : "on.ogg";    // is used if you turn together with your current street, i.e. street name does not change.
	dictionary["to"] = tts ? "إلى" : "to.ogg";
	dictionary["toward"] = tts ? "باتجاه" : "toward.ogg";

	// DISTANCE UNIT SUPPORT
	dictionary["meter"] = tts ? "مِتْر" : "meter.ogg";
	dictionary["1_meter"] = tts ? "مِتْر واحِد" : "1_meter.ogg";
	dictionary["2_meters"] = tts ? "مِتْرَين" : "2_meters.ogg";
	dictionary["meters"] = tts ? "أمتار" : "meters.ogg";
	dictionary["kilometer"] = tts ? "كيلومتر" : "kilometer.ogg";
	dictionary["around_1_kilometer"] = tts ? "حوالي كيلومتر واحِد" : "around_1_kilometer.ogg";
	dictionary["around_2_kilometers"] = tts ? "حوالي كيلومترَين" : "around_2_kilometers.ogg";
	dictionary["around"] = tts ? "حوالي" : "around.ogg";
	dictionary["2_kilometers"] = tts ? "كيلومترَين" : "2_kilometers.ogg";
	dictionary["kilometers"] = tts ? "كيلومترات" : "kilometers.ogg";

	dictionary["foot"] = tts ? "قدم" : "foot.ogg";
	dictionary["2_feet"] = tts ? "قدَمَين" : "2_feet.ogg";
	dictionary["feet"] = tts ? "أقدام" : "feet.ogg";
	dictionary["1_tenth_of_a_mile"] = tts ? "عُشْر ميل" : "1_tenth_of_a_mile.ogg";
	dictionary["2_tenths_of_a_mile"] = tts ? "عُشْرَي ميل" : "2_tenths_of_a_mile.ogg";
	dictionary["tenths_of_a_mile"] = tts ? "أعْشار ميل" : "tenths_of_a_mile.ogg";
	dictionary["mile"] = tts ? "ميل" : "mile.ogg";
	dictionary["2_miles"] = tts ? "ميلَين" : "2_miles.ogg";
	dictionary["around_1_mile"] = tts ? "حوالي ميل واحِد" : "around_1_mile.ogg";
	dictionary["around_2_miles"] = tts ? "حوالي ميلَيْنِ" : "around_2_miles.ogg";
	dictionary["miles"] = tts ? "اميال" : "miles.ogg";

	dictionary["yard"] = tts ? "ياردة" : "yard.ogg";
	dictionary["1_yard"] = tts ? "ياردة واحِدة" : "1_yard.ogg";
	dictionary["2_yards"] = tts ? "ياردتَين" : "2_yards.ogg";
	dictionary["yards"] = tts ? "ياردات" : "yards.ogg";

	dictionary["less_than"] = tts ? "أقلّ مِن" : "less_than.ogg";
	dictionary["more_than"] = tts ? "أَكثر مِن" : "more_than.ogg";

	// TIME SUPPORT
	dictionary["time"] = tts ? "تَبْلُغُ مُدَّةُ السَفَر" : "time.ogg";
	dictionary["1_hour"] = tts ? "ساعة واحدة" : "1_hour.ogg";
	dictionary["2_hours"] = tts ? "ساعتَين" : "2_hours.ogg";
	dictionary["hour"] = tts ? "ساعة" : "hour.ogg";
	dictionary["hours"] = tts ? "ساعات" : "hours.ogg";
	dictionary["less_a_minute"] = tts ? "أقلّ من دقيقة" : "less_a_minute.ogg";
	dictionary["minute"] = tts ? "دقيقة" : "minute.ogg";
	dictionary["1_minute"] = tts ? "دقيقة واحدة" : "1_minute.ogg";
	dictionary["2_minutes"] = tts ? "دقيقتَين" : "2_minutes.ogg";
	dictionary["minutes"] = tts ? "دقائق" : "minutes.ogg";

	// NUMBERS
	dictionary["0_m_nom"] = ""; // \
	dictionary["0_m_gen"] = ""; //  \
	dictionary["0_m_acc"] = ""; //   \
	dictionary["0_f_nom"] = ""; //    \
	dictionary["0_f_gen"] = ""; //     } save some decision making in num_str()
	dictionary["0_f_acc"] = ""; //    /
	dictionary["0_nom"] = "";   //   /
	dictionary["0_gen"] = "";   //  /
	dictionary["0_acc"] = "";   // /
	dictionary["1_m_nom"] = tts ? "أَحدُ" : "1_m_nom.ogg";
	dictionary["1_m_gen"] = tts ? "أَحدَ" : "1_m_gen.ogg";
	dictionary["1_m_acc"] = dictionary["1_m_gen"];
	dictionary["1_f_nom"] = tts ? "إحدى" : "1_f_nom.ogg";
	dictionary["1_f_acc"] = dictionary["1_f_gen"] = dictionary["1_f_nom"];
	dictionary["alt_1_m"] = tts ? "واحِد" : "1_m.ogg";  // is this even needed?
	dictionary["alt_1_f"] = tts ? "واحِدة" : "1_f.ogg"; //
	dictionary["2_m_nom"] = tts ? "اِثنان" : "2_m_nom.ogg";
	dictionary["2_m_gen"] = tts ? "اِثنَين" : "2_m_gen.ogg";
	dictionary["2_m_acc"] = dictionary["2_m_gen"];
	dictionary["2_f_nom"] = tts ? "اِثنتان" : "2_f_nom.ogg";
	dictionary["2_f_gen"] = tts ? "اِثنتَين" : "2_f_gen.ogg";
	dictionary["2_f_acc"] = dictionary["2_f_gen"];
	dictionary["3_m_nom"] = tts ? "ثلاثةُ" : "3_m_nom.ogg";
	dictionary["3_m_gen"] = tts ? "ثلاثةِ" : "3_m_gen.ogg";
	dictionary["3_m_acc"] = tts ? "ثلاثةَ" : "3_m_acc.ogg";
	dictionary["3_f_nom"] = tts ? "ثلاثُ" : "3_f_nom.ogg";
	dictionary["3_f_gen"] = tts ? "ثلاثِ" : "3_f_gen.ogg";
	dictionary["3_f_acc"] = tts ? "ثلاثَ" : "3_f_acc.ogg";
	dictionary["4_m_nom"] = tts ? "أَربعةُ" : "4_m_nom.ogg";
	dictionary["4_m_gen"] = tts ? "أَربعةِ" : "4_m_gen.ogg";
	dictionary["4_m_acc"] = tts ? "أَربعةَ" : "4_m_acc.ogg";
	dictionary["4_f_nom"] = tts ? "أَربعُ" : "4_f_nom.ogg";
	dictionary["4_f_gen"] = tts ? "أَربعِ" : "4_f_gen.ogg";
	dictionary["4_f_acc"] = tts ? "أَربعَ" : "4_f_acc.ogg";
	dictionary["5_m_nom"] = tts ? "خمسةُ" : "5_m_nom.ogg";
	dictionary["5_m_gen"] = tts ? "خمسةِ" : "5_m_gen.ogg";
	dictionary["5_m_acc"] = tts ? "خمسةَ" : "5_m_acc.ogg";
	dictionary["5_f_nom"] = tts ? "خمسُ" : "5_f_nom.ogg";
	dictionary["5_f_gen"] = tts ? "خمسِ" : "5_f_gen.ogg";
	dictionary["5_f_acc"] = tts ? "خمسَ" : "5_f_acc.ogg";
	dictionary["6_m_nom"] = tts ? "سِتّةُ" : "6_m_nom.ogg";
	dictionary["6_m_gen"] = tts ? "سِتّةِ" : "6_m_gen.ogg";
	dictionary["6_m_acc"] = tts ? "سِتّةَ" : "6_m_acc.ogg";
	dictionary["6_f_nom"] = tts ? "سِتُّ" : "6_f_nom.ogg";
	dictionary["6_f_gen"] = tts ? "سِتِّ" : "6_f_gen.ogg";
	dictionary["6_f_acc"] = tts ? "سِتَّ" : "6_f_acc.ogg";
	dictionary["7_m_nom"] = tts ? "سبعةُ" : "7_m_nom.ogg";
	dictionary["7_m_gen"] = tts ? "سبعةِ" : "7_m_gen.ogg";
	dictionary["7_m_acc"] = tts ? "سبعةَ" : "7_m_acc.ogg";
	dictionary["7_f_nom"] = tts ? "سبعُ" : "7_f_nom.ogg";
	dictionary["7_f_gen"] = tts ? "سبعِ" : "7_f_gen.ogg";
	dictionary["7_f_acc"] = tts ? "سبعَ" : "7_f_acc.ogg";
	dictionary["8_m_nom"] = tts ? "ثمانيةُ" : "8_m_nom.ogg";
	dictionary["8_m_gen"] = tts ? "ثمانيةِ" : "8_m_gen.ogg";
	dictionary["8_m_acc"] = tts ? "ثمانيةَ" : "8_m_acc.ogg";
	dictionary["8_f_nom"] = tts ? "ثماني" : "8_f_nom.ogg";
	dictionary["8_f_gen"] = dictionary["8_f_nom"];
	dictionary["8_f_acc"] = tts ? "ثمانيَ" : "8_f_acc.ogg";
	dictionary["9_m_nom"] = tts ? "تسعةُ" : "9_m_nom.ogg";
	dictionary["9_m_gen"] = tts ? "تسعةِ" : "9_m_gen.ogg";
	dictionary["9_m_acc"] = tts ? "تسعةَ" : "9_m_acc.ogg";
	dictionary["9_f_nom"] = tts ? "تسعُ" : "9_f_nom.ogg";
	dictionary["9_f_gen"] = tts ? "تسعِ" : "9_f_gen.ogg";
	dictionary["9_f_acc"] = tts ? "تسعَ" : "9_f_acc.ogg";
	dictionary["10_m_nom"] = tts ? "عشرةُ" : "10_m_nom.ogg";
	dictionary["10_m_gen"] = tts ? "عشرةِ" : "10_m_gen.ogg";
	dictionary["10_m_acc"] = tts ? "عشرةَ" : "10_m_acc.ogg";
	dictionary["10_f_nom"] = tts ? "عشرُ" : "10_f_nom.ogg";
	dictionary["10_f_gen"] = tts ? "عشرِ" : "10_f_gen.ogg";
	dictionary["10_f_acc"] = tts ? "عشرَ" : "10_f_acc.ogg";
	dictionary["11_m_nom"] = tts ? "أَحدَ عشرَ" : "11_m_nom.ogg";
	dictionary["11_m_acc"] = dictionary["11_m_gen"] = dictionary["11_m_nom"];
	dictionary["11_f_nom"] = tts ? "إحدى عشْرَةَ" : "11_f_nom.ogg";
	dictionary["11_f_acc"] = dictionary["11_f_gen"] = dictionary["11_f_nom"];
	dictionary["12_m_nom"] = tts ? "اثنا عشرَ" : "12_m_nom.ogg";
	dictionary["12_m_gen"] = tts ? "اثنَي عشرَ" : "12_m_gen.ogg";
	dictionary["12_m_acc"] = dictionary["12_m_gen"];
	dictionary["12_f_nom"] = tts ? "اثنتا عشْرَةَ" : "12_f_nom.ogg";
	dictionary["12_f_gen"] = tts ? "اثنتَي عشْرَةَ" : "12_f_gen.ogg";
	dictionary["12_f_acc"] = dictionary["12_f_gen"];
	dictionary["13_m_nom"] = tts ? "ثلاثةَ عشرَ" : "13_m_nom.ogg";
	dictionary["13_m_acc"] = dictionary["13_m_gen"] = dictionary["13_m_nom"];
	dictionary["13_f_nom"] = tts ? "ثلاثَ عشْرَةَ" : "13_f_nom.ogg";
	dictionary["13_f_acc"] = dictionary["13_f_gen"] = dictionary["13_f_nom"];
	dictionary["14_m_nom"] = tts ? "أَربعةَ عشرَ" : "14_m_nom.ogg";
	dictionary["14_m_acc"] = dictionary["14_m_gen"] = dictionary["14_m_nom"];
	dictionary["14_f_nom"] = tts ? "أَربعَ عشْرَةَ" : "14_f_nom.ogg";
	dictionary["14_f_acc"] = dictionary["14_f_gen"] = dictionary["14_f_nom"];
	dictionary["15_m_nom"] = tts ? "خمسةَ عشرَ" : "15_m_nom.ogg";
	dictionary["15_m_acc"] = dictionary["15_m_gen"] = dictionary["15_m_nom"];
	dictionary["15_f_nom"] = tts ? "خمسَ عشْرَةَ" : "15_f_nom.ogg";
	dictionary["15_f_acc"] = dictionary["15_f_gen"] = dictionary["15_f_nom"];
	dictionary["16_m_nom"] = tts ? "سِتّةَ عشرَ" : "16_m_nom.ogg";
	dictionary["16_m_acc"] = dictionary["16_m_gen"] = dictionary["16_m_nom"];
	dictionary["16_f_nom"] = tts ? "سِتَّ عشْرَةَ" : "16_f_nom.ogg";
	dictionary["16_f_acc"] = dictionary["16_f_gen"] = dictionary["16_f_nom"];
	dictionary["17_m_nom"] = tts ? "سبعةَ عشرَ" : "17_m_nom.ogg";
	dictionary["17_m_acc"] = dictionary["17_m_gen"] = dictionary["17_m_nom"];
	dictionary["17_f_nom"] = tts ? "سبعَ عشْرَةَ" : "17_f_nom.ogg";
	dictionary["17_f_acc"] = dictionary["17_f_gen"] = dictionary["17_f_nom"];
	dictionary["18_m_nom"] = tts ? "ثمانةَ عشرَ" : "18_m_nom.ogg";
	dictionary["18_m_acc"] = dictionary["18_m_gen"] = dictionary["18_m_nom"];
	dictionary["18_f_nom"] = tts ? "ثمانيَ عشْرَةَ" : "18_f_nom.ogg";
	dictionary["18_f_acc"] = dictionary["18_f_gen"] = dictionary["18_f_nom"];
	dictionary["19_m_nom"] = tts ? "تسعةَ عشرَ" : "19_m_nom.ogg";
	dictionary["19_m_acc"] = dictionary["19_m_gen"] = dictionary["19_m_nom"];
	dictionary["19_f_nom"] = tts ? "تسعَ عشْرَةَ" : "19_f_nom.ogg";
	dictionary["19_f_acc"] = dictionary["19_f_gen"] = dictionary["19_f_nom"];
	dictionary["20_nom"] = tts ? "عِشْرون" : "20_nom.ogg";
	dictionary["20_gen"] = tts ? "عِشْرين" : "20_gen.ogg";
	dictionary["20_acc"] = dictionary["20_gen"];
	dictionary["30_nom"] = tts ? "ثلاثون" : "30_nom.ogg";
	dictionary["30_gen"] = tts ? "ثلاثين" : "30_gen.ogg";
	dictionary["30_acc"] = dictionary["30_gen"];
	dictionary["40_nom"] = tts ? "أَربعون" : "40_nom.ogg";
	dictionary["40_gen"] = tts ? "أَربعين" : "40_gen.ogg";
	dictionary["40_acc"] = dictionary["40_gen"];
	dictionary["50_nom"] = tts ? "خمسون" : "50_nom.ogg";
	dictionary["50_gen"] = tts ? "خمسين" : "50_gen.ogg";
	dictionary["50_acc"] = dictionary["50_gen"];
	dictionary["60_nom"] = tts ? "سِتّون" : "60_nom.ogg";
	dictionary["60_gen"] = tts ? "سِتّين" : "60_gen.ogg";
	dictionary["60_acc"] = dictionary["60_gen"];
	dictionary["70_nom"] = tts ? "سبعون" : "70_nom.ogg";
	dictionary["70_gen"] = tts ? "سبعين" : "70_gen.ogg";
	dictionary["70_acc"] = dictionary["70_gen"];
	dictionary["80_nom"] = tts ? "ثمانون" : "80_nom.ogg";
	dictionary["80_gen"] = tts ? "ثمانين" : "80_gen.ogg";
	dictionary["80_acc"] = dictionary["80_gen"];
	dictionary["90_nom"] = tts ? "تسعون" : "90_nom.ogg";
	dictionary["90_gen"] = tts ? "تسعين" : "90_gen.ogg";
	dictionary["90_acc"] = dictionary["90_gen"];
	dictionary["100"] = tts ? "مئة" : "100.ogg";
	dictionary["100_nom"] = tts ? "مئةُ" : "100_nom.ogg"; // \
	dictionary["100_gen"] = tts ? "مئةِ" : "100_gen.ogg"; //  } for idaafa only
	dictionary["100_acc"] = tts ? "مئةَ" : "100_acc.ogg"; // /
	dictionary["200_nom"] = tts ? "مئتان" : "200_nom.ogg";
	dictionary["200_gen"] = tts ? "مئتَيْنِ" : "200_gen.ogg";
	dictionary["200_acc"] = dictionary["200_gen"];
	dictionary["200_nom_id"] = tts ? "مئتا" : "200_nom_id.ogg"; // \
	dictionary["200_gen_id"] = tts ? "مئتَي" : "200_gen_id.ogg"; //  } for idaafa only
	dictionary["200_acc_id"] = dictionary["200_gen_id"];        // /
	dictionary["300_nom"] = tts ? "ثلاثُمئة" : "300_nom.ogg";
	dictionary["300_gen"] = tts ? "ثلاثِمئة" : "300_gen.ogg";
	dictionary["300_acc"] = tts ? "ثلاثَمئة" : "300_acc.ogg";
	dictionary["400_nom"] = tts ? "أَربعُمئة" : "400_nom.ogg";
	dictionary["400_gen"] = tts ? "أَربعِمئة" : "400_gen.ogg";
	dictionary["400_acc"] = tts ? "أَربعَمئة" : "400_acc.ogg";
	dictionary["500_nom"] = tts ? "خمسُمئة" : "500_nom.ogg";
	dictionary["500_gen"] = tts ? "خمسِمئة" : "500_gen.ogg";
	dictionary["500_acc"] = tts ? "خمسَمئة" : "500_acc.ogg";
	dictionary["600_nom"] = tts ? "سِتُّمئة" : "600_nom.ogg";
	dictionary["600_gen"] = tts ? "سِتِّمئة" : "600_gen.ogg";
	dictionary["600_acc"] = tts ? "سِتَّمئة" : "600_acc.ogg";
	dictionary["700_nom"] = tts ? "سبعُمئة" : "700_nom.ogg";
	dictionary["700_gen"] = tts ? "سبعِمئة" : "700_gen.ogg";
	dictionary["700_acc"] = tts ? "سبعَمئة" : "700_acc.ogg";
	dictionary["800_nom"] = tts ? "ثمانيمئة" : "800_nom.ogg";
	dictionary["800_gen"] = dictionary["800_nom"];
	dictionary["800_acc"] = tts ? "ثمانيَمئة" : "800_acc.ogg";
	dictionary["900_nom"] = tts ? "تسعةُمئة" : "900_nom.ogg";
	dictionary["900_gen"] = tts ? "تسعةِمئة" : "900_gen.ogg";
	dictionary["900_acc"] = tts ? "تسعةَمئة" : "900_acc.ogg";
	dictionary["1000"] = tts ? "أَلْف" : "1000.ogg";
	dictionary["1000_nom"] = tts ? "أَلْفُ" : "1000_nom.ogg";
	dictionary["1000_gen"] = tts ? "أَلْفِ" : "1000_gen.ogg";
	dictionary["1000_acc"] = tts ? "أَلْفَ" : "1000_acc.ogg";
	dictionary["2000_nom"] = tts ? "ألفان" : "2000_nom.ogg";
	dictionary["2000_gen"] = tts ? "ألفَيْنِ" : "2000_gen.ogg";
	dictionary["2000_acc"] = dictionary["2000_gen"];
	dictionary["2000_nom_id"] = tts ? "أَلْفَا" : "2000_nom_id.ogg"; // \
	dictionary["2000_gen_id"] = tts ? "أَلْفَي" : "2000_gen_id.ogg"; //  } for idaafa only
	dictionary["2000_acc_id"] = dictionary["2000_gen_id"];        // /
	dictionary["3000_nom"] = tts ? "ثلاثةُ آلاف" : "3000_nom.ogg";
	dictionary["3000_gen"] = tts ? "ثلاثةِ آلاف" : "3000_gen.ogg";
	dictionary["3000_acc"] = tts ? "ثلاثةَ آلاف" : "3000_acc.ogg";
	dictionary["4000_nom"] = tts ? "أَربعةُ آلاف" : "4000_nom.ogg";
	dictionary["4000_gen"] = tts ? "أَربعةِ آلاف" : "4000_gen.ogg";
	dictionary["4000_acc"] = tts ? "أَربعةَ آلاف" : "4000_acc.ogg";
	dictionary["5000_nom"] = tts ? "خمسةُ آلاف" : "5000_nom.ogg";
	dictionary["5000_gen"] = tts ? "خمسةِ آلاف" : "5000_gen.ogg";
	dictionary["5000_acc"] = tts ? "خمسةَ آلاف" : "5000_acc.ogg";
	dictionary["6000_nom"] = tts ? "سِتّةُ آلاف" : "6000_nom.ogg";
	dictionary["6000_gen"] = tts ? "سِتّةِ آلاف" : "6000_gen.ogg";
	dictionary["6000_acc"] = tts ? "سِتّةَ آلاف" : "6000_acc.ogg";
	dictionary["7000_nom"] = tts ? "سبعةُ آلاف" : "7000_nom.ogg";
	dictionary["7000_gen"] = tts ? "سبعةِ آلاف" : "7000_gen.ogg";
	dictionary["7000_acc"] = tts ? "سبعةَ آلاف" : "7000_acc.ogg";
	dictionary["8000_nom"] = tts ? "ثمانيةُ آلاف" : "8000_nom.ogg";
	dictionary["8000_gen"] = tts ? "ثمانيةِ آلاف" : "8000_gen.ogg";
	dictionary["8000_acc"] = tts ? "ثمانيةَ آلاف" : "8000_acc.ogg";
	dictionary["9000_nom"] = tts ? "تسعةُ آلاف" : "9000_nom.ogg";
	dictionary["9000_gen"] = tts ? "تسعةِ آلاف" : "9000_gen.ogg";
	dictionary["9000_acc"] = tts ? "تسعةَ آلاف" : "9000_acc.ogg";
	dictionary["10000_nom"] = tts ? "عشرةُ آلاف" : "10000_nom.ogg";
	dictionary["10000_gen"] = tts ? "عشرةِ آلاف" : "10000_gen.ogg";
	dictionary["10000_acc"] = tts ? "عشرةَ آلاف" : "10000_acc.ogg";
}

function num_str(number, gender /*of the object being counted*/, grm_case) {
	
	//deal with the special cases (idaafas) first
	if (number > 10000)
		return dictionary["more_than"] + " " + dictionary["10000_gen"];
	if (number == 2000)
		return dictionary["2000_"+grm_case+"_id"];
	if (number == 1000)
		return dictionary["1000_"+grm_case];
	if (number == 200)
		return dictionary["200_"+grm_case+"_id"];
	if (number == 100)
		return dictionary["100_"+grm_case];

	var teens = 0;
	var thousands = Math.floor(number / 1000) * 1000;
	var hundreds  = Math.floor((number - thousands) / 100) * 100;
	var tens      = Math.floor((number - thousands - hundreds) / 10) * 10;
	var ones      = Math.floor(number - thousands - hundreds - tens);
	if (tens == 10 && ones)
		teens = tens + ones;

	if (teens)
		return   dictionary[thousands.toString()+"_"+grm_case]
			   + ((thousands && hundreds) ? " " + dictionary["and"] + " " : "") + dictionary[hundreds.toString()+"_"+grm_case]
			   + ((thousands || hundreds) ? " " + dictionary["and"] + " " : "") + dictionary[teens.toString()+"_"+gender+"_"+grm_case];

	if (tens == 10)
		return   dictionary[thousands.toString()+"_"+grm_case]
			   + ((thousands && hundreds) ? " " + dictionary["and"] + " " : "") + dictionary[hundreds.toString()+"_"+grm_case]
			   + (((thousands || hundreds) && ones) ? " " + dictionary["and"] + " " : "") + dictionary[ones.toString()+"_"+gender+"_"+grm_case]
			   + (((thousands || hundreds || ones) && tens) ? " " + dictionary["and"] + " " : "") + dictionary[tens.toString()+"_"+gender+"_"+grm_case];

	return   dictionary[thousands.toString()+"_"+grm_case]
		   + ((thousands && hundreds) ? " " + dictionary["and"] + " " : "") + dictionary[hundreds.toString()+"_"+grm_case]
		   + (((thousands || hundreds) && ones) ? " " + dictionary["and"] + " " : "") + dictionary[ones.toString()+"_"+gender+"_"+grm_case]
		   + (((thousands || hundreds || ones) && tens) ? " " + dictionary["and"] + " " : "") + dictionary[tens.toString()+"_"+grm_case];
}

function setMetricConst(metrics) {
	metricConst = metrics;
}

function setMode(mode) {
	tts = mode;
	populateDictionary(mode);
}

function route_new_calc(dist, timeVal) {
	return dictionary["route_is"] + " " + distance(dist, "acc") + (tts ? "، " : " ") + dictionary["time"] + " " + time(timeVal, "acc") + (tts ? ". " : "");
}

function distance(dist, grm_case) {
	var kms = Math.round(dist/1000.0);
	var mls = Math.round(dist/1609.3);
    var ft =  Math.round(2*dist/100.0/0.3048)*50;
	switch (metricConst) {
		case "km-m":
			if (dist < 1.5)
				return dictionary["1_meter"];
			if (dist < 2.5)
				return dictionary["2_meters"];
			if (dist < 11)
				return (tts ? num_str(Math.floor(dist), "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meters"];
			if (dist < 17 )
				return (tts ? num_str(Math.round(dist), "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meter"];
			if (dist < 100)
				return (tts ? num_str(Math.round(dist/10.0)*10, "m", grm_case) : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meter"];
			if (dist < 1000)
				return (tts ? num_str(Math.round(2*dist/100.0)*50, "m", grm_case) : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meter"];
			if (dist < 1500)
				return dictionary["around_1_kilometer"];
			if (dist < 2500)
				return dictionary["around_2_kilometers"];
			if (dist < 10500)
				return dictionary["around"] + " " + (tts ? num_str(kms, "m", "gen") : ogg_dist(dist/1000.0)) + " " + dictionary["kilometers"];
			if (kms % 100 == 1)
				return (tts ? num_str(kms - 1, "m", grm_case) : ogg_dist(kms - 1)) + " " + dictionary["kilometer"] + " " + dictionary["and"] + " " + dictionary["kilometer"];
			if (kms % 100 == 2)
				return (tts ? num_str(kms - 2, "m", grm_case) : ogg_dist(kms - 2)) + " " + dictionary["kilometer"] + " " + dictionary["and"] + " " + dictionary["2_kilometers"];
			if (kms % 100 > 2 && kms % 100 < 11)
				return (tts ? num_str(kms, "m", grm_case) : ogg_dist(kms)) + " " + dictionary["kilometers"];
			return (tts ? num_str(kms, "m", grm_case) : ogg_dist(kms)) + " " + dictionary["kilometer"];
		case "mi-f":
			if (ft < 50)
				return dictionary["less_than"] + " " + num_str(50, "m", "gen");
			if (ft < 500)
				return (tts ? num_str(ft, "m", grm_case) : ogg_dist(ft)) + " " + dictionary["foot"];
			if (ft < 800)
				return dictionary["1_tenth_of_a_mile"];
			if (dist < 401)
				return dictionary["2_tenths_of_a_mile"];
			if (dist < 1529)
				return (tts ? num_str(Math.round(dist/161.0), "m", grm_case) : ogg_dist(dist/161.0)) + " " + dictionary["tenths_of_a_mile"];
			if (dist < 2414)
				return dictionary["around_1_mile"];
			if (dist < 4024)
				return dictionary["around_2_miles"];
			if (dist < 16898)
				return dictionary["around"] + " " + (tts ? num_str(mls, "m", "gen") : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			if (mls % 100 == 1)
				return (tts ? num_str(mls - 1, "m", grm_case) : ogg_dist(mls - 1)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["mile"];
			if (mls % 100 == 2)
				return (tts ? num_str(mls - 2, "m", grm_case) : ogg_dist(mls - 2)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["2_miles"];
			if (mls % 100 > 2 && mls % 100 < 11)
				return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["miles"];
			return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["mile"];
		case "mi-m":
			if (dist < 1.5)
				return dictionary["1_meter"];
			if (dist < 2.5)
				return dictionary["2_meters"];
			if (dist < 11)
				return (tts ? num_str(Math.floor(dist), "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meters"];
			if (dist < 17 )
				return (tts ? num_str(Math.round(dist), "m", grm_case) : ogg_dist(dist)) + " " + dictionary["meter"];
			if (dist < 100)
				return (tts ? num_str(Math.round(dist/10.0)*10, "m", grm_case) : ogg_dist(Math.round(dist/10.0)*10)) + " " + dictionary["meter"];
			if (dist < 1300)
				return (tts ? num_str(Math.round(2*dist/100.0)*50, "m", grm_case) : ogg_dist(Math.round(2*dist/100.0)*50)) + " " + dictionary["meter"];
			if (dist < 2414)
				return dictionary["around_1_mile"];
			if (dist < 4024)
				return dictionary["around_2_miles"];
			if (dist < 16898)
				return dictionary["around"] + " " + (tts ? num_str(mls, "m", "gen") : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			if (mls % 100 == 1)
				return (tts ? num_str(mls - 1, "m", grm_case) : ogg_dist(mls - 1)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["mile"];
			if (mls % 100 == 2)
				return (tts ? num_str(mls - 2, "m", grm_case) : ogg_dist(mls - 2)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["2_miles"];
			if (mls % 100 > 2 && mls % 100 < 11)
				return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["miles"];
			return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["mile"];
		case "mi-y":
			if (dist < 2)
				return dictionary["1_yard"];
			if (dist < 3)
				return dictionary["2_yards"];
			if (dist < 10)
				return (tts ? num_str(Math.round(dist/0.9144), "f", grm_case) : ogg_dist(dist/0.9144)) + " " + dictionary["yards"];
			if (dist < 17)
				return (tts ? num_str(Math.round(dist/0.9144), "f", grm_case) : ogg_dist(dist/0.9144)) + " " + dictionary["yard"];
			if (dist < 97)
				return (tts ? num_str(Math.round(dist/10.0/0.9144)*10, "f", grm_case) : ogg_dist((dist/10.0/0.9144)*10)) + " " + dictionary["yard"];
			if (dist < 1300)
				return (tts ? num_str(Math.round(2*dist/100.0/0.9144)*50, "f", grm_case) : ogg_dist((2*dist/10.0/0.9144)*10)) + " " + dictionary["yard"];
			if (dist < 2414)
				return dictionary["around_1_mile"];
			if (dist < 4024)
				return dictionary["around_2_miles"];
			if (dist < 16898)
				return dictionary["around"] + " " + (tts ? num_str(mls, "m", "gen") : ogg_dist(dist/1609.3)) + " " + dictionary["miles"];
			if (mls % 100 == 1)
				return (tts ? num_str(mls - 1, "m", grm_case) : ogg_dist(mls - 1)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["mile"];
			if (mls % 100 == 2)
				return (tts ? num_str(mls - 2, "m", grm_case) : ogg_dist(mls - 2)) + " " + dictionary["mile"] + " " + dictionary["and"] + " " + dictionary["2_miles"];
			if (mls % 100 > 2 && mls % 100 < 11)
				return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["miles"];
			return (tts ? num_str(mls, "m", grm_case) : ogg_dist(mls)) + " " + dictionary["mile"];
	}
}

function time(seconds, grm_case) {
	var minutes = Math.round(seconds/60.0);
	var oggMinutes = Math.round((seconds/300.0) * 5);
	var hrs = Math.floor(seconds / 3600);
	
	if (seconds < 30)
		return dictionary["less_a_minute"];
	if (minutes % 60 == 0 && tts)
		return hours(minutes, grm_case);
	if (minutes % 60 == 1 && tts)
		return hours(minutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + dictionary["1_minute"];
	if (minutes % 60 == 2 && tts)
		return hours(minutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + dictionary["2_minutes"];
	if (minutes % 60 > 2 && minutes % 60 < 11 && tts)
		return hours(minutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minutes"];
	if (tts)
		return hours(minutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + num_str(minutes % 60, "f", grm_case) + " " + dictionary["minute"];
	if (!tts && seconds < 300)
		return ogg_dist(minutes) + dictionary["minutes"];
	if (!tts && oggMinutes % 60 == 0)
		return hours(oggMinutes, grm_case);
	if (!tts && oggMinutes % 60 == 1)
		return hours(oggMinutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + dictionary["1_minute"]; 
	if (!tts && oggMinutes % 60 == 2)
		return hours(oggMinutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + dictionary["2_minutes"]; 
	if (!tts && oggMinutes % 60 > 2 && oggMinutes < 11)
		return hours(oggMinutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + ogg_dist(oggMinutes % 60) + dictionary["minutes"];
	return hours(oggMinutes, grm_case) + (hrs ? " " + dictionary["and"] + " " : "") + ogg_dist(oggMinutes % 60) + dictionary["minute"];
}

function hours(minutes, grm_case) {
	var hrs = Math.floor(minutes / 60); // see if need "and"
	if (minutes < 60)
		return "";
	if (minutes < 120)
		return dictionary["1_hour"];
	if (minutes < 180)
		return dictionary["2_hours"];
	if (hrs < 11)
       	return  (tts ? num_str(hrs, "f", grm_case) : ogg_dist(hrs)) + " " + dictionary["hours"];
   	return  (tts ? num_str(hrs, "f", grm_case) : ogg_dist(hrs)) + " " + dictionary["hour"];
}

function route_recalc(dist, seconds) {
	return dictionary["route_calculate"] + (tts ? "، " : " ") + dictionary["distance"] + " " + distance(dist, "acc") + " " + dictionary["time"] + " " + time(seconds, "acc") + (tts ? ". " : "");
}

function go_ahead(dist, streetName) {
	if (dist == -1)
		return dictionary["go_ahead"];
	return dictionary["follow"] + " " + distance(dist, "gen") + " " + follow_street(streetName);

// go_ahead(Dist, Street) -- ["follow", D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).
// follow_street("", []).
// follow_street(voice(["","",""],_), []).
// follow_street(voice(["", "", D], _), ["to", D]) :- tts.
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// follow_street(Street, ["to", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
}

function follow_street(streetName) {
	if ((streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "")
	 || Object.keys(streetName).length == 0
	 || !tts)
		return "";
	if (streetName["toStreetName"] === "" && streetName["toRef"] === "")
		return dictionary["to"] + " " + streetName["toDest"];
	if ((streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"])
			|| (streetName["toRef"] == streetName["fromRef"] && streetName["toStreetName"] == ""))
		return dictionary["on"] + " " + assemble_street_name(streetName);
	if (!(streetName["toRef"] === streetName["fromRef"] && streetName["toStreetName"] === streetName["fromStreetName"]))
		return dictionary["to"] + " " + assemble_street_name(streetName);
	return "";
}

function turn(turnType, dist, streetName) {
	if (dist == -1)
		return getTurnType(turnType) + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "gen") + " " + getTurnType(turnType) + " " + turn_street(streetName);
	// turn(Turn, Dist, Street) -- ["in", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
// turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).
}

function take_exit(turnType, dist, streetName) {
	if (dist == -1) {
		return getTurnType(turnType) + " " + dictionary["on"] + " " + dictionary["exit"] + " "
			+ take_exit_name(streetName)
	} else {
		return dictionary["in"] + " " + distance(dist) + " " + getTurnType(turnType)
			+ dictionary["on"] + " " + dictionary["exit"] + " " + take_exit_name(streetName)
	}
}

function take_exit_name(streetName) {
	if (Object.keys(streetName).length == 0 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "") || !tts) {
		return "";
	} else if (streetName["toDest"] != "") {
      		return streetName["toRef"] + " " + streetName["toStreetName"] + dictionary["toward"] + " " + streetName["toDest"];
    } else {
      		return streetName["toRef"] + " " + streetName["toStreetName"]
	}
}

function  getTurnType(turnType) {
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
		return dictionary["take"] + " " + dictionary["exit"] + " " + nth(exit) + " " + turn_street(streetName);
	return dictionary["in"] + " " + distance(dist, "gen") + " " + dictionary["roundabout"] + " " + dictionary["take"] + " " + dictionary["exit"] + " " + nth(exit) + " " + turn_street(streetName);

}

function turn_street(streetName) {
	// turn_street("", []).
// turn_street(voice(["","",""],_), []).
// turn_street(voice(["", "", D], _), ["toward", D]) :- tts.
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["on", SName]) :- tts, Street = voice([R, "", _],[R, _, _]), assemble_street_name(Street, SName).
// turn_street(Street, ["onto", SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
	if (Object.keys(streetName).length == 0
	 || (streetName["toDest"] === "" && streetName["toStreetName"] === "" && streetName["toRef"] === "")
	 || !tts)
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
	return dictionary["in"] + " " + distance(dist, "gen") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
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
	return dictionary["after"] + " " + distance(dist, "gen") + " " + dictionary["make_uturn"] + " " + turn_street(streetName);
}

function prepare_turn(turnType, dist, streetName) {
	// prepare_turn(Turn, Dist, Street) -- ["after", D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
	return dictionary["after"] + " " + distance(dist, "gen") + " " + getTurnType(turnType) + " " + turn_street(streetName);
}

function prepare_roundabout(dist, exit, streetName) {
// prepare_roundabout(Dist, _Exit, _Street) -- ["after", D , "prepare_roundabout"] :- distance(Dist) -- D.
	return dictionary["after"] + " " + distance(dist, "gen") + " " + dictionary["prepare_roundabout"];
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
	return dictionary["exceed_limit"] + " " + num_str(maxSpeed, "m", "nom");
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
// speed_alarm(MaxSpeed, _Speed) -- ["exceed_limit", I] :- pnumber(MaxSpeed, I).
// attention(Type) -- ["attention", W] :- warning(Type, W).
// warning("SPEED_CAMERA", "speed_camera").
// warning("SPEED_LIMIT", "").
// warning("BORDER_CONTROL", "border_control").
// warning("RAILWAY", "railroad_crossing").
// warning("TRAFFIC_CALMING", "traffic_calming").
// warning("TOLL_BOOTH", "toll_booth").
// warning("STOP", "stop").
// warning("PEDESTRIAN", "pedestrian_crosswalk").
// warning("MAXIMUM", "").
// warning("TUNNEL", "tunnel").
// warning(Type, "") :- not(Type = "SPEED_CAMERA"; Type = "SPEED_LIMIT"; Type = "BORDER_CONTROL"; Type = "RAILWAY"; Type = "TRAFFIC_CALMING"; Type = "TOLL_BOOTH"; Type = "STOP"; Type = "PEDESTRIAN"; Type = "MAXIMUM"; Type = "TUNNEL").




// //// command main method
// //// if you are familar with Prolog you can input specific to the whole mechanism,
// //// by adding exception cases.

// flatten(X, Y) :- flatten(X, [], Y), !.
// flatten([], Acc, Acc).
// flatten([X|Y], Acc, Res):- flatten(Y, Acc, R), flatten(X, R, Res).
// flatten(X, Acc, [X|Acc]) :- version(J), J < 100, !.
// flatten(X, Acc, [Y|Acc]) :- string(X, Y), !.
// flatten(X, Acc, [X|Acc]).

// resolve(X, Y) :- resolve_impl(X,Z), flatten(Z, Y).
// resolve_impl([],[]).
// resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ("--"(X, L) -> append(L, Tail, List); List = Tail).


// // handling alternatives
// [X|_Y] -- T :- (X -- T),!.
// [_X|Y] -- T :- (Y -- T).


// pnumber(X, Y) :- tts, !, num_atom(X, Y).
// pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, "", Ogg).
// // time measure


// ////// distance measure
// distance(Dist) -- D :- measure("km-m"), distance_km(Dist) -- D.
// distance(Dist) -- D :- measure("mi-f"), distance_mi_f(Dist) -- D.
// distance(Dist) -- D :- measure("mi-y"), distance_mi_y(Dist) -- D.
// distance(Dist) -- D :- measure("mi-m"), distance_mi_m(Dist) -- D.

// ////// distance measure km/m


// ////// distance measure mi/f


// ////// distance measure mi/y


// ////// distance measure mi/m



// interval(St, St, End, _Step) :- St =< End.
// interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

// interval(X, St, End) :- interval(X, St, End, 1).

// // string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, "", Ogg).
// // string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(A, X), atom_concat(A, "", Ogg).
// // string(Ogg, A) :- voice_generation, interval(X, 100, 140, 10), atom_number(A, X), atom_concat(A, "", Ogg).
// // string(Ogg, A) :- voice_generation, interval(X, 150, 950, 50), atom_number(A, X), atom_concat(A, "", Ogg).
// // string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, "", Ogg).

// // // dist(X, Y) :- tts, !, num_atom(X, Y).

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

// // // dist(0, []) :- !.
// // // dist(X, [Ogg]) :- X < 20, !, pnumber(X, Ogg).
// // // dist(X, [Ogg]) :- X < 1000, 0 is X mod 50, !, num_atom(X, A), atom_concat(A, "", Ogg).
// // // dist(D, ["20"|L]) :-  D < 30, Ts is D - 20, !, dist(Ts, L).
// // // dist(D, ["30"|L]) :-  D < 40, Ts is D - 30, !, dist(Ts, L).
// // // dist(D, ["40"|L]) :-  D < 50, Ts is D - 40, !, dist(Ts, L).
// // // dist(D, ["50"|L]) :-  D < 60, Ts is D - 50, !, dist(Ts, L).
// // // dist(D, ["60"|L]) :-  D < 70, Ts is D - 60, !, dist(Ts, L).
// // // dist(D, ["70"|L]) :-  D < 80, Ts is D - 70, !, dist(Ts, L).
// // // dist(D, ["80"|L]) :-  D < 90, Ts is D - 80, !, dist(Ts, L).
// // // dist(D, ["90"|L]) :-  D < 100, Ts is D - 90, !, dist(Ts, L).
// // // dist(D, ["100"|L]) :-  D < 200, Ts is D - 100, !, dist(Ts, L).
// // // dist(D, ["200"|L]) :-  D < 300, Ts is D - 200, !, dist(Ts, L).
// // // dist(D, ["300"|L]) :-  D < 400, Ts is D - 300, !, dist(Ts, L).
// // // dist(D, ["400"|L]) :-  D < 500, Ts is D - 400, !, dist(Ts, L).
// // // dist(D, ["500"|L]) :-  D < 600, Ts is D - 500, !, dist(Ts, L).
// // // dist(D, ["600"|L]) :-  D < 700, Ts is D - 600, !, dist(Ts, L).
// // // dist(D, ["700"|L]) :-  D < 800, Ts is D - 700, !, dist(Ts, L).
// // // dist(D, ["800"|L]) :-  D < 900, Ts is D - 800, !, dist(Ts, L).
// // // dist(D, ["900"|L]) :-  D < 1000, Ts is D - 900, !, dist(Ts, L).
// // // dist(D, ["1000"|L]):- Ts is D - 1000, !, dist(Ts, L).
