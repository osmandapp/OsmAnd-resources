% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(102).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('et').
%fest_language('cmu_us_awb_arctic_clunits').

% IMPLEMENTED (X) or MISSING ( ) FEATURES:
% (X) new Version 1.5 format
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) special grammar: onto_street / on_street / to_street
% (X) special grammar: nominative/dativ for distance measure
% (X) special grammar: imperative/infinitive distincion for turns
% (X) distance measure: meters / feet / yard support
% (XXX) Street name announcement (suppress in prepare_roundabout) -- NB! Not supressed there.
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% (X) word order checked


% ROUTE CALCULATED
string('route_is.ogg', 'Tee-kond on ').
string('long.ogg', 'pikk, '). % Comma!
string('route_calculate.ogg', 'Mõtlesin ümber.').
string('distance.ogg', 'Tee-pikkus on ').

% LEFT/RIGHT
string('prepare.ogg', 'Valmistuge ').
string('after.ogg', 'pärast ').
% Imperative (do turn):
string('left.ogg', 'keerake vasakule ').
string('left_sh.ogg', 'keerake järsult vasakule ').
string('left_sl.ogg', 'keerake pisut vasakule ').
string('right.ogg', 'keerake paremale ').
string('right_sh.ogg', 'keerake järsult paremale ').
string('right_sl.ogg', 'keerake pisut paremale ').
string('left_keep.ogg', 'hoidke vasakule ').
string('right_keep.ogg', 'hoidke paremale ').
% "-ma"-infinitive ([prepare] to turn):
string('inf_left.ogg', 'keerama vasakule ').
string('inf_left_sh.ogg', 'keerama järsult vasakule ').
string('inf_left_sl.ogg', 'keerama pisut vasakule ').
string('inf_right.ogg', 'keerama paremale ').
string('inf_right_sh.ogg', 'keerama järsult paremale ').
string('inf_right_sl.ogg', 'keerama pisut paremale ').
string('inf_left_keep.ogg', 'hoidma vasakule ').
string('inf_right_keep.ogg', 'hoidma paremale ').
% "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.
string('bear.ogg', 'hoidke ').
string('left_bear.ogg', 'vasakule ').
string('right_bear.ogg', 'paremale ').

