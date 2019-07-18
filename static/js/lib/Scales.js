const scaletarget = function(prop, scale){
		let start = 0;
		if(prop.hasOwnProperty("start")){
			start = prop.start;
		}
		let res = [];
		for(let k=0;k<prop.times;k++){
			let c = (Math.floor(k/scale.deg.length) * scale.ppo) + start;
			let v = scale.deg[k%scale.deg.length] + c;
			res.push(v)
		}
	return res
};



scaletarget.scales = {
	chromatic:{
		deg:[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
		ppo:12
	},
	major: {
		deg: [0,2,4,5,7,9,11],
		ppo : 12
	},
	minor: {
		deg:[ 0, 2, 3, 5, 7, 8, 10 ],
		ppo:12,
	},
	ionian:{
		deg:[0,2,4,5,7,9,11],
		ppo:12,
	},
	dorian:{
		deg:[0, 2, 3, 5, 7, 9, 10],
		ppo:12
	},
	phrygian:{
		deg: [ 0, 1, 3, 5, 7, 8, 10 ],
		ppo:12,
	},
	lydian:{
		deg:[ 0, 2, 4, 6, 7, 9, 11 ],
		ppo:12
	},
	mixolydian:{
		deg:[ 0, 2, 4, 5, 7, 9, 10 ],
		ppo:12
	},
	aeolian:{
		deg:[ 0, 2, 3, 5, 7, 8, 10 ],
		ppo:12
	},
	locrian:{
		deg:[ 0, 1, 3, 5, 6, 8, 10 ],
		ppo:12
	}
}
	
	
const Scale = new Proxy(
	scaletarget
	,{
	get: function(target, key){
		if(target.scales.hasOwnProperty(key)){
			return function(...args){
				let prop = {
				}
				const scale = target.scales[key];

				if(args.length == 0){
					return scale.deg
				}else if(args.length == 1){
					prop.times = args[0];
				}else if(args.length == 2){
					prop.times = args[0];
					prop.start = args[1];
				}

				return target(prop, scale)
			}
			
		}
	}
});

