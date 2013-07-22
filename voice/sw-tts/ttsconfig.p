:- op('==', xfy, 500).
version(100).
language(en).

% before each announcement (beep)
preamble - [].


%% TURNS 
turn('kushoto', ['geuka upande wa kushoto ']).
turn('kushoto_sh', ['geuka sana upande wa kushoto ']).
turn('kushoto_sl', ['geuka kiasi upande wa kushoto ']).
turn('kulia', ['geuka upande wa kulia ']).
turn('kulia_sh', ['geuka sana upande wa kulia ']).
turn('kulia_sl', ['geuka kiasi upande wa kulia ']).

prepare_turn(Turn, Dist) == ['tayarisha ku ', M, ' baada ya ', D] :- 
  		distance(Dist) == D, turn(Turn, M).
turn(Turn, Dist) == ['Baada ya ', D, M] :- 
			distance(Dist) == D, turn(Turn, M).
turn(Turn) == M :- turn(Turn, M).


prepare_make_ut(Dist) == ['Tayarisha kugeuka nyuma baada ya ', D] :- 
		distance(Dist) == D.

prepare_roundabout(Dist) == ['Tayarisha kuingia mzunguko baada ya ', D] :- 
		distance(Dist) == D.

make_ut(Dist) == ['Baada ya ', D, ' geuka nyuma '] :- 
			distance(Dist) == D.
make_ut == ['Tafandali geuka kwa u turn '].

roundabout(Dist, _Angle, Exit) == ['Baada ya ', D, ' ingia mzunguko, na uchukue upande wa ', E, 'kutoka'] :- distance(Dist) == D, nth(Exit, E).
roundabout(_Angle, Exit) == ['chukua upande wa ', E, 'kutoka'] :- nth(Exit, E).

and_arrive_destination == ['na ufike kifiko ']. % Miss and?
then == ['then '].
reached_destination == ['umefika '].
bear_right == ['kaa upande wa kulia '].
bear_left == ['kaa upande wa kushoto '].
route_recalc(_Dist) == []. % ['inakadiri tena njia '].  %nothing to said possibly beep?	
route_new_calc(Dist) == ['Safani ni urefu wa ', D] :- distance(Dist) == D. % nothing to said possibly beep?

go_ahead(Dist) == ['Endesha kwa ', D]:- distance(Dist) == D.
go_ahead == ['Endelea moja kwa moja mbele '].

%% 
nth(1, 'kwanza ').
nth(2, 'pili ').
nth(3, 'tatu ').
nth(4, 'nne ').
nth(5, 'tano ').
nth(6, 'sita ').
nth(7, 'saba ').
nth(8, 'nane ').
nth(9, 'tisa ').
nth(10, 'kumi ').
nth(11, 'kumi na moja ').
nth(12, 'kumi na mbili ').
nth(13, 'kumi na tatu ').
nth(14, 'kumi na nne ').
nth(15, 'kumi na tano ').
nth(16, 'kumi na sita ').
nth(17, 'kumi na saba ').


%%% distance measure
distance(Dist) == T :- Dist < 1000, dist(Dist, F), append(F, ' mita',T).
dist(D, ['10 ']) :-  D < 15, !.
dist(D, ['20 ']) :-  D < 25, !.
dist(D, ['30 ']) :-  D < 35, !.
dist(D, ['40 ']) :-  D < 45, !.
dist(D, ['50 ']) :-  D < 55, !.
dist(D, ['60 ']) :-  D < 65, !.
dist(D, ['70 ']) :-  D < 75, !.
dist(D, ['80 ']) :-  D < 85, !.
dist(D, ['90 ']) :-  D < 95, !.
dist(D, ['100 ']) :-  D < 125, !.
dist(D, ['150 ']) :-  D < 175, !.
dist(D, ['200 ']) :-  D < 225, !.
dist(D, ['250 ']) :-  D < 275, !.
dist(D, ['300 ']) :-  D < 325, !.
dist(D, ['350 ']) :-  D < 375, !.
dist(D, ['400 ']) :-  D < 425, !.
dist(D, ['450 ']) :-  D < 475, !.
dist(D, ['500 ']) :-  D < 525, !.
dist(D, ['550 ']) :-  D < 575, !.
dist(D, ['600 ']) :-  D < 625, !.
dist(D, ['650 ']) :-  D < 675, !.
dist(D, ['700 ']) :-  D < 725, !.
dist(D, ['750 ']) :-  D < 775, !.
dist(D, ['800 ']) :-  D < 825, !.
dist(D, ['850 ']) :-  D < 875, !.
dist(D, ['900 ']) :-  D < 925, !.
dist(D, ['950 ']) :-  D < 975, !.
dist(D, ['1000 ']) :-  !.

distance(Dist) == ['kama kilomita moja '] :- Dist < 1500.
distance(Dist) == ['kama kilomita mbili '] :- Dist < 2500.
distance(Dist) == ['kama kilomita tatu '] :- Dist < 3500.
distance(Dist) == ['kama kilomita nne '] :- Dist < 4500.
distance(Dist) == ['kama kilomita tano '] :- Dist < 5500.
distance(Dist) == ['kama kilomita sita '] :- Dist < 6500.
distance(Dist) == ['kama kilomita saba '] :- Dist < 7500.
distance(Dist) == ['kama kilomita nane '] :- Dist < 8500.
distance(Dist) == ['kama kilomita tisa '] :- Dist < 9500.
distance(Dist) == ['kama ', X, ' kilomita '] :- D is Dist/1000, dist(D, X).

%% resolve command main method
%% if you are familar with Prolog you can input specific to the whole mechanism,
%% by adding exception cases.
flatten(X, Y) :- flatten(X, [], Y), !.
flatten([], Acc, Acc).
flatten([X|Y], Acc, Res):- 
		flatten(Y, Acc, R), flatten(X, R, Res).
flatten(X, Acc, [X|Acc]).

resolve(X, Y) :- resolve_impl(X,Z), flatten(Z, Y).
resolve_impl([],[]).
resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ((X == L) -> append(L, Tail, List); List = Tail).
