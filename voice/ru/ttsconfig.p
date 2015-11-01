% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language(ru).
fest_language(msu_ru_nsh_clunits).

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) attention Type implementation
% (X) special grammar: onto / on / to Street for turn and follow commands
% (N/A) special grammar: nominative/dative for distance measure
% (N/A) special grammar: imperative/infinitive distinction for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% (X) word order checked
% (X) Announcement of favorites, waypoints and pois along the route
% (X) Announcement when user returns back to route
% (X) Support announcement of railroad crossings and pedestrian crosswalks


% ROUTE CALCULATED
string('route_is.ogg', 'Маршрут составляет ').
string('route_calculate.ogg', 'Маршрут пересчитывается').
string('distance.ogg', 'расстояние ').

% LEFT/RIGHT
string('prepare.ogg', 'Приготовьтесь ').
string('after.ogg', 'через ').

string('left.ogg', 'поверните налево ').
string('left_sh.ogg', 'резко поверните налево ').
string('left_sl.ogg', 'плавно поверните налево ').
string('right.ogg', 'поверните направо ').
string('right_sh.ogg', 'резко поверните направо ').
string('right_sl.ogg', 'плавно поверните направо ').
string('left_keep.ogg', 'держитесь левее ').
string('right_keep.ogg', 'держитесь правее ').
% string('bear_left.ogg', 'keep left').   % not needed as separate string in English but can be useful in Russian
% string('bear_right.ogg', 'keep right'). % not needed as separate string in English but can be useful in Russian

% U-TURNS
string('make_uturn.ogg', 'Выполните разворот ').
string('make_uturn_wp.ogg', 'При возможности, выполните разворот ').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'Приготовтесь въехать на кольцо ').
string('roundabout.ogg', 'въедьте на кольцо, ').
string('then.ogg', ' затем ').
string('and.ogg', 'и ').
string('take.ogg', 'выполните ').
string('exit.ogg', 'съезд ').

string('1na.ogg', 'одна ').
string('2ve.ogg', 'две ').

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

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Продолжайте движение прямо ').
string('follow.ogg', 'Продолжайте движение ').

% ARRIVE
string('and_arrive_destination.ogg', 'и вы прибудете в пункт назначения ').
string('reached_destination.ogg','вы прибыли в пункт назначения ').
string('and_arrive_intermediate.ogg', 'и вы прибудете в промежуточный пункт ').
string('reached_intermediate.ogg', 'вы прибыли в промежуточный пункт ').
% NEARBY POINTS
string('and_arrive_waypoint.ogg', 'и вы подъедете к ДЖИ-ПИ-ИКС точке ').
string('reached_waypoint.ogg', 'вы проезжаете ДЖИ-ПИ-ИКС точку ').
string('and_arrive_favorite.ogg', 'и вы подъедете к точке из избранного ').
string('reached_favorite.ogg', 'вы проезжаете точку из избранного ').
string('and_arrive_poi.ogg', 'и вы подъедете к точке POI ').
string('reached_poi.ogg', 'вы проезжаете точку POI ').

% OTHER PROMPTS
string('attention.ogg', 'Внимание, ').
string('speed_camera.ogg', 'камера ').
string('border_control.ogg', 'пограничный пункт ').
string('railroad_crossing.ogg', 'железная дорога ').
string('traffic_calming.ogg', 'искуственая неровность ').
string('toll_booth.ogg', 'пункт оплаты проезда ').
string('stop.ogg', 'знак Стоп ').
string('pedestrian_crosswalk.ogg', 'пешеходный переход ').

string('location_lost.ogg', 'потерян сигнал ДЖИПИИЭС').
string('location_recovered.ogg', 'ДЖИПИИЭС сигнал восстановлен ').
string('off_route.ogg', 'Вы отклонились от маршрута на ').
string('back_on_route.ogg', 'Вы вернулись на маршрут').
string('exceed_limit.ogg', 'Вы превысили допустимую скорость ').

% STREET NAME GRAMMAR
string('on.ogg', 'по ').
string('onto.ogg', 'на ').
string('to.ogg', 'до ').
string('to2.ogg', 'к ').

