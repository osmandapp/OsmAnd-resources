% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').

version(103).
tts :- version(X), X > 99.
voice :- version(X), X < 99.

language('it').
fest_language('Italian').


% IMPLEMENTED (X) or MISSING ( ) FEATURES:
% (X) new Version 1.5 format
% (X) route calculated prompts, left/right, u-turns, roundabouts, straight/follow
% (X) arrival
% (X) other prompts: attention (without Type implementation), location lost, off_route, exceed speed limit
% (X) attention Type implementation
% (X) special grammar: onto / on / to Street fur turn and follow commands
% (X) special grammar: nominative/dativ for distance measure
% (X) special grammar: imperative/infinitive distincion for turns
% (X) distance measure: meters / feet / yard support
% (X) Street name announcement (suppress in prepare_roundabout)
% (X) Name announcement for destination / intermediate / GPX waypoint arrival
% (X) Time announcement for new and recalculated route (for recalculated suppress in appMode=car)
% (X) word order checked
% (X) Announcement of favorites, waypoints and pois along the route
% (X) Support announcement of railroad crossings and pedestrian crosswalks


% ROUTE CALCULATED
string('route_is1.ogg', 'Il percorso calcolato è ').
string('route_is2.ogg', 'lungo ').
string('route_calculate.ogg', 'Ricalcolo percorso').
string('distance.ogg', 'distanza ').


% LEFT/RIGHT
string('prepare.ogg', 'Prepararsi ').
string('after.ogg', 'fra ').

string('left.ogg', 'girare a sinistra').
string('left_sh.ogg', 'girare stretto a sinistra').
string('left_sl.ogg', 'girare leggermente a sinistra').
string('right.ogg', 'girare a destra').
string('right_sh.ogg', 'girare stretto a destra').
string('right_sl.ogg', 'girare leggermente a destra').
string('left_keep.ogg', 'tenersi sulla sinistra').
string('right_keep.ogg', 'tenersi sulla destra').
% if needed, "left/right_bear.ogg" can be defined here also. "... (then) (bear_left/right)" is used in pre-announcements to indicate the direction of a successive turn AFTER the next turn.

% U-TURNS
string('make_uturn1.ogg', 'torna indietro ').
string('make_uturn2.ogg', 'Si prega di tornare indietro ').
string('make_uturn_wp.ogg', 'Quando possibile, fare inversione a u').

% ROUNDABOUTS
string('prepare_roundabout.ogg', 'a entrare in una rotonda').
string('roundabout.ogg', 'entrare nella rotonda, ').
string('then.ogg', ', poi').
string('and.ogg', 'e').
string('take.ogg', 'prendere la').
string('exit.ogg', 'uscita').

string('1st.ogg', 'prima').
string('2nd.ogg', 'seconda').
string('3rd.ogg', 'terza').
string('4th.ogg', 'quarta').
string('5th.ogg', 'quinta').
string('6th.ogg', 'sesta').
string('7th.ogg', 'settima').
string('8th.ogg', 'ottava').
string('9th.ogg', 'nona').
string('10th.ogg', 'decima').
string('11th.ogg', 'undicesima').
string('12th.ogg', 'dodicesima').
string('13th.ogg', 'tredicesima').
string('14th.ogg', 'quattordicesima').
string('15th.ogg', 'quindicesima').
string('16th.ogg', 'sedicesima').
string('17th.ogg', 'diciassettesima').

% STRAIGHT/FOLLOW
string('go_ahead.ogg', 'Proseguire diritti').
string('follow.ogg', 'Seguire la strada per').

% ARRIVE
string('and_arrive_destination.ogg', 'e arriveremo a destinazione').
string('reached_destination.ogg','arrivati a destinazione').
string('and_arrive_intermediate.ogg', 'e arriveremo al punto intermedio').
string('reached_intermediate.ogg', 'arrivati al punto intermedio').
string('and_arrive_waypoint.ogg', 'e arriveremo al vostro punto GPX intermedio').
string('reached_waypoint.ogg', 'arrivati al vostro punto GPX intermedio').