% U-TURNS
string('make_uturn.ogg', 'Keerake tagasi ').
string('make_uturn_inf.ogg', 'keerame tagasi ').
string('make_uturn_wp.ogg', 'Kui võimalik, keerake tagasi ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'Valmistuge sõitma ring-ristmikule ').
string('prepare_walk_roundabout.ogg', 'Valmistuge kõndima ring-ristmikule ').
string('roundabout.ogg', 'sõitke ring-ristmikule ').
string('walk_roundabout.ogg', 'kõndige ring-ristmikule ').
string('then.ogg', ', siis ').
string('and.ogg', 'ja ').
string('take.ogg', 'valige ').
string('exit.ogg', 'välja-sõit ').

string('1st.ogg', 'esimene ').
string('2nd.ogg', 'teine ').
string('3rd.ogg', 'kolmas ').
string('4th.ogg', 'neljas ').
string('5th.ogg', 'viies ').
string('6th.ogg', 'kuues ').
string('7th.ogg', 'seitsmes ').
string('8th.ogg', 'kaheksas ').
string('9th.ogg', 'üheksas ').
string('10th.ogg', 'kümnes ').
string('11th.ogg', 'üheteistkümnes ').
string('12th.ogg', 'kaheteistkümnes ').
string('13th.ogg', 'kolmeteistkümnes ').
string('14th.ogg', 'neljateistkümnes ').
string('15th.ogg', 'viieteistkümnes ').
string('16th.ogg', 'kuueteistkümnes ').
string('17th.ogg', 'seitsmeteistkümnes ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Liikuge otse ').
string('follow.ogg', 'Jätkake ').

% ARRIVE
string('and_arrive_destination.ogg', 'ja jõuate sihtkohta ').
string('reached_destination.ogg', 'Oletegi kohal: ').
string('and_arrive_intermediate.ogg', 'ja jõuate tee-tähiseni ').
string('reached_intermediate.ogg', 'Tee-tähis ').
string('and_arrive_waypoint.ogg', 'ja jõuate tee-tähiseni ').   % NB! Is "GPX" necessary here?
string('reached_waypoint.ogg', 'Tee-tähis ').                   % NB! And here?

% OTHER PROMPTS
string('attention.ogg', 'Tähelepanu! ').
string('location_lost.ogg', 'Geepe-essi levi pole. ').
string('location_recovered.ogg', 'Geepe-essi levi taastus. ').
string('you_are.ogg', 'Olete ').
string('off_route.ogg', 'plaanitud teest kõrvale kaldunud ').
string('exceed_limit.ogg', 'Ületate piir-kiirust.').

% STREET NAME GRAMMAR
%
% Relevant declination in Estonian:
%
% nominative - nimetav (X)
% genitive - omastav (of X) - ending varies, but is always a vowel
% allative - alaleütlev (onto X) - ending "-le"
% adessive - alalütlev (on X) - ending "-l"
% terminative - rajav (until X, to X) - ending "-ni"
%
% The logic (in decline_street/2 below):
% "tee" means "road" (thus, no additions there),
% "pst" at the end of a street name means "puiestee" (alley),
% "mnt" means "maantee" (main road),
% a numbered road, if its number has at least 4 digits, is "tee" and the numbers are spelt out separately,
% otherwise "maantee" (smaller roads have big numbers in Estonia),
% if the name of a road ends in a number, but is not wholly numeric, it is "maantee",
% other named roads are under "tänav" (street).
% Those ending with a vowel are assumed to be in genitive case, this affects the word order.
string('onto_road.ogg', 'teele ').
string('on_road.ogg', 'teel ').
string('to_road.ogg', 'teeni ').

string('onto_main_road.ogg', 'maanteele ').
string('on_main_road.ogg', 'maanteel ').
string('to_main_road.ogg', 'maanteeni ').

string('onto_alley.ogg', 'puiesteele ').
string('on_alley.ogg', 'puiesteel ').
string('to_alley.ogg', 'puiesteeni ').

string('onto_alley2.ogg', 'alleele ').
string('on_alley2.ogg', 'alleel ').
string('to_alley2.ogg', 'alleeni ').

string('onto_street.ogg', 'tänavale ').
string('on_street.ogg', 'tänaval ').
string('to_street.ogg', 'tänavani ').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'meetrit ').
string('around_1_kilometer.ogg', 'umbes üks kilomeeter ').
string('around.ogg', 'ligikaudu ').
string('kilometers.ogg', 'kilomeetrit ').

string('feet.ogg', 'jalga ').
string('1_tenth_of_a_mile.ogg', 'üks kümnendik miili ').
string('tenths_of_a_mile.ogg', 'kümnendikku miili ').
string('around_1_mile.ogg', 'umbes üks miil ').
string('miles.ogg', 'miili ').

string('yards.ogg', 'jardi ').

% Distance units in genitive case
string('of_meters.ogg', 'meetri ').
string('of_around_1_kilometer.ogg', 'umbes ühe kilomeetri ').
string('of_kilometers.ogg', 'kilomeetri ').

string('of_feet.ogg', 'jala ').
string('of_1_tenth_of_a_mile.ogg', 'ühe kümnendiku miili ').
string('of_tenths_of_a_mile.ogg', 'kümnendiku miili ').
string('of_around_1_mile.ogg', 'umbes ühe miili ').
string('of_miles.ogg', 'miili ').

string('of_yards.ogg', 'jardi ').

% TIME SUPPORT
string('time.ogg', 'aeg ').
string('1_hour.ogg', 'üks tund ').
string('hours.ogg', 'tundi ').
string('less_a_minute.ogg', 'vähem kui minut ').
string('1_minute.ogg', 'üks minut ').
string('minutes.ogg', 'minutit ').

