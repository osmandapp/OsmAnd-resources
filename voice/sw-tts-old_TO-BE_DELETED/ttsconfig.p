% for turbo-prolog
:- op('--', xfy, 500).
% for swi-prolog
:- op(500, xfy,'--').
version(102).
language(en).




%% TURNS 
turn('left', ['geuka upande wa kushoto ']).
turn('left_sh', ['geuka sana upande wa kushoto ']).
turn('left_sl', ['geuka kiasi upande wa kushoto ']).
turn('right', ['geuka upande wa kulia ']).
turn('right_sh', ['geuka sana upande wa kulia ']).
turn('right_sl', ['geuka kiasi upande wa kulia ']).
turn('left_keep', ['kaa upande wa kushoto ']).
turn('right_keep', ['kaa upande wa kulia ']).
bear_left -- ['kaa upande wa kushoto '].
bear_right -- ['kaa upande wa kulia '].

prepare_turn(Turn, Dist) -- ['tayarisha ku ', M, ' baada ya ', D] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn, Dist) -- ['Baada ya ', D, M] :- distance(Dist) -- D, turn(Turn, M).
turn(Turn) -- M :- turn(Turn, M).

prepare_make_ut(Dist) -- ['Tayarisha kugeuka nyuma baada ya ', D] :- distance(Dist) -- D.
make_ut(Dist) -- ['Baada ya ', D, ' geuka nyuma '] :- distance(Dist) -- D.
make_ut -- ['Tafandali geuka kwa u turn '].
make_ut_wp -- ['wakati inawezekana, tafadhali kufanya u-kugeuka '].

prepare_roundabout(Dist) -- ['Tayarisha kuingia mzunguko baada ya ', D] :- distance(Dist) -- D.
roundabout(Dist, _Angle, Exit) -- ['Baada ya ', D, ' ingia mzunguko, na uchukue upande wa ', E, 'kutoka'] :- distance(Dist) -- D, nth(Exit, E).
roundabout(_Angle, Exit) -- ['chukua upande wa ', E, 'kutoka'] :- nth(Exit, E).

go_ahead(Dist) -- ['Endesha kwa ', D]:- distance(Dist) -- D.
go_ahead -- ['Endelea moja kwa moja mbele '].

then -- ['then '].
and_arrive_destination -- ['na ufike kifiko '].
reached_destination -- ['umefika '].
and_arrive_intermediate -- ['na kufika katika yako kupitia-uhakika '].
reached_intermediate -- ['wewe na kufikiwa yako kupitia-uhakika '].

route_recalc(Dist) -- ['njia ya re-mahesabu. umbali ', D]:- distance(Dist) -- D. % ['inakadiri tena njia '].
route_new_calc(Dist) -- ['Safani ni urefu wa ', D] :- distance(Dist) -- D.

location_lost -- ['g p s ishara waliopotea '].

on_street -- ['kwenye ', X] :- next_street(X).
off_route -- ['una jitenga na njia '].
attention -- ['makini '].
speed_alarm -- ['wewe ni mno kikomo kasi '].


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
distance(Dist) --     ['mita', X]                  :- Dist < 100,   D is round(Dist/10.0)*10,    num_atom(D, X).
distance(Dist) --     ['mita', X]                  :- Dist < 1000,  D is round(2*Dist/100.0)*50, num_atom(D, X).
distance(Dist) --     ['umbali wa kilomita moja '] :- Dist < 1500.
distance(Dist) --     ['kuhusu kilomita ', X]      :- Dist < 10000, D is round(Dist/1000.0),     num_atom(D, X).
distance(Dist) --     ['kilometa ', X]             :-               D is round(Dist/1000.0),     num_atom(D, X).


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
resolve_impl([X|Rest], List) :- resolve_impl(Rest, Tail), ((X -- L) -> append(L, Tail, List); List = Tail).

% handling alternatives
[X|_Y] -- T :- (X -- T),!.
[_X|Y] -- T :- (Y -- T).
