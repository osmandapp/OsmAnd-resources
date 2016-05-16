% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language(uk).

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
% (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
% (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM
% (X) Other prompts: gps lost, off route, back to route
% (X) Street name support and prepositions (onto / on / to )
% (X) Distance unit support (meters / feet / yard)
% (N/A) special grammar: nominative/dative for distance measure
% (N/A) special grammar: imperative/infinitive distinction for turns


%% STRINGS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ROUTE CALCULATED
string('route_is.ogg', 'Довжина маршруту ').
string('route_calculated.ogg', 'Маршрут перелічується').
string('distance.ogg', 'відстань ').

% LEFT/RIGHT
string('prepare_after.ogg', 'Приготуйтесь за ').
string('after.ogg', 'за').

string('left.ogg', 'поверніть ліворуч ').
string('left_sh.ogg', 'поверніть різко ліворуч ').
string('left_sl.ogg', 'поверніть плавно ліворуч ').
string('right.ogg', 'поверніть праворуч ').
string('right_sh.ogg', 'поверніть різко праворуч ').
string('right_sl.ogg', 'поверніть плавно праворуч ').
string('left_keep.ogg', 'тримайтесь лівіше ').
string('right_keep.ogg', 'тримайтесь правіше ').
string('left_bear.ogg', 'тримайтесь лівіше ').    % in English the same as left_keep, may be different in other languages
string('right_bear.ogg', 'тримайтесь правіше ').  % in English the same as right_keep, may be different in other languages

% U-TURNS
string('make_uturn.ogg', 'Розверніться ').
string('make_uturn_wp.ogg', 'При можливості розверніться ').

% ROUNDABOUTS
string('roundabout.ogg', 'коло ').
string('then.ogg', 'потім ').
string('take.ogg', 'виберіть ').
string('exit.ogg', 'з_їзд ').

string('1th.ogg', 'перший ').
string('2th.ogg', 'другий ') :- google_gen, voice .
string('2th.ogg', 'другий ') :- not(google_gen).
string('3th.ogg', 'третій ').
string('4th.ogg', 'четвертий ').
string('5th.ogg', 'п_ятий ').
string('6th.ogg', 'шостий ').
string('7th.ogg', 'сьомий ').
string('8th.ogg', 'восьмий ').
string('9th.ogg', 'дев_ятий ').
string('10th.ogg', 'десятий ').
string('11th.ogg', 'одинадцятий ').
string('12th.ogg', 'дванадцятий ').
string('13th.ogg', 'тринадцятий ').
string('14th.ogg', 'чотирнадцятий ').
string('15th.ogg', 'п_ятнадцятий ').
string('16th.ogg', 'шістнадцятий ').
string('17th.ogg', 'сімнадцятий ').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Далі прямо ').
string('go_ahead_m.ogg', 'Продовжуйте рух ').

% ARRIVE
string('and_arrive_destination.ogg', 'і ви прибудете до пункту призначення ').
string('and_arrive_intermediate.ogg', 'і ви прибудете до проміжного пункту ').
string('reached_intermediate.ogg', 'ви прибули до проміжного пункту ').
string('reached_destination.ogg','ви прибули до пункту призначення ').

% NEARBY POINTS
string('and_arrive_waypoint.ogg', 'і ви прибудете до точки GPX ').
string('reached_waypoint.ogg', 'ви прибули до GPX ').
string('and_arrive_favorite.ogg', 'і ви прибудете до точки улюблений ').
string('reached_favorite.ogg', 'ви прибули до улюблений ').
string('and_arrive_poi.ogg', ' і ви прибудете до точки інтересу ').
string('reached_poi.ogg', 'ви прибули до точки інтересу ').

% ATTENTION
string('exceed_limit.ogg', 'Перевищуєте швидкість ').
string('attention.ogg', 'Увага, ').
string('speed_camera.ogg', 'швидкість камери ').
string('border_control.ogg', 'прикордонний контроль ').
string('railroad_crossing.ogg', 'залізничний переїзд ').
string('traffic_calming.ogg', 'трафіку заспокійливий ').
string('toll_booth.ogg', 'платних стенд ').
string('stop.ogg', 'знак зупинки ').
string('pedestrian_crosswalk.ogg', 'пішохідного переходу ').

% OTHER PROMPTS
string('location_lost.ogg', 'втрачено сигнал GPS').
string('location_recovered.ogg', 'Відновлено сигнал GPS ').
string('off_route.ogg', 'Ви відхилились від маршруту на ').
string('back_on_route.ogg', 'Ви повернулись на дорогу.').

% STREET NAME PREPOSITIONS
string('on.ogg', 'по ').
string('onto.ogg', 'на ').
string('to.ogg', 'до ').

% DISTANCE UNIT SUPPORT
string('metrov.ogg', 'метрів ').
string('kilometr.ogg', 'кілометр ').
string('kilometra.ogg', 'кілометри ').
string('kilometrov.ogg', 'кілометрів ').
string('around_1_kilometer.ogg', 'близько одного кілометра ').
string('around.ogg', 'близько ').

string('footov.ogg', 'футів ').
string('around_1_mile.ogg', 'близько однієї милі ').
string('1_tenth_of_a_mile.ogg', 'одна десята милі ').
string('tenths_of_a_mile.ogg', ' десятих милі ').
string('1mile.ogg', 'миля ').
string('2mili.ogg', 'милі ').
string('5mil.ogg', 'миль ').

string('yardov.ogg', 'ярдів ').

% TIME SUPPORT
string('time.ogg', 'час ').
string('less_a_minute.ogg', 'менше хвилини  ').
string('hour.ogg', 'година ').
string('hours_a.ogg', 'години ').
string('hours_ov.ogg', 'годин ').
string('minute.ogg', 'хвилина ').
string('minute_y.ogg', 'хвилини ').
string('minutes.ogg', 'хвилин ').


%% COMMAND BUILDING / WORD ORDER
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time_is.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(Dist, Time) -- ['route_recalculated.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_recalculated.ogg', 'distance.ogg', D, 'and_time_is.ogg', T] :- distance(Dist) -- D, time(Time) -- T.

turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['keep_right.ogg']).
turn('right_keep', ['keep_right.ogg']).

to_turn('left', ['to_turn_left.ogg']).
to_turn('left_sh', ['to_turn_sharply_left.ogg']).
to_turn('left_sl', ['to_turn_slightly_left.ogg']).
to_turn('right', ['to_turn_right.ogg']).
to_turn('right_sh', ['to_turn_sharply_right.ogg']).
to_turn('right_sl', ['to_turn_slightly_right.ogg']).
to_turn('left_keep', ['to_keep_left.ogg']).
to_turn('right_keep', ['to_keep_right.ogg']).
% Note: turn('left_keep'/'right_keep',[]) is a turn type aiding lane selection, while bear_left()/bear_right() is triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages turn(l/r_keep) may not differ from bear_l/r:
bear_left(_Street) -- ['left_bear.ogg'].
bear_right(_Street) -- ['right_bear.ogg'].

% cut_part_street(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% cut_part_street(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%cut_part_street(voice([Ref, '', Dest], _), [C1, 'to.ogg', Dest]) :- atom_concat(Ref, ' ', C1).
%cut_part_street(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 3 lines for Dest taking precedence over Name
cut_part_street(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
cut_part_street(voice(['', Name, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Name, ' ', C1).
cut_part_street(voice([Ref, _, Dest], _), [C1, 'to.ogg', Dest]) :- atom_concat(Ref, ' ', C1).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(voice(['', '', D], _), ['to.ogg', D]) :- tts.
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(voice(['', '', D], _), ['to.ogg', D]) :- tts.
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare_after.ogg', D, ' ', M | Sgen] :- distance(Dist) -- D, to_turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare_after.ogg', D, 'to_make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg'| Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg'| Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

% prepare_roundabout(Dist, _Exit, Street) -- ['prepare_after.ogg', D, 'to_roundabout.ogg'] :- distance(Dist) -- D.
prepare_roundabout(Dist, Exit, Street) -- ['prepare_after.ogg', D, 'to_roundabout.ogg', E] :- distance(Dist) -- D, toexitn(Exit, E).
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', E| Sgen] :- distance(Dist) -- D, exitn(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['roundabout.ogg', E| Sgen] :- exitn(Exit, E), turn_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['go_ahead_m.ogg', D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).

and_arrive_destination(D) -- ['and_arrive_at_destination.ogg'|Ds] :- name(D, Ds).
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
speed_alarm -- ['exceed_limit.ogg'].
% attention(_Type) -- ['attention.ogg'].
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).
warning('SPEED_CAMERA', 'speed_camera.ogg').
warning('SPEED_LIMIT', 'speed_limit.ogg').
warning('BORDER_CONTROL', 'border_control.ogg').
warning('RAILWAY', 'railroad_crossing.ogg').
warning('TRAFFIC_CALMING', 'traffic_calming.ogg').
warning('TOLL_BOOTH', 'toll_booth.ogg').
warning('STOP', 'stop.ogg').
warning('PEDESTRIAN', 'pedestrian_crosswalk.ogg').
warning('MAXIMUM', '').
warning(Type, '') :- not(Type = 'SPEED_CAMERA'; Type = 'SPEED_LIMIT'; Type = 'BORDER_CONTROL'; Type = 'RAILWAY'; Type = 'TRAFFIC_CALMING'; Type = 'TOLL_BOOTH'; Type = 'STOP'; Type = 'PEDESTRIAN'; Type = 'MAXIMUM').


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
nth(16, '16th.ogg').
nth(17, '17th.ogg').

%% 
exitn(1, 'exit1.ogg').
exitn(2, 'exit2.ogg').
exitn(3, 'exit3.ogg').
exitn(4, 'exit4.ogg').
exitn(5, 'exit5.ogg').
exitn(6, 'exit6.ogg').
exitn(7, 'exit7.ogg').
exitn(8, 'exit8.ogg').
exitn(9, 'exit9.ogg').
exitn(10, 'exit10.ogg').
exitn(11, 'exit11.ogg').
exitn(12, 'exit12.ogg').
exitn(13, 'exit13.ogg').
exitn(14, 'exit14.ogg').
exitn(15, 'exit15.ogg').
exitn(16, 'exit16.ogg').
exitn(17, 'exit17.ogg').

%% 
toexitn(1, 'exit1.ogg').
toexitn(2, 'exit2.ogg').
toexitn(3, 'exit3.ogg').
toexitn(4, 'exit4.ogg').
toexitn(5, 'exit5.ogg').
toexitn(6, 'exit6.ogg').
toexitn(7, 'exit7.ogg').
toexitn(8, 'exit8.ogg').
toexitn(9, 'exit9.ogg').
toexitn(10, 'exit10.ogg').
toexitn(11, 'exit11.ogg').
toexitn(12, 'exit12.ogg').
toexitn(13, 'exit13.ogg').
toexitn(14, 'exit14.ogg').
toexitn(15, 'exit15.ogg').
toexitn(16, 'exit16.ogg').
toexitn(17, 'exit17.ogg').


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
% pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).
pnumber(X, Ogg) :- X < 3, num_atom(X, B), atom_concat(B, 'm-n', A), atom_concat(A, '.ogg', Ogg).
pnumber(X, Ogg) :- X > 2, num_atom(X, A), atom_concat(A, '.ogg', Ogg).
fnumber(X, Ogg) :- X < 3, num_atom(X, B), atom_concat(B, 'f-n', A), atom_concat(A, '.ogg', Ogg).
fnumber(X, Ogg) :- X > 2, num_atom(X, A), atom_concat(A, '.ogg', Ogg).

% time measure
hours(S, []) :- S < 60.
hours(S, [Ogg, Hs]) :- H is S div 60, plural_hs(H, Hs), fnumber(H, Ogg).
time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- [H] :- tts, S is round(60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, Ogg, Mn] :- tts, S is round(60.0), hours(S, H), St is S mod 60, plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [Ogg, Mn] :- not(tts), Sec < 300, St is 60, plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [H, Ogg, Mn] :- not(tts), S is round(300.0)*5, St is S mod 60, St > 0, hours(S, H), plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [H] :- not(tts), S is round(300.0) * 5, hours(S, H), St is S mod 60.

plural_hs(D, 'hour.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(D, '2hours.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(_D, '5hours.ogg').

plural_mn(D, 'minute.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(D, '2minutes.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(_D, '5minutes.ogg').


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'metriv.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'metriv.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- [ X, Km]              :-               D is round(Dist/1000.0),            dist(D, X), plural_km(D, Km).


%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'footov.ogg']                :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- [ X, M]                           :- D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- [ X, M]                           :- D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).


plural_km(D, 'kilometr.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_km(D, 'kilometry.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100, (R100 > 20; R100 < 10).
plural_km(_D, 'kilometriv.ogg').


plural_mi(D, '1mile.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(D, '2mili.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(_D, '5mil.ogg').

interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, B) :- voice_generation, interval(X, 1, 2), atom_number(B, X), atom_concat(B, 'm-n', A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 3, 19), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 950, 50), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_concat(A, '.ogg', Ogg).

dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 3, !, num_atom(X, B), atom_concat(B, 'm-n', A), atom_concat(A, '.ogg', Ogg).
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
