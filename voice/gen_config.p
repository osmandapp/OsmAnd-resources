

write_header :- 
		write('(define (fsave txt fln)\n'),
		write('\t(set! utt1 (utt.synth (eval (list ''Utterance ''Text txt))))\n'),
		write('\t(utt.save.wave utt1 fln ''riff)\n)').

cut(Ogg, WName) :- atom_length(Ogg, L), Lt is L - 4, sub_atom(Ogg, 0, Lt, _, Name), atom_concat(Name, '.wav', WName).
cut_mp3(Ogg, WName) :- atom_length(Ogg, L), Lt is L - 4, sub_atom(Ogg, 0, Lt, _, Name), atom_concat(Name, '.mp3', WName).

write_fsave([]).
write_fsave([string(Ogg, X) |L]) :- cut(Ogg, Name), write('\n(fsave "'), write(X), write('" "'), 
			write(Name), write('")'), write_fsave(L).

write_wget([],_).
write_wget([string(Ogg, X) |L], FL) :- cut_mp3(Ogg, Name), 
			write('wget -q -U Mozilla -O "'), write(Name),
			write('" "http://translate.google.com/translate_tts?ie=UTF-8&tl='), write(FL), write('&q='), 
			write(X),  write('"\n'), write_wget(L, FL).

format_comma_l([], []).
format_comma_l([','|Y], [' '|Ys]) :- format_comma_l(Y, Ys).
format_comma_l([X|Y], [X|Ys]) :- format_comma_l(Y, Ys).
format_comma(X, Y) :- atom_chars(X, Xs), format_comma_l(Xs, Ys), atom_chars(Y, Ys).

write_ispeech_csv([],_).
write_ispeech_csv([string(Ogg, X) |L], FL) :- format_comma(X, Xs),
			write(Ogg),write(','),write(Xs), write('\n'), write_ispeech_csv(L, FL).

write_ispeech_c([],_).
write_ispeech_c([string(Ogg, X) |L], FL) :- 
			write('wget "https://api.ispeech.org/api/rest?apikey=&action=convert&voice=jpjapanesefemale&speed=0&pitch=100&startpadding=0&endpadding=0&format=ogg&frequency=16000&text='), 
			write(X), write('&filename='),write(Ogg),write('" -O '), write(Ogg),
			write('\n'), write_ispeech_c(L, FL).

gen(File, fest) :- assert(voice_generation), assert(fest),consult(File), findall(string(Fn, T), string(Fn, T), Result),
		 write_header, fest_language(FL), write('\n(voice_'), write(FL), write(')\n'), write_fsave(Result).

gen(File, google) :- assert(voice_generation), assert(google_gen),!, consult(File), findall(string(Fn, T), string(Fn, T), Result),
 		language(FL), write_wget(Result, FL) .

gen(File, ispeech) :- 
	assert(voice_generation), assert(ispeech),!, consult(File), findall(string(Fn, T), string(Fn, T), Result), language(FL), 	 
	write_ispeech_csv(Result, FL) .

gen(File, ispeech_diff) :- 
	assert(voice_generation), assert(ispeech),!, consult(File), findall(string(Fn, T), string(Fn, T), Result), language(FL), 	 
	write_ispeech_c(Result, FL) .