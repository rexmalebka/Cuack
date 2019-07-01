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
