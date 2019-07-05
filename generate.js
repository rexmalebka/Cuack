const fs = require('fs');
const path = require('path');

fs.readdir("static/samples",function(err, item, s){
	if(err){
		console.log("> Error reading samples folder")
	}else{
		console.log(item, "item");

		item.forEach(function(file){
			let ext = path.extname(file);
			let name = path.basename(file, ext);

			if(ext == ".wav" || ext == ".aiff"){
				name = "_"+name.replace(" ","_");
				console.log(name);
			}
		});
	}

});