% DISTANCE UNIT SUPPORT
string('metr.ogg', 'метр ').
string('metra.ogg', 'метра ').
string('metrov.ogg', 'метров ').
string('kilometr.ogg', 'километр ').
string('kilometra.ogg', 'километра ').
string('kilometrov.ogg', 'километров ').
%string('around_1_kilometer.ogg', 'около одного километра ').
string('around.ogg', 'примерно ').

string('footov.ogg', 'футов ').
string('around_1_mile.ogg', 'около одной мили ').
string('1_tenth_of_a_mile.ogg', 'одна десятая мили ').
string('tenths_of_a_mile.ogg', ' десятых мили ').
string('1mile.ogg', 'миля ').
string('2mili.ogg', 'мили ').
string('5mil.ogg', 'миль ').

string('yardov.ogg', 'ярдов ').

% TIME SUPPORT
string('time.ogg', 'время ').
string('hour.ogg', 'час ').
string('hours_a.ogg', 'часа ').
string('hours_ov.ogg', 'часов ').
string('less_a_minute.ogg', 'менее минуты ').
string('minute.ogg', 'минута ').
string('minute_i.ogg', 'минуты ').
string('minutes.ogg', 'минут ').


%% COMMAND BUILDING / WORD ORDER
turn('left', ['left.ogg']).
turn('left_sh', ['left_sh.ogg']).
turn('left_sl', ['left_sl.ogg']).
turn('right', ['right.ogg']).
turn('right_sh', ['right_sh.ogg']).
turn('right_sl', ['right_sl.ogg']).
turn('left_keep', ['left_keep.ogg']).
turn('right_keep', ['right_keep.ogg']).
% Note: turn('left_keep'/'right_keep',[]) is a turn type aiding lane selection, while bear_left()/bear_right() are triggered as brief "turn-after-next" preparation sounding always after a "..., then...". In some languages l/r_keep may not differ from bear_l/r:
bear_left(_Street) -- ['left_keep.ogg'].   % if needed use separate bear_left.ogg here
bear_right(_Street) -- ['right_keep.ogg']. % if needed use separate bear_right.ogg here

