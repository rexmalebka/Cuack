
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
