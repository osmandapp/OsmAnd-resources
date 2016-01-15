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
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) special grammar: onto / on / to Street fur turn and follow commands
% (N/A) special grammar: nominative/dative for distance measure
% (N/A) special grammar: imperative/infinitive distinction for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% (X) word order checked
% (X) Announcement of favorites, waypoints and pois along the route
% (X) Announcement when user returns back to route


% ROUTE CALCULATED
string('voice/route_is.ogg', 'Довжина маршруту ').
string('voice/route_calculate.ogg', 'Маршрут перелічується').
string('voice/distance.ogg', 'відстань ').

% LEFT/RIGHT
string('voice/prepare_after.ogg', 'Приготуйтесь за ').
string('voice/after.ogg', 'за').

string('voice/left.ogg', 'поверніть ліворуч ').
string('voice/left_sh.ogg', 'поверніть різко ліворуч ').
string('voice/left_sl.ogg', 'поверніть плавно ліворуч ').
string('voice/right.ogg', 'поверніть праворуч ').
string('voice/right_sh.ogg', 'поверніть різко праворуч ').
string('voice/right_sl.ogg', 'поверніть плавно праворуч ').
string('voice/left_keep.ogg', 'тримайтесь лівіше ').
string('voice/right_keep.ogg', 'тримайтесь правіше ').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

% U-TURNS
string('voice/make_uturn.ogg', 'Розверніться ').
string('voice/make_uturn_wp.ogg', 'При можливості розверніться ').

% ROUNDABOUTS
string('voice/roundabout.ogg', 'коло ').
string('voice/then.ogg', 'потім ').
string('voice/take.ogg', 'виберіть ').
string('voice/exit.ogg', 'з_їзд ').

string('voice/1th.ogg', 'перший ').
string('voice/2th.ogg', 'другий ') :- google_gen, voice .
string('voice/2th.ogg', 'другий ') :- not(google_gen).
string('voice/3th.ogg', 'третій ').
string('voice/4th.ogg', 'четвертий ').
string('voice/5th.ogg', 'п_ятий ').
string('voice/6th.ogg', 'шостий ').
string('voice/7th.ogg', 'сьомий ').
string('voice/8th.ogg', 'восьмий ').
string('voice/9th.ogg', 'дев_ятий ').
string('voice/10th.ogg', 'десятий ').
string('voice/11th.ogg', 'одинадцятий ').
string('voice/12th.ogg', 'дванадцятий ').
string('voice/13th.ogg', 'тринадцятий ').
string('voice/14th.ogg', 'чотирнадцятий ').
string('voice/15th.ogg', 'п_ятнадцятий ').
string('voice/16th.ogg', 'шістнадцятий ').
string('voice/17th.ogg', 'сімнадцятий ').

% STRAIGHT/FOLLOW
string('voice/go_ahead.ogg', 'Далі прямо ').
string('voice/go_ahead_m.ogg', 'Продовжуйте рух ').

% ARRIVE
string('voice/arrivals/and_arrive_destination.ogg', 'і ви прибудете до пункту призначення ').
string('voice/arrivals/and_arrive_intermediate.ogg', 'і ви прибудете до проміжного пункту ').
string('voice/arrivals/reached_intermediate.ogg', 'ви прибули до проміжного пункту').
string('voice/arrivals/reached_destination.ogg','ви прибули до пункту призначення ').
string('voice/arrivals/and_arrive_waypoint.ogg', 'і ви прибудете до точки GPX').
string('voice/arrivals/reached_waypoint.ogg', 'ви прибули до GPX').
string('voice/arrivals/and_arrive_poi.ogg', ' і ви прибудете до точки інтересу ').
string('voice/arrivals/reached_poi.ogg', 'ви прибули до точки інтересу ').

% OTHER PROMPTS
string('voice/attention.ogg', 'Увага, ').
string('voice/location_lost.ogg', 'втрачено сигнал GPS').
string('voice/location_recovered.ogg', 'Відновлено сигнал GPS ').
string('voice/off_route.ogg', 'Ви відхилились від маршруту на ').
string('voice/back_on_route.ogg', 'Ви повернулись на дорогу.').
string('voice/exceed_limit.ogg', 'Перевищуєте швидкість ').

