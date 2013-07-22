:- op('--', xfy, 500).
version(101).
language(it).


%% TURNS 
turn('left', ['girare a sinistra ']).
turn('left_sh', ['subito a sinistra ']).
turn('left_sl', ['girare leggermente a sinistra ']).
turn('right', ['girare a destra ']).
turn('right_sh', ['subito a destra ']).
turn('right_sl', ['girate leggermente a destra ']).
turn('left_keep', ['tenersi sulla sinistra']).
turn('right_keep', ['tenersi sulla destra']).
bear_left -- ['tenersi sulla sinistra'].
bear_right -- ['tenersi sulla destra'].

prepare_turn(Turn, Dist) -- ['Prepararsi a ', M,' tra ', D] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn, Dist) -- ['Dopo ', D, M] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn) -- M :- turn(Turn, M).

prepare_make_ut(Dist) -- [ 'Prepararsi ad una inversione ad u tra ', D] :- distance(Dist) -- D.
make_ut(Dist) -- ['Tra ', D, ' inversione ad u'] :- distance(Dist) -- D.
make_ut -- ['Inversione a u'].
make_ut_wp -- ['Quando possibile, inversione a u'].

prepare_roundabout(Dist) -- [ 'Tra ', D,' entrerete in una rotonda '] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit) -- ['Tra ', D, ' entrate nella rotonda e prendete la ', E ] :- distance(Dist) -- D, nth(Exit, E).
roundabout(_Angle, Exit) -- ['prendete la ', E ] :- nth(Exit, E).

go_ahead -- ['Sempre dritto '].
go_ahead(Dist) -- ['Sempre dritto per ',  D]:- distance(Dist) -- D.

then -- [', poi '].
and_arrive_destination -- ['e arrivate a destinazione'].
reached_destination -- ['arrivato a destinazione'].
and_arrive_intermediate -- ['and arrive at your via point '].
reached_intermediate -- ['you have reached your via point'].

route_new_calc(_Dist) -- ['Il viaggio è lungo ', D] :- distance(Dist) -- D.
route_recalc(Dist) -- ['Ricalcolo percorso , lunghezza ', D] :- distance(Dist) -- D.

location_lost -- ['Segnale G P S perso '].

% on_street -- ['on ', X] :- next_street(X).
% off_route -- ['you have deviated from the route '].
% attention -- ['attention '].
% speed_alarm -- ['you are exceeding the speed limit '].


%% 
nth(1, 'prima uscita').
nth(2, 'seconda uscita').
nth(3, 'terza uscita').
nth(4, 'quarta uscita').
nth(5, 'quinta uscita').
nth(6, 'sesta uscita').
nth(7, 'settima uscita').
nth(8, 'ottava uscita').
nth(9, 'nona uscita').
nth(10, 'decima uscita').
nth(11, 'undicesima uscita').
nth(12, 'dodicesima uscita').
nth(13, 'tredicesima uscita').
nth(14, 'quattordicesima uscita').
nth(15, 'quindicesima uscita').
nth(16, 'sedicesima uscita').
nth(17, 'diciassettesima uscita').


%%% distance measure
distance(Dist) -- [ X, ' metri '] :- Dist < 100, D is round(Dist/10.0)*10, num_atom(D, X).
distance(Dist) -- [ X, ' metri '] :- Dist < 1000, D is round(2*Dist/100.0)*50, num_atom(D, X).
distance(Dist) -- ['circa un chilometro '] :- Dist < 1500.
distance(Dist) -- ['circa ', X, ' chilometri '] :- Dist < 10000, D is round(Dist/1000.0), num_atom(D, X).
distance(Dist) -- [ X, ' chilometri '] :- D is round(Dist/1000.0), num_atom(D, X).


%% resolve command main method
%% if you are familar with Prolog you can input specific to the whole mechanism,
%% by adding exception cases.
flatten(X, Y) :- flatten(X, [], Y), !.
flatten([], Acc, Acc).
flatten([X|Y], Acc, Res):- flatten(Y, Acc, R), flatten(X, R, Res).
flatten(X, Acc, [X|Acc]).

resolve(X, Y) :- resolve_impl(X,Z), flatten(Z, Y).
resolve_impl([],[]).
resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ((X -- L) -> append(L, Tail, List); List = Tail).

% handling alternatives
[X|_Y] -- T :- (X -- T),!.
[_X|Y] -- T :- (Y -- T).