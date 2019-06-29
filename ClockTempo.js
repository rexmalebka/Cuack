const NanoTimer = require('nanotimer');

const Clock = {
	scheds : [],
	_bpm : 120,
	_hrstart: [0,0],
	_maintimer: new NanoTimer(),
	_flag: false,
	_timers : [],
	_sequences: {},
	get bpm(){
		return this._bpm
	},
	set bpm(bpmval){
		this._bpm = bpmval;
		this.stop();
		this.start();
	},
	get bartime(){
		return this._bpm * 1000/60
	},
	stop : function(){},
	get time(){
		return process.hrtime(this._hrstart)
	},
	play: function(player, synth,i){
		Clock._OSCserver.sendsynth(player,synth.prop);
		console.log(`${player} playing ${synth.prop.name} in harmony ${i} at ${Clock.time}`)
	},
	update: function(sequences){

		this._sequences[sequences.name] = sequences.sequences;
			
		if(Clock._timers[sequences.name]){
			Clock._timers[sequences.name].forEach(function(sequence){
				sequence.forEach(function(timer){
					timer.clearInterval();
				});
			});			
		};
		
	},
	main: function(){
		console.log("------");
		for(const player in Clock._sequences){

			Clock._timers[player] = Clock._sequences[player].map(function(sequence){
				return sequence.map(function(synth,i){
					if(i==0){
						Clock.play(player, synth,i);
						obj = new NanoTimer();
						return obj
					}else{
						const obj = new NanoTimer();
						obj.setTimeout(
							Clock.play
							,[player, synth, i ],synth.prop.dur*i*Clock.bartime+"m")
						return obj
					}				
				});
			});

		}
	},
	start: function(OSCserver){
		this._OSCserver = OSCserver;
		this._maintimer.clearInterval();
		this._hrstart = process.hrtime();
		this.main();
		this._maintimer.setInterval(Clock.main,"",Clock.bartime+"m");
	},
}

module.exports = Clock;