% cut_part_street(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% cut_part_street(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%cut_part_street(voice([Ref, '', Dest], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Dest, Concat).
%cut_part_street(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 2 lines for Dest taking precedence over Name
cut_part_street(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
cut_part_street(voice([Ref, _, Dest], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Dest, Concat).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(Street, ['to2.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(Street, ['to.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare.ogg', 'after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare.ogg', 'after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['prepare_roundabout.ogg', 'after.ogg', D, 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(_Exit, E), turn_street(_Street, Sgen).
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'and.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).

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

route_new_calc(Dist, Time) -- ['route_is.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.
route_recalc(Dist, Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist) -- D, time(Time) -- T.


location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist) -- D.
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).
speed_alarm -- ['exceed_limit.ogg'].

% TRAFFIC WARNINGS
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

% ============================== start time section =========================================
% add "odna" and "dve" for minutes (seconds don`t spoken but it`s possible too)
pnumber_mn(X, '1na.ogg') :- X < 2,  X > 0.
pnumber_mn(X, '2ve.ogg') :- X < 3,  X > 1.
pnumber_mn(X, Y) :- tts, !, num_atom(X, Y).
pnumber_mn(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).

pnumber(X, Y) :- tts, !, num_atom(X, Y).
pnumber(X, Ogg) :- num_atom(X, A), atom_concat(A, '.ogg', Ogg).

% time measure
hours(S, []) :- S < 60.
hours(S, [Ogg, Hs]) :- H is S / 60, plural_hs(H, Hs), dist(H, Ogg).

time(Sec) -- ['less_a_minute.ogg'] :- Sec < 30.
time(Sec) -- [H] :- S is round(Sec/60.0), St is S mod 60, St = 0, hours(S, H).
time(Sec) -- [H, Ogg, Mn] :- S is round(Sec/60.0), hours(S, H), St is S mod 60, plural_mn(St, Mn), mins(St, Ogg).

plural_hs(D, 'hour.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(D, 'hours_a.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_hs(_D, 'hours_ov.ogg').

plural_mn(D, 'minute.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(D, 'minute_i.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mn(_D, 'minutes.ogg').
% ============================== end time section ===========================================

% ============================== start distance section =========================================
%%% distance measure
distance(Dist) -- D :- measure('km-m'), distance_km(Dist) -- D.
distance(Dist) -- D :- measure('mi-f'), distance_mi_f(Dist) -- D.
distance(Dist) -- D :- measure('mi-y'), distance_mi_y(Dist) -- D.

%%% distance measure km/m
distance_km(Dist) -- []                        :- Dist < 1.
distance_km(Dist) -- [ X, Km]                  :- Dist < 100,    D is round(Dist), dist(D, X), plural_mt(D, Km).
distance_km(Dist) -- [ X, Km]                  :- Dist < 1000,   D is round(Dist/10.0)*10, dist(D, X), plural_mt(D, Km).
distance_km(Dist) -- ['around.ogg','1.ogg','kilometr.ogg']          :- Dist < 1500.
distance_km(Dist) -- [ X, Km]                  :- D is round(Dist/1000.0), dist(D, X), plural_km(D, Km).

%%% distance measure mi/f
distance_mi_f(Dist) -- [ X, 'footov.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist) -- ['1_tenth_of_a_mile.ogg']         :- Dist < 241.
distance_mi_f(Dist) -- [ X, 'tenths_of_a_mile.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_f(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

%%% distance measure mi/y
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist) -- [ X, 'yardov.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist) -- ['around_1_mile.ogg']             :- Dist < 2414.
distance_mi_y(Dist) -- [ X, M]                 :-               D is round(Dist/1609.0),            dist(D, X), plural_mi(D, M).

plural_mt(D, 'metr.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mt(D, 'metra.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100, (R100 > 20; R100 < 10).
plural_mt(_D, 'metrov.ogg').

plural_km(D, 'kilometr.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_km(D, 'kilometra.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100, (R100 > 20; R100 < 10).
plural_km(_D, 'kilometrov.ogg').

plural_mi(D, '1mile.ogg') :- 1 is D mod 10, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(D, '2mili.ogg') :- Mod is D mod 10, Mod < 5,  Mod > 1, R100 is D mod 100,(R100 > 20; R100 < 10).
plural_mi(_D, '5mil.ogg').
% ============================== end distance section ===========================================

% ============================== start generate names for numerical .ogg files section ===========================================
interval(St, St, End, _Step) :- St =< End.
interval(T, St, End, Step) :- interval(Init, St, End, Step), T is Init + Step, (T =< End -> true; !, fail).

interval(X, St, End) :- interval(X, St, End, 1).

string(Ogg, A) :- voice_generation, interval(X, 1, 19), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 20, 90, 10), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 100, 900, 100), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
string(Ogg, A) :- voice_generation, interval(X, 1000, 9000, 1000), atom_number(A, X), atom_concat(A, '.ogg', Ogg).
% ============================== end generate names for numerical .ogg files section ===========================================

% ============================== start combine numbers for distance and hours section =========================================
dist(X, Y) :- tts, !, num_atom(X, Y).

% from 0 to 20
dist(0, []) :- !.
dist(X, [Ogg]) :- X < 21, !, pnumber(X, Ogg).
% from 21 to 99
dist(X, [Ogg|Ogg2]) :- X < 100, X1 is X mod 10, X2 is X - X1, num_atom(X2, A), atom_concat(A, '.ogg', Ogg), dist(X1, Ogg2).
% from 100 to 999
dist(X, [Ogg|Ogg2]) :- X < 1000, X1 is X mod 100, X2 is X - X1, num_atom(X2, A), atom_concat(A, '.ogg', Ogg), dist(X1, Ogg2).
% from 1000 to 9999
dist(X, [Ogg|Ogg2]) :- X < 10000, X1 is X mod 1000, X2 is X - X1, num_atom(X2, A), atom_concat(A, '.ogg', Ogg), dist(X1, Ogg2).
% ============================== end combine numbers for distance and hours section =========================================

% ============================== start combine numbers for minutes section =========================================
mins(X, Y) :- tts, !, num_atom(X, Y).

% from 0 to 20
mins(0, []) :- !.
mins(X, [Ogg]) :- X < 21, !, pnumber_mn(X, Ogg).
% from 21 to 99
mins(X, [Ogg|Ogg2]) :- X < 100, X1 is X mod 10, X2 is X - X1, num_atom(X2, A), atom_concat(A, '.ogg', Ogg), mins(X1, Ogg2).
% ============================== end combine numbers for minutes section =========================================
