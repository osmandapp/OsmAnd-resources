% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('cs').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
% (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
% (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM
% (X) Other prompts: gps lost, off route, back to route
% (X) Street name and prepositions (onto / on / to) and street destination (toward) support
% (X) Distance unit support (meters / feet / yard)
% (X) Special grammar: nth(nominative/instrumental), distance(accusative/locative/workaround), special plural 1 2 3_4


%% STRINGS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ROUTE CALCULATED
string('route_is.ogg', 'cesta je dlouhá ').
string('route_calculate.ogg', 'přepočítávám').
string('distance.ogg', '. cesta je dlouhá ').

% LEFT/RIGHT
%string('prepare.ogg', 'budete odbočovat ').
string('after.ogg', 'po ').
string('in.ogg', 'v ').

string('left.ogg', 'odbočte vlevo ').
string('left_sh.ogg', 'odbočte ostře vlevo ').
string('left_sl.ogg', 'odbočte mírně vlevo ').
string('right.ogg', 'odbočte vpravo ').
string('right_sh.ogg', 'odbočte ostře vpravo ').
string('right_sl.ogg', 'odbočte mírně vpravo ').
string('left_keep.ogg', 'držte se vlevo ').
string('right_keep.ogg', 'držte se vpravo ').
string('left_bear.ogg', 'se držte vlevo ').    % in English the same as left_keep, may be different in other languages
string('right_bear.ogg', 'se držte vpravo ').  % in English the same as right_keep, may be different in other languages

% U-TURNS
%string('prepare_make_uturn.ogg', 'se budete otáčet zpět ').
string('make_uturn.ogg', 'se otočte zpět ').
string('make_uturn2.ogg', 'otočte se zpět ').
string('make_uturn_wp.ogg', 'vraťte se jakmile to bude možné ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'přijedete na kruhový objezd ').
string('roundabout.ogg', 'vjeďte na kruhový objezd ').
string('then.ogg', ', pak ').
string('and.ogg', 'a ').
string('take.ogg', 'a zvolte ').
string('take2.ogg', 'vyjeďte ').
string('exit.ogg', 'výjezd ').
string('exit2.ogg', 'výjezdem ').

string('1st.ogg', 'první ').
string('2nd.ogg', 'druhý ').
string('3rd.ogg', 'třetí ').
string('4th.ogg', 'čtvrtý ').
string('5th.ogg', 'pátý ').
string('6th.ogg', 'šestý ').
string('7th.ogg', 'sedmý ').
string('8th.ogg', 'osmý ').
string('9th.ogg', 'devátý ').
string('10th.ogg', 'desátý ').
string('11th.ogg', 'jedenáctý ').
string('12th.ogg', 'dvanáctý ').
string('13th.ogg', 'třináctý ').
string('14th.ogg', 'čtrnáctý ').
string('15th.ogg', 'patnáctý ').
string('16th.ogg', 'šestnáctý ').
string('17th.ogg', 'sedmnáctý ').

string('1st_inst.ogg', 'prvním ').
string('2nd_inst.ogg', 'druhým ').
string('3rd_inst.ogg', 'třetím ').
string('4th_inst.ogg', 'čtvrtým ').
string('5th_inst.ogg', 'pátým ').
string('6th_inst.ogg', 'šestým ').
string('7th_inst.ogg', 'sedmým ').
string('8th_inst.ogg', 'osmým ').
string('9th_inst.ogg', 'devátým ').
string('10th_inst.ogg', 'desátým ').
string('11th_inst.ogg', 'jedenáctým ').
string('12th_inst.ogg', 'dvanáctým ').
string('13th_inst.ogg', 'třináctým ').
string('14th_inst.ogg', 'čtrnáctým ').
string('15th_inst.ogg', 'patnáctým ').
string('16th_inst.ogg', 'šestnáctým ').
string('17th_inst.ogg', 'sedmnáctým ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'pokračujte rovně ').
string('go_ahead_m.ogg', 'pokračujte ').

% ARRIVE
string('and_arrive_destination.ogg', 'a dorazíte do cíle ').
string('reached_destination.ogg', 'dorazili jste do cíle ').
string('and_arrive_intermediate.ogg', 'a dorazíte do mezicíle ').
string('reached_intermediate.ogg', 'dorazili jste do mezicíle ').

% NEARBY POINTS
string('and_arrive_waypoint.ogg', 'a projedete GPX mezicílem ').
string('reached_waypoint.ogg', 'projeli jste GPX mezicílem ').
string('and_arrive_favorite.ogg', 'a projedete oblíbeným bodem ').
string('reached_favorite.ogg', 'projeli jste oblíbeným bodem ').
string('and_arrive_poi.ogg', 'a projedete bodem zájmu ').
string('reached_poi.ogg', 'projeli jste bodem zájmu ').

% ATTENTION
%string('exceed_limit.ogg', 'překračujete povolenou rychlost ').
string('exceed_limit.ogg', 'povolenou rychlost ').
string('attention.ogg', 'pozor, ').
string('speed_camera.ogg', 'rychlostní radar ').
string('border_control.ogg', 'hraniční kontrola ').
string('railroad_crossing.ogg', 'železniční přejezd ').
string('traffic_calming.ogg', 'retardér ').
string('toll_booth.ogg', 'mýtná brána ').
string('stop.ogg', 'značka stop ').
string('pedestrian_crosswalk.ogg', 'přechod pro chodce ').

% OTHER PROMPTS
string('location_lost.ogg', 'g p s signal lost ').
string('location_recovered.ogg', 'g p s signal recovered ').
string('off_route.ogg', 'odchylujete se z trasy o ').
string('back_on_route.ogg', 'vrátili jste se zpět na trasu ').

% STREET NAME PREPOSITIONS
string('onto.ogg', 'na ').
string('on.ogg', 'na ').
string('to.ogg', 'na ').
string('toward.ogg', 'k ').

% DISTANCE UNIT SUPPORT
string('meters_accusative.ogg', 'metrů ').
string('around_1_kilometer_accusative.ogg', 'přibližně jeden kilometr ').
string('around.ogg', 'přibližně ').
string('kilometers_accusative2.ogg', 'dva kilometry ').
string('kilometers_accusative3_4.ogg', 'kilometry ').
string('kilometers_accusative5.ogg', 'kilometrů ').

string('meters_locative.ogg', 'metrech ').
string('around_1_kilometer_locative.ogg', 'přibližně jednom kilometru ').
string('kilometers_locative.ogg', 'kilometrech ').
string('kilometers_locative2.ogg', 'dvou kilometrech ').

string('farther_workaround.ogg', 'dál ').
string('around_workaround.ogg', 'dál přibližně ').

string('feet_accusative.ogg', 'stop ').
string('1_tenth_of_a_mile_accusative.ogg', 'desetinu míle ').
string('tenths_of_a_mile_accusative.ogg', 'desetiny míle ').
string('around_1_mile_accusative.ogg', 'přibližně jednu míli ').
string('miles_accusative.ogg', 'mil ').

string('feet_locative.ogg', 'stopách ').
string('1_tenth_of_a_mile_locative.ogg', 'desetině míle ').
string('tenths_of_a_mile_locative.ogg', 'desetinách míle ').
string('around_1_mile_locative.ogg', 'přibližně jedné míli ').
string('miles_locative.ogg', 'mílích ').

string('yards_accusative.ogg', 'yardů ').
string('yards_locative.ogg', 'yardech ').

% TIME SUPPORT
string('time.ogg', 'potřebná doba ').
string('1_hour.ogg', 'jedna hodina ').
string('2_hours.ogg', 'dvě hodiny ').
string('3_4_hours.ogg', 'hodiny ').
string('hours.ogg', 'hodin ').
string('less_a_minute.ogg', 'méně než jedna minuta ').
string('1_minute.ogg', 'jedna minuta ').
string('2_minutes.ogg', 'dvě minuty ').
string('3_4_minutes.ogg', 'minuty ').
string('minutes.ogg', 'minut ').


%% COMMAND BUILDING / WORD ORDER
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist, accusative) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist, accusative) -- D, time(Time) -- T.

turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
% Note: turn('left_keep'/'right_keep',[]) is a turn type aiding lane selection, while bear_left()/bear_right() is triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages turn(l/r_keep) may not differ from bear_l/r:
bear_left(_Street) -- ['left_bear.ogg'].
bear_right(_Street) -- ['right_bear.ogg'].

% assemble_street_name(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% assemble_street_name(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%assemble_street_name(voice([Ref, '', Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).
%assemble_street_name(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 3 lines for Dest taking precedence over Name
assemble_street_name(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
assemble_street_name(voice(['', Name, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Name, ' ', C1).
assemble_street_name(voice([Ref, _, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(voice(['', '', D], _), ['toward.ogg', D]) :- tts.
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, '', _],[R, _, _]), assemble_street_name(Street, SName).
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(voice(['', '', D], _), ['to.ogg', D]) :- tts.
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, '', _],[R, _, _]), assemble_street_name(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist, locative) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist, locative) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist, locative) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['in.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist, locative) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn2.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['after.ogg', D , 'prepare_roundabout.ogg'] :- distance(Dist, locative) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['in.ogg', D, 'roundabout.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist, locative) -- D, nth(Exit, nominative, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take2.ogg', E, 'exit2.ogg' | Sgen] :- nth(Exit, instrumental, E), turn_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['go_ahead_m.ogg', D | Sgen] :- distance(Dist, workaround) -- D, follow_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).

and_arrive_destination(D) -- ['and_arrive_destination.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg'|Ds] :- name(D, Ds).

and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg'|Ds] :- name(D, Ds).
and_arrive_favorite(D) -- ['and_arrive_favorite.ogg'|Ds] :- name(D, Ds).
reached_favorite(D) -- ['reached_favorite.ogg'|Ds] :- name(D, Ds).
and_arrive_poi(D) -- ['and_arrive_poi.ogg'|Ds] :- name(D, Ds).
reached_poi(D) -- ['reached_poi.ogg'|Ds] :- name(D, Ds).

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist, accusative) -- D.
back_on_route -- ['back_on_route.ogg'].

% TRAFFIC WARNINGS
speed_alarm(MaxSpeed, _Speed) -- ['exceed_limit.ogg', I] :- pnumber(MaxSpeed, I).
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).
warning('SPEED_CAMERA', 'speed_camera.ogg').
warning('SPEED_LIMIT', '').
warning('BORDER_CONTROL', 'border_control.ogg').
warning('RAILWAY', 'railroad_crossing.ogg').
warning('TRAFFIC_CALMING', 'traffic_calming.ogg').
warning('TOLL_BOOTH', 'toll_booth.ogg').
warning('STOP', 'stop.ogg').
warning('PEDESTRIAN', 'pedestrian_crosswalk.ogg').
warning('MAXIMUM', '').
warning(Type, '') :- not(Type = 'SPEED_CAMERA'; Type = 'SPEED_LIMIT'; Type = 'BORDER_CONTROL'; Type = 'RAILWAY'; Type = 'TRAFFIC_CALMING'; Type = 'TOLL_BOOTH'; Type = 'STOP'; Type = 'PEDESTRIAN'; Type = 'MAXIMUM').


%% 
nth(1, nominative, '1st.ogg').
nth(1, instrumental, '1st_inst.ogg').
nth(2, nominative, '2nd.ogg').
nth(2, instrumental, '2nd_inst.ogg').
nth(3, nominative, '3rd.ogg').
nth(3, instrumental, '3rd_inst.ogg').
nth(4, nominative, '4th.ogg').
nth(4, instrumental, '4th_inst.ogg').
nth(5, nominative, '5th.ogg').
nth(5, instrumental, '5th_inst.ogg').
nth(6, nominative, '6th.ogg').
nth(6, instrumental, '6th_inst.ogg').
nth(7, nominative, '7th.ogg').
nth(7, instrumental, '7th_inst.ogg').
nth(8, nominative, '8th.ogg').
nth(8, instrumental, '8th_inst.ogg').
nth(9, nominative, '9th.ogg').
nth(9, instrumental, '9th_inst.ogg').
nth(10, nominative, '10th.ogg').
nth(10, instrumental, '10th_inst.ogg').
nth(11, nominative, '11th.ogg').
nth(11, instrumental, '11th_inst.ogg').
nth(12, nominative, '12th.ogg').
nth(12, instrumental, '12th_inst.ogg').
nth(13, nominative, '13th.ogg').
nth(13, instrumental, '13th_inst.ogg').
nth(14, nominative, '14th.ogg').
nth(14, instrumental, '14th_inst.ogg').
nth(15, nominative, '15th.ogg').
nth(15, instrumental, '15th_inst.ogg').
nth(16, nominative, '16th.ogg').
nth(16, instrumental, '16th_inst.ogg').
nth(17, nominative, '17th.ogg').
nth(17, instrumental, '17th_inst.ogg').


%% command main method
%% if you are familar with Prolog you can input specific to the whole mechanism,
%% by adding exception cases.

flatten(X, Y) :- flatten(X, [], Y), !.
flatten([], Acc, Acc).
flatten([X|Y], Acc, Res):- flatten(Y, Acc, R), flatten(X, R, Res).
flatten(X, Acc, [X|Acc]) :- version(J), J < 100, !.
flatten(X, Acc, [Y|Acc]) :- string(X, Y), !.
flatten(X, Acc, [X|Acc]).

resolve(X, Y) :- resolve_impl(X,Z), flatten(Z, Y).
resolve_impl([],[]).
resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ('--'(X, L) -> append(L, Tail, List); List = Tail).


% handling alternatives
[X|_Y] -- T :- (X -- T),!.
[_X|Y] -- T :- (Y -- T).


pnumber(X, Y) :- tts, !, num_atom(X, Y).
pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
pnumber_loc(X, Ogg) :- num_atom(X, A), atom_concat(A, '_loc.ogg', Ogg).

% time measure
hours(S, []) :- S < 60.
hours(S, ['1_hour.ogg']) :- S < 120, H is S div 60, pnumber(H, Ogg).
hours(S, ['2_hours.ogg']) :- S < 180, H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, '3_4_hours.ogg']) :- S < 300, H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'hours.ogg']) :- H is S div 60, pnumber(H, Ogg).
time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- ['1_minute.ogg'] :- Sec < 90.
time(Sec) -- ['2_minutes.ogg'] :- Sec < 150.
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, '1_minute.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1.
time(Sec) -- [H, '2_minutes.ogg']  :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 2.
time(Sec) -- [H, Ogg, '3_4_minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St < 5, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [Ogg, '3_4_minutes.ogg'] :- not(tts), Sec < 270, St is round(Sec/60.0), pnumber(St, Ogg).
time(Sec) -- [Ogg, 'minutes.ogg'] :- not(tts), Sec < 1230, St is round(Sec/60.0), pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, St is S mod 60, St > 0, hours(S, H), pnumber(St, Ogg).
time(Sec) -- [H] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60.

%%% distance measure
distance(Dist, Y) -- D :- measure('km-m'), distance_km(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-f'), distance_mi_f(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-y'), distance_mi_y(Dist, Y) -- D.

%%% distance measure km/m
distance_km(Dist, workaround) -- ['farther_workaround.ogg', X, 'meters_accusative.ogg']                    :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, accusative) -- [ X, 'meters_accusative.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, locative) --   [ X, 'meters_locative.ogg']                    :- Dist < 100,   D is round(Dist/10.0)*10,           dist_loc(D, X).
distance_km(Dist, workaround) -- ['farther_workaround.ogg', X, 'meters_accusative.ogg']                    :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, accusative) -- [ X, 'meters_accusative.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, locative) --   [ X, 'meters_locative.ogg']                    :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist_loc(D, X).
distance_km(Dist, workaround) -- ['around_1_kilometer_accusative.ogg']          :- Dist < 1500.
distance_km(Dist, accusative) -- ['around_1_kilometer_accusative.ogg']          :- Dist < 1500.
distance_km(Dist, locative) --   ['around_1_kilometer_locative.ogg']            :- Dist < 1500.
distance_km(Dist, accusative) -- ['kilometers_accusative2.ogg']                 :- Dist < 2500.
distance_km(Dist, locative)   -- ['kilometers_locative2.ogg']                   :- Dist < 2500.
distance_km(Dist, workaround) -- ['around_workaround.ogg', X, 'kilometers_accusative3_4.ogg']   :- Dist < 4500, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, accusative) -- ['around.ogg', X, 'kilometers_accusative3_4.ogg'] :- Dist < 4500, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, locative) --   ['around.ogg', X, 'kilometers_locative.ogg']   :- Dist < 4500, D is round(Dist/1000.0),            dist_loc(D, X).
distance_km(Dist, workaround) -- ['around_workaround.ogg', X, 'kilometers_accusative5.ogg']   :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, accusative) -- ['around.ogg', X, 'kilometers_accusative5.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, locative) --   ['around.ogg', X, 'kilometers_locative.ogg']   :- Dist < 10000, D is round(Dist/1000.0),            dist_loc(D, X).
distance_km(Dist, workaround) -- ['farther_workaround.ogg', X, 'kilometers_accusative5.ogg']                :-               D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, accusative) -- [ X, 'kilometers_accusative5.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, locative) --   [ X, 'kilometers_locative.ogg']                :-               D is round(Dist/1000.0),            dist_loc(D, X).

%%% distance measure mi/f
distance_mi_f(Dist, accusative) -- [ X, 'feet_accusative.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, locative) --   [ X, 'feet_locative.ogg']                    :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, accusative) -- ['1_tenth_of_a_mile_accusative.ogg']         :- Dist < 241.
distance_mi_f(Dist, locative) --   ['1_tenth_of_a_mile_locative.ogg']           :- Dist < 241.
distance_mi_f(Dist, accusative) -- [ X, 'tenths_of_a_mile_accusative.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, locative) --   [ X, 'tenths_of_a_mile_locative.ogg']        :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, accusative) -- ['around_1_mile_accusative.ogg']             :- Dist < 2414.
distance_mi_f(Dist, locative) --   ['around_1_mile_locative.ogg']               :- Dist < 2414.
distance_mi_f(Dist, accusative) -- ['around.ogg', X, 'miles_accusative.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, locative) --   ['around.ogg', X, 'miles_locative.ogg']      :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, accusative) -- [ X, 'miles_accusative.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, locative) --   [ X, 'miles_locative.ogg']                   :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist, accusative) -- [ X, 'yards_accusative.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, locative) --   [ X, 'yards_locative.ogg']                   :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, accusative) -- [ X, 'yards_accusative.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, locative) --   [ X, 'yards_locative.ogg']                   :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, accusative) -- ['around_1_mile_accusative.ogg']             :- Dist < 2414.
distance_mi_y(Dist, locative) --   ['around_1_mile_locative.ogg']               :- Dist < 2414.
distance_mi_y(Dist, accusative) -- ['around.ogg', X, 'miles_accusative.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, locative) --   ['around.ogg', X, 'miles_locative.ogg']      :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, accusative) -- [ X, 'miles_accusative.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, locative) --   [ X, 'miles_locative.ogg']                   :-               D is round(Dist/1609.0),            dist(D, X).


interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 900, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).

