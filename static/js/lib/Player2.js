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

