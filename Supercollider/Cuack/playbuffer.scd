(
SynthDef(\playbuf,{|numchan=1, bufnum=0, atk=0, rel=0,dur=1, up=1, pan=0, amp=1|
	var sig, env, tone, freq, hasfreq;
	sig = PlayBuf.ar(1, bufnum, (2**(up/12)*1));
	env = EnvGen.ar(
		Env.linen(attackTime: (atk*dur), sustainTime: dur - (atk*dur + atk*rel), releaseTime: (rel*dur), level: 1.0, curve: 'sine')
		,doneAction:2);
	Out.ar(0, Pan2.ar(sig*env*amp,pan));
}).add
)
