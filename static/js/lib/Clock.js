const Clock = {
	_bpm : 120,
	started: false,
	_beats:0,
	globalTime : 0,
	time:0,
	starttime: 0,
	playing :{},
	set beats(value){
		Clock._beats = value;
		return Clock._beats
	},
	set bpm(value){
		console.log(`> Changed Clock bpm: ${value}`);
		socket.send(
			JSON.stringify(
				{
					com:"Cuack.setClockbpm",
					value:value
				}
			)
		);
		this._bpm = value;
	},
	get bpm(){
		return this._bpm
	},
	stop : function(){
		cancelAnimationFrame(Clock.timerref);
	}
};
