const exec = require('child_process').exec;

exec('sclang Supercollider/main.scd', function callback(error, stdout, stderr){
	console.log(error, stdout, stderr);
	if(error){
		console.log("! error running sclang")
	}
});
