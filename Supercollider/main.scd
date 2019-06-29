s.boot;
thisProcess.openUDPPort(7771);


"Supercollider/samples.scd".load;
"Supercollider/SynthDefs/playbuffer.scd".load;

~netaddr = NetAddr.new("127.0.0.1", 57121);

~samples.postln;
(
~o.free;
~o = OSCdef("play",{|seq|
	var player, props;
	player = seq[1];
	props = seq[2..].asDict;
	if((props[\type].asString == "SampleDef"),{

		props.putPairs([
			\numchan, ~samples[props[\name].asString].numChannels,
			\bufnum, ~samples[props[\name].asString].bufnum,
		]);

Synth(\playbuf,props.asPairs);
	})

},"/play", ~netaddr);
)

