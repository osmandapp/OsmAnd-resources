% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('fi').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% ( ) special grammar: onto_street / on_street / to_street
% (km only) special grammar: nominative/dative for distance measure
% (N/A) special grammar: imperative/infinitive distinction for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% ( ) word order checked


% ROUTE CALCULATED
string('route_is.ogg', 'Matkan pituus on ').
string('route_calculate.ogg', 'Reitin uudelleenlaskenta ').
string('distance.ogg', ', etäisyys ').

% LEFT/RIGHT
string('prepare.ogg', 'Valmistaudu ').
string('after.ogg', 'nach ').
string('get.ogg', 'päästä  ').
string('now.ogg', 'nyt,  ').

   % Vasempaan/vasemmalle and oikeaan/oikealle are interchangeable in normal speech but the Finnish military standard in directions is VASEMPAAN and OIKEALLE. We should also do this as it makes it much easier to distinguish in noise.
string('left.ogg', 'käänny vasempaan ').
string('left_sh.ogg', 'käänny jyrkästi vasempaan ').
string('left_sl.ogg', 'käänny loivasti vasempaan ').
string('right.ogg', 'käänny oikealle ').
string('right_sh.ogg', 'käänny jyrkästi oikealle ').
string('right_sl.ogg', 'käänny loivasti oikealle ').
string('left_keep.ogg', 'pidä vasen ').
string('right_keep.ogg', 'pidä oikea ').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

string('left_prep.ogg', 'kääntymään vasempaan ').
string('left_sh_prep.ogg', 'kääntymään jyrkästi vasempaan ').
string('left_sl_prep.ogg', 'kääntymään loivasti vasempaan ').
string('right_prep.ogg', 'kääntymään oikealle ').
string('right_sh_prep.ogg', 'kääntymään jyrkästi oikealle ').
string('right_sl_prep.ogg', 'kääntymään loivasti oikealle ').
string('left_keep_prep.ogg', 'pitämään vasen ').
string('right_keep_prep.ogg', 'pitämään oikea ').

% U-TURNS
string('prepare_make_uturn.ogg', 'Valmistaudu kääntymään takaisin ').
string('make_uturn1.ogg', 'Käänny takaisin ').
string('make_uturn2.ogg', 'Nyt, käänny takaisin ').
string('make_uturn_wp.ogg', 'Käänny takaisin, kun mahdollista ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'Valmistaudu ajamaan liikenneympyrään ').
string('roundabout.ogg', 'Aja liikenneympyrään ').
string('then.ogg', 'sitten ').
string('and.ogg', 'ja ').
string('take.ogg', 'päästä ja ota ').
string('exit.ogg', 'liittymä ').
string('take2.ogg', 'Nyt, ota ').

string('1st.ogg', 'ensimmäinen ').
string('2nd.ogg', 'toinen ').
string('3rd.ogg', 'kolmas ').
string('4th.ogg', 'neljäs ').
string('5th.ogg', 'viides ').
string('6th.ogg', 'kuudes ').
string('7th.ogg', 'seitsemäs ').
string('8th.ogg', 'kahdeksas ').
string('9th.ogg', 'yhdeksäs ').
string('10th.ogg', 'kymmenes ').
string('11th.ogg', 'yhdestoista ').
string('12th.ogg', 'kahdestoista ').
string('13th.ogg', 'kolmastoista ').
string('14th.ogg', 'neljästoista ').
string('15th.ogg', 'viidestoista ').
string('16th.ogg', 'kuudestoista ').
string('17th.ogg', 'seitsemästoista ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Jatka suoraan ').
string('follow.ogg', 'Seuraa tietä ').

% ARRIVE
string('and_arrive_destination.ogg', 'ja olet perillä ').
string('reached_destination.ogg', 'olet perillä ').
string('and_arrive_intermediate.ogg', 'ja saavut välietappiin').
string('reached_intermediate.ogg', 'olet välietapissa').
string('and_arrive_waypoint.ogg', 'ja saavut reittipisteeseen').
string('reached_waypoint.ogg', 'olet reittipisteessä').

% OTHER PROMPTS
string('attention.ogg', 'huomio, ').
string('location_lost.ogg', 'GPS-signaali katosi ').
string('location_recovered.ogg', 'GPS-signaali palautui ').
string('off_route.ogg', 'olet poikennut reitiltä ').
string('exceed_limit.ogg', 'ylitit nopeusrajoituksen ').

% STREET NAME GRAMMAR
% In Finnish, street names would have to be inflected:
% Turn onto Pihakatu -> Käänny PihakaDULLE 
% Along Pihakatu -> PihakatuA pitkin
% and there are no prepositions, so just saying the street name is the best that can be done easily
string('onto.ogg', ' ').
%string('on.ogg', 'auf ').
%string('to.ogg', 'bis ').

% DISTANCE UNIT SUPPORT
string('meters_metrin.ogg', 'metrin ').
string('meters_metri.ogg', 'metriä ').
string('around_1_kilometer_metrin.ogg', 'noin 1 kilometrin ').
string('around_1_kilometer_metri.ogg', 'noin 1 kilometri ').
string('around.ogg', 'noin').  % Note: do not put space after word "noin" because for some reason the SVOX Finnish Satu Voice announces the number wrong if there is a space
string('kilometers_metrin.ogg', 'kilometrin ').
string('kilometers_metri.ogg', 'kilometriä ').

string('feet_metrin.ogg', 'jalkaa ').
string('feet_metri.ogg', 'jalkaa ').
string('1_tenth_of_a_mile_metrin.ogg', 'mailin kymmenyksen ').
string('1_tenth_of_a_mile_metri.ogg', 'mailin kymmenys ').
string('tenths_of_a_mile_metrin.ogg', 'mailin kymmenyksen ').
string('tenths_of_a_mile_metri.ogg', 'mailin kymmenystä ').
string('around_1_mile_metrin.ogg', 'noin yhden mailin ').
string('around_1_mile_metri.ogg', 'noin yksi maili ').
string('miles_metrin.ogg', 'mailin ').
string('miles_metri.ogg', 'maili ').

string('yards_metrin.ogg', 'jaardin ').
string('yards_metri.ogg', 'jaardi ').

% TIME SUPPORT
string('time.ogg', ', aikaa ').
string('1_hour.ogg', 'yksi tunti ').
string('hours.ogg', 'tuntia ').
string('less_a_minute.ogg', 'alle minuutti ').
string('1_minute.ogg', 'minuutti ').
string('minutes.ogg', 'minuuttia ').


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

prepturn('left', ['left_prep.ogg']).
prepturn('left_sh', ['left_sh_prep.ogg']).
prepturn('left_sl', ['left_sl_prep.ogg']).
prepturn('right', ['right_prep.ogg']).
prepturn('right_sh', ['right_sh_prep.ogg']).
prepturn('right_sl', ['right_sl_prep.ogg']).
prepturn('left_keep', ['left_keep_prep.ogg']).
prepturn('right_keep', ['right_keep_prep.ogg']).

onto_street('', []).
onto_street(Street, ['onto.ogg', Street]) :- tts.
onto_street(_Street, []) :- not(tts).
%on_street('', []).
%on_street(Street, ['on.ogg', Street]) :- tts.
%on_street(_Street, []) :- not(tts).
%to_street('', []).
%to_street(Street, ['to.ogg', Street]) :- tts.
%to_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare.ogg', D, 'get.ogg', M | Sgen] :- distance(Dist, metrin) -- D, prepturn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- [D, 'get.ogg', M| Sgen] :- distance(Dist, metrin) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- ['now.ogg', M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare_make_uturn.ogg', D, 'get.ogg' | Sgen] :- distance(Dist, metrin) -- D, onto_street(Street, Sgen).
make_ut(Dist, Street) --  ['make_uturn1.ogg', D, 'get.ogg' | Sgen] :- distance(Dist, metrin) -- D, onto_street(Street, Sgen).
make_ut(Street) -- ['make_uturn2.ogg' | Sgen] :- onto_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['prepare_roundabout.ogg', D, 'get.ogg'] :- distance(Dist, metrin) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['roundabout.ogg', D, 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist, metrin) -- D, nth(Exit, E), onto_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take2.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), onto_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['follow.ogg', D | Sgen]:- distance(Dist, metria) -- D, onto_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['and_arrive_destination.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg'|Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg'|Ds] :- name(D, Ds).

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist, metria) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist, metria) -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist, metrin) -- D.
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
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, '1_minute.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [Ogg, 'minutes.ogg'] :- not(tts), Sec < 300, St is Sec/60, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, St is S mod 60, St > 0, hours(S, H), pnumber(St, Ogg).
time(Sec) -- [H] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60.


