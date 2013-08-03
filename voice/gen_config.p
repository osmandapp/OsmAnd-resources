

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


write_ispeech([],_).
write_ispeech([string(Ogg, X) |L], FL) :- cut_mp3(Ogg, Name), 
			write(Ogg),write(','),write(X), write('\n'), write_ispeech(L, FL).

gen(File, fest) :- assert(voice_generation), assert(fest),consult(File), findall(string(Fn, T), string(Fn, T), Result),
		 write_header, fest_language(FL), write('\n(voice_'), write(FL), write(')\n'), write_fsave(Result).

gen(File, google) :- assert(voice_generation), assert(google_gen),!, consult(File), findall(string(Fn, T), string(Fn, T), Result),
 		language(FL), write_wget(Result, FL) .

gen(File, ispeech) :- assert(voice_generation), assert(ispeech),!, consult(File), findall(string(Fn, T), string(Fn, T), Result), language(FL), write('Filename,Text\n'),  write_ispeech(Result, FL) .