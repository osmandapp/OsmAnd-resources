% 
% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('be').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES:
% (X) new Version 1.5 format
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) special grammar: onto_street / on_street / to_street
% (N/A) special grammar: nominative/dativ for distance measure
% (N/A) special grammar: imperative/infinitive distincion for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% (X) word order checked


% ROUTE CALCULATED
string('route_is.ogg', 'Працягласьць маршруту ').
string('route_calculate.ogg', 'Шукаем новы маршрут.').
string('distance.ogg', 'працягласьць ').

% LEFT/RIGHT
string('prepare_after.ogg', 'Падрыхтуйцеся, праз ').
string('after.ogg', 'Праз ').

string('left.ogg', 'павярніце налева.').
string('left_sh.ogg', 'павярніце крута налева.').
string('left_sl.ogg', 'павярніце наўскос улева.').
string('right.ogg', 'павярніце направа.').
string('right_sh.ogg', 'павярніце крута направа.').
string('right_sl.ogg', 'павярніце наўскос управа.').
string('left_keep.ogg', 'трымайцеся левага боку.').
string('right_keep.ogg', 'трымайцеся правага боку.').
% if needed, "left/right_bear.ogg" can be defined here also. " (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

% U-TURNS
string('make_uturn.ogg', 'Развярніцеся.').
string('make_uturn_2.ogg', 'Развярніцеся ').
string('make_uturn_wp.ogg', 'Развярніцеся дзе будзе магчымасьць.').

% ROUNDABOUTS
string('roundabout.ogg', 'на коле ').
string('then.ogg', 'потым ').
string('take.ogg', 'выбирайце ').
string('exit.ogg', 'выезд.').

string('1st.ogg', 'першы ').
string('2nd.ogg', 'другі ').
string('3rd.ogg', 'трэці ').
string('4th.ogg', 'чацвёрты ').
string('5th.ogg', 'пяты ').
string('6th.ogg', 'шосты ').
string('7th.ogg', 'сёмы ').
string('8th.ogg', 'восьмы ').
string('9th.ogg', 'дзявяты ').
string('10th.ogg', 'дзясяты ').
string('11th.ogg', 'адзінаццаты ').
string('12th.ogg', 'дванаццаты ').
string('13th.ogg', 'трынаццаты ').
string('14th.ogg', 'чатырнаццаты ').
string('15th.ogg', 'пятнаццаты ').
string('16th.ogg', 'шаснаццаты ').
string('17th.ogg', 'сямнаццаты ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Рухайцеся наўпрост.').
string('go_ahead_m.ogg', 'Рухайцеся наўпрост ').

% ARRIVE
string('and_arrive_destination.ogg', 'і вы дабраліся.').
string('and_arrive_intermediate.ogg', 'і вы ў выбраным Вамі пункце.').
string('reached_intermediate.ogg', 'Вы ў выбраным Вамі пункце.').
string('reached_destination.ogg','Вы дабраліся.').
string('and_arrive_waypoint.ogg', 'і вы на правільным маршруце.').
string('reached_waypoint.ogg', 'Вы на правільным маршруце.').

% OTHER PROMPTS
string('attention.ogg', 'Увага !').
string('new.ogg', 'Наперадзе - штучная няроўнасьць !').
string('location_lost.ogg', 'Страціўся сыгнал GPS.').
string('location_recovered.ogg', 'Сыгнал GPS аднавіўся.').
string('off_route.ogg', 'Вы адхіліліся ад маршруту на ').
string('off_route_0.ogg', 'Вы адхіліліся ад маршруту.').
string('exceed_limit.ogg', 'Вы перавысілі хуткасьць !').
string('new.ogg', 'Наперадзе - штучная няроўнасьць !').

% STREET NAME GRAMMAR
string('on.ogg', 'на ').
string('onto.ogg', 'на ').
string('to.ogg', 'по ').

% DISTANCE UNIT SUPPORT
string('metrau.ogg', 'мэтраў').
string('kilametar.ogg', 'кілямэтар ').
string('kilametry.ogg', 'кілямэтры ').
string('kilametrau.ogg', 'кілямэтраў ').
string('around_1_kilometer.ogg', 'недзе адзін кілямэтар ').
string('around.ogg', 'каля ').

string('futau.ogg', 'футаў').
string('around_1_mile.ogg', 'недзе адну мілю ').
string('1_tenth_of_a_mile.ogg', 'каля адной дзясятай мілі ').
string('tenths_of_a_mile.ogg', 'дзясятых мілі ').
string('milu.ogg', 'мілю').
string('mili.ogg', 'мілі').
string('milau.ogg', 'міляў').

string('yardau.ogg', 'ярдаў').

% TIME SUPPORT
string('time.ogg', 'Час ').
string('less_a_minute.ogg', 'менш за хвіліну.').
string('hour.ogg', 'гадзіна ').
string('hours_y.ogg', 'гадзіны ').
string('hours_au.ogg', 'гадзінаў ').
string('minute.ogg', 'хвіліна ').
string('minute_y.ogg', 'хвіліны ').
string('minute_au.ogg', 'хвілінаў ').


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
on_street('', []).
on_street(Street, ['on.ogg', Street]) :- tts.
on_street(_Street, []) :- not(tts).
to_street('', []).
to_street(Street, ['to.ogg', Street]) :- tts.
to_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare_after.ogg', D, ' ', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg'| Sgen] :- distance(Dist) -- D, on_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg'| Sgen] :- on_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, Street) -- ['prepare_after.ogg', D, 'roundabout.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'take.ogg', E, 'exit.ogg'| Sgen] :- distance(Dist) -- D, nth(Exit, E), onto_street(Street, Sgen).
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

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(Dist, Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist) -- D.
attention(_Type) -- ['attention.ogg', 'new.ogg'].
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

pnumberf(X, Y) :- tts, !, num_atom(X, Y).
pnumberf(X, '1-z.ogg') :- X == 1.
pnumberf(X, '2-z.ogg') :- X == 2.
pnumberf(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
% time measure
hours(S, []) :- S < 60.
hours(S, [Ogg, Hs]) :- H is S div 60, plural_hs(H, Hs), pnumberf(H, Ogg).
time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- [H, Ogg, Mn] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, plural_mn(St, Mn), pnumberf(St, Ogg).
time(Sec) -- [Ogg, Mn] :- not(tts), Sec < 300, St is Sec/60, plural_mn(St, Mn), pnumber(St, Ogg).
time(Sec) -- [H, Ogg, Mn] :- not(tts), S is round(Sec/300.0)*5, hours(S, H), St is S mod 60, plural_mn(St, Mn), pnumberf(St, Ogg).

plural_hs(D, 'hour.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(D, 'hours_y.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(_D, 'hours_au.ogg').

plural_mn(D, 'minute.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(D, 'minute_y.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(_D, 'minute_au.ogg').


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'metrau.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'metrau.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- [ X, Km]              :-               D is round(Dist/1000.0),            dist(D, X), plural_km(D, Km).


%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'futau.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yardau.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yardau.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).


plural_km(D, 'kilametar.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_km(D, 'kilametry.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100, (R100 > 20; R100 < 10).
plural_km(_D, 'kilametrau.ogg').

plural_mi(D, 'milu.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(D, 'mili.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(_D, 'milau.ogg').

interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 950, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).

dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 20, measure('mi-f'), !, pnumberf(X, Ogg).
dist(X, [Ogg]) :- X < 20, measure('mi-y'), !, pnumberf(X, Ogg).
dist(X, [Ogg]) :- X < 20, measure('km-m'), !, pnumber(X, Ogg).
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
