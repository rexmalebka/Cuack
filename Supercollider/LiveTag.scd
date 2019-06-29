s.boot;

thisProcess.openUDPPort(7771);

thisProcess.openPorts;

~netaddr = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr

m = NetAddr("127.0.0.1", 57120); // loopback

m

SynthDef(\playbuf,{|channum, bufnum, gate=1|
	Out.ar(0, LoopBuf.ar(1,bufnum, startLoop:0, endLoop:1000));
}).add;


~cpsynth = Synth(\playbuf,[\channum,2,\bufnum,~cp.bufnum])

~cp.bufnum

OSCdef("/play", {
	|msg, time, addr, recvPort| 
	Synth(\cp)
}, '/play', ~netaddr); // def style

~cp = Buffer.read(s, "/home/rexmalebka/node/livetag/samples/clap.wav");

SynthDef(\cp,{|atk=0,rel=1|
	var sig,env;
	sig = SinOsc.ar();
	env = EnvGen.ar(Env.perc(atk,rel),doneAction:2);
	Out.ar(0, sig*env);
}).add;

Synth(\cp)
