%%% !!! THIS IS GENERATED FILE !!! Modify ttsconfig.p
﻿% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(0).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('ja').
fest_language('').

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
string('mokutekichi_made.ogg', 'Mokutekichi made ').
string('michi_wo_koushin_shimashita.ogg', 'Michi wo koushin shimashita').
string('kyouri_ha.ogg', 'Kyouri ha ').

% LEFT/RIGHT
%string('prepare.ogg', 'Prepare to ').
string('saki.ogg', 'Saki ').

string('hidari_ni_magatte_kudasai.ogg', 'Hidari ni magatte kudasai ').
string('hidari_wo_eikaku_ni_magatte_kudasai.ogg', 'Hidari wo eikaku ni magatte kudasai ').
string('hidari_wo_yuruyaka_ni_magatte_kudasai.ogg', 'Hidari wo yuruyaka ni magatte kudasai ').
string('migi_ni_magatte_kudasai.ogg', 'Migi ni magatte kudasai ').
string('migi_wo_eikaku_ni_magatte_kudasai.ogg', 'Migi wo eikaku ni magatte kudasai ').
string('migi_wo_yuruyaka_ni_magatte_kudasai.ogg', 'Migi wo yuruyaka ni magatte kudasai').
string('hidari_ni_yotte_kudasai.ogg', 'Hidari ni yotte kudasai').
string('migi_ni_yotte_kudasai.ogg', 'Migi ni yotte kudasai').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

% U-TURNS
string('uturn_wo_shite_kudasai.ogg', 'U turn wo shite kudasai ').
%string('make_uturn_wp.ogg', 'When possible, please make a U turn ').

% ROUNDABOUTS
%string('prepare_roundabout.ogg', 'Prepare to enter a roundabout ').
string('rotary_ga_arimasu.ogg', 'Rotary ga arimasu').
string('soshite.ogg', ', soshite ').
%string('and.ogg', 'and ').
string('rotary_no.ogg', 'rotary no ').
string('no_deguchi_wo_dete_kudasai.ogg', 'no deguchi wo dete kudasai ').

string('1.ogg', 'ichi ').
string('2.ogg', 'ni ').
string('3.ogg', 'san ').
string('4.ogg', 'yon ').
string('5.ogg', 'go ').
string('6.ogg', 'roku ').
string('7.ogg', 'nana ').
string('8.ogg', 'hachi ').
string('9.ogg', 'kyuu ').
string('10.ogg', 'juu ').
string('11.ogg', 'juu ichi ').
string('12.ogg', 'juu ni ').
string('13.ogg', 'juu san ').
string('14.ogg', 'juu yon  ').
string('15.ogg', 'juu go ').
string('16.ogg', 'juu roku ').
string('17.ogg', 'juu nana ').

string('ban_me.ogg', 'ban me ').

% STRAIGHT/FOLLOW
string('chokushin_shite_kudasai.ogg', 'CHokushin shite kudasai ').
%string('follow.ogg', 'Follow the course of the road for').

% ARRIVE
string('touchaku_shimasu.ogg', 'touchaku shimasu ').
string('touchaku_shimashita.ogg','touchaku shimashita ').
string('tochuu_no_mokuteki_ni_tsukimasu.ogg', 'tochuu no mokuteki ni tsukimasu ').
string('tochuu_no_mokuteki_ni_tsukimashita.ogg', 'tochuu no mokuteki ni tsukimashita ').
string('waypoint_ni_tsukimasu.ogg', 'waypoint ni tsukimasu ').
string('waypoint_ni_tsukimashita.ogg', 'waypoint ni tsukimashita ').

% OTHER PROMPTS
string('ki_wo_tsukete.ogg', 'Ki wo tsukete, ').
string('kengai_desu.ogg', 'kengai_desu ').
string('location_recovered.ogg', 'GPS信号が回復').
string('mae_kara_michi_ga_chigaimasu.ogg', 'mae kara michi ga chigaimasu').
string('speed_over_desu.ogg', 'Speed over desu ').

