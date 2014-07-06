%%% !!! THIS IS GENERATED FILE !!! Modify ttsconfig.p
﻿% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(0).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('da').
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
string('route_is.ogg', 'Ruten er ').
string('route_calculate.ogg', 'Ruten genberegnes ').
string('distance.ogg', 'afstand ').

% LEFT/RIGHT
string('prepare.ogg', 'Forbered ').
string('after.ogg', 'efter ').

string('left.ogg', 'drej til venstre ').
string('left_sh.ogg', 'drej skarpt til venstre ').
string('left_sl.ogg', 'drej lidt til venstre ').
string('right.ogg', 'drej til højre ').
string('right_sh.ogg', 'drej skarpt til højre ').
string('right_sl.ogg', 'drej lidt til højre ').
string('left_keep.ogg', 'hold til venstre ').
string('right_keep.ogg', 'hold til højre ').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

% U-TURNS
string('make_uturn.ogg', 'Foretag U vending ').
string('make_uturn_wp.ogg', 'Når muligt foretag U vending ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'Forbered at køre ind i rundkørslen ').
string('roundabout.ogg', 'kør ind i rundkørslen, ').
string('then.ogg', 'derefter ').
string('and.ogg', 'og ').
string('take.ogg', 'tag ').
string('exit.ogg', 'afkørsel ').

string('1st.ogg', 'første ').
string('2nd.ogg', 'anden ').
string('3rd.ogg', 'tredje ').
string('4th.ogg', 'fjerde ').
string('5th.ogg', 'femte ').
string('6th.ogg', 'sjette ').
string('7th.ogg', 'syvende ').
string('8th.ogg', 'ottende' ).
string('9th.ogg', 'niende ').
string('10th.ogg', 'tiende ').
string('11th.ogg', 'ellevte ').
string('12th.ogg', 'tolvte ').
string('13th.ogg', 'trettende ').
string('14th.ogg', 'fjortende ').
string('15th.ogg', 'femtende ').
string('16th.ogg', 'sekstende ').
string('17th.ogg', 'syttende ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Fortsæt ligeud ').
string('follow.ogg', 'Følg vejen ').

% ARRIVE
string('and_arrive_destination.ogg', 'og ankommer til destinationen ').
string('reached_destination.ogg','destination er nået').
string('and_arrive_intermediate.ogg', 'og ankommer til rutepunkt ').
string('reached_intermediate.ogg', 'rutepunkt er nået ').
string('and_arrive_waypoint.ogg', 'og ankommer til rutepunkt ').
string('reached_waypoint.ogg', 'rutepunkt er nået ').

% OTHER PROMPTS
string('attention.ogg', 'Advarsel, ').
string('location_lost.ogg', 'g p s signal mistet ').
string('location_recovered.ogg', 'gps signal inddrives ').
string('off_route.ogg', 'afvigelse fra ruten ').
string('exceed_limit.ogg', 'Overskridelse af hastighedsgrænsen ').

% STREET NAME GRAMMAR
string('onto.ogg', 'ind på ').
string('on.ogg', 'på ').
string('to.ogg', 'til ').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'meter ').
string('around_1_kilometer.ogg', 'omkring 1 kilometer ').
string('around.ogg', 'om ').
string('kilometers.ogg', 'kilometer ').

string('feet.ogg', 'fod ').
string('1_tenth_of_a_mile.ogg', 'en tiendedel af en mil ').
string('tenths_of_a_mile.ogg', 'tiendedele af en mil ').
string('around_1_mile.ogg', 'omkring 1 mil ').
string('miles.ogg', 'mil ').

string('yards.ogg', 'yards ').

% TIME SUPPORT
string('time.ogg', 'tiden er ').
string('1_hour.ogg', 'en time ').
string('hours.ogg', 'timer ').
string('less_a_minute.ogg', 'mindre end et minut ').
string('1_minute.ogg', 'et minut ').
string('minutes.ogg', 'minutter').


%% COMMAND BUILDING / WORD ORDER
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
%% It is needed it reflects not a turn but
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

prepare_turn(Turn, Dist, _Street) -- ['prepare.ogg', M, 'after.ogg', D, ' '] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn, Dist, _Street) -- ['after.ogg', D, M] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn, _Street) -- M :- turn(Turn, M).

prepare_make_ut(Dist, _Street) -- ['prepare.ogg', 'make_uturn.ogg', 'after.ogg', D] :- distance(Dist) -- D.
make_ut(Dist, _Street) -- ['after.ogg', D, 'make_uturn.ogg'] :- distance(Dist) -- D.
make_ut(_Street) -- ['make_uturn.ogg'].
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['prepare_roundabout.ogg', 'after.ogg', D] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, _Street) -- ['after.ogg', D, 'roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg'] :- distance(Dist) -- D, nth(Exit, E).
roundabout(_Angle, Exit, _Street) -- ['take.ogg', E, 'exit.ogg'] :- nth(Exit, E).

