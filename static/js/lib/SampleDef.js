const SampleDef = function(name, filename,...props){
	function callable(...args){

		if(args.length == 0){
			return proxy
		}else if(args.length == 1){
			let propcopy = Object.assign({},prop);
			
			// n 
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
			
		}else{
			let sequence;
			if(args.every((p)=>p instanceof Object)){
				sequence = callable(1)
				sequence = [sequence].set(...args)[0]
			}else{
				sequence = new Array(args[0]).fill(callable(1));
				sequence = sequence.set(...args.slice(1,args.length))			
				console.log(...args.slice(1,args.length), sequence)			
			}
			return sequence
		}
	};
	
	let prop = {
		name : name,
		filename : filename,
		type : "SampleDef",
		dur : 1,
		amp: 1,
		pan: 0,
		up: 1,
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
	if (props.length == 1 && props[0] instanceof Object){
		for (key in props[0]) {
			prop[key] = props[0][key];
		}
	}
	callable.prop = Object.assign({},prop);
	callable.type = "SampleDef";

	const handler = {
		get(target, key){
			if(key == "type"){
				return target.type;
			}else if(key == "prop"){
				/*let propl = [];
				for(p in target.prop){
					propl.push({[p]: target.prop[p]})
				}*/
				return target.prop
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
 


