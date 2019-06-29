s.boot
(
~players = ();
~players.putPairs([
	\d1,()
]);
)
thisProcess.openUDPPort(7771);

~netaddr = NetAddr.new("127.0.0.1", 57121);

(
	~p.free;
	~p = OSCdef("Pdefs",{|seq|
		var name, arm, param, value;
		name = seq[1];
		arm = seq[2];
		param = seq[3];
		value = seq[4..];

		~players.at(name).putPairs([
			arm, (param : value)
		]);

	
	},"/sched", ~netaddr);	
)
(
~pdef.get(\dur,{|x,y|
	x.postln;
}).set
)

(
	~pdef = Pdef(\p1,Pbind(
		\instrument, \prueba,
		\dur, Pseq([1],inf)
	)
);
)
~pdef.play

s.boot

(
SynthDef(\prueba,{|gate=1|
	var sig, env;
	sig = SinOsc.ar;
	env = EnvGen.ar(Env.asr,doneAction:2,gate:gate);
	Out.ar(0,sig*env);
}).add
)