go_ahead(Dist, _Street) -- ['follow.ogg', D]:- distance(Dist) -- D.

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(_) -- ['and_arrive_destination.ogg'].
reached_destination(_) -- ['reached_destination.ogg'].
and_arrive_intermediate(_) -- ['and_arrive_intermediate.ogg'].
reached_intermediate(_) -- ['reached_intermediate.ogg'].
and_arrive_waypoint(X) -- ['and_arrive_waypoint.ogg', X].
reached_waypoint(X) -- ['reached_waypoint.ogg', X].

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
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
nth(16, '16th.ogg').
nth(17, '17th.ogg').


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
time(Sec) -- [Ogg, 'minutes.ogg'] :- not(tts), Sec < 300, St is Sec/60, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60, pnumber(St, Ogg).


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'meters.ogg'] :- Dist < 100, D is round(Dist/10.0)*10, dist(D, X).
distance_km(Dist) -- [ X, 'meters.ogg'] :- Dist < 1000, D is round(2*Dist/100.0)*50, dist(D, X).
distance_km(Dist) -- ['around_1_kilometer.ogg'] :- Dist < 1500.
distance_km(Dist) -- ['around.ogg', X, 'kilometers.ogg'] :- Dist < 10000, D is round(Dist/1000.0), dist(D, X).
distance_km(Dist) -- [ X, 'kilometers.ogg'] :- D is round(Dist/1000.0), dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'feet.ogg'] :- Dist < 160, D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg'] :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg'] :- Dist < 1529, D is round(Dist/161.0), dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg'] :- Dist < 2414.
distance_mi_f(Dist) -- ['around.ogg', X, 'miles.ogg'] :- Dist < 16093, D is round(Dist/1609.0), dist(D, X).
distance_mi_f(Dist) -- [ X, 'miles.ogg'] :- D is round(Dist/1609.0), dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yards.ogg'] :- Dist < 241, D is round(Dist/10.0/0.9144)*10, dist(D, X).
distance_mi_y(Dist) -- [ X, 'yards.ogg'] :- Dist < 1300, D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg'] :- Dist < 2414.
distance_mi_y(Dist) -- ['around.ogg', X, 'miles.ogg'] :- Dist < 16093, D is round(Dist/1609.0), dist(D, X).
distance_mi_y(Dist) -- [ X, 'miles.ogg'] :- D is round(Dist/1609.0), dist(D, X).


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
dist(D, ['20.ogg'|L]) :- D < 30, Ts is D - 20, !, dist(Ts, L).
dist(D, ['30.ogg'|L]) :- D < 40, Ts is D - 30, !, dist(Ts, L).
dist(D, ['40.ogg'|L]) :- D < 50, Ts is D - 40, !, dist(Ts, L).
dist(D, ['50.ogg'|L]) :- D < 60, Ts is D - 50, !, dist(Ts, L).
dist(D, ['60.ogg'|L]) :- D < 70, Ts is D - 60, !, dist(Ts, L).
dist(D, ['70.ogg'|L]) :- D < 80, Ts is D - 70, !, dist(Ts, L).
dist(D, ['80.ogg'|L]) :- D < 90, Ts is D - 80, !, dist(Ts, L).
dist(D, ['90.ogg'|L]) :- D < 100, Ts is D - 90, !, dist(Ts, L).
dist(D, ['100.ogg'|L]) :- D < 200, Ts is D - 100, !, dist(Ts, L).
dist(D, ['200.ogg'|L]) :- D < 300, Ts is D - 200, !, dist(Ts, L).
dist(D, ['300.ogg'|L]) :- D < 400, Ts is D - 300, !, dist(Ts, L).
dist(D, ['400.ogg'|L]) :- D < 500, Ts is D - 400, !, dist(Ts, L).
dist(D, ['500.ogg'|L]) :- D < 600, Ts is D - 500, !, dist(Ts, L).
dist(D, ['600.ogg'|L]) :- D < 700, Ts is D - 600, !, dist(Ts, L).
dist(D, ['700.ogg'|L]) :- D < 800, Ts is D - 700, !, dist(Ts, L).
dist(D, ['800.ogg'|L]) :- D < 900, Ts is D - 800, !, dist(Ts, L).
dist(D, ['900.ogg'|L]) :- D < 1000, Ts is D - 900, !, dist(Ts, L).
dist(D, ['1000.ogg'|L]):- Ts is D - 1000, !, dist(Ts, L).
