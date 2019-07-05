
Cuack{
	classvar <>port, <>ip, <>netaddress,<bpm=120,<>tempoclock, <>players;

	*start{|localport=7771, localip= "127.0.0.1", remoteip = "127.0.0.1", remoteport=57121|
		
		Server.allRunningServers.postln;
		if(Server.allRunningServers.size==0){
			// Cuack server takes the control
			Server.default = Server.new("Cuack");
			//Server.default.boot;
		};
		if(thisProcess.openPorts.findMatch(localport)==nil){
			// open the door for cuack 
			thisProcess.openUDPPort(localport);
			this.port = localport;
			this.ip = localip;
			this.netaddress = NetAddr.new(remoteip, remoteport);
			this.loadsynths();
			this.clock();
			this.oscinit();
			"Cuack Clock started on "+this.netaddress.postln;
		}{
			"busy port, maybe it's something running on that port.".postln;
		}

	}

	*loadsynths{
		var path;
		"Loading Synthdefs & samples".postln;
		path = PathName.new("./Cuack");
		path.entries.postln;
		//path+"playbuffer.scd".load;
	}
	bpm_{|value|
		value.postln;
		this.bpm = value;
		^value;
	}
	*clock{
		"starting Clock".postln;
		this.tempoclock = TempoClock.new(this.bpm);
	}

	*oscinit{
		// (NetAddr.localAddr).sendMsg("/Cuack.play","asdfsdf")
		OSCdef(\play,{|seq|
			seq.postln;
			"playing uwu".postln;
		},"Cuack.play",NetAddr.localAddr);		
		
		OSCdef("getclock",{|seq|
			seq.postln;
			(this.bpm).postln;
		},"Cuack.getclock",NetAddr.localAddr);		

		OSCdef(\Cuack,{|msg|
			var args;
			args = msg[1].asString;
			//.compile.value;
			"sched".postln;
			[args,args.class].postln;
			args.compile.value.postln;
		},"Cuack.sched",this.netaddress)
	}
	*quit{
		Server.default.quit;
	}
}