%%% distance measure
distance(Dist, Y) -- D :- measure('km-m'), distance_km(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-f'), distance_mi_f(Dist, Y) -- D.
distance(Dist, Y) -- D :- measure('mi-y'), distance_mi_y(Dist, Y) -- D.

%%% distance measure km/m
distance_km(Dist, metrin) -- [ X, 'meters_metrin.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, metria) -- [ X, 'meters_metri.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, metrin) -- [ X, 'meters_metrin.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, metria) -- [ X, 'meters_metri.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, metrin) -- ['around_1_kilometer_metrin.ogg']          :- Dist < 1500.
distance_km(Dist, metria) -- ['around_1_kilometer_metri.ogg']          :- Dist < 1500.
distance_km(Dist, metrin) -- ['around.ogg', X, 'kilometers_metrin.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, metria) -- ['around.ogg', X, 'kilometers_metri.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, metrin) -- [ X, 'kilometers_metrin.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, metria) -- [ X, 'kilometers_metri.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist, metrin) -- [ X, 'feet_metrin.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, metria) -- [ X, 'feet_metri.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, metrin) -- ['1_tenth_of_a_mile_metrin.ogg']         :- Dist < 241.
distance_mi_f(Dist, metria) -- ['1_tenth_of_a_mile_metri.ogg']         :- Dist < 241.
distance_mi_f(Dist, metrin) -- [ X, 'tenths_of_a_mile_metrin.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, metria) -- [ X, 'tenths_of_a_mile_metri.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, metrin) -- ['around_1_mile_metrin.ogg']             :- Dist < 2414.
distance_mi_f(Dist, metria) -- ['around_1_mile_metri.ogg']             :- Dist < 2414.
distance_mi_f(Dist, metrin) -- ['around.ogg', X, 'miles_metrin.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, metria) -- ['around.ogg', X, 'miles_metri.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, metrin) -- [ X, 'miles_metrin.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, metria) -- [ X, 'miles_metri.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist, metrin) -- [ X, 'yards_metrin.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, metria) -- [ X, 'yards_metri.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, metrin) -- [ X, 'yards_metrin.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, metria) -- [ X, 'yards_metri.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, metrin) -- ['around_1_mile_metrin.ogg']             :- Dist < 2414.
distance_mi_y(Dist, metria) -- ['around_1_mile_metri.ogg']             :- Dist < 2414.
distance_mi_y(Dist, metrin) -- ['around.ogg', X, 'miles_metrin.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, metria) -- ['around.ogg', X, 'miles_metri.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, metrin) -- [ X, 'miles_metrin.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, metria) -- [ X, 'miles_metri.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).


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
