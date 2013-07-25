% :- 
% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language(ru).
fest_language(msu_ru_nsh_clunits).

string('left.ogg', 'поверните налево ').
string('left_sh.ogg', 'резко поверните налево ').
string('left_sl.ogg', 'плавно поверните налево  ').
string('right.ogg', 'поверните направо ').
string('right_sh.ogg', 'резко поверните направо ').
string('right_sl.ogg', 'плавно поверните направо  ').
string('left_keep.ogg', 'держитесь левее ').
string('right_keep.ogg', 'держитесь правее ').

string('attention.ogg', 'Внимание, ').
string('make_uturn.ogg', 'Выполните разворот ').
string('make_uturn_wp.ogg', 'Выполните разворот ').
string('after.ogg', 'через').
string('prepare_after.ogg', 'Приготовьтесь через ').
string('then.ogg', 'затем ').
string('take.ogg', 'Выполните ').
string('exit.ogg', 'съезд ').
string('roundabout.ogg', 'круг ').
string('go_ahead.ogg', 'Продолжайте движение прямо ').
string('go_ahead_m.ogg', 'Продолжайте движение ').
string('and_arrive_destination.ogg', 'и вы прибудете в пункт назначения ').
string('and_arrive_intermediate.ogg', 'и вы прибудете в промежуточный пункт ').
string('reached_intermediate.ogg', 'вы прибыли в промежуточный пункт').
string('reached_destination.ogg','вы прибыли в пункт назначения ').
string('and_arrive_waypoint.ogg', 'и вы прибудете к GPX точке').
string('reached_waypoint.ogg', 'вы прибыли к GPX точке ').
string('route_is.ogg', 'Маршрут составляет ').
string('route_calculate.ogg', 'маршрут пересчитывается, расстояние ').
string('location_lost.ogg', 'ДЖИПИИЭС потерян сигнал ').
string('on.ogg', 'на ').
string('onto.ogg', 'на ').
string('to.ogg', 'по ').
string('off_route.ogg', 'Вы отклонились от маршрута на ').
string('exceed_limit.ogg', 'Вы превысили допустимую скорость ').

string('1th.ogg', 'первый ').
string('2th.ogg', 'вто_рой ') :- google_gen, voice .
string('2th.ogg', 'второй ') :- not(google_gen).
string('3th.ogg', 'третий ').
string('4th.ogg', 'четвертый ').
string('5th.ogg', 'пятый ').
string('6th.ogg', 'шестой ').
string('7th.ogg', 'седьмой ').
string('8th.ogg', 'восьмой ').
string('9th.ogg', 'девятый ').
string('10th.ogg', 'десятый ').
string('11th.ogg', 'одиннадцатый ').
string('12th.ogg', 'двенадцатый ').
string('13th.ogg', 'тринадцатый ').
string('14th.ogg', 'четырнадцатый ').
string('15th.ogg', 'пятнадцатый ').
string('16th.ogg', 'шестнадцатый ').
string('17th.ogg', 'семнадцатый ').

string('metrov.ogg', 'метров ').
string('kilometr.ogg', 'километр ').
string('kilometra.ogg', 'километра ').
string('kilometrov.ogg', 'километров ').
string('around_1_kilometer.ogg', 'около одного километра ').
string('around.ogg', 'около ').
string('footov.ogg', 'футов ').
string('1mile.ogg', 'миля ').
string('2mili.ogg', 'мили ').
string('5mil.ogg', 'миль ').
string('yardov.ogg', 'ярдов ').
string('around_1_mile.ogg', 'около одной мили ').
string('1_tenth_of_a_mile.ogg', 'одно десятая мили ').
string('tenths_of_a_mile.ogg', ' десятых мили ').



onto_street('', []).
onto_street(Street, ['onto.ogg', Street]) :- tts.
onto_street(_Street, []) :- not(tts).
on_street('', []).
on_street(Street, ['on.ogg', Street]) :- tts.
on_street(_Street, []) :- not(tts).
to_street('', []).
to_street(Street, ['to.ogg', Street]) :- tts.
to_street(_Street, []) :- not(tts).


%% TURNS 
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

prepare_turn(Turn, Dist, Street) -- ['prepare_after.ogg', D, ' ', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg'| Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg'| Sgen] :- on_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, Street) -- ['prepare_after.ogg', D, 'roundabout.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'make.ogg', E, 'exit.ogg'| Sgen] :- distance(Dist) -- D, nth(Exit, E), onto_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), onto_street(Street, Sgen).

go_ahead(Dist, Street) -- ['go_ahead_m.ogg', D | Sgen] :- distance(Dist) -- D, to_street(Street, Sgen).

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
nth(1, '1th.ogg').
nth(2, '2th.ogg').
nth(3, '3th.ogg').
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

% handling alternatives
[X|_Y] -- T :- (X -- T),!.
[_X|Y] -- T :- (Y -- T).

%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'metrov.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'metrov.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- ['around.ogg', X, Km] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X), plural_km(D, Km).
distance_km(Dist) -- [ X, Km]              :-               D is round(Dist/1000.0),            dist(D, X), plural_km(D, Km).


%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'footov.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- ['around.ogg', X, M]    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).
distance_mi_f(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- ['around.ogg', X, M]    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).
distance_mi_y(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).


plural_km(D, 'kilometr.ogg') :- 1 is D mod 10.
plural_km(D, 'kilometra.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1.
plural_km(_D, 'kilometrov.ogg').


plural_mi(D, '1mile.ogg') :- 1 is D mod 10.
plural_mi(D, '2mili.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1.
plural_mi(_D, '5mil.ogg').

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