%NEARBY POINTS
string('and_arrive_waypoint.ogg', 'e arriverai al punto di intermedio ').
string('reached_waypoint.ogg', 'Punto intermedio raggiunto ').
string('and_arrive_favorite.ogg', 'e arriverai al preferito ').
string('reached_favorite.ogg', 'preferito raggiunto ').
string('and_arrive_poi.ogg', 'e arriverai al P D I ').
string('reached_poi.ogg', 'P D I raggiunto').

% OTHER PROMPTS
string('attention.ogg', 'attenzione, ').
string('speed_camera.ogg', 'Autovelox ').
string('border_control.ogg', 'Dogana ').
string('railroad_crossing.ogg', 'Passaggio a livello ').
string('traffic_calming.ogg', 'Dosso rallentatore ').
string('toll_booth.ogg', 'Casello ').
string('stop.ogg', 'Stop ').
string('pedestrian_crosswalk.ogg', 'Attraversamento pedonale ').
string('location_lost.ogg', 'Segnale g p s perso').
string('location_recovered.ogg', 'Segnale g p s ripristinato ').
string('off_route.ogg', 'Avete deviato dal percorso').
string('exceed_limit.ogg', 'Limite di velocità superato').

% STREET NAME GRAMMAR
string('onto.ogg', 'su ').
string('on.ogg', 'in ').
string('to.ogg', 'fino a ').
string('with.ogg', 'su ').  % is used if you turn together with your current street, i.e. street name does not change.
string('to2.ogg', 'su ').
 
% Utility: toLowerCaseStr(OldString,NewString)
toLowerCaseStr(L1,L1):-  var(L1), !.
toLowerCaseStr([],[]):-  !.
toLowerCaseStr([H1|T1],[H2|T2]):- H1>64,H1<91, !, H2 is H1+32, toLowerCaseStr(T1,T2).
toLowerCaseStr([H1|T1],[H1|T2]):- toLowerCaseStr(T1,T2).

% Utility: toLowerCaseAto(OldString,NewString)
toLowerCaseAto(A1,A2) :- atom_codes(A1,S1),toLowerCaseStr(S1,S2),atom_codes(A2,S2).

% Utility: reverseStr(OldStr,[],RevStr)
reverseStr([H|T], A, R) :- reverseStr(T, [H|A], R).
reverseStr([], A, A).

% Utility: startsWithStr(String,Match)
startsWithStr([],[]).
startsWithStr([H1|T1],[]):- startsWithStr(T1,[]).
startsWithStr([H1|T1],[H1|T2]):- startsWithStr(T1,T2).

% Utility endsWithString(String, Match)
endsWithString(A1,A2) :- atom_codes(A1,S1),atom_codes(A2,S2),reverseStr(S1,[],R1),reverseStr(S2,[],R2),toLowerCaseStr(R1,RL1),startsWithStr(RL1,R2).

isMale(Street) :-  endsWithString(Street, 'via').
isMale(Street) :-  endsWithString(Street, 'rotonda').
isMale(Street) :-  endsWithString(Street, 'damm'). % da controllare e tradurre 
isMale(Street) :-  endsWithString(Street, 'piazza').
isMale(Street) :-  endsWithString(Street, 'mercato').
isMale(Street) :-  endsWithString(Street, 'marciapiede').
isMale(Street) :-  endsWithString(Street, 'sentiero').

