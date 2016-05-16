% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('ja').
% fest_language('').

% IMPLEMENTED (X) or MISSING ( ) FEATURES, (N/A) if not needed in this language:
%
% (X) Basic navigation prompts: route (re)calculated (with distance and time support), turns, roundabouts, u-turns, straight/follow, arrival
% (X) Announce nearby point names (destination / intermediate / GPX waypoint / favorites / POI)
% (X) Attention prompts: SPEED_CAMERA; SPEED_LIMIT; BORDER_CONTROL; RAILWAY; TRAFFIC_CALMING; TOLL_BOOTH; STOP; PEDESTRIAN; MAXIMUM
% (X) Other prompts: gps lost, off route, back to route
% (X) Street name support and prepositions (onto / on / to )
% (X) Distance unit support (meters / feet / yard)
% (N/A) special grammar: nominative/dative for distance measure
% (X) special grammar: imperative/infinitive distinction for turns


%% STRINGS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% ROUTE CALCULATED
string('route_is.ogg', '目的地まで、').
string('route_calculate.ogg', 'ルートを更新しました。').
string('distance.ogg', '距離は、').
string('time.ogg', '時間は、').

% LEFT/RIGHT
%string('prepare.ogg', 'Prepare to ').
string('after.ogg', 'の後、').
string('in.ogg', 'で ').

string('left.ogg', '左に曲ってください。').
string('left_sh.ogg', '左を鋭角に曲ってください。').
string('left_sl.ogg', '左をゆるやかに曲ってください。').
string('right.ogg', '右に曲ってください。').
string('right_sh.ogg', '右を鋭角に曲ってください。').
string('right_sh.ogg', '右をゆるやかに曲ってください。').
string('left_keep.ogg', '左に寄ってください。').
string('right_keep.ogg', '右に寄ってください。').
string('left_bear.ogg', '左に寄ってください。').    % in English the same as left_keep, may be different in other languages
string('right_bear.ogg', '右に寄ってください。').  % in English the same as right_keep, may be different in other languages

% U-TURNS
string('make_uturn.ogg', 'Uターンをしてください。').
string('make_uturn_wp.ogg', '可能ならUターンをしてください。').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'ラウンドアバウトがあります。').
string('roundabout.ogg', 'ロータリーがあります。').
string('then.ogg', ' そして、').
%string('and.ogg', 'and ').
string('take.ogg', 'ロータリーの').
string('exit.ogg', 'の出口を出てください。').

string('1.ogg', '1').
string('2.ogg', '2').
string('3.ogg', '3').
string('4.ogg', '4').
string('5.ogg', '5').
string('6.ogg', '6').
string('7.ogg', '7').
string('8.ogg', '8').
string('9.ogg', '9').
string('10.ogg', '10').
string('11.ogg', '11').
string('12.ogg', '12').
string('13.ogg', '13').
string('14.ogg', '14').
string('15.ogg', '15').
string('16.ogg', '16').
string('17.ogg', '17').

string('th.ogg', '番目').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', '直進してください。').
string('follow.ogg', 'Follow the course of the road for').

% ARRIVE
string('and_arrive_destination.ogg', '目的地です。').
string('reached_destination.ogg','目的地です。').
string('and_arrive_intermediate.ogg', '途中の目的地につきます。').
string('reached_intermediate.ogg', '途中の目的地につきました。').

% NEARBY POINTS
string('and_arrive_waypoint.ogg', 'ウェイポイントにつきます。').
string('reached_waypoint.ogg', 'ウェイポイントにつきました。').
string('and_arrive_favorite.ogg', 'and pass favorite ').
string('reached_favorite.ogg', 'you are passing favorite ').
string('and_arrive_poi.ogg', 'and pass POI ').
string('reached_poi.ogg', 'you are passing POI ').

% ATTENTION
string('exceed_limit.ogg', 'スピードオーバーです。').
string('attention.ogg', '注意が必要です。').
string('speed_camera.ogg', 'スピードカメラ ').
string('border_control.ogg', '国境警備隊 ').
string('railroad_crossing.ogg', '踏切 ').
string('traffic_calming.ogg', '交通静穏化 ').
string('toll_booth.ogg', '料金所 ').
string('stop.ogg', '一時停止標識 ').
string('pedestrian_crosswalk.ogg', '横断歩道 ').

