const fs = require('fs');
const path = require('path');
const config = require('./config');

fs.writeFileSync("static/js/functions.js","",function(err){
	if(err){
		console.log("> Error writing to function file.");
	}
});

fs.writeFileSync(path.join(config.SamplesDir,"../samples.scd"),"Dictionary.newFrom([\n",function(err){
	if(err){
		console.log("> Error writing to function file.");
	}
});

for(var k=1;k<6;k++){
	fs.appendFileSync("static/js/functions.js",`let p${k} = new Player("p${k}");\n`,function(err){
		if(err){
			console.log("> Error writing to function file.");
		}
	});
}


fs.readdir(config.SamplesDir,function(err, item, s){
	if(err){
		console.log("> Error reading samples folder")
	}else{

		item.forEach(function(file){
			let ext = path.extname(file);
			let name = path.basename(file, ext);

			if(ext == ".wav" || ext == ".aiff"){
				name = "_"+name.replace(" ","_");
				fs.appendFile("static/js/functions.js",`let ${name} = new SampleDef("${name}","${file}");\n`,function(err){
					if(err){
						console.log("> Error writing to function file.");
					}				
				});
				
				let samplepath = config.SamplesDir+file;
				fs.appendFileSync(config.SamplesDir+"../samples.scd",`"${name}" , Buffer.read(Server.default,"${samplepath}"),\n`,function(err){
					if(err){
						console.log("> Error writing to function file.");
					}				
				});

			}
		});
		fs.appendFileSync(config.SamplesDir+"../samples.scd",`]);`,function(err){
			if(err){
				console.log("> Error writing to function file.");
			}				
		});
	}

});

