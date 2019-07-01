let a = function a(prop){
	
	a.amp = 1;
	a.play = function(){
		return a.amp(1)+1
	}
	return a
}


console.log(a((amp)=>{return 3}).play({amp:1}))
/*

p1(
[cp({amp: (amp)=>{ return Math.sin(amp) }}),cp,cp]
).play({amp:2,mode:"add"})

*/
