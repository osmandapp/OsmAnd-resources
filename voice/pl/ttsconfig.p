% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('pl').
fest_language('cmu_us_awb_arctic_clunits').

% IMPLEMENTED (X) or MISSING ( ) FEATURES:
% (X) new Version 1.5 format
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention(without Type implementation), location lost, off_route, exceed speed limit
% (N/A) special grammar: onto_street / on_street / to_street
% (N/A) special grammar: nominative/dativ for distance measure
% (N/A) special grammar: imperative/infinitive distincion for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (deliberitely not in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% ( ) Time announcement for new route
% (X) word order checked


% ROUTE CALCULATED
string('route_is.ogg', 'Długość trasy to ').
string('route_calculate.ogg', 'Nowa trasa wyznaczona, jej długość to ').

% LEFT/RIGHT
string('left.ogg', 'skręć w lewo ').
string('left_sh.ogg', 'skręć ostro w lewo ').
string('left_sl.ogg', 'skręć lekko w lewo ').
string('right.ogg', 'skręć w prawo ').
string('right_sh.ogg', 'skręć ostro w prawo ').
string('right_sl.ogg', 'skręć lekko w prawo ').
string('left_keep.ogg', 'trzymaj się lewej strony').
string('right_keep.ogg', 'trzymaj się prawej strony').

% U-TURNS
string('make_uturn.ogg', 'Zawróć ').
string('make_uturn_wp.ogg', 'Jeśli to możliwe, zawróć ').
string('after.ogg', 'za ').
string('prepare.ogg', ' ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'Przygotuj się do wjazdu na rondo ').
string('roundabout.ogg', 'wjedź na rondo, ').
string('then.ogg', ', następnie ').
string('and.ogg', 'i ').
string('take.ogg', 'wybierz ').
string('exit.ogg', 'zjazd ').

string('1st.ogg', 'pierwszy ').
string('2nd.ogg', 'drugi ').
string('3rd.ogg', 'trzeci ').
string('4th.ogg', 'czwarty ').
string('5th.ogg', 'piąty ').
string('6th.ogg', 'szósty ').
string('7th.ogg', 'siódmy ').
string('8th.ogg', 'ósmy').
string('9th.ogg', 'dziewiąty ').
string('10th.ogg', 'dziesiąty ').
string('11th.ogg', 'jedenasty ').
string('12th.ogg', 'dwunasty ').
string('13th.ogg', 'trzynasty ').
string('14th.ogg', 'czternasty ').
string('15th.ogg', 'piętnasty ').
string('16th.ogg', 'szesnasty ').
string('17th.ogg', 'siedemnasty ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Dalej prosto ').
string('go_ahead_m.ogg', 'Dalej prosto przez ').

% ARRIVE
string('and_arrive_destination.ogg', 'i dojedź do celu ').
string('reached_destination.ogg', 'cel podróży został osiągnięty ').
string('and_arrive_intermediate.ogg', 'i dojedź do punktu pośredniego ').
string('reached_intermediate.ogg', 'punkt pośredni został osiągnięty ').
string('and_arrive_waypoint.ogg', 'i dojedź do punktu pośredniego ').
string('reached_waypoint.ogg', 'punkt trasy został osiągnięty ').

% OTHER PROMPTS
string('attention.ogg', 'uwaga, ').
string('location_lost.ogg', 'Utracono sygnał GPS ').
string('off_route.ogg', 'znajdujesz się poza trasą ').
string('exceed_limit.ogg', 'przekraczasz dozwoloną prędkość ').

% STREET NAME GRAMMAR
string('on.ogg', 'w ').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'metrów ').
string('around_1_kilometer.ogg', 'około jeden kilometr ').
string('around.ogg', 'około ').
string('kilometers.ogg', 'kilometrów ').

string('feet.ogg', 'stóp ').
string('1_tenth_of_a_mile.ogg', 'jedną dziesiątą mili').
string('tenths_of_a_mile.ogg', 'dziesiątych mili').
string('around_1_mile.ogg', 'około jedną milę ').
string('miles.ogg', 'mil ').

string('yards.ogg', 'jardów ').

% TIME SUPPORT
%string('time.ogg', 'time is  ').
%string('hours.ogg', 'hours ').
%string('less_a_minute.ogg', 'less than a minute  ').
%string('minutes.ogg', 'minutes').


%% COMMAND BUILDING / WORD ORDER
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
%% there is no good analogue in english to keep left of A31?
bear_left(_Street) -- ['left_keep.ogg'].
bear_right(_Street) -- ['right_keep.ogg'].

on_street('', []).
on_street(Street, ['on.ogg', Street]) :- tts.
on_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare.ogg', M, 'after.ogg', D, ' '| Sgen] :- distance(Dist) -- D, turn(Turn, M), on_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), on_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), on_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare.ogg', 'make_uturn.ogg', 'after.ogg', D | Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg'|Sgen] :- on_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, Street) -- ['prepare_roundabout.ogg', 'after.ogg', D | Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), on_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg'| Sgen] :- nth(Exit, E), on_street(Street, Sgen).

go_ahead(Dist, Street) -- ['go_ahead_m.ogg', D | Sgen]:- distance(Dist) -- D, on_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['and_arrive_destination.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg'|Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg'|Ds] :- name(D, Ds).

route_new_calc(Dist, Time) -- ['route_is.ogg', D] :- distance(Dist) -- D.
route_recalc(Dist, Time) -- ['route_calculate.ogg', D] :- distance(Dist) -- D.

location_lost -- ['location_lost.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist) -- D.
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
string(Ogg, A) :- voice_generation, interval(X, 20, 90, 10), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 900, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).

dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 20, !, num_atom(X, A), atom_concat(A, '.ogg', Ogg).
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
