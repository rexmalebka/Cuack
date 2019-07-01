let props = {
	amp: (time)=>{
		return Math.sin(time)
	}, 
	rate:2};
let fx = {echo:2};

p1(
	[
		cp(3,props,fx,
		)
	]
).play(
	{rate: }
);