% Numbers in the genitive case.
string('of_1.ogg', 'ühe').
string('of_2.ogg', 'kahe').
string('of_3.ogg', 'kolme').
string('of_4.ogg', 'nelja').
string('of_5.ogg', 'viie').
string('of_6.ogg', 'kuue').
string('of_7.ogg', 'seitsme').
string('of_8.ogg', 'kaheksa').
string('of_9.ogg', 'üheksa').
string('of_10.ogg', 'kümne').
string('of_11.ogg', 'üheteistkümne').
string('of_12.ogg', 'kaheteistkümne').
string('of_13.ogg', 'kolmeteistkümne').
string('of_14.ogg', 'neljateistkümne').
string('of_15.ogg', 'viieteistkümne').
string('of_16.ogg', 'kuueteistkümne').
string('of_17.ogg', 'seitsmeteistkümne').
string('of_18.ogg', 'kaheksateistkümne').
string('of_19.ogg', 'üheksateistkümne').
string('of_tens.ogg', 'kümne').
string('of_100.ogg', 'saja').
string('of_1000.ogg', 'tuhande').

%% COMMAND BUILDING / WORD ORDER
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).

turn_infinitive(Turn, [S]) :- atom_concat(Turn, '.ogg', Ogg), decline_string(Ogg, 'inf', S).

bear_left -- ['left_keep.ogg'].
bear_left('') -- ['left_keep.ogg'] :- !.
bear_left(Street) -- ['bear.ogg', On_Street, 'left_bear.ogg'] :- tts, decline_street(Street, '-l', On_Street).
bear_left(_Street) -- ['left_keep.ogg'] :- not(tts).
bear_right -- ['right_keep.ogg'].
bear_right('') -- ['right_keep.ogg'] :- !.
bear_right(Street) -- ['bear.ogg', On_Street, 'right_bear.ogg'] :- tts, decline_street(Street, '-l', On_Street).
bear_right(_Street) -- ['right_keep.ogg'] :- not(tts).

onto_street('', []) :- !.
onto_street(Street, Onto_Street) :- tts, decline_street(Street, '-le', Onto_Street).
onto_street(_Street, []) :- not(tts).
on_street('', []) :- !.
on_street(Street, On_Street) :- tts, decline_street(Street, '-l', On_Street).
on_street(_Street, []) :- not(tts).
to_street('', []) :- !.
to_street(Street, To_Street) :- tts, decline_street(Street, '-ni', To_Street).
to_street(_Street, []) :- not(tts).

after(Dist) -- [D, 'after.ogg'] :- distance(Dist, 'gen') -- D.