% STREET NAME GRAMMAR
string('voice/on.ogg', 'по ').
string('voice/onto.ogg', 'на ').
string('voice/to.ogg', 'до ').

% DISTANCE UNIT SUPPORT
string('voice/metrov.ogg', 'метрів ').
string('voice/kilometr.ogg', 'кілометр ').
string('voice/kilometra.ogg', 'кілометри ').
string('voice/kilometrov.ogg', 'кілометрів ').
string('voice/around_1_kilometer.ogg', 'близько одного кілометра ').
string('voice/around.ogg', 'близько ').

string('voice/footov.ogg', 'футів ').
string('voice/around_1_mile.ogg', 'близько однієї милі ').
string('voice/1_tenth_of_a_mile.ogg', 'одна десята милі ').
string('voice/tenths_of_a_mile.ogg', ' десятих милі ').
string('voice/1mile.ogg', 'миля ').
string('voice/2mili.ogg', 'милі ').
string('voice/5mil.ogg', 'миль ').

string('voice/yardov.ogg', 'ярдів ').

% TIME SUPPORT
string('voice/time.ogg', 'час ').
string('voice/less_a_minute.ogg', 'менше хвилини  ').
string('voice/hour.ogg', 'година ').
string('voice/hours_a.ogg', 'години ').
string('voice/hours_ov.ogg', 'годин ').
string('voice/minute.ogg', 'хвилина ').
string('voice/minute_y.ogg', 'хвилини ').
string('voice/minutes.ogg', 'хвилин ').


%% COMMAND BUILDING / WORD ORDER
turn('left', ['voice/turns/left.ogg']).
turn('left_sh', ['voice/turns/left_sh.ogg']).
turn('left_sl', ['voice/turns/left_sl.ogg']).
turn('right', ['voice/turns/right.ogg']).
turn('right_sh', ['voice/turns/right_sh.ogg']).
turn('right_sl', ['voice/turns/right_sl.ogg']).
turn('left_keep', ['voice/turns/keep_right.ogg']).
turn('right_keep', ['voice/turns/keep_right.ogg']).

to_turn('left', ['voice/turns/to_turn_left.ogg']).
to_turn('left_sh', ['voice/turns/to_turn_sharply_left.ogg']).
to_turn('left_sl', ['voice/turns/to_turn_slightly_left.ogg']).
to_turn('right', ['voice/turns/to_turn_right.ogg']).
to_turn('right_sh', ['voice/turns/to_turn_sharply_right.ogg']).
to_turn('right_sl', ['voice/turns/to_turn_slightly_right.ogg']).
to_turn('left_keep', ['voice/turns/to_keep_left.ogg']).
to_turn('right_keep', ['voice/turns/to_keep_right.ogg']).


bear_left(_Street) -- ['voice/turns/keep_left.ogg'].
bear_right(_Street) -- ['voice/turns/keep_right.ogg'].