% NUMBERS LOCATIVE
string('1_loc.ogg', 'jednom ').
string('2_loc.ogg', 'dvou ').
string('3_loc.ogg', 'třech ').
string('4_loc.ogg', 'čtyřech ').
string('5_loc.ogg', 'pěti ').
string('6_loc.ogg', 'šesti ').
string('7_loc.ogg', 'sedmi ').
string('8_loc.ogg', 'osmi ').
string('9_loc.ogg', 'devíti ').
string('10_loc.ogg', 'deseti ').
string('11_loc.ogg', 'jedenácti ').
string('12_loc.ogg', 'dvanácti ').
string('13_loc.ogg', 'třinácti ').
string('14_loc.ogg', 'čtrnácti ').
string('15_loc.ogg', 'patnácti ').
string('16_loc.ogg', 'šestnácti ').
string('17_loc.ogg', 'sedmnácti ').
string('18_loc.ogg', 'osmnácti ').
string('19_loc.ogg', 'devatenácti ').
string('20_loc.ogg', 'dvaceti ').
string('25_loc.ogg', 'dvaceti pěti ').
string('30_loc.ogg', 'třiceti ').
string('35_loc.ogg', 'třiceti pěti ').
string('40_loc.ogg', 'čtyřiceti ').
string('45_loc.ogg', 'čtyřiceti pěti ').
string('50_loc.ogg', 'padesáti ').
string('55_loc.ogg', 'padesáti pěti ').
string('60_loc.ogg', 'šedesáti ').
string('65_loc.ogg', 'šedesáti pěti ').
string('70_loc.ogg', 'sedmdesáti ').
string('75_loc.ogg', 'sedmdesáti pěti ').
string('80_loc.ogg', 'osmdesáti ').
string('85_loc.ogg', 'osmdesáti pěti ').
string('90_loc.ogg', 'devadesáti ').
string('95_loc.ogg', 'devadesáti pěti ').
% note: 'sto' sounds probably better than 'stu' but 'stu' is correct according to the Czech spelling rules.
string('100_loc.ogg', 'stu ').
string('150_loc.ogg', 'stu padesáti ').
string('200_loc.ogg', 'dvou stech ').
string('250_loc.ogg', 'dvou stech padesáti ').
string('300_loc.ogg', 'třech stech ').
string('350_loc.ogg', 'třech stech padesáti ').
string('400_loc.ogg', 'čtyřech stech ').
string('450_loc.ogg', 'čtyřech stech padesáti ').
string('500_loc.ogg', 'pěti stech ').
string('550_loc.ogg', 'pěti stech padesáti ').
string('600_loc.ogg', 'šesti stech ').
string('650_loc.ogg', 'šesti stech padesáti ').
string('700_loc.ogg', 'sedmi stech ').
string('750_loc.ogg', 'sedmi stech padesáti ').
string('800_loc.ogg', 'osmi stech ').
string('850_loc.ogg', 'osmi stech padesáti ').
string('900_loc.ogg', 'devíti stech ').
string('950_loc.ogg', 'devíti stech padesáti ').
string('1000_loc.ogg', 'tisíci ').
string('2000_loc.ogg', 'dvou tisících ').
string('3000_loc.ogg', 'třech tisících ').
string('4000_loc.ogg', 'čtyřech tisících ').
string('5000_loc.ogg', 'pěti tisících ').
string('6000_loc.ogg', 'šesti tisících ').
string('7000_loc.ogg', 'sedmi tisících ').
string('8000_loc.ogg', 'osmi tisících ').
string('9000_loc.ogg', 'devíti tisících ').


dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 20, !, pnumber(X, Ogg).
dist(X, [Ogg]) :- X < 1000, 0 is X mod 50, !, num_atom(X, A), atom_concat(A, '.ogg', Ogg).
dist(D, ['20.ogg'|L]) :-  D < 30, Ts is D - 20, !, dist(Ts, L).
dist(D, ['30.ogg'|L]) :-  D < 40, Ts is D - 30, !, dist(Ts, L).
dist(D, ['40.ogg'|L]) :-  D < 50, Ts is D - 40, !, dist(Ts, L).
dist(D, ['50.ogg'|L]) :-  D < 60, Ts is D - 50, !, dist(Ts, L).
dist(D, ['60.ogg'|L]) :-  D < 70, Ts is D - 60, !, dist(Ts, L).
dist(D, ['70.ogg'|L]) :-  D < 80, Ts is D - 70, !, dist(Ts, L).
dist(D, ['80.ogg'|L]) :-  D < 90, Ts is D - 80, !, dist(Ts, L).
dist(D, ['90.ogg'|L]) :-  D < 100, Ts is D - 90, !, dist(Ts, L).
dist(D, ['100.ogg'|L]) :-  D < 200, Ts is D - 100, !, dist(Ts, L).
dist(D, ['200.ogg'|L]) :-  D < 300, Ts is D - 200, !, dist(Ts, L).
dist(D, ['300.ogg'|L]) :-  D < 400, Ts is D - 300, !, dist(Ts, L).
dist(D, ['400.ogg'|L]) :-  D < 500, Ts is D - 400, !, dist(Ts, L).
dist(D, ['500.ogg'|L]) :-  D < 600, Ts is D - 500, !, dist(Ts, L).
dist(D, ['600.ogg'|L]) :-  D < 700, Ts is D - 600, !, dist(Ts, L).
dist(D, ['700.ogg'|L]) :-  D < 800, Ts is D - 700, !, dist(Ts, L).
dist(D, ['800.ogg'|L]) :-  D < 900, Ts is D - 800, !, dist(Ts, L).
dist(D, ['900.ogg'|L]) :-  D < 1000, Ts is D - 900, !, dist(Ts, L).
dist(D, ['1000.ogg'|L]):- Ts is D - 1000, !, dist(Ts, L).

