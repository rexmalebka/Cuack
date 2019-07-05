const [Array, SampleDef,Clock, cp] = require('./api.js')
const [Player, p1] = require('./Player.js');

const player = new Player("uwu");
const synth = new SampleDef("synth", "synth.wav")


//console.log(player)
//console.log(synth(3));
//console.log(synth({amp:100, rate:(time)=>time})({pan:-2}) );
//console.log(synth(3, {amp:0.5, rate:2, pan:(time)=>time})[0]);
//console.log(player())
//console.log(player([synth]).sequences[0] )
/*console.log(
	...player(
		[synth,[synth,[synth,[synth,synth]]]]
	).sequences
);
*/
//console.log(player([synth,synth],[synth,synth,...synth(8)],[synth,...synth(3)]).play()[1][0].dur);

//console.log(player([...synth(3)]).play())
/*
console.log(
	player([synth({amp:2}), synth]).play()[0][0].amp
)
*/
/*
let t1 = player([synth({amp:0.1}), synth({rate:5}) ]).play({amp:2, rate:2});
console.log(t1[0][0].amp, t1[0][0].rate)
console.log(t1[0][1].amp, t1[0][1].rate)
*/
/*
Clock.time = 100
console.log(
player(
	[synth({amp:()=>{return Clock.time}})]
).play({amp:2, mode:"add"})[0][0].amp
)
*/
/*
console.log(
	player(
		[synth({amp:5, rate:5})]
	).play({amp:10,mode:"add"}, {rate:2, mode:"mult"})[0][0].amp
);
*/
/*
let t1 = [synth, synth].eve({3:{rate:3, mode:"add"}})
console.log(t1[1].eve)
*/


