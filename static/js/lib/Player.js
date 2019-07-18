const Player = function(name){

	function callable(...args){
		const seqs = sequences = args.map(function(arg){
			let argp = Player.parse(arg)
			return argp
		});
		
		let funct = callable;
		funct.sequences = seqs
		return funct
	}

	function play(...args){
		console.log("PLAY")
		let key;
		callable.sequences = callable.sequences.map(function(seq){
			let seqp = Player.set(seq, ...args);
			return seqp
		});
		callable.send()
	}
	function send(){

		let seqp = callable.sequences.map(function(harm){
			return harm.map(function(synth){
				let ent = []
				for(k in synth.prop){
					if(k!="eve"){
						ent.push(k,synth.prop[k])
					}
				}
				return ent
			});
		});
		seqp = seqp.map(function(harm){
				return harm.map(function(synth){
					return [].concat(...synth)
				})
			});

		socket.send(JSON.stringify({
			com: "Cuack.sched",
			value: seqp,
			player: this.prop.name
		}));

		return seqp
	}

	let prop = {
		name: name || "",
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
	callable.send = send

	const handler = {
		get(){
		},
	}

	if(!Player.hasOwnProperty("all")){
		Player.all = {};
	}

	Player.all[name] = callable;

	return callable
}


/*
Player.parse = function(seq, flat=true){
	function itparse(seq, lvl=1){
		let seqp = [];
		let sum = 0;
		let len = seq.length * lvl;
		console.log("LVL", lvl)
		while(seq.length > 0){
			let l = seq.shift();
			if(!Array.isArray(l)){
				sum += l.dur;
				seqp.push(l({dur: l.dur/len}));
			}else{
				sum += 1;
				let proc = itparse(l,len);
				seqp.push(proc);
			}
			console.log("LVL", lvl,"SUM", sum)
		}
		return seqp
	}

	let seqp = itparse(seq);
	if(flat){
		while( seqp.some((x)=>{return Array.isArray(x)})){
			seqp = [].concat(...seqp)
		}
	}
	return seqp
}
*/
Player.parse = function(seq){
	function it(seq){
		if(Array.isArray(seq) && !seq.some((k)=>Array.isArray(k))){
			let durs = seq.map((k)=>k.dur)
			let s = durs.reduce((a,b)=>a+b)
			seq = seq.map(function(synth){
				const prop = synth.prop;
				let x = synth({dur: synth.dur/s})
				for(p in prop){
					x = x({[p]: prop[p]})
				}
				return x
			});
			return seq
		}else if(Array.isArray(seq)){
			return Player.parse(seq)
		}else if(!Array.isArray(seq)){
			return seq
		}
	}

	let seqp = []

	while(seq.length!=0){
		let l = seq.shift();
		let r = it(l)
		if(Array.isArray(r)){
			seqp.push(...r)
		}else{
			seqp.push(r)
		}
	}
	
	let durs = seqp.map((k)=>k.dur)
	let s = durs.reduce((a,b)=>a+b)
	seqp = seqp.map(function(synth){
		return synth({dur: synth.dur/s})
	});
	return seqp

}

Player.set = function(sequence,...args){
	sequence = Player.parse(sequence)
		args.forEach(function(arg){
			let key;
			if(arg.hasOwnProperty("mode")){
				for(key in arg ){

					if(key != "mode" ){
						sequence = sequence.map(function(synth,j){
							let argp;
							if(Array.isArray(arg[key])){
								argp = arg[key][Math.floor(  (arg[key].length * (j))/ sequence.length  )];
							}else{
								argp = arg[key];
							}

							if(arg.mode == "add"){
								return synth({[key]: (synth[key] + argp)});				
							}else if(arg.mode == "subs"){
								return synth({[key]: (synth[key] - argp)});
							}else if(arg.mode == "mult"){
								return synth({[key]: (synth[key] * argp)});
							}else if(arg.mode == "eq"){
								return synth({[key]: argp});
							}
						});
					}
				}

			}else{
				for(key in arg ){
					
					sequence = sequence.map(function(synth,j){
						let synthp = synth;
							let argp;
							if(Array.isArray(arg[key])){
								argp = arg[key][Math.floor(  (arg[key].length * (j))/ sequence.length  )];
							}else{
								argp = arg[key];
							}
						return synth({[key]: argp});
					});
				}
			
			}	
		});
		return sequence
}

