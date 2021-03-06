
Array.prototype.eve = function(every){


	if(every instanceof Object){
		let copy = this.map(function(synth){
			if(synth instanceof Function){
				synth.eve = every;
				return synth
			}
		});
		return copy
	}
}



const SampleDef = function(name, filename,...args){
	function callable(...args){

		if(args.length == 0){
			return proxy
		}else if(args.length == 1){
			let propcopy = Object.assign({},prop);
			
			// n , props, effects
			if(!isNaN(args[0])){
				let copy = new SampleDef(prop.name, prop.filename, prop);
				const n = args[0];				
				if(n>1){
					return Array(n).fill(copy);
				}else{
					return copy
				}
			}else if(args[0] instanceof Object){
				for (key in args[0]) {
					if(key == "eve" && args[0][key] instanceof Object){
						propcopy.eve = args[0][key];
					}else{
						propcopy[key] = args[0][key];
					}
				}
				let copy = new SampleDef(prop.name, prop.filename, propcopy);
				return copy
			}
			
		}else if(args.length == 2){
			let n = 1;
			if(Number.isInteger(args[0])){
				n = args[0]
			}
			if(n>1){
				return Array(n).fill(callable(args[1]))
			}else{
				return callable(args[1])
			}
		}else{
			return callable(...args.slice(0,2))			
		}
	};
	
	let prop = {
		name : name,
		filename : filename,
		dur : 1,
		amp: 1,
		pan: 0,
		rate: 1,
		atk:0,
		sus:1,
		rel:0,
		echo: 0,
		delay: 0,
		coarse: 0,
		vowel : "",
		eve:{}
	};
	callable._prop = Object.assign({},prop);
	if (args.length == 1 && args[0] instanceof Object){
		for (key in args[0]) {
			prop[key] = args[0][key];
		}
	}
	callable.prop = Object.assign({},prop);
	callable.type = "SampleDef";

	const handler = {
		get(target, key){
			if(key == "type"){
				return target.type;
			}else if(key == "prop"){
				return target.prop;
			}else if(target.prop.hasOwnProperty(key)){
				if( target.prop[key] instanceof Function){
					return target.prop[key]()
				}else{
					return target.prop[key]			
				}
			}
		},
		set(target, key, value){
			if(
				target.prop.hasOwnProperty(key) && 
				(
					key != "name" ||
					key != "filename"
				
				)
			){
					target.prop =  target({[key]:value}).prop
			}
		}
	}
	const proxy = new Proxy(callable, handler);
	return proxy
};
 
const cp = new SampleDef("cp","cp.wav");

module.exports = [Array, SampleDef, Clock, cp]

