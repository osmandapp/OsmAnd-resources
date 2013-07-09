

write_header :- 
		write('(define (fsave txt fln)\n'),
		write('\t(set! utt1 (utt.synth (eval (list ''Utterance ''Text txt))))\n'),
		write('\t(utt.save.wave utt1 fln ''riff)\n)').

cut(Ogg, WName) :- atom_length(Ogg, L), Lt is L - 4, sub_atom(Ogg, 0, Lt, _, Name), atom_concat(Name, '.wav', WName).

write_fsave([]).
write_fsave([string(Ogg, X) |L]) :- cut(Ogg, Name), write('\n(fsave "'), write(X), write('" "'), 
			write(Name), write('")'), write_fsave(L).

gen(File) :- consult(File), findall(string(Fn, T), string(Fn, T), Result),
		 write_header, 
		 fest_language(FL), write('\n(language_'), write(FL), write(')\n'),
		 write_fsave(Result).