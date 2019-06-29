const NanoTimer = require('nanotimer');

let c = {
	maintimer : new NanoTimer(),
	timers: [],
	a: true,
	start: function(){
		c.maintimer.clearInterval();
		c.f();
		c.maintimer.setInterval(c.f,"","1s");
	},
	f: function(){
		if(!c.a){
			console.log("iniciado")
			c.timers = [];
		}else{
			console.log("terminado")
		}
		c.timers.push(
			new NanoTimer().setTimeout(
				function(func){
					console.log("\t AAAA",func);
				},["hola"],"500m"
			)
		);
		c.a = !c.a;
	}
};

c.start();
