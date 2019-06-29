const fs = require('fs');
const path = require('path');

fs.writeFile("static/js/functions.js","",function(e){
	if(e){
		console.log("> Error writing to functions file");
	}
})

fs.readdir("samples",function(err, item,s){
	let SCtext = "~samples = Dictionary.new;\n~samples.putPairs([\n";
	let Functext = "";
	let samples = [];

	if(err){
		console.log("Error reading samples folder");
	}else{

		item.forEach(function(file){
			let ext = path.extname(file);
			if(ext == ".wav" || ext == ".aiff"){
				samples.push({
					name: path.basename(file, ext),
					filepath: file
				});
				
			}
		});

		samples.forEach(function(sample){
			SCtext += `\t\"${sample.name}\", Buffer.read(s,\"./samples/${sample.filepath}\" ),\n `;
			Functext += "let "+sample.name.replace(" ","_")+ `= new SampleDef( name= \"${sample.name}\", filename= \"${sample.filepath}\" )\n`;
		});
		
	}
	SCtext += "]);"

	fs.writeFile("Supercollider/samples.scd",SCtext,function(e){
		if(e){
			console.log("> Error writing to samples file");
		}
	});


	fs.appendFile("static/js/functions.js",Functext,function(e){
		if(e){
			console.log("> Error writing to function file");
		}
	});
});

playerstext = "";
for(var num=1;num<6;num++){
	playerstext += `let p${num} = new Player(\"p${num}\");\n`;
};

playerstext += "\n";

fs.appendFile("static/js/functions.js", playerstext, function(e){
	if(e){
		console.log("> Error writing to function file");
	}
});
