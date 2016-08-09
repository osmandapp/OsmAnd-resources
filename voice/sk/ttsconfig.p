% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('sk').
% fest_language(' ').

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
% (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
% (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM
% (X) Other prompts: gps lost, off route, back to route
% (X) Street name and prepositions (onto / on / to) and street destination (toward) support
% (X) Distance unit support (meters / feet / yard)
% (X) Special grammar: special plural, 1, 2, 3_4, 5+, accusative/locative/instrumental exists in the language but avoided in this file

%% STRINGS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ROUTE CALCULATED
string('route_is.ogg', 'Cesta je dlhá ').
string('route_calculate.ogg', 'Cesta prepočítaná').
string('distance.ogg', ', vzdialenosť ').

% LEFT/RIGHT
string('after.ogg', 'čoskoro o ').
string('in.ogg', 'o ').

string('left.ogg', 'zahnite doľava').
string('left_sh.ogg', 'zahnite prudko doľava').
string('left_sl.ogg', 'zahnite mierne doľava').
string('right.ogg', 'zahnite doprava').
string('right_sh.ogg', 'zahnite prudko doprava').
string('right_sl.ogg', 'zahnite mierne doprava').
string('left_keep.ogg', 'držte sa vľavo').
string('right_keep.ogg', 'držte sa vpravo').
string('left_bear.ogg', 'sa držte vľavo').      % in English the same as left_keep, may be different in other languages
string('right_bear.ogg', 'sa držte vpravo').    % in English the same as right_keep, may be different in other languages

% U-TURNS
string('prepare_make_uturn.ogg', 'sa budete otáčať naspäť').
string('make_uturn1.ogg', 'sa otočte naspäť').
string('make_uturn2.ogg', 'otočte sa naspäť').
string('make_uturn_wp.ogg', 'keď to bude možné, otočte sa naspäť').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'vojdete do kruhového objazdu').
string('roundabout.ogg', ' vojdite do kruhového objazdu ').
string('then.ogg', ', potom ').
string('and.ogg', 'a ').
string('take1.ogg', 'opustite ho cez ').
string('exit.ogg', 'výjazd').
string('take2.ogg', 'choďte cez ').

string('1st.ogg', 'prvý ').
string('2nd.ogg', 'druhý ').
string('3rd.ogg', 'tretí ').
string('4th.ogg', 'štvrtý ').
string('5th.ogg', 'piaty ').
string('6th.ogg', 'šiesty ').
string('7th.ogg', 'siedmy ').
string('8th.ogg', 'ôsmy ').
string('9th.ogg', 'deviaty ').
string('10th.ogg', 'desiaty ').
string('11th.ogg', 'jedenásty ').
string('12th.ogg', 'dvanásty ').
string('13th.ogg', 'trinásty ').
string('14th.ogg', 'štrnásty ').
string('15th.ogg', 'pätnásty ').
string('16th.ogg', 'šestnásty ').
string('17th.ogg', 'sedemnásty ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Pokračujte rovno ').
string('follow.ogg', 'Pokračujte ').

% ARRIVE
string('and_arrive_destination.ogg', 'a dorazíte do cieľa').
string('reached_destination.ogg', 'dorazili ste do cieľa').
string('and_arrive_intermediate.ogg', 'a prejdete Vaším prechodným bodom').
string('reached_intermediate.ogg', 'dorazili ste k Vášmu prechodnému bodu').

% NEARBY POINTS
string('and_arrive_waypoint.ogg', 'a prejdete prechodným bodom GPX').
string('reached_waypoint.ogg', 'dorazili ste k prechodnému bodu GPX').
string('and_arrive_favorite.ogg', 'a prejdete obľúbeným bodom ').
string('reached_favorite.ogg', 'dorazili ste k obľúbenému bodu ').
string('and_arrive_poi.ogg', 'a prejdete bodom záujmu ').
string('reached_poi.ogg', 'dorazili ste k bodu záujmu ').

% ATTENTION
%string('exceed_limit.ogg', 'Prekročili ste maximálnu povolenú rýchlosť').
string('exceed_limit.ogg', 'Povolená rýchlosť ').
string('attention.ogg', 'Pozor, ').
string('speed_camera.ogg', 'rýchlostný radar').
string('border_control.ogg', 'hraničná kontrola').
string('railroad_crossing.ogg', 'železničné priecestie').
string('traffic_calming.ogg', 'spomaľovač').
string('toll_booth.ogg', 'mýtna búdka').
string('stop.ogg', 'značka stop').
string('pedestrian_crosswalk.ogg', 'priechod pre chodcov').

% OTHER PROMPTS
string('location_lost.ogg', 'Strata signálu GPS').
string('location_recovered.ogg', 'Obnovenie signálu GPS').
string('off_route.ogg', 'Idete odchylne od trasy už ').
string('back_on_route.ogg', 'Vrátili ste sa na trasu.').

% STREET NAME PREPOSITIONS
string('onto.ogg', 'na cestu ').
string('on.ogg', 'po ').
string('to.ogg', 'k ').
string('toward.ogg', 'smerom na ').

% DISTANCE UNIT SUPPORT
string('around.ogg', 'približne ').
string('meters.ogg', 'metrov ').
string('kilometer.ogg', 'jeden kilometer ').
string('kilometers2.ogg', 'dva kilometre ').
string('kilometers3_4.ogg', 'kilometre ').
string('kilometers5.ogg', 'kilometrov ').

string('feet.ogg', 'stôp ').
string('1_tenth_of_a_mile.ogg', 'desatinu míle ').
string('half_a_mile.ogg', 'menej ako pol míle ').
string('tenths_of_a_mile.ogg', 'desatín míle ').
string('mile.ogg', 'jednu míľu ').
string('miles2.ogg', 'dve míle ').
string('miles3_4.ogg', 'míle ').
string('miles5.ogg', 'míľ ').

string('yards.ogg', 'yardov ').

% TIME SUPPORT
string('time.ogg', 'doba potrebná').
string('hours1.ogg', 'jedna hodina ').
string('hours2.ogg', 'dve hodiny ').
string('hours3_4.ogg', 'hodiny ').
string('hours5.ogg', 'hodín ').
string('less_a_minute.ogg', 'menej než minúta').
string('minutes1.ogg', 'jedna minúta').
string('minutes2.ogg', 'dve minúty').
string('minutes3_4.ogg', 'minúty').
string('minutes5.ogg', 'minút').

%% COMMAND BUILDING / WORD ORDER
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
% Note: turn('left_keep'/'right_keep',[]) is a turn type aiding lane selection, while bear_left()/bear_right() is triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages turn(l/r_keep) may not differ from bear_l/r:
bear_left(_Street) -- ['left_bear.ogg'].
bear_right(_Street) -- ['right_bear.ogg'].

% assemble_street_name(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% assemble_street_name(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%assemble_street_name(voice([Ref, '', Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).
%assemble_street_name(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 3 lines for Dest taking precedence over Name
assemble_street_name(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
assemble_street_name(voice(['', Name, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Name, ' ', C1).
assemble_street_name(voice([Ref, _, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(voice(['', '', D], _), ['toward.ogg', D]) :- tts.
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, '', _],[R, _, _]), assemble_street_name(Street, SName).
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(voice(['', '', D], _), ['to.ogg', D]) :- tts.
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), assemble_street_name(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, '', _],[R, _, _]), assemble_street_name(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), assemble_street_name(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['in.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['after.ogg', D, 'prepare_make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['in.ogg', D, 'make_uturn1.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn2.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['after.ogg', D, 'prepare_roundabout.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['in.ogg', D, 'roundabout.ogg', 'and.ogg', 'take1.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take2.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['follow.ogg', D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).

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

location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist) -- D.
back_on_route -- ['back_on_route.ogg'].

% TRAFFIC WARNINGS
speed_alarm(MaxSpeed, _Speed) -- ['exceed_limit.ogg', I] :- pnumber(MaxSpeed, I).
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).
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


pnumber(X, Y) :- tts, !, num_atom(X, Y).
pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
% time measure
% S = celkovy pocet minut, H = pocet hodin.
hours(S, [])                                :- S < 60.
hours(S, ['hours1.ogg'])                    :- S < 120.
hours(S, ['hours2.ogg'])                    :- S < 180.
hours(S, [Ogg, 'hours3_4.ogg'])             :- S < 300,  H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'hours5.ogg'])               :- tts,      H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'hours5.ogg'])               :- not(tts), S < 21*60, H is S div 60, pnumber(H, Ogg).
hours(S, [Ogg, 'hours5.ogg'])               :- not(tts),            H is round(S/300.0)*5, pnumber(H, Ogg).
% Sec = celkovy pocet sekund, S = celkovy pocet minut, H = pocet hodin, St zvysok minut bez hodin.
time(Sec) -- ['less_a_minute.ogg']          :- Sec < 45.
time(Sec) -- [H]                            :- tts, S is round(Sec/60.0), St is S mod 60, St = 0, hours(S, H).
time(Sec) -- [H, 'minutes1.ogg']            :- tts, S is round(Sec/60.0), St is S mod 60, St = 1, hours(S, H).
time(Sec) -- [H, 'minutes2.ogg']            :- tts, S is round(Sec/60.0), St is S mod 60, St = 2, hours(S, H).
time(Sec) -- [H, Ogg, 'minutes3_4.ogg']     :- tts, S is round(Sec/60.0), St is S mod 60, St < 5, hours(S, H), pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes5.ogg']       :- tts, S is round(Sec/60.0), St is S mod 60,         hours(S, H), pnumber(St, Ogg).
time(Sec) -- ['minutes1.ogg']               :- not(tts), Sec < 90.
time(Sec) -- ['minutes2.ogg']               :- not(tts), Sec < 150.
time(Sec) -- [Ogg, 'minutes3_4.ogg']        :- not(tts), Sec < 270,    St is Sec div 60,                                                      pnumber(St, Ogg).
time(Sec) -- [Ogg, 'minutes5.ogg']          :- not(tts), Sec < 21*60,  St is Sec div 60,                                                      pnumber(St, Ogg).
time(Sec) -- [H]                            :- not(tts), Sec < 21*3600, S is Sec div 60, St is S mod 60, St < 3,                 hours(S, H).
time(Sec) -- [H, Ogg, 'minutes5.ogg']       :- not(tts), Sec < 21*3600, S is Sec div 60, St is S mod 60, Stx is round(St/5.0)*5, hours(S, H), pnumber(Stx, Ogg).
time(Sec) -- ['around.ogg', H]              :- not(tts),                S is round(Sec/18000.0)*300,                             hours(S, H).

%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
% Dist = vzdialenost v metroch.
distance_km(Dist) -- [ X, 'meters.ogg']                     :- Dist < 100,   D is round(Dist/10.0)*10,              dist(D, X).
distance_km(Dist) -- [ X, 'meters.ogg']                     :- Dist < 1000,  D is round(2*Dist/100.0)*50,           dist(D, X).
distance_km(Dist) -- [ 'kilometer.ogg']                     :- Dist < 1500.
distance_km(Dist) -- [ 'kilometers2.ogg']                   :- Dist < 2500.
distance_km(Dist) -- [ X, 'kilometers3_4.ogg']              :- Dist < 4500,  D is round(Dist/1000.0),               dist(D, X).
distance_km(Dist) -- [ X, 'kilometers5.ogg']                :- tts,          D is round(Dist/1000.0),               dist(D, X).
distance_km(Dist) -- [ X, 'kilometers5.ogg']                :- not(tts),     D is round(Dist/1000.0), D < 20,       dist(D, X).
distance_km(Dist) -- [ 'around.ogg', X, 'kilometers5.ogg']  :- not(tts),     D is round(Dist/5000.0)*5, D < 100,    dist(D, X).
distance_km(Dist) -- [ 'around.ogg', X, 'kilometers5.ogg']  :- not(tts),     D is round(Dist/50000.0)*50, D < 1000, dist(D, X).
distance_km(Dist) -- [ 'around.ogg', X, 'kilometers5.ogg']  :- not(tts),     D is round(Dist/1000000.0)*1000,       dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'feet.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- ['half_a_mile.ogg']               :- Dist < 805.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- [ 'mile.ogg']                     :- Dist < 2414.
distance_mi_f(Dist) -- [ 'miles2.ogg']                   :- Dist < 4022.
distance_mi_f(Dist) -- [ X, 'miles3_4.ogg']              :- Dist < 8045,  D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist) -- [ X, 'miles5.ogg']                :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yards.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yards.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['mile.ogg']                      :- Dist < 2414.
distance_mi_y(Dist) -- ['miles2.ogg']                    :- Dist < 4022.
distance_mi_y(Dist) -- [ X, 'miles3_4.ogg']              :- Dist < 8045,  D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist) -- [ X, 'miles5.ogg']                :-               D is round(Dist/1609.0),            dist(D, X).


interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 140, 10), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 150, 950, 50), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
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
