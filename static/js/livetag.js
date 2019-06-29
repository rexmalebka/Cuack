const lodash = _;

const Player = function(name){
	this._name = name;

	this.cat = function(){
		//concatenate a sequencer
	};

	this.stack = function(){
	};

	this.all = function(prop){
		// reference to all 
		this._sequence.forEach(function(seq){
			seq.forEach(function(synth){
				for (var key in prop){
					if(key != "mode"){
						if(prop.mode == "add"){
							synth.prop[key] += prop[key];
						}else if(prop.mode == "subs"){
							synth.prop[key] -= prop[key];
						}else if(prop.mode == "mult"){
							synth.prop[key] *= prop[key];
						}else{
							synth.prop[key] = prop[key];
						}
					}
				}
				
			});
		});
		return this
	}.bind(this);

	this.coord = function(){
	
	};

	this.play = function(){
		let oscmsg = this._sequence.map(function(seq){
			return seq.map(function(synth){
				return {prop:synth.oscgen()}
			});
		});
		oscmsg = {com: "schedule",value:{name: this._name, sequences:oscmsg}};

		oscmsg = JSON.stringify(oscmsg);
		socket.send(oscmsg);
		return oscmsg
	}.bind(this);

	this._sequence = [];
	this.parse = function(seq){
		
		function itparse(seq, lvl=1){

			let pseq = [];
			let len = seq.length * lvl;

			while( seq.length > 0){
				let l = seq.shift();

				if(!Array.isArray(l)){
					pseq.push( l({dur: 1/len}) );
				}else{
					pseq.push(itparse(l, len));
				}
			}
			return pseq
		}

		return lodash.flattenDeep(itparse(seq))
	};

	return function(){
		this._sequence = [];
		let args = Array.from(arguments);

		for(i in args){
			this._sequence.push(this.parse(args[i]));
		}

		return this
	}.bind(this)
};


const SampleDef = function(name="",filename, prop={}){
	this.prop = {
		type : "SampleDef",
		name : name,
		filename : filename,
		amp : 1,
		pan : 0,
		rate : 1,
		attk : 0,
		sus : 1,
		rel : 0,
		dur : 0,
		bus : 0
	};
	if(prop){
		for(key in prop){
			this.prop[key] = prop[key]
		}
	}

	this.rep = function(n=1, prop={}){
		return Array(n).fill(this._update(prop))
	}.bind(this);

	this.oscgen = function(){
		return this.prop
	}.bind(this),
	this._update = function(prop){

		let propp = lodash.clone(this.prop);
		if(prop){
			for (var key in prop){
				propp[key] = prop[key];
			}
		}

		let obj = new SampleDef(name= this.prop.name, filename = this.prop.filename, prop=propp);
		
		return obj
	}.bind(this);

	this._update.prop = this.prop;
	this._update.rep = this.rep;
	this._update.oscgen = this.oscgen;
	
	return this._update
};

/*
const SynthDef = function(name="", filename, prop={}){
	this.type = "SynthDef";
	this.name = name;
	this.amp = 1;
	this.pan = 0;
	this.freq = 0;

	this.attk = 0;
	this.sus = 1;
	this.rel = 0;
	
	this.dur = 0;
	this.bus = 0;

	this.to = function(){
		return 
	}
	this.rep = function(n=1, prop={}){
		for (var key in prop){
			this[key] = prop[key];
		}
		return Array(n).fill(this)
	}

	this.oscgen = function(){
		let msg = []
		
		for (var key in this){
			console.log(key)
			let t = "";
			if((typeof this[key]) == "string" ){
				t = "s";
			}else if((typeof this[key]) == "number" ){
				t = "f";
			}
			if (t != ""){

				msg.push([
					{
						type: "s",
						value: key
					},{
					type: t,
					value: this[key]
					}
				]);
			}
			
			if(typeof this[key] != "function"){
				msg.push([key, this[key]])
			}
		}
		return msg
	}

	for (var key in prop){
		this[key] = prop[key];
	}

	update = function(prop){
		console.log(prop);
		for (var key in prop){
			this[key] = prop[key];
		}
		return this
	}.bind(this);
	
	for (var key in this){
		update[key] = this[key];
	}
	return update
}

*/

const Clock = {
	_bpm : 120,
	_time : 0,

	get bpm(){
		return this._bpm;
	},
	set bpm(value){
		console.log(value);
		this._bpm = value;
	},
	get time(){
		return this._time
	},
	start : function(){
		return "aaaaa"
	},
	stop : function(){
	}
};

const socket = new WebSocket("ws://127.0.0.1:3000");

socket.onopen = function(){
	console.log("open connection");
};

socket.onmessage = function(message){
	let msg = JSON.parse(message.data);
	if(msg.com == "setClockbpm"){
		Clock.bpm = msg.value; 
	}
};


document.querySelector("#boton").onclick = function(){
	eval(document.querySelector("#codigo").value);
}
