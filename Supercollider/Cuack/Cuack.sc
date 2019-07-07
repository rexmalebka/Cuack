
Cuack{
	classvar <>port, <>ip, <>netaddress,<bpm=120,<>tempoclock, <>playersclock,<>samples;


	*start{|localport=7771, localip= "127.0.0.1", remoteip = "127.0.0.1", remoteport=57121|
		
		Server.allRunningServers.postln;
		if(Server.allRunningServers.size==0){
			// Cuack server takes the control
			Server.default = Server.new("Cuack");
			Server.default.boot;
		};
		if(thisProcess.openPorts.findMatch(localport)==nil){
			// open the door for cuack 
			thisProcess.openUDPPort(localport);
			this.port = localport;
			this.ip = localip;
			this.netaddress = NetAddr.new(remoteip, remoteport);
			this.clock();
			this.oscinit();
			Server.default.doWhenBooted(this.loadsynths,1000,{"NOT STARTED\n".postln});
			"Cuack: OSC opened on "+this.netaddress.postln;
		}{
			"Cuack: busy port, maybe it's something running on that port.".postln;
		}

	}

	*loadsynths{
		var r;
		this.samples = ();
		(Platform.userExtensionDir++"/Cuack/playbuffer.scd").load;
		"Cuack: loading Synthdefs & samples".postln;
		r = Routine({
			10.do({
				1.wait;
				if(Server.default.hasBooted==true){
					this.samples = (Platform.userExtensionDir++"/Cuack/samples.scd").load;
					r.stop;
				}
			})
		});
		r.play;
	}

	bpm_{|value|
		value.postln;
		this.bpm = value;
		^value;
	}
	*clock{
		"Cuack: starting Clock".postln;
		this.playersclock = Dictionary.new;
		this.tempoclock = TempoClock.new(this.bpm/60);
		this.tempoclock.playNextBar({
			this.tempoclock.beatsPerBar = 1;
		});
	}

	*oscinit{
		OSCdef(\play,{|msg|
			var synth, bufnum;
			synth = msg[1].asString.compile.value;
			bufnum = [\bufnum, this.samples[synth["name"]].bufnum];
			"playing uwu".postln;
			(synth.asPairs).postln;//			(synth++bufnum).postln;
			Synth(\playbuf, synth.asPairs++bufnum);
		},"Cuack.play",NetAddr.localAddr);		
		
		OSCdef("getclock",{|seq|
			seq.postln;
			(this.bpm).postln;
		},"Cuack.getclock",NetAddr.localAddr);		


		OSCdef(\CuackSched,{|msg|
			var args, pname, seq;
			"Cuack: scheduling harmonies".postln;
			msg[1].postln;
			args = msg[1].asString.compile.value;
			pname = args[0];
			seq = args[1..];
			pname.postln;

			// schedule players to main clock
			this.tempoclock.playNextBar({
				if(this.playersclock[pname]==nil){
					// create player
					this.playersclock.put(pname, TempoClock.new( this.bpm / 60));
				}{
					//clear player
					this.playersclock[pname].clear;
				};
				// iterate throught the harmonies
				seq.do({|harm ,i|
					var len;
					len = 0;

					harm.do({|synth, j|
						// iterate throught every synth
						var name, params;
						params = Dictionary.new;
						params.putPairs(synth); 
						name = params["name"];
						// schedule the synth
						
						this.playersclock[pname].sched(len, {
							NetAddr.localAddr.sendMsg("/Cuack.play", params.asCompileString);
							1
						});
							
						len = (len+params["dur"]);
					});
				});
			});
		},"Cuack.sched",this.netaddress)
	}
	*quit{
		Server.default.quit;
	}
}


/*
Cuack.aver.asPairs.asArray
Cuack.start
{PlayBuf.ar(2,0,1)}.play

~a = Dictionary.newFrom([\a,2,\b,2,\c,6])

~a.asPairs

Cuack.samples
Cuack.oscinit
Server.default

~drum = Buffer.read(s,'/home/rexmalebka/.local/share/SuperCollider/downloaded-quarks/Dirt-Samples/dr2/000_DR110CHT.WAV' )

~piano = Buffer.read(s,'/home/rexmalebka/.local/share/SuperCollider/downloaded-quarks/Dirt-Samples/piano/000_piano.wav')

~piano.numChannels
~p = Cuack.samples["_cp"]
Cuack.samples


Synth(\playbuf,[\bufnum, ~p.bufnum, \numchan,~p.numChannels,\amp,2,\dur,1])

~p = Buffer.read(s, "/home/rexmalebka/.local/share/SuperCollider/Extensions/Cuack/samples/banshee2.wav")


Synth(\playbuf,[\up,-5,\amp,1,\pan,0,\dur,0.2,\rel,0,\bufnum,~piano.bufnum,\numchan,~piano.numChannels])


{SinOsc.ar}.play
*/