% STREET NAME GRAMMAR
string('ni.ogg', 'ni ').
%string('on.ogg', 'on ').
string('made.ogg', 'made ').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'meters ').
string('oyoso_1_kilo.ogg', 'oyoso 1 kilo ').
string('oyoso.ogg', 'oyoso ').
string('kilo.ogg', 'kilo ').

string('feet.ogg', 'feet ').
string('1_tenth_of_a_mile.ogg', 'one tenth of a mile').
string('tenths_of_a_mile.ogg', 'tenths of a mile').
string('around_1_mile.ogg', 'about 1 mile ').
string('miles.ogg', 'miles ').

string('yards.ogg', 'yards ').

% TIME SUPPORT
string('jikan.ogg', 'jikan ').
%string('1_jikan.ogg', 'ichi jikan ').
%string('hours.ogg', 'hours ').
string('ippun_inai.ogg', 'ippun inai ').
string('ippun.ogg', 'ippun ').
%string('minutes.ogg', 'minutes ').


%% COMMAND BUILDING / WORD ORDER
turn('left', ['hidari_ni_magatte_kudasai.ogg']).
turn('left_sh', ['hidari_wo_eikaku_ni_magatte_kudasai.ogg']).
turn('left_sl', ['hidari_wo_yuruyaka_ni_magatte_kudasai.ogg']).
turn('right', ['migi_ni_magatte_kudasai.ogg']).
turn('right_sh', ['migi_wo_eikaku_ni_magatte_kudasai.ogg']).
turn('right_sl', ['migi_wo_yuruyaka_ni_magatte_kudasai.ogg']).
turn('left_keep', ['hidari_ni_yotte_kudasai.ogg']).
turn('right_keep', ['migi_ni_yotte_kudasai.ogg']).
bear_left(_Street) -- ['hidari_ni_yotte_kudasai.ogg'].
bear_right(_Street) -- ['migi_ni_yotte_kudasai.ogg'].