% OTHER PROMPTS
string('location_lost.ogg', 'GPS信号が受信できません。').
string('location_recovered.ogg', 'GPS信号が回復しました。').
string('off_route.ogg', '前から道が違います。').
string('back_on_route.ogg', 'あなたが戻ってルート上です ').

% STREET NAME PREPOSITIONS
string('onto.ogg', 'に、').
string('on.ogg', 'に ').
string('to.ogg', 'まで、').
string('toward.ogg', '向かって ').

% DISTANCE UNIT SUPPORT
string('meters.ogg', 'メートル、').
string('around_1_kilometer.ogg', 'およそ、1キロ、').
string('around.ogg', 'およそ、').
string('kilometers.ogg', 'キロ、').

string('feet.ogg', 'フィート').
string('1_tenth_of_a_mile.ogg', 'one tenth of a mile').
string('tenths_of_a_mile.ogg', 'tenths of a mile').
string('around_1_mile.ogg', 'about 1 mile ').
string('miles.ogg', 'miles ').

string('yards.ogg', 'yards ').

% TIME SUPPORT
string('jikan.ogg', '時間').
%string('1_jikan.ogg', '1時間').
%string('hours.ogg', 'hours ').
string('ippun_inai.ogg', '1分以内').
string('ippun.ogg', '1分').
string('ni_fun.ogg', '2分').
string('san_pun.ogg', '3分').
string('yon_pun.ogg', '4分').
string('go_fun.ogg', '5分').
string('roppun.ogg', '6分').
string('nana_fun.ogg', '7分').
string('happun.ogg', '8分').
string('kyuu_fun.ogg', '9分').
string('juppun.ogg', '10分').
string('minutes.ogg', '分').


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

% cut_part_street(voice([Ref, Name, Dest], [_CurrentRef, _CurrentName, _CurrentDest]), _).
% cut_part_street(voice(['', Name, _], _), Name). % not necessary
% Next 2 lines for Name taking precedence over Dest...
%cut_part_street(voice([Ref, '', Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).
%cut_part_street(voice([Ref, Name, _], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
% ...or next 3 lines for Dest taking precedence over Name
cut_part_street(voice([Ref, Name, ''], _), Concat) :- atom_concat(Ref, ' ', C1), atom_concat(C1, Name, Concat).
cut_part_street(voice(['', Name, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Name, ' ', C1).
cut_part_street(voice([Ref, _, Dest], _), [C1, 'toward.ogg', Dest]) :- atom_concat(Ref, ' ', C1).

turn_street('', []).
turn_street(voice(['','',''],_), []).
turn_street(voice(['', '', D], _), ['toward.ogg', D]) :- tts.
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
turn_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(voice(['', '', D], _), ['to.ogg', D]) :- tts.
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), cut_part_street(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- [D, 'after.ogg', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- [D, 'in.ogg', M | Sgen] :- distance(Dist) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M | Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- [D, 'after.ogg', 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  [D, 'in.ogg', 'make_uturn.ogg' | Sgen] :- distance(Dist) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- [D, 'after.ogg', 'prepare_roundabout.ogg'] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit, Street) -- [D, 'in.ogg', 'roundabout.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist) -- D, nth(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).

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
speed_alarm -- ['exceed_limit.ogg'].
% attention(_Type) -- ['attention.ogg'].
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
time(Sec) -- [H] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 0.
time(Sec) -- [H, 'ippun.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, St = 1, pnumber(St, Ogg).
time(Sec) -- [H, Ogg, 'minutes.ogg'] :- tts, S is round(Sec/60.0), hours(S, H), St is S mod 60, pnumber(St, Ogg).

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
distance_km(Dist) -- ['around_1_kilometer.ogg']          :- Dist < 1500.
distance_km(Dist) -- ['around.ogg', X, 'kilometers.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist) -- [ X, 'kilometers.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).

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