prepare_turn(Turn, Dist, Street) -- ['prepare.ogg', M, After | Sgen] :- after(Dist) -- After, turn_infinitive(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- [After, M | Sgen] :- after(Dist) -- After, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare.ogg', 'make_uturn_inf.ogg', After | Sgen] :- after(Dist) -- After, on_street(Street, Sgen).
make_ut(Dist, Street) --  [After, 'make_uturn.ogg' | Sgen] :- after(Dist) -- After, on_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg' | Sgen] :- on_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, Exit, Street) -- ['prepare_walk_roundabout.ogg', After, 'then.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- appMode('pedestrian'), !, after(Dist) -- After, nth(Exit, E), onto_street(Street, Sgen).
prepare_roundabout(Dist, Exit, Street) -- ['prepare_roundabout.ogg', After, 'then.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- after(Dist) -- After, nth(Exit, E), onto_street(Street, Sgen).
roundabout(Dist, _Angle, Exit, Street) -- [After, 'walk_roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- appMode('pedestrian'), !, after(Dist) -- After, nth(Exit, E), onto_street(Street, Sgen).
roundabout(Dist, _Angle, Exit, Street) -- [After, 'roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- after(Dist) -- After, nth(Exit, E), onto_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), onto_street(Street, Sgen).

go_ahead(Dist, Street) -- ['follow.ogg', D | Sgen] :- distance(Dist, 'nom') -- D, to_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['and_arrive_destination.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg'|Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg'|Ds] :- name(D, Ds).

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'long.ogg', 'time.ogg', T] :- distance(Dist, 'nom') -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car'), !.
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, ', ' , 'time.ogg', T] :- distance(Dist, 'nom') -- D, time(Time) -- T.

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['you_are.ogg', D, 'off_route.ogg'] :- distance(Dist, 'nom') -- D.
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


% Declination of street names

decline_string(StringName, 'nom', StringName).
decline_string(StringName, 'gen', Declined) :- atom_concat('of_', StringName, Declined).
decline_string(StringName, '-le', Declined) :- atom_concat('onto_', StringName, Declined).
decline_string(StringName, '-l', Declined) :- atom_concat('on_', StringName, Declined).
decline_string(StringName, '-ni', Declined) :- atom_concat('to_', StringName, Declined).
decline_string(StringName, 'inf', Declined) :- atom_concat('inf_', StringName, Declined).

decline_street(Street, Case, [Name, Type]) :- parse_tee(Street, Name), !, decline_string('road.ogg', Case, Type).
decline_street(Street, Case, [Name, Type]) :- parse_maantee(Street, Name), !, decline_string('main_road.ogg', Case, Type).
decline_street(Street, Case, [Name, Type]) :- parse_puiestee(Street, Name), !, decline_string('alley.ogg', Case, Type).
decline_street(Street, Case, [Name, Type]) :- parse_allee(Street, Name), !, decline_string('alley2.ogg', Case, Type).
decline_street(Street, Case, [Street, Type]) :- ends_with_vowel(Street), !, decline_string('street.ogg', Case, Type).
decline_street(Street, Case, [Type, Street]) :- num_atom(Num, Street), Num =< 999, !, decline_string('main_road.ogg', Case, Type).
decline_street(Street, Case, [Type, Nums]) :- num_atom(_, Street), !, atom_chars(Street, Nums), decline_string('road.ogg', Case, Type).
decline_street(Street, Case, [Type, Street]) :- ends_with_number(Street), !, decline_string('main_road.ogg', Case, Type).
decline_street(Street, Case, [Type, Street]) :- decline_string('street.ogg', Case, Type). % Catch all

parse_tee(Street, Name) :- atom_take_end(Street, ' tee', Name).
parse_maantee(Street, Name) :- atom_take_end(Street, ' mnt', Name), !.
parse_maantee(Street, Name) :- atom_take_end(Street, ' maantee', Name).
parse_puiestee(Street, Name) :- atom_take_end(Street, ' pst', Name), !.
parse_puiestee(Street, Name) :- atom_take_end(Street, ' puiestee', Name).
parse_allee(Street, Name) :- atom_take_end(Street, ' allee', Name).
ends_with_vowel(Name) :- atom_chars(Name, NameList), last(NameList, Last), member(Last, ['a', 'e', 'i', 'o', 'u', 'õ', 'ä', 'ö', 'ü', 'y']).
ends_with_number(Name) :- atom_chars(Name, NameList), last(NameList, Last), num_atom(_, Last).

%% command main method
%% if you are familar with Prolog you can input specific to the whole mechanism,
%% by adding exception cases.

last([], _) :- fail.
last([A], A).
last([_ | B], C) :- last(B, C).

atom_take_end(Atom, End, Result) :- atom_chars(Atom, AtomL), atom_chars(End, EndL), append(ResultL, EndL, AtomL), atom_chars(Result, ResultL).

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
% time measure
hours(S, []) :- S < 60, !.
hours(S, ['1_hour.ogg']) :- S < 120, !.
hours(S, [Ogg, 'hours.ogg']) :- H is S div 60, pnumber(H, Ogg).
time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30, !.
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0, !.
time(Sec) -- ['1_minute.ogg'] :- tts, S is round(Sec/60.0), S < 60, St is S mod 60, St = 1, !.
time(Sec) -- [H, 'and.ogg', '1_minute.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, !.
time(Sec) -- [Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), S < 60, !, St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [H, 'and.ogg', Ogg, 'minutes.ogg'] :- tts, !, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).

time(Sec) -- [Ogg, 'minutes.ogg'] :- not(tts), Sec < 300, St is Sec/60, pnumber(St, Ogg).
time(Sec) -- [H, 'and.ogg', Ogg, 'minutes.ogg'] :- not(tts), !, S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60, pnumber(St, Ogg).


%%% distance measure
distance(Dist) -- D :- distance(Dist, 'nom') -- D.

distance(Dist, Case) -- D :- measure('km-m'), distance_km(Dist, Case) -- D.
distance(Dist, Case) -- D :- measure('mi-f'), distance_mi_f(Dist, Case) -- D.
distance(Dist, Case) -- D :- measure('mi-y'), distance_mi_y(Dist, Case) -- D.

%%% distance measure km/m
distance_km(Dist, Case) -- [ X, Unit]                   :- Dist < 100,   !, D is round(Dist/10.0)*10,           dist(D, Case, X), decline_string('meters.ogg', Case, Unit).
distance_km(Dist, Case) -- [ X, Unit]                   :- Dist < 1000,  !, D is round(2*Dist/100.0)*50,        dist(D, Case, X), decline_string('meters.ogg', Case, Unit).
distance_km(Dist, Case) -- [Unit]                       :- Dist < 1500,  !,                                        decline_string('around_1_kilometer.ogg', Case, Unit).
distance_km(Dist, Case) -- ['around.ogg', X, Unit]      :- Dist < 10000, !, D is round(Dist/1000.0),            dist(D, Case, X), decline_string('kilometers.ogg', Case, Unit).
distance_km(Dist, Case) -- [ X, Unit]                   :-               !, D is round(Dist/1000.0),            dist(D, Case, X), decline_string('kilometers.ogg', Case, Unit).

%%% distance measure mi/f
distance_mi_f(Dist, Case) -- [ X, Unit]                 :- Dist < 160,   !, D is round(2*Dist/100.0/0.3048)*50, dist(D, Case, X), decline_string('feet.ogg', Case, Unit).
distance_mi_f(Dist, Case) -- [Unit]                     :- Dist < 241,   !,                                        decline_string('1_tenth_of_a_mile.ogg', Case, Unit).
distance_mi_f(Dist, Case) -- [ X, Unit]                 :- Dist < 1529,  !, D is round(Dist/161.0),             dist(D, Case, X), decline_string('tenths_of_a_mile.ogg', Case, Unit).
distance_mi_f(Dist, Case) -- [Unit]                     :- Dist < 2414,  !,                                        decline_string('around_1_mile.ogg', Case, Unit).
distance_mi_f(Dist, Case) -- ['around.ogg', X, Unit]    :- Dist < 16093, !, D is round(Dist/1609.0),            dist(D, Case, X), decline_string('miles.ogg', Case, Unit).
distance_mi_f(Dist, Case) -- [ X, Unit]                 :-               !, D is round(Dist/1609.0),            dist(D, Case, X), decline_string('miles.ogg', Case, Unit).

%%% distance measure mi/y
distance_mi_y(Dist, Case) -- [ X, Unit]                 :- Dist < 241,   !, D is round(Dist/10.0/0.9144)*10,    dist(D, Case, X), decline_string('yards.ogg', Case, Unit).
distance_mi_y(Dist, Case) -- [ X, Unit]                 :- Dist < 1300,  !, D is round(2*Dist/100.0/0.9144)*50, dist(D, Case, X), decline_string('yards.ogg', Case, Unit).
distance_mi_y(Dist, Case) -- [Unit]                     :- Dist < 2414,  !,                                        decline_string('around_1_mile.ogg', Case, Unit).
distance_mi_y(Dist, Case) -- ['around.ogg', X, Unit]    :- Dist < 16093, !, D is round(Dist/1609.0),            dist(D, Case, X), decline_string('miles.ogg', Case, Unit).
distance_mi_y(Dist, Case) -- [ X, Unit]                 :-               !, D is round(Dist/1609.0),            dist(D, Case, X), decline_string('miles.ogg', Case, Unit).


interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), num_atom(X, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), num_atom(X, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 900, 50), num_atom(X, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), num_atom(X, A), atom_concat(A, '.ogg', Ogg).

string(OggD, A) :- voice_generation, interval(X, 1, 19), num_atom(X, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, 'gen', OggD).
string(OggD, A) :- voice_generation, interval(X, 20, 95, 5), num_atom(X, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, 'gen', OggD).
string(OggD, A) :- voice_generation, interval(X, 100, 900, 50), num_atom(X, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, 'gen', OggD).
string(OggD, A) :- voice_generation, interval(X, 1000, 9000, 1000), num_atom(X, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, 'gen', OggD).

% Nominative is the default
dist(X, Y) :- dist(X, 'nom', Y).

% The following uses the number-to-string engine from the TTS system. It works usually well for nominative case, but not for genitive.
dist(X, 'nom', Y) :- tts, !, num_atom(X, Y).

decline_num(Num, Case, Decl) :- num_atom(Num, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, Case, Decl).

dist(0, _Case, []) :-                   tts, !.
dist(X, Case, [H]) :-                   tts, X < 20, !,                                         decline_num(X, Case, H).
dist(X, Case, [H, Tens | T]) :-         tts, X < 100, !, Y is X // 10, Z is X mod 10,           decline_num(Y, Case, H), decline_string('tens.ogg', Case, Tens),        dist(Z, Case, T).
dist(X, Case, [Hundred | T]) :-         tts, 1 is X // 100, !, Z is X mod 100,                  decline_num(100, Case, Hundred),                                      dist(Z, Case, T).
dist(X, Case, L) :-                     tts, X < 1000, !,                                                                                                       dist_wrap(X, Case, L).
dist(X, Case, [Thousand | T]) :-        tts, 1 is X // 1000, !, Z is X mod 1000,                decline_num(1000, Case, Thousand),                            dist_wrap(Z, Case, T).
dist(X, Case, L) :-                     tts, !, dist_wrap(X, Case, L).

dist_wrap(X, Case, L) :-                X < 100, !,                                dist(X, Case, L).
dist_wrap(X, Case, [H, Hundred | T]) :- X < 1000, X >= 100, !, Y is X // 100, Z is X mod 100,        decline_num(Y, Case, H), decline_num(100, Case, Hundred),             dist(Z, Case, T).
dist_wrap(X, Case, L) :-                !, Y is X // 1000, Z is X mod 1000,           dist(Y, Case, H), decline_num(1000, Case, Thousand), append(H, [Thousand | T], L),  dist_wrap(Z, Case, T).

% The following is relevant only if not(tts)
dist(0, _Case, []) :- !.
dist(X, Case, [OggD]) :- X < 20, !, pnumber(X, Ogg), decline_string(Ogg, Case, OggD).
dist(X, Case, [OggD]) :- X < 1000, 0 is X mod 50, !, num_atom(X, A), atom_concat(A, '.ogg', Ogg), decline_string(Ogg, Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 30, Ts is D - 20, !, dist(Ts, Case, L), decline_string('20.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 40, Ts is D - 30, !, dist(Ts, Case, L), decline_string('30.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 50, Ts is D - 40, !, dist(Ts, Case, L), decline_string('40.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 60, Ts is D - 50, !, dist(Ts, Case, L), decline_string('50.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 70, Ts is D - 60, !, dist(Ts, Case, L), decline_string('60.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 80, Ts is D - 70, !, dist(Ts, Case, L), decline_string('70.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 90, Ts is D - 80, !, dist(Ts, Case, L), decline_string('80.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 100, Ts is D - 90, !, dist(Ts, Case, L), decline_string('90.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 200, Ts is D - 100, !, dist(Ts, Case, L), decline_string('100.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 300, Ts is D - 200, !, dist(Ts, Case, L), decline_string('200.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 400, Ts is D - 300, !, dist(Ts, Case, L), decline_string('300.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 500, Ts is D - 400, !, dist(Ts, Case, L), decline_string('400.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 600, Ts is D - 500, !, dist(Ts, Case, L), decline_string('500.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 700, Ts is D - 600, !, dist(Ts, Case, L), decline_string('600.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 800, Ts is D - 700, !, dist(Ts, Case, L), decline_string('700.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 900, Ts is D - 800, !, dist(Ts, Case, L), decline_string('800.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :-  D < 1000, Ts is D - 900, !, dist(Ts, Case, L), decline_string('900.ogg', Case, OggD).
dist(D, Case, [OggD|L]) :- Ts is D - 1000, !, dist(Ts, Case, L), decline_string('1000.ogg', Case, OggD).


