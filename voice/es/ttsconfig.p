% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('es').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) attention Type implementation
% ( ) special grammar: onto / on / to Street fur turn and follow commands
% (N/A) special grammar: nominative/dative for distance measure
% (X) special grammar: imperative/infinitive distinction for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% ( ) word order checked
% (X) Announcement of favorites, waypoints and pois along the route
% (X) Announcement when user returns back to route
% (X) Support announcement of railroad crossings and pedestrian crosswalks


% ROUTE CALCULATED
string('route_is.ogg', 'La ruta tiene').
string('route_calculate.ogg', 'Ruta recalculada ').
string('distance.ogg', ', distancia').

% LEFT/RIGHT
string('prepare.ogg', 'Prepárate para').
string('after.ogg', 'después de ').
string('in.ogg', 'en ').

string('left.ogg', 'gira a la izquierda').
string('left_sh.ogg', 'gira cerrado a la izquierda').
string('left_sl.ogg', 'gira levemente a la izquierda').
string('right.ogg', 'gira a la derecha').
string('right_sh.ogg', 'gira cerrado a la derecha').
string('right_sl.ogg', 'gira levemente a la derecha').
string('left_keep.ogg', 'mantente a la izquierda').
string('right_keep.ogg', 'mantente a la derecha').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

string('left_inf.ogg', 'girar a la izquierda').
string('left_sh_inf.ogg', 'girar cerrado a la izquierda').
string('left_sl_inf.ogg', 'girar levemente a la izquierda').
string('right_inf.ogg', 'girar a la derecha').
string('right_sh_inf.ogg', 'girar cerrado a la derecha').
string('right_sl_inf.ogg', 'girar levemente a la derecha').
string('left_keep_inf.ogg', 'mantenerte a la izquierda').
string('right_keep_inf.ogg', 'mantenerte a la derecha').

% U-TURNS

string('make_uturn.ogg', 'Da la vuelta').
string('make_uturn_wp.ogg', 'Cuando puedas, da la vuelta').

% ROUNDABOUTS
%string('prepare_roundabout.ogg', 'Prepárate para entrar en la rotonda después de').
string('prepare_roundabout.ogg', 'entra en la rotonda ').
string('roundabout.ogg', 'entra en la rotonda').
string('then.ogg', ', luego').
string('and.ogg', 'y').
string('take.ogg', 'toma la').
string('exit.ogg', 'salida').

string('1st.ogg', 'primera').
string('2nd.ogg', 'segunda').
string('3rd.ogg', 'tercera').
string('4th.ogg', 'cuarta').
string('5th.ogg', 'quinta').
string('6th.ogg', 'sexta').
string('7th.ogg', 'séptima').
string('8th.ogg', 'octava').
string('9th.ogg', 'novena').
string('10th.ogg', 'décima').
string('11th.ogg', 'undécima').
string('12th.ogg', 'duodécima').
string('13th.ogg', 'decimotercera').
string('14th.ogg', 'decimocuarta').
string('15th.ogg', 'decimoquinta').
string('16th.ogg', 'decimosexta').
string('17th.ogg', 'decimoséptima').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Continúa recto').
string('follow.ogg', 'Sigua la vía durante').

% ARRIVE
string('and_arrive_destination.ogg', 'y llegarás a tu destino').
string('reached_destination.ogg','has llegado a tu destino').
string('and_arrive_intermediate.ogg', 'y llegarás a tu punto intermedio').
string('reached_intermediate.ogg', 'has llegado a tu punto intermedio').
string('and_arrive_waypoint.ogg', 'y llegarás a tu punto G P X intermedio').
string('reached_waypoint.ogg', 'has llegado a tu punto G P X intermedio').

string('and_arrive_favorite.ogg', 'y llegarás a tu favorito ').
string('reached_favorite.ogg', 'has llegado a tu punto favorito ').
string('and_arrive_poi_waypoint.ogg', 'y llegarás al P D I ').

string('reached_poi.ogg', 'has llegado al P D I ').

% OTHER PROMPTS
string('attention.ogg', 'atención, ').
string('speed_camera.ogg', 'radar de velocidad ').
string('border_control.ogg', 'control fronterizo ').
string('railroad_crossing.ogg', 'paso a nivel ').
string('traffic_calming.ogg', 'reductor de velocidad ').
string('toll_booth.ogg', 'cabina de peaje ').
string('stop.ogg', 'señal de ESTOP ').
string('pedestrian_crosswalk.ogg', 'cruce de peatones ').

string('location_lost.ogg', 'señal G P S perdida').
string('location_recovered.ogg', 'señal G P S encontrada ').
string('off_route.ogg', 'te has desviado de la ruta').
string('back_on_route.ogg', 'has retomado la ruta').
string('exceed_limit.ogg', 'límite de velocidad excedido ').

% STREET NAME GRAMMAR
string('on.ogg', 'en').
string('to.ogg', 'hacia').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'metros').
string('around_1_kilometer.ogg', 'cerca de un kilómetro').
string('around.ogg', 'cerca de').
string('kilometers.ogg', 'kilómetros').

string('feet.ogg', 'pies').
string('1_tenth_of_a_mile.ogg', 'una décima de milla').
string('tenths_of_a_mile.ogg', 'décimas de milla').
string('around_1_mile.ogg', 'cerca de una milla').
string('miles.ogg', 'millas').

