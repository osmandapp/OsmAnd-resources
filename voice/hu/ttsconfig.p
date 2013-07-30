% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('hu').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES:
% (X) new Version 1.5 format
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (N/A) special grammar: onto_street / on_street / to_street
% (X) special grammar: nom/acc for distance measure
% (N/A) special grammar: imperative/infinitive distincion for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% ( ) word order checked. Grammar also needs checking and some translations are not very precise.


% ROUTE CALCULATED
string('route_is1.ogg', 'Az útvonal  ').
string('route_calculate.ogg', 'útvonal újratervezése, az útvonal ').

% LEFT/RIGHT
string('left.ogg', 'fordulj balra ').
string('left_sh.ogg', 'fordulj élesen balra ').
string('left_sl.ogg', 'fordulj enyhén balra ').
string('right.ogg', 'fordulj jobbra ').
string('right_sh.ogg', 'fordulj élesen jobbra ').
string('right_sl.ogg', 'fordulj enyhén jobbra ').
string('left_keep.ogg', 'tarts balra ').
string('right_keep.ogg', 'tarts jobbra ').

% U-TURNS
string('prepare_make_uturn.ogg', 'múlva készülj fel a visszafordulásra ').
string('make_uturn1.ogg', 'múlva fordulj vissza ').
string('make_uturn2.ogg', 'Fordulj vissza ').
string('make_uturn_wp.ogg', 'Fordulj vissza ').
string('after.ogg', 'múlva ').
string('prepare.ogg', ' ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'múlva hajts be a körforgalomba ').
string('roundabout.ogg', 'múlva a körforgalomból ').
string('roundabout2.ogg', 'kijáraton hajts ki').
string('then.ogg', 'majd ').
string('and.ogg', ' ').
string('take.ogg', 'hajts ki ').
string('exit.ogg', 'kijáraton ').

string('1st.ogg', 'az első ').
string('2nd.ogg', 'a második ').
string('3rd.ogg', 'a harmadik ').
string('4th.ogg', 'a negyedik ').
string('5th.ogg', 'az ötödik ').
string('6th.ogg', 'a hatodik ').
string('7th.ogg', 'a hetedik ').
string('8th.ogg', 'a nyolcadik ').
string('9th.ogg', 'a kilencedik ').
string('10th.ogg', 'a tizedik ').
string('11th.ogg', 'a tizenegyedik ').
string('12th.ogg', 'a tizenkettedik ').
string('13th.ogg', 'a tizenharmadik ').
string('14th.ogg', 'a tizennegyedik ').
string('15th.ogg', 'a tizenötödik ').
string('16th.ogg', 'a tizenhatodik ').
string('17th.ogg', 'a tizenhetedik ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Haladj tovább egyenesen ').
string('follow1.ogg', 'Menj tovább ').

% ARRIVE
string('and_arrive_destination.ogg', 'és megérkezel az uticélhoz. ').
string('reached_destination.ogg','megérkeztél az uticélhoz ').
string('and_arrive_intermediate.ogg', 'és megérkezel a köztes célponthoz. ').
string('reached_intermediate.ogg', 'megérkeztél a köztes célponthoz ').
string('and_arrive_waypoint.ogg', 'és megérkezel a köztes célponthoz G P X ').
string('reached_waypoint.ogg', 'megérkeztél a köztes célponthoz G P X ').

% OTHER PROMPTS
string('attention.ogg', 'figyelem, ').
string('location_lost.ogg', 'nem található dzsípíesz pozíció ').
string('off_route.ogg', 'Ön letért a tervezett útvonalról ').
string('exceed_limit.ogg', 'akkor meghaladja a megengedett sebességet ').

% STREET NAME GRAMMAR
string('onto.ogg', 'a ').

% DISTANCE UNIT SUPPORT
string('meters_nom.ogg', 'méter ').
string('meters_acc.ogg', 'métert ').
string('around_1_kilometer_nom.ogg', 'körülbelül 1 kilométer ').
string('around_1_kilometer_acc.ogg', 'körülbelül 1 kilométert ').
string('around.ogg', 'mintegy ').
string('kilometers_nom.ogg', 'kilométer ').
string('kilometers_acc.ogg', 'kilométert ').

string('feet_nom.ogg', 'felhajtás ').
string('feet_acc.ogg', 'felhajtás ').
string('1_tenth_of_a_mile_nom.ogg', 'egytized mérföld ').
string('1_tenth_of_a_mile_acc.ogg', 'egytized mérföld ').
string('tenths_of_a_mile_nom.ogg', 'tizede egy mérföld ').
string('tenths_of_a_mile_acc.ogg', 'tizede egy mérföld ').
string('around_1_mile_nom.ogg', 'körülbelül egy mérföld ').
string('around_1_mile_acc.ogg', 'körülbelül egy mérföld ').
string('miles_nom.ogg', 'mérföld ').
string('miles_acc.ogg', 'mérföld ').

string('yards_nom.ogg', 'yard ').
string('yards_acc.ogg', 'yard ').

% TIME SUPPORT
string('time.ogg', ', szükséges idő ').
string('1_hour.ogg', 'egy óra ').
string('hours.ogg', 'óra ').
string('less_a_minute.ogg', 'kevesebb, mint egy perc alatt ').
string('1_minute.ogg', 'egy perc ').
string('minutes.ogg', 'perc ').


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

onto_street('', []).
onto_street(Street, ['onto.ogg', Street]) :- tts.
onto_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- [D, 'after.ogg', M | Sgen] :- distance(Dist, nom) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- [D, 'after.ogg', M | Sgen] :- distance(Dist, nom) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare_make_uturn.ogg' | Sgen] :- distance(Dist, nom) -- D, onto_street(Street, Sgen).
make_ut(Dist, Street) --  [D, 'make_uturn1.ogg' | Sgen] :- distance(Dist, nom) -- D, onto_street(Street, Sgen).
make_ut(Street) -- ['make_uturn2.ogg' | Sgen] :- onto_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- [D, 'prepare_roundabout.ogg'] :- distance(Dist, nom) -- D.
roundabout(Dist, _Angle, Exit, Street) -- [D, 'roundabout.ogg', E, 'roundabout2.ogg' | Sgen] :- distance(Dist, nom) -- D, nth(Exit, E), onto_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), onto_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['follow1.ogg', D | Sgen]:- distance(Dist, acc) -- D, onto_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['and_arrive_destination.ogg', Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg', Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg', Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg', Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg', Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg', Ds] :- name(D, Ds).

route_new_calc(Dist, Time) -- ['route_is1.ogg', D, 'time.ogg', T] :- distance(Dist, nom) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', D, 'time.ogg', T] :- distance(Dist, nom) -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist, nom) -- D.
attention(_Type) -- ['attention.ogg'].
speed_alarm -- ['exceed_limit.ogg'].


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
time(Sec) -- [H, '1_minute.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60, pnumber(St, Ogg).


%%% distance measure
distance(Dist, Y) -- D :- measure('km-m'), distance_km(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-f'), distance_mi_f(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-y'), distance_mi_y(Dist, Y) -- D.

%%% distance measure km/m
distance_km(Dist, nom) -- [ X, 'meters_nom.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, acc) -- [ X, 'meters_acc.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, nom) -- [ X, 'meters_nom.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, acc) -- [ X, 'meters_acc.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, nom) -- ['around_1_kilometer_nom.ogg']          :- Dist < 1500.
distance_km(Dist, acc) -- ['around_1_kilometer_acc.ogg']          :- Dist < 1500.
distance_km(Dist, nom) -- ['around.ogg', X, 'kilometers_nom.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, acc) -- ['around.ogg', X, 'kilometers_acc.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, nom) -- [ X, 'kilometers_nom.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, acc) -- [ X, 'kilometers_acc.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist, nom) -- [ X, 'feet_nom.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, acc) -- [ X, 'feet_acc.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, nom) -- ['1_tenth_of_a_mile_nom.ogg']         :- Dist < 241.
distance_mi_f(Dist, acc) -- ['1_tenth_of_a_mile_acc.ogg']         :- Dist < 241.
distance_mi_f(Dist, nom) -- [ X, 'tenths_of_a_mile_nom.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, acc) -- [ X, 'tenths_of_a_mile_acc.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, nom) -- ['around_1_mile_nom.ogg']             :- Dist < 2414.
distance_mi_f(Dist, acc) -- ['around_1_mile_acc.ogg']             :- Dist < 2414.
distance_mi_f(Dist, nom) -- ['around.ogg', X, 'miles_nom.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, acc) -- ['around.ogg', X, 'miles_acc.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, nom) -- [ X, 'miles_nom.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, acc) -- [ X, 'miles_acc.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist, nom) -- [ X, 'yards_nom.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, acc) -- [ X, 'yards_acc.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, nom) -- [ X, 'yards_nom.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, acc) -- [ X, 'yards_acc.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, nom) -- ['around_1_mile_nom.ogg']             :- Dist < 2414.
distance_mi_y(Dist, acc) -- ['around_1_mile_acc.ogg']             :- Dist < 2414.
distance_mi_y(Dist, nom) -- ['around.ogg', X, 'miles_nom.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, acc) -- ['around.ogg', X, 'miles_acc.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, nom) -- [ X, 'miles_nom.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, acc) -- [ X, 'miles_acc.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).


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