isFemale(Street) :-  endsWithString(Street, 'strada').
isFemale(Street) :-  endsWithString(Street, 'strada').
isFemale(Street) :-  endsWithString(Street, 'autostrada').
isFemale(Street) :-  endsWithString(Street, 'chaussee'). % da tradurre
isFemale(Street) :-  endsWithString(Street, 'vicolo').
isFemale(Street) :-  endsWithString(Street, 'zeile'). % da tradurre
isFemale(Street) :-  endsWithString(Street, 'viale').
isFemale(Street) :-  endsWithString(Street, '0').
isFemale(Street) :-  endsWithString(Street, '1').
isFemale(Street) :-  endsWithString(Street, '2').
isFemale(Street) :-  endsWithString(Street, '3').
isFemale(Street) :-  endsWithString(Street, '4').
isFemale(Street) :-  endsWithString(Street, '5').
isFemale(Street) :-  endsWithString(Street, '6').
isFemale(Street) :-  endsWithString(Street, '7').
isFemale(Street) :-  endsWithString(Street, '8').
isFemale(Street) :-  endsWithString(Street, '9').

street_is_male(voice([Ref, Name, Dest],_)) :- isMale(Name).
street_is_female(voice([Ref, Name, Dest],_)) :- isFemale(Name).
street_is_female(voice([Ref, Name, Dest],_)) :- isFemale(Ref).
street_is_nothing(voice([Ref, Name, Dest],_)) :- not(isMale(Name)), not(isFemale(Name)).

% DISTANCE UNIT SUPPORT
string('meters_nominativ.ogg', 'metri ').
string('meters_dativ.ogg', 'metri ').
string('around_1_kilometer_nominativ.ogg', 'circa un chilometro ').
string('around_1_kilometer_dativ.ogg', 'circa un chilometro ').
string('around.ogg', 'circa ').
string('kilometers_nominativ.ogg', 'chilometri ').
string('kilometers_dativ.ogg', 'chilometri ').

string('feet_nominativ.ogg', 'piedi ').
string('feet_dativ.ogg', 'piedi ').
string('1_tenth_of_a_mile_nominativ.ogg', 'un decimo di miglio ').
string('1_tenth_of_a_mile_dativ.ogg', 'un decimo di miglio ').
string('tenths_of_a_mile_nominativ.ogg', 'decimi di miglio ').
string('tenths_of_a_mile_dativ.ogg', 'decimi di miglio ').
string('around_1_mile_nominativ.ogg', 'circa un miglio ').
string('around_1_mile_dativ.ogg', 'circa un miglio ').
string('miles_nominativ.ogg', 'miglia ').
string('miles_dativ.ogg', 'miglia ').

string('yards_nominativ.ogg', 'iarda ').
string('yards_dativ.ogg', 'iarda ').

% TIME SUPPORT
string('time.ogg', 'il tempo è ').
string('1_hour.ogg', 'un ora ').
string('hours.ogg', 'ore ').
string('less_a_minute.ogg', 'meno di un minuto ').
string('1_minute.ogg', 'un minuto ').
string('minutes.ogg', 'minuti ').

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
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_male(Street), cut_part_street(Street, SName).
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_female(Street), cut_part_street(Street, SName).
turn_street(Street, ['onto.ogg', SName]) :- tts, not(Street = voice(['', '', D], _)), street_is_nothing(Street), cut_part_street(Street, SName).
turn_street(_Street, []) :- not(tts).

