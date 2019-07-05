const Player = function(name){
	function callable(...args){
		callable.sequences = args.map((arg)=>parse(arg));
		return callable
	}

	function parse(seq){

		function itparse(seq, lvl=1){
			let seqp = [];
			let len = seq.length * lvl;

			while(seq.length > 0){
				let l = seq.shift();
				if(!Array.isArray(l)){
					
					seqp.push(l({dur: 1/len}));
				}else{
					seqp.push(itparse(l, len));
				}
			}
			return seqp
		}

		let seqp = itparse(seq);
		
		while( seqp.some((x)=>{return Array.isArray(x)})){
			seqp = [].concat(...seqp)
		}
		return seqp

	}

	function play(...args){
		args.forEach(function(arg){
			if(arg.hasOwnProperty("mode")){
				if(arg.mode == "add"){
					for(key in arg ){
						if(key != "mode" ){
							callable.sequences = callable.sequences.map(function(seq){
								return seq.map(function(synth){
									return synth({[key]: (synth[key]+ arg[key])})
								})
							});
						}
					}
				}else if(arg.mode == "mult"){
					for(key in arg ){
						if(key != "mode" ){
							callable.sequences = callable.sequences.map(function(seq){
								return seq.map(function(synth){
									return synth({[key]: (synth[key] * arg[key])})
								})
							});
						}
					}
				}else if(arg.mode == "subs"){
					for(key in arg ){
						if(key != "mode" ){
							callable.sequences = callable.sequences.map(function(seq){
								return seq.map(function(synth){
									return synth({[key]: (synth[key] - arg[key])})
								})
							});
						}
					}
				}else if(arg.mode == "eq"){
					for(key in arg ){
						if(key != "mode" ){
							callable.sequences = callable.sequences.map(function(seq){
								return seq.map(function(synth){
									return synth({[key]: (synth[key] - arg[key])})
								})
							});
						}
					}
				}
			}else{
				for(key in arg ){
					callable.sequences = callable.sequences.map(function(seq){
						return seq.map(function(synth){
							let synthp = synth;
							synth[key] = arg[key];
							return synthp
						})
					});
				}
			
			}
		
		});
		return callable.sequences
	}

	let prop = {
		name: "",
		amp: 1,
		pan: 0,
		rate: 1,
		atk: 0,
		sus: 1,
		rel: 0,
		echo: 0,
		delay: 0,
		coarse: 0,
		vowel: ''
	}

	let sequences = [];
	callable.sequences = [];
	callable.prop = prop;
	callable._prop = Object.assign({},prop);
	callable.play = play;


	const handler = {
		get(){
		},
	}
	return callable
}

const p1 = Player("p1");

module.exports = [Player, p1]
