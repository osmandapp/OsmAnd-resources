// IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
//
// N.B. This is a minimal set of beeps so doesn't really fit the following criteria
//
// (N/A) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
// (N/A) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
// (N/A) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM; TUNNEL
// (N/A) Other prompts: gps lost, off route, back to route
// (N/A) Street name and prepositions (onto / on / to) and street destination (toward) support
// (N/A) Distance unit support (meters / feet / yard)
// (N/A) Special grammar: (please specify which)
// (N/A) Support announcing highway exits

var metricConst;
var dictionary = {};
var tts;

//// STRINGS
////////////////////////////////////////////////////////////////
function populateDictionary(tts) {
	dictionary["squawk"] = "squawk.ogg";
	dictionary["mid_quarter"] = "sine.660.quarter.ogg";
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
	return dictionary["squawk"];
}

function distance(dist) {
	return " ";
}

function time(seconds) {
	return " ";
}

function hours(minutes) {
	return " ";
}

function route_recalc(dist, seconds) {
	return dictionary["squawk"];
}

function go_ahead(dist, streetName) {
	return " ";
}

function follow_street(streetName) {
	return " ";
}

function turn(turnType, dist, streetName) {
  return " ";
}

function take_exit(turnType, dist, exitString, exitInt, streetName) {
	return " ";
}

function take_exit_name(streetName) {
	return " ";
}

function getExitNumber(exitString, exitInt) {
	return " ";
}

function getTurnType(turnType) {
	return " ";
}

function then() {
	return " ";
}

function roundabout(dist, angle, exit, streetName) {
	return " ";
}

function turn_street(streetName) {
	return " ";
}

function assemble_street_name(streetName) {
	return " ";
}

function nth(exit) {
	return " ";
}

function make_ut(dist, streetName) {
  return " ";
}

function bear_left(streetName) {
	return " ";
}

function bear_right(streetName) {
	return " ";
}

function prepare_make_ut(dist, streetName) {
	return " ";
}

function prepare_turn(turnType, dist, streetName) {
	return " ";
}

function prepare_roundabout(dist, exit, streetName) {
	return " ";
}

function and_arrive_destination(dest) {
	return " ";
}

function and_arrive_intermediate(dest) {
	return " ";
}

function and_arrive_waypoint(dest) {
	return " ";
}

function and_arrive_favorite(dest) {
	return " ";
}

function and_arrive_poi(dest) {
	return " ";
}

function reached_destination(dest) {
	return dictionary["squawk"];
}

function reached_waypoint(dest) {
	return dictionary["mid_quarter"];
}

function reached_intermediate(dest) {
	return dictionary["squawk"];
}

function reached_favorite(dest) {
	return dictionary["mid_quarter"];
}

function reached_poi(dest) {
	return dictionary["mid_quarter"];
}

function location_lost() {
	return " ";
}

function location_recovered() {
	return " ";
}

function off_route(dist) {
	return dictionary["squawk"];
}

function back_on_route() {
	return dictionary["squawk"];
}

function make_ut_wp() {
	return " ";
}

// TRAFFIC WARNINGS
function speed_alarm(maxSpeed, speed) {
	return " ";
}

function attention(type) {
	return " ";
}

function getAttentionString(type) {
	return " ";
}

// DISTANCE MEASURE
function ogg_dist(distance) {
	return " ";
}