follow_street('', []).
follow_street(voice(['','',''],_), []).
follow_street(Street, ['to.ogg', SName]) :- tts, Street = voice(['', '', D], _), cut_part_street(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_male(Street), cut_part_street(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_female(Street), cut_part_street(Street, SName).
follow_street(Street, ['to.ogg', SName]) :- tts, not(Street = voice([R, S, _],[R, S, _])), street_is_nothing(Street), cut_part_street(Street, SName).
follow_street(Street, ['on.ogg', SName]) :- tts, Street = voice([R, S, _],[R, S, _]), cut_part_street(Street, SName).
follow_street(_Street, []) :- not(tts).

prepare_turn(Turn, Dist, Street) -- ['prepare.ogg', 'after.ogg', D, M | Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Dist, Street) -- ['after.ogg', D, M, ' '| Sgen] :- distance(Dist, dativ) -- D, turn(Turn, M), turn_street(Street, Sgen).
turn(Turn, Street) -- [M, ' '| Sgen] :- turn(Turn, M), turn_street(Street, Sgen).

prepare_make_ut(Dist, Street) -- ['prepare.ogg', 'after.ogg', D, 'make_uturn2.ogg' | Sgen] :- distance(Dist, dativ) -- D, turn_street(Street, Sgen).
make_ut(Dist, Street) --  ['after.ogg', D, 'make_uturn1.ogg' | Sgen] :- distance(Dist, dativ) -- D, turn_street(Street, Sgen).
make_ut(Street) -- ['make_uturn2.ogg' | Sgen] :- turn_street(Street, Sgen).
make_ut_wp -- ['make_uturn_wp.ogg'].

prepare_roundabout(Dist, _Exit, _Street) -- ['prepare.ogg', 'after.ogg', D, 'prepare_roundabout.ogg'] :- distance(Dist, dativ) -- D.
roundabout(Dist, _Angle, Exit, Street) -- ['after.ogg', D, 'roundabout.ogg', 'then.ogg', 'take.ogg', E, 'exit.ogg' | Sgen] :- distance(Dist, dativ) -- D, nth(Exit, E), turn_street(Street, Sgen).
roundabout(_Angle, Exit, Street) -- ['take.ogg', E, 'exit.ogg' | Sgen] :- nth(Exit, E), turn_street(Street, Sgen).

go_ahead -- ['go_ahead.ogg'].
go_ahead(Dist, Street) -- ['follow.ogg', D | Sgen]:- distance(Dist, nominativ) -- D, follow_street(Street, Sgen).

then -- ['then.ogg'].
name(D, [D]) :- tts.
name(_D, []) :- not(tts).
and_arrive_destination(D) -- ['and_arrive_destination.ogg', Ds] :- name(D, Ds).
reached_destination(D) -- ['reached_destination.ogg', Ds] :- name(D, Ds).
and_arrive_intermediate(D) -- ['and_arrive_intermediate.ogg', Ds] :- name(D, Ds).
reached_intermediate(D) -- ['reached_intermediate.ogg', Ds] :- name(D, Ds).
and_arrive_waypoint(D) -- ['and_arrive_waypoint.ogg'|Ds] :- name(D, Ds).
reached_waypoint(D) -- ['reached_waypoint.ogg'|Ds] :- name(D, Ds).
and_arrive_favorite(D) -- ['and_arrive_favorite.ogg'|Ds] :- name(D, Ds).
reached_favorite(D) -- ['reached_favorite.ogg'|Ds] :- name(D, Ds).
and_arrive_poi(D) -- ['and_arrive_poi.ogg'|Ds] :- name(D, Ds).
reached_poi(D) -- ['reached_poi.ogg'|Ds] :- name(D, Ds).
 
route_new_calc(Dist, Time) -- ['route_is1.ogg', 'route_is2.ogg', D, 'time.ogg', T] :- distance(Dist, nominativ) -- D, time(Time) -- T.
route_recalc(_Dist, _Time) -- ['route_calculate.ogg'] :- appMode('car').
route_recalc(Dist, Time) -- ['route_calculate.ogg', 'distance.ogg', D, 'time.ogg', T] :- distance(Dist, nominativ) -- D, time(Time) -- T.
 
location_lost -- ['location_lost.ogg'].
location_recovered -- ['location_recovered.ogg'].
off_route(Dist) -- ['off_route.ogg', D] :- distance(Dist, dativ) -- D.
speed_alarm -- ['exceed_limit.ogg'].
% attention(_Type) -- ['attention.ogg'].
attention(Type) -- ['attention.ogg', W] :- warning(Type, W).

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
distance_km(Dist, nominativ) -- [ X, 'meters_nominativ.ogg']                  :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, dativ) --     [ X, 'meters_dativ.ogg']                      :- Dist < 100,   D is round(Dist/10.0)*10,           dist(D, X).
distance_km(Dist, nominativ) -- [ X, 'meters_nominativ.ogg']                  :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, dativ) --     [ X, 'meters_dativ.ogg']                      :- Dist < 1000,  D is round(2*Dist/100.0)*50,        dist(D, X).
distance_km(Dist, nominativ) -- ['around_1_kilometer_nominativ.ogg']          :- Dist < 1500.
distance_km(Dist, dativ) --     ['around_1_kilometer_dativ.ogg']              :- Dist < 1500.
distance_km(Dist, nominativ) -- ['around.ogg', X, 'kilometers_nominativ.ogg'] :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, dativ) --     ['around.ogg', X, 'kilometers_dativ.ogg']     :- Dist < 10000, D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, nominativ) -- [ X, 'kilometers_nominativ.ogg']              :-               D is round(Dist/1000.0),            dist(D, X).
distance_km(Dist, dativ) --     [ X, 'kilometers_dativ.ogg']                  :-               D is round(Dist/1000.0),            dist(D, X).