% cut_part_street(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% cut_part_street(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%cut_part_street(voice([Ref, '', Dest], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Dest, Concat).
%cut_part_street(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 2 lines for Dest taking precedence over Name
cut_part_street(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
cut_part_street(voice([Ref, _, Dest], _), [C1, 'voice/to.ogg', Dest]) :- atom_concat(Ref, ' ', C1).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(voice(['', '', D], _), ['voice/to.ogg', ' ', D]) :- tts.
turn_street(Street, ['voice/onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
turn_street(Street, ['voice/on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(Street, ['voice/to.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
follow_street(Street, ['voice/to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
follow_street(Street, ['voice/on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['voice/prepare_after.ogg', D, ' ', M | Sgen] :- distance(Dist) -- D, to_turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['voice/after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['voice/prepare_after.ogg', D, 'voice/turns/to_make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['voice/after.ogg', D, 'voice/turns/make_uturn.ogg'| Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['voice/turns/make_uturn.ogg'| Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['voice/turns/make_uturn_wp.ogg'].

% prepare_roundabout(Dist, _Exit, Street) -- ['voice/prepare_after.ogg', D, 'voice/round/to_roundabout.ogg'] :- distance(Dist) -- D.
prepare_roundabout(Dist, Exit, Street) -- ['voice/prepare_after.ogg', D, 'voice/round/to_roundabout.ogg', E] :- distance(Dist) -- D, toexitn(Exit, E).
roundabout(Dist, _Angle, Exit, Street) -- ['voice/after.ogg', D, 'voice/round/roundabout.ogg', E| Sgen] :- distance(Dist) -- D, exitn(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['voice/round/roundabout.ogg', E| Sgen] :- exitn(Exit, E), turn_street(Street, Sgen).

go_ahead(Dist, Street) -- ['voice/go_ahead_m.ogg', D | Sgen] :- distance(Dist) -- D, follow_street(Street, Sgen).

then -- ['voice/then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['voice/arrivals/and_arrive_at_destination.ogg'|Ds] :- name(D, Ds).
reached_destination(D) -- ['voice/arrivals/reached_destination.ogg'|Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['voice/arrivals/and_arrive_intermediate.ogg'|Ds] :- name(D, Ds).
reached_intermediate(D) -- ['voice/arrivals/reached_intermediate.ogg'|Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['voice/arrivals/and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['voice/arrivals/reached_waypoint.ogg'|Ds] :- name(D, Ds).
and_arrive_favorite(D) -- ['voice/arrivals/and_arrive_favorite.ogg'|Ds] :- name(D, Ds).
reached_favorite(D) -- ['voice/arrivals/reached_favorite.ogg'|Ds] :- name(D, Ds).
and_arrive_poi(D) -- ['voice/arrivals/and_arrive_poi.ogg'|Ds] :- name(D, Ds).
reached_poi(D) -- ['voice/arrivals/reached_poi.ogg'|Ds] :- name(D, Ds).


route_new_calc(Dist, Time) -- ['voice/route_is.ogg', D, 'voice/time_is.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(Dist, Time) -- ['voice/route_recalculated.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['voice/route_recalculated.ogg', 'voice/distance.ogg', D, 'voice/and_time_is.ogg', T] :- distance(Dist) -- D, time(Time) -- T.


location_lost -- ['voice/location_lost.ogg'].
location_recovered -- ['voice/location_recovered.ogg'].
off_route(Dist) -- ['voice/off_route.ogg', D] :- distance(Dist) -- D.

speed_alarm -- ['voice/exceed_limit.ogg'].
% attention(_Type) -- ['voice/attention.ogg'].
attention(Type) -- ['voice/attention.ogg', W] :- warning(Type, W).

% TRAFFIC WARNINGS
warning('SPEED_CAMERA', 'voice/alerts/speed_camera.ogg').
warning('SPEED_LIMIT', 'voice/alerts/speed_limit.ogg').
warning('BORDER_CONTROL', 'voice/alerts/border_control.ogg').
warning('RAILWAY', 'voice/alerts/railroad_crossing.ogg').
warning('TRAFFIC_CALMING', 'voice/alerts/traffic_calming.ogg').
warning('TOLL_BOOTH', 'voice/alerts/toll_booth.ogg').
warning('STOP', 'voice/alerts/stop.ogg').
warning('PEDESTRIAN', 'voice/alerts/pedestrian_crosswalk.ogg').
warning('MAXIMUM', '').
warning(Type, '') :- not(Type = 'SPEED_CAMERA'; Type = 'SPEED_LIMIT'; Type = 'BORDER_CONTROL'; Type = 'RAILWAY'; Type = 'TRAFFIC_CALMING'; Type = 'TOLL_BOOTH'; Type = 'STOP'; Type = 'PEDESTRIAN'; Type = 'MAXIMUM').



%% 
nth(1, 'voice/1th.ogg').
nth(2, 'voice/2th.ogg').
nth(3, 'voice/3th.ogg').
nth(4, 'voice/4th.ogg').
nth(5, 'voice/5th.ogg').
nth(6, 'voice/6th.ogg').
nth(7, 'voice/7th.ogg').
nth(8, 'voice/8th.ogg').
nth(9, 'voice/9th.ogg').
nth(10, 'voice/10th.ogg').
nth(11, 'voice/11th.ogg').
nth(12, 'voice/12th.ogg').
nth(13, 'voice/13th.ogg').
nth(14, 'voice/14th.ogg').
nth(15, 'voice/15th.ogg').
nth(16, 'voice/16th.ogg').
nth(17, 'voice/17th.ogg').

%% 
exitn(1, 'voice/round/exit1.ogg').
exitn(2, 'voice/round/exit2.ogg').
exitn(3, 'voice/round/exit3.ogg').
exitn(4, 'voice/round/exit4.ogg').
exitn(5, 'voice/round/exit5.ogg').
exitn(6, 'voice/round/exit6.ogg').
exitn(7, 'voice/round/exit7.ogg').
exitn(8, 'voice/round/exit8.ogg').
exitn(9, 'voice/round/exit9.ogg').
exitn(10, 'voice/round/exit10.ogg').
exitn(11, 'voice/round/exit11.ogg').
exitn(12, 'voice/round/exit12.ogg').
exitn(13, 'voice/round/exit13.ogg').
exitn(14, 'voice/round/exit14.ogg').
exitn(15, 'voice/round/exit15.ogg').
exitn(16, 'voice/round/exit16.ogg').
exitn(17, 'voice/round/exit17.ogg').

%% 
toexitn(1, 'voice/round/exit1.ogg').
toexitn(2, 'voice/round/exit2.ogg').
toexitn(3, 'voice/round/exit3.ogg').
toexitn(4, 'voice/round/exit4.ogg').
toexitn(5, 'voice/round/exit5.ogg').
toexitn(6, 'voice/round/exit6.ogg').
toexitn(7, 'voice/round/exit7.ogg').
toexitn(8, 'voice/round/exit8.ogg').
toexitn(9, 'voice/round/exit9.ogg').
toexitn(10, 'voice/round/exit10.ogg').
toexitn(11, 'voice/round/exit11.ogg').
toexitn(12, 'voice/round/exit12.ogg').
toexitn(13, 'voice/round/exit13.ogg').
toexitn(14, 'voice/round/exit14.ogg').
toexitn(15, 'voice/round/exit15.ogg').
toexitn(16, 'voice/round/exit16.ogg').
toexitn(17, 'voice/round/exit17.ogg').


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
pnumber(X, Ogg) :- X < 3, num_atom(X, B), atom_concat('voice/numbers/m-n/', B, A), atom_concat(A, '.ogg', Ogg).
pnumber(X, Ogg) :- X > 2, num_atom(X, B), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
fnumber(X, Ogg) :- X < 3, num_atom(X, B), atom_concat('voice/numbers/f-n/', B, A), atom_concat(A, '.ogg', Ogg).
fnumber(X, Ogg) :- X > 2, num_atom(X, B), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).

% time measure
hours(S, []) :- S < 60.
hours(S, [Ogg, Hs]) :- H is S div 60, plural_hs(H, Hs), fnumber(H, Ogg).
time(Sec) -- ['voice/less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, Ogg, Mn] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [Ogg, Mn] :- not(tts), Sec < 300, St is Sec/60, plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [H, Ogg, Mn] :- not(tts), S is round(Sec/300.0)*5, St is S mod 60, St > 0, hours(S, H), plural_mn(St, Mn), fnumber(St, Ogg).
time(Sec) -- [H] :- not(tts), S is round(Sec/300.0) * 5, hours(S, H), St is S mod 60.

plural_hs(D, 'voice/units/hour.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(D, 'voice/units/2hours.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(_D, 'voice/units/5hours.ogg').

plural_mn(D, 'voice/units/minute.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(D, 'voice/units/2minutes.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(_D, 'voice/units/5minutes.ogg').


%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- [ X, 'voice/units/metriv.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist) -- [ X, 'voice/units/metriv.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist) -- ['voice/units/around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- [ X, Km]              :-               D is round(Dist/1000.0),            dist(D, X), plural_km(D, Km).


%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'voice/footov.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['voice/1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'voice/tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['voice/around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'voice/yardov.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'voice/yardov.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['voice/around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).


plural_km(D, 'voice/units/kilometr.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_km(D, 'voice/units/kilometry.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100, (R100 > 20; R100 < 10).
plural_km(_D, 'voice/units/kilometriv.ogg').


plural_mi(D, 'voice/1mile.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(D, 'voice/2mili.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(_D, 'voice/5mil.ogg').

interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 2), atom_number(B, X), atom_concat('voice/numbers/m-n/', B, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 3, 19), atom_number(B, X), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 95, 5), atom_number(B, X), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 950, 50), atom_number(B, X), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(B, X), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).

dist(X, Y) :- tts, !, num_atom(X, Y).

dist(0, []) :- !.
dist(X, [Ogg]) :- X < 3, !, num_atom(X, B), atom_concat('voice/numbers/m-n/', B, A), atom_concat(A, '.ogg', Ogg).
dist(X, [Ogg]) :- X < 20, !, num_atom(X, B), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
dist(X, [Ogg]) :- X < 1000, 0 is X mod 50, !, num_atom(X, B), atom_concat('voice/numbers/n/', B, A), atom_concat(A, '.ogg', Ogg).
dist(D, ['voice/numbers/n/20.ogg'|L]) :-  D < 30, Ts is D - 20, !, dist(Ts, L).
dist(D, ['voice/numbers/n/30.ogg'|L]) :-  D < 40, Ts is D - 30, !, dist(Ts, L).
dist(D, ['voice/numbers/n/40.ogg'|L]) :-  D < 50, Ts is D - 40, !, dist(Ts, L).
dist(D, ['voice/numbers/n/50.ogg'|L]) :-  D < 60, Ts is D - 50, !, dist(Ts, L).
dist(D, ['voice/numbers/n/60.ogg'|L]) :-  D < 70, Ts is D - 60, !, dist(Ts, L).
dist(D, ['voice/numbers/n/70.ogg'|L]) :-  D < 80, Ts is D - 70, !, dist(Ts, L).
dist(D, ['voice/numbers/n/80.ogg'|L]) :-  D < 90, Ts is D - 80, !, dist(Ts, L).
dist(D, ['voice/numbers/n/90.ogg'|L]) :-  D < 100, Ts is D - 90, !, dist(Ts, L).
dist(D, ['voice/numbers/n/100.ogg'|L]) :-  D < 200, Ts is D - 100, !, dist(Ts, L).
dist(D, ['voice/numbers/n/200.ogg'|L]) :-  D < 300, Ts is D - 200, !, dist(Ts, L).
dist(D, ['voice/numbers/n/300.ogg'|L]) :-  D < 400, Ts is D - 300, !, dist(Ts, L).
dist(D, ['voice/numbers/n/400.ogg'|L]) :-  D < 500, Ts is D - 400, !, dist(Ts, L).
dist(D, ['voice/numbers/n/500.ogg'|L]) :-  D < 600, Ts is D - 500, !, dist(Ts, L).
dist(D, ['voice/numbers/n/600.ogg'|L]) :-  D < 700, Ts is D - 600, !, dist(Ts, L).
dist(D, ['voice/numbers/n/700.ogg'|L]) :-  D < 800, Ts is D - 700, !, dist(Ts, L).
dist(D, ['voice/numbers/n/800.ogg'|L]) :-  D < 900, Ts is D - 800, !, dist(Ts, L).
dist(D, ['voice/numbers/n/900.ogg'|L]) :-  D < 1000, Ts is D - 900, !, dist(Ts, L).
dist(D, ['voice/numbers/n/1000.ogg'|L]):- Ts is D - 1000, !, dist(Ts, L).
