% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(101).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('de').
% http://www.tcts.fpms.ac.be/synthesis/mbrola/dba/de6/de6.zip
% http://www.tcts.fpms.ac.be/synthesis/mbrola/dba/de7/de7.zip
fest_language('cmu_us_awb_arctic_clunits').

% before each announcement (beep)
preamble - [].

string('left.ogg', 'links abbiegen ').
string('left_sh.ogg', 'scharf links abbiegen ').
string('left_sl.ogg', 'leicht links abbiegen ').
string('right.ogg', 'rechts abbiegen ').
string('right_sh.ogg', 'scharf rechts abbiegen ').
string('right_sl.ogg', 'leicht rechts abbiegen ').
string('left_keep.ogg', 'links halten ').
string('right_keep.ogg', 'rechts halten ').

string('attention.ogg', 'Achtung ').
string('prepare_make_uturn.ogg', 'Vorbereiten zum Wenden ').
string('make_uturn1.ogg', 'wenden ').
string('make_uturn2.ogg', 'Bitte wenden ').
string('make_uturn_wp.ogg', 'Wenn möglich, bitte wenden ').
string('after.ogg', 'nach ').
string('prepare.ogg', ' ').
string('then.ogg', 'dann ').
string('take.ogg', 'nehmen Sie die ').
string('exit.ogg', 'Ausfahrt ').
string('prepare_roundabout.ogg', 'Einbiegen in Kreisverkehr ').
string('roundabout.ogg', 'in den Kreisverkehr einfahren, ').
string('go_ahead.ogg', 'Weiter geradeaus ').
string('go_ahead_m1.ogg', 'Dem Strasenverlauf ').
string('go_ahead_m2.ogg', 'folgen ').
string('and_arrive_destination.ogg', 'dann haben Sie Ihr Ziel erreicht ').
string('reached_destination.ogg','Ziel erreicht ').
string('and_arrive_intermediate.ogg', 'dann Zwischenziel erreicht ').
string('reached_intermediate.ogg', 'Zwischenziel erreicht ').
string('route_is1.ogg', 'Die berechnete Strecke ist ').
string('route_is2.ogg', 'lang ').
string('route_calculate.ogg', 'Strecke neu berechnet, Entfernung ').
string('location_lost.ogg', 'G P S  Signal verloren ').
string('on.ogg', 'auf ').
string('off_route.ogg', 'Sie weichen von der Route ab ').
string('exceed_limit.ogg', 'Sie überschreiten die Höchstgeschwindigkeit ').

string('1st.ogg', 'erste ').
string('2nd.ogg', 'zweite ').
string('3rd.ogg', 'dritte ').
string('4th.ogg', 'vierte ').
string('5th.ogg', 'fünfte ').
string('6th.ogg', 'sechste ').
string('7th.ogg', 'siebte ').
string('8th.ogg', 'achte ').
string('9th.ogg', 'neunte ').
string('10th.ogg', 'zehnte ').
string('11th.ogg', 'elfte ').
string('12th.ogg', 'zwölfte ').
string('13th.ogg', 'dreizehnte ').
string('14th.ogg', 'vierzehnte ').
string('15th.ogg', 'fünfzehnte ').
string('16th.ogg', 'sechzehnte ').
string('17th.ogg', 'siebzehnte ').

string('meters_nominativ.ogg', 'meter ').
string('meters_dativ.ogg', 'metern ').
string('around_1_kilometer_nominativ.ogg', 'zirka einen Kilometer ').
string('around_1_kilometer_dativ.ogg', 'zirka einem Kilometer ').
string('around.ogg', 'zirka ').
string('kilometers_nominativ.ogg', 'Kilometer ').
string('kilometers_dativ.ogg', 'Kilometern ').


%% TURNS 
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
bear_left -- ['left_keep.ogg'].
bear_right -- ['right_keep.ogg'].

prepare_turn(Turn, Dist) -- ['prepare.ogg', 'after.ogg', D, ' ', M] :- distance(Dist, dativ) -- D, turn(Turn, M).
turn(Turn, Dist) -- ['after.ogg', D, M] :- distance(Dist, dativ) -- D, turn(Turn, M).
turn(Turn) -- M :- turn(Turn, M).

prepare_make_ut(Dist) -- ['prepare_make_uturn.ogg', 'after.ogg', D] :- distance(Dist, dativ) -- D.
make_ut(Dist) --  ['after.ogg', D, 'make_uturn1.ogg'] :- distance(Dist, dativ) -- D.
make_ut -- ['make_uturn2.ogg'].
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist) -- ['prepare_roundabout.ogg', 'after.ogg', D] :- distance(Dist, dativ) -- D.
roundabout(Dist, _Angle, Exit) -- ['after.ogg', D, 'roundabout.ogg', 'then.ogg', 'take.ogg', E, 'exit.ogg'] :- distance(Dist, dativ) -- D, nth(Exit, E).
roundabout(_Angle, Exit) -- ['take.ogg', E, 'exit.ogg'] :- nth(Exit, E).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist) -- ['go_ahead_m1.ogg', D, 'go_ahead_m2.ogg']:- distance(Dist, nominativ) -- D.

then -- ['then.ogg'].
and_arrive_destination -- ['and_arrive_destination.ogg'].
reached_destination -- ['reached_destination.ogg'].
and_arrive_intermediate -- ['and_arrive_intermediate.ogg'].
reached_intermediate -- ['reached_intermediate.ogg'].

route_new_calc(Dist) -- ['route_is1.ogg', D, 'route_is2.ogg'] :- distance(Dist, nominativ) -- D.
route_recalc(Dist) -- ['route_calculate.ogg', D] :- distance(Dist, nominativ) -- D.

location_lost -- ['location_lost.ogg'].

on_street -- ['on.ogg', X] :- next_street(X).
off_route -- ['off_route.ogg'].
attention -- ['attention.ogg'].
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


%%% distance measure
distance(Dist, nominativ) -- [ X, 'meters_nominativ.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,    dist(D, X).
distance(Dist, dativ) --     [ X, 'meters_dativ.ogg']                      :- Dist < 100,   D is round(Dist/10.0)*10,    dist(D, X).
distance(Dist, nominativ) -- [ X, 'meters_nominativ.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50, dist(D, X).
distance(Dist, dativ) --     [ X, 'meters_dativ.ogg']                      :- Dist < 1000,  D is round(2*Dist/100.0)*50, dist(D, X).
distance(Dist, nominativ) -- ['around_1_kilometer_nominativ.ogg']          :- Dist < 1500.
distance(Dist, dativ) --     ['around_1_kilometer_dativ.ogg']              :- Dist < 1500.
distance(Dist, nominativ) -- ['around.ogg', X, 'kilometers_nominativ.ogg'] :- Dist < 10000, D is round(Dist/1000.0),     dist(D, X).
distance(Dist, dativ) --     ['around.ogg', X, 'kilometers_dativ.ogg']     :- Dist < 10000, D is round(Dist/1000.0),     dist(D, X).
distance(Dist, nominativ) -- [ X, 'kilometers_nominativ.ogg']              :-               D is round(Dist/1000.0),     dist(D, X).
distance(Dist, dativ) --     [ X, 'kilometers_dativ.ogg']                  :-               D is round(Dist/1000.0),     dist(D, X).

interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- interval(X, 20, 90, 10), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- interval(X, 100, 900, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).

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