%%% distance measure mi/f
distance_mi_f(Dist, nominativ) -- [ X, 'feet_nominativ.ogg']                  :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, dativ) --     [ X, 'feet_dativ.ogg']                      :- Dist < 160,   D is round(2*Dist/100.0/0.3048)*50, dist(D, X).
distance_mi_f(Dist, nominativ) -- ['1_tenth_of_a_mile_nominativ.ogg']         :- Dist < 241.
distance_mi_f(Dist, dativ) --     ['1_tenth_of_a_mile_dativ.ogg']             :- Dist < 241.
distance_mi_f(Dist, nominativ) -- [ X, 'tenths_of_a_mile_nominativ.ogg']      :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, dativ) --     [ X, 'tenths_of_a_mile_dativ.ogg']          :- Dist < 1529,  D is round(Dist/161.0),             dist(D, X).
distance_mi_f(Dist, nominativ) -- ['around_1_mile_nominativ.ogg']             :- Dist < 2414.
distance_mi_f(Dist, dativ) --     ['around_1_mile_dativ.ogg']                 :- Dist < 2414.
distance_mi_f(Dist, nominativ) -- ['around.ogg', X, 'miles_nominativ.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, dativ) --     ['around.ogg', X, 'miles_dativ.ogg']        :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, nominativ) -- [ X, 'miles_nominativ.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_f(Dist, dativ) --     [ X, 'miles_dativ.ogg']                     :-               D is round(Dist/1609.0),            dist(D, X).

%%% distance measure mi/y
distance_mi_y(Dist, nominativ) -- [ X, 'yards_nominativ.ogg']                 :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, dativ) --     [ X, 'yards_dativ.ogg']                     :- Dist < 241,   D is round(Dist/10.0/0.9144)*10,    dist(D, X).
distance_mi_y(Dist, nominativ) -- [ X, 'yards_nominativ.ogg']                 :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, dativ) --     [ X, 'yards_dativ.ogg']                     :- Dist < 1300,  D is round(2*Dist/100.0/0.9144)*50, dist(D, X).
distance_mi_y(Dist, nominativ) -- ['around_1_mile_nominativ.ogg']             :- Dist < 2414.
distance_mi_y(Dist, dativ) --     ['around_1_mile_dativ.ogg']                 :- Dist < 2414.
distance_mi_y(Dist, nominativ) -- ['around.ogg', X, 'miles_nominativ.ogg']    :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, dativ) --     ['around.ogg', X, 'miles_dativ.ogg']        :- Dist < 16093, D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, nominativ) -- [ X, 'miles_nominativ.ogg']                 :-               D is round(Dist/1609.0),            dist(D, X).
distance_mi_y(Dist, dativ) --     [ X, 'miles_dativ.ogg']                     :-               D is round(Dist/1609.0),            dist(D, X).


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
