const sc = require('supercolliderjs');

let sclang;

sc.lang.boot()
	.then(function(sclang){
		sclang.interpret(
			's.boot',
		).then(function(res){
			console.log("res")
			console.log(res);
		},function(err){
			console.log("error")
			console.log(err)

		});
		sclang.interpret(
		's.s'
		)

});

// abrir un puerto de comunicación osc