%% HANDLE LOCATIVE IN DISTANCE NUMERALS

dist_loc(0, []) :- !.
dist_loc(X, [Ogg]) :- X < 20, !, pnumber_loc(X, Ogg).
dist_loc(X, [Ogg]) :- X < 1000, 0 is X mod 50, !, num_atom(X, A), atom_concat(A, '_loc.ogg', Ogg).
dist_loc(D, ['20_loc.ogg'|L]) :-  D < 30, Ts is D - 20, !, dist_loc(Ts, L).
dist_loc(D, ['30_loc.ogg'|L]) :-  D < 40, Ts is D - 30, !, dist_loc(Ts, L).
dist_loc(D, ['40_loc.ogg'|L]) :-  D < 50, Ts is D - 40, !, dist_loc(Ts, L).
dist_loc(D, ['50_loc.ogg'|L]) :-  D < 60, Ts is D - 50, !, dist_loc(Ts, L).
dist_loc(D, ['60_loc.ogg'|L]) :-  D < 70, Ts is D - 60, !, dist_loc(Ts, L).
dist_loc(D, ['70_loc.ogg'|L]) :-  D < 80, Ts is D - 70, !, dist_loc(Ts, L).
dist_loc(D, ['80_loc.ogg'|L]) :-  D < 90, Ts is D - 80, !, dist_loc(Ts, L).
dist_loc(D, ['90_loc.ogg'|L]) :-  D < 100, Ts is D - 90, !, dist_loc(Ts, L).
dist_loc(D, ['100_loc.ogg'|L]) :-  D < 200, Ts is D - 100, !, dist_loc(Ts, L).
dist_loc(D, ['200_loc.ogg'|L]) :-  D < 300, Ts is D - 200, !, dist_loc(Ts, L).
dist_loc(D, ['300_loc.ogg'|L]) :-  D < 400, Ts is D - 300, !, dist_loc(Ts, L).
dist_loc(D, ['400_loc.ogg'|L]) :-  D < 500, Ts is D - 400, !, dist_loc(Ts, L).
dist_loc(D, ['500_loc.ogg'|L]) :-  D < 600, Ts is D - 500, !, dist_loc(Ts, L).
dist_loc(D, ['600_loc.ogg'|L]) :-  D < 700, Ts is D - 600, !, dist_loc(Ts, L).
dist_loc(D, ['700_loc.ogg'|L]) :-  D < 800, Ts is D - 700, !, dist_loc(Ts, L).
dist_loc(D, ['800_loc.ogg'|L]) :-  D < 900, Ts is D - 800, !, dist_loc(Ts, L).
dist_loc(D, ['900_loc.ogg'|L]) :-  D < 1000, Ts is D - 900, !, dist_loc(Ts, L).
dist_loc(D, ['1000_loc.ogg'|L]):- Ts is D - 1000, !, dist_loc(Ts, L).