onto_street('', []).
onto_street(Street, [Street, 'ni.ogg']) :- tts.
onto_street(_Street, []) :- not(tts).
on_street('', []).
on_street(Street, [Street, 'ni.ogg']) :- tts.
on_street(_Street, []) :- not(tts).
to_street('', []).
to_street(Street, [Street, 'made.ogg']) :- tts.
to_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- [D, 'saki.ogg', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Dist, Street) -- [D, 'saki.ogg', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), onto_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), onto_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- [D, 'saki.ogg', 'uturn_wo_shite_kudasai.ogg' | Sgen] :- distance(Dist) -- D, onto_street(Street, Sgen).
make_ut(Dist, Street) --  [D, 'saki.ogg', 'uturn_wo_shite_kudasai.ogg' | Sgen] :- distance(Dist) -- D, onto_street(Street, Sgen).
make_ut(Street) -- ['uturn_wo_shite_kudasai.ogg' | Sgen] :- onto_street(Street, Sgen).
make_ut_wp -- ['uturn_wo_shite_kudasai.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- [D, 'saki.ogg', 'rotary_ga_arimasu.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- [D, 'saki.ogg', 'rotary_no.ogg', E, 'no_deguchi_wo_dete_kudasai.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), onto_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- [E, 'no_deguchi_wo_dete_kudasai.ogg' | Sgen] :- nth(Exit, E), onto_street(Street, Sgen).

go_ahead(Dist, Street) -- [D, 'chokushin_shite_kudasai.ogg' | Sgen] :- distance(Dist) -- D, to_street(Street, Sgen).

then -- ['soshite.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['soshite.ogg', 'touchaku_shimasu.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['touchaku_shimashita.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['soshite.ogg', 'tochuu_no_mokuteki_ni_tsukimasu.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['tochuu_no_mokuteki_ni_tsukimashita.ogg'|Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['soshite.ogg', 'waypoint_ni_tsukimasu.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['waypoint_ni_tsukimashita.ogg'|Ds] :- name(D, Ds).

route_new_calc(Dist, Time) -- ['mokutekichi_made.ogg', D, 'jikan_ha.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['michi_wo_koushin_shimashita.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['michi_wo_koushin_shimashita.ogg', 'kyouri_ha.ogg', D, 'jikan_ha.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

location_lost -- ['kengai_desu.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- [D, 'mae_kara_michi_ga_chigaimasu.ogg'] :- distance(Dist) -- D.
attention(_Type) -- ['ki_wo_tsukete.ogg'].
speed_alarm -- ['speed_over_desu.ogg'].


%% 
nth(1, ['1.ogg', 'ban_me.ogg']).
nth(2, ['2.ogg', 'ban_me.ogg']).
nth(3, ['3.ogg', 'ban_me.ogg']).
nth(4, ['4.ogg', 'ban_me.ogg']).
nth(5, ['5.ogg', 'ban_me.ogg']).
nth(6, ['6.ogg', 'ban_me.ogg']).
nth(7, ['7.ogg', 'ban_me.ogg']).
nth(8, ['8.ogg', 'ban_me.ogg']).
nth(9, ['9.ogg', 'ban_me.ogg']).
nth(10, ['10.ogg', 'ban_me.ogg']).
nth(11, ['11.ogg', 'ban_me.ogg']).
nth(12, ['12.ogg', 'ban_me.ogg']).
nth(13, ['13.ogg', 'ban_me.ogg']).
nth(14, ['14.ogg', 'ban_me.ogg']).
nth(15, ['15.ogg', 'ban_me.ogg']).
nth(16, ['16.ogg', 'ban_me.ogg']).
nth(17, ['17.ogg', 'ban_me.ogg']).
nth(18, ['18.ogg', 'ban_me.ogg']).
nth(19, ['19.ogg', 'ban_me.ogg']).


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


%% Minutes
minutes(1, ['ippun.ogg']).
minutes(2, ['ni_fun.ogg']).
minutes(3, ['san_pun.ogg']).
minutes(4, ['yon_fun.ogg']).
minutes(5, ['go_fun.ogg']).
minutes(6, ['roppun.ogg']).
minutes(7, ['nana_fun.ogg']).
minutes(8, ['happun.ogg']).
minutes(9, ['kyuu_fun.ogg']).
minutes(10, ['juppun.ogg']).


pnumber(X, Y) :- tts, !, num_atom(X, Y).
pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
% time measure
hours(S, []) :- S < 60.
%hours(S, ['1_jikan.ogg']) :- S < 120, H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'jikan.ogg']) :- H is S div 60, pnumber(H, Ogg).
time(Sec) -- ['ippun_inai.ogg'] :- Sec < 30.
time(Sec) -- [H, 'ippun.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, pnumber(St, Ogg).
%time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).
%time(Sec) -- [H, Ogg, 'minutes.ogg'] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60, pnumber(St, Ogg).
time(Sec) -- [H, 'go_fun.ogg'] :- not(tts), S is round(Sec/60.0) * 5, hours(S, H).
time(Sec) -- [H, 'juppun.ogg'] :- not(tts), S is round(Sec/60.0) * 10, hours(S, H).
time(Sec) -- [H, '10.ogg', 'go_fun.ogg'] :- not(tts), S is round(Sec/60.0) * 15, hours(S, H).
time(Sec) -- [H, '2.ogg', 'juppun.ogg'] :- not(tts), S is round(Sec/60.0) * 20, hours(S, H).
time(Sec) -- [H, '20.ogg', 'go_fun.ogg'] :- not(tts), S is round(Sec/60.0) * 25, hours(S, H).
time(Sec) -- [H, '3.ogg', 'juppun.ogg'] :- not(tts), S is round(Sec/60.0) * 30, hours(S, H).
time(Sec) -- [H, '4.ogg', 'juppun.ogg'] :- not(tts), S is round(Sec/60.0) * 40, hours(S, H).
time(Sec) -- [H, '5.ogg', 'juppun.ogg'] :- not(tts), S is round(Sec/60.0) * 50, hours(S, H).


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'meters.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'meters.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['oyoso_1_kilo.ogg']                :- Dist < 1500.
distance_km(Dist) -- ['oyoso.ogg', X, 'kilo.ogg']        :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist) -- [ X, 'kilo.ogg']                    :-               D is round(Dist/1000.0),            dist(D, X).

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