string('yards.ogg', 'yardas').

% TIME SUPPORT
string('time.ogg', 'tiempo necesario ').
string('1_hour.ogg', 'una hora ').
string('hours.ogg', 'horas ').
string('less_a_minute.ogg', 'menos de un minuto ').
string('1_minute.ogg', 'un minuto ').
string('minutes.ogg', 'minutos ').

% SPECIAL NUMBERS
string('20_and.ogg', 'veinti').

%% COMMAND BUILDING / WORD ORDER
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
bear_left(_Street) -- ['left_keep.ogg'].
bear_right(_Street) -- ['right_keep.ogg'].

turn_inf('left', ['left_inf.ogg']).
turn_inf('left_sh', ['left_sh_inf.ogg']).
turn_inf('left_sl', ['left_sl_inf.ogg']).
turn_inf('right', ['right_inf.ogg']).
turn_inf('right_sh', ['right_sh_inf.ogg']).
turn_inf('right_sl', ['right_sl_inf.ogg']).
turn_inf('left_keep', ['left_keep_inf.ogg']).
turn_inf('right_keep', ['right_keep_inf.ogg']).

% cut_part_street(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% cut_part_street(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%cut_part_street(voice([Ref, '', Dest], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Dest, Concat).
%cut_part_street(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 2 lines for Dest taking precedence over Name
cut_part_street(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
cut_part_street(voice([Ref, _, Dest], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Dest, Concat).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(Street, ['to.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(Street, ['to.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, _Street) -- ['prepare.ogg', M, 'after.ogg', D, ' '] :- distance(Dist) -- D, turn_inf(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen]  :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['after.ogg', D , 'prepare_roundabout.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['follow.ogg', D | Sgen]:- distance(Dist) -- D, follow_street(Street, Sgen).

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

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist) -- D.
speed_alarm -- ['exceed_limit.ogg'].
% attention(_Type) -- ['attention.ogg'].
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).

% TRAFFIC WARNINGS
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
nth(1, '1st.ogg').
nth(2, '2nd.ogg').
nth(3, '3rd.ogg').
nth(4, '4th.ogg').
nth(5, '5th.ogg').
nth(6, '6th.ogg').
nth(7, '7th.ogg').
nth(8, '8th.ogg').
nth(9, '9th.ogg').
nth(10, '10th.ogg').
nth(11, '11th.ogg').
nth(12, '12th.ogg').
nth(13, '13th.ogg').
nth(14, '14th.ogg').
nth(15, '15th.ogg').
nth(16, '16th.ogg').
nth(17, '17th.ogg').


%% resolve command main method
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
resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ((X -- L) -> append(L, Tail, List); List = Tail).


% handling alternatives
[X|_Y] -- T :- (X -- T),!.
[_X|Y] -- T :- (Y -- T).


pnumber(X, Y) :- tts, !, num_atom(X, Y).
pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
% time measure
hours(S, []) :- S < 60.
hours(S, ['1_hour.ogg']) :- S < 120, H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'hours.ogg']) :- H is S div 60, pnumber(H, Ogg).
time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, '1_minute.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [Ogg, 'minutes.ogg'] :- not(tts), Sec < 300, St is Sec/60, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, St is S mod 60, St > 0, hours(S, H), pnumber(St, Ogg).
time(Sec) -- [H] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60.


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'meters.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'meters.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- ['around.ogg', X, 'kilometers.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist) -- [ X, 'kilometers.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'feet.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- ['around.ogg', X, 'miles.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist) -- [ X, 'miles.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yards.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yards.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- ['around.ogg', X, 'miles.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist) -- [ X, 'miles.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).


interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 900, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).

dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 20, !, pnumber(X, Ogg).
dist(X, [Ogg]) :- X < 1000, 0 is X mod 50, !, num_atom(X, A), atom_concat(A, '.ogg', Ogg).
dist(D, ['20.ogg']) :- !.
dist(D, ['20_and.ogg'|L]) :- D < 30, Ts is D - 20, !, dist(Ts, L).
dist(D, ['30.ogg']) :- !.
dist(D, ['30.ogg', 'and.ogg'|L]) :- D < 40, Ts is D - 30, !, dist(Ts, L).
dist(D, ['40.ogg']) :- !.
dist(D, ['40.ogg', 'and.ogg'|L]) :- D < 50, Ts is D - 40, !, dist(Ts, L).
dist(D, ['50.ogg']) :- !.
dist(D, ['50.ogg', 'and.ogg'|L]) :- D < 60, Ts is D - 50, !, dist(Ts, L).
dist(D, ['60.ogg']) :- !.
dist(D, ['60.ogg', 'and.ogg'|L]) :- D < 70, Ts is D - 60, !, dist(Ts, L).
dist(D, ['70.ogg']) :- !.
dist(D, ['70.ogg', 'and.ogg'|L]) :- D < 80, Ts is D - 70, !, dist(Ts, L).
dist(D, ['80.ogg']) :- !.
dist(D, ['80.ogg', 'and.ogg'|L]) :- D < 90, Ts is D - 80, !, dist(Ts, L).
dist(D, ['90.ogg']) :- !.
dist(D, ['90.ogg', 'and.ogg'|L]) :- D < 100, Ts is D - 90, !, dist(Ts, L).
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
