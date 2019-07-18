Array.prototype.shuffle = function(){
	let a = this
	let j,x,i;
	for(i = a.length -1;i>0; i-- ){
		j = Math.floor(Math.random() * (i + 1))
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a
}

Array.prototype.palindrome = function(){
	let a = new Array(...this);
	a.reverse()
	this.push(...a)
	return this
}

Array.prototype.rep = function(n=1){
	let a = new Array(...this);
	for(let k=0;k<n-1;k++){
		a.push(...this)
	}
	return a
}

Array.prototype.to = function(seq2){
	if(!this.hasOwnProperty("seq")){
		this.seq = [new Array(...this)]
	}
	if(!this.hasOwnProperty("get")){
		this.get = function(){
			let x = this.seq[0];
			this.seq.push(this.seq.shift());
			return x
		}
	}
	this.seq.push(seq2)
	return this
}

Array.prototype.set = function(...props){
	console.log("PROPS ARRAY",props)
	let seq = this;
	props.forEach(function(prop){
		if(props instanceof Object){
			seq = Player.set(seq, prop)
		}
	});	
	return seq
};
Array.prototype.eve = function(every){
	if(every instanceof Object && Object.keys(every).every((k)=>!isNaN(k) )){
		this._every = every;
	}
};

const cons = document.querySelector(".console");

const socket = new WebSocket("ws://127.0.0.1:3000");

socket.onopen = function(){
	console.log("Cuack: socket connection opened.");
};

socket.onclose = function(){
	console.log("Cuack: socket connection closed.")

}

window.onbeforeunload = function(){
	socket.send(
		JSON.stringify(
			{
				com:"Cuack.browserclose",
				value:true
			}
		)
	)
}

socket.onmessage = function(message){
	let msg = {};
	try{
		 msg = JSON.parse(message.data);
	}catch(err){
		console.log("Cuack: Error Parsing incoming message")
		msg = {};
	}
	if(Object.entries(msg).length==0){
		console.log("Cuack: raw message was: ",message.data)
	}else if(msg.com == "Cuack.beat"){
		Clock.started = true;
		Clock.beats++;
	}else if(msg.com == "setClockbpm"){
		Clock.bpm = msg.value; 
	}else{
	
	}
};

const editor = CodeMirror(document.body, {
	theme:"midnight", 
	lineNumbers: true,
	lineWrapping: true,
	indentUnit: 4,
	indentWithTabs: false,
	lineWrapping : true,
	styleActiveLine: true,
	styleActiveSelected: true,
	scrollbarStyle:null,
	extraKeys: {
		"Shift-Ctrl-Enter":function(){
			const text = editor.getValue();
			//autosave()
			try{
				let evaluated = eval(text);
				cons.textContent = `${text} → ${typeof evaluated}`;
			}catch(error){
				cons.textContent = error;
			}
		},
		"Ctrl-Enter":function(f){
			const text = editor.getLine(editor.getCursor().line);
			//autosave()
			try{
				let evaluated = eval(text);
				cons.textContent = `${text} → ${typeof evaluated}`;
			}catch(error){
				cons.textContent = error;
			}	
		}
	}
});




document.cookie.split(";").forEach(function(values){
	let kv = values.split("=[");
	if(kv.length==2 && kv[0]=="Cuackcode"){
		editor.getDoc().setValue(kv[1])
	}else{
	editor.getDoc().setValue(`
		/*
		 *
		 * 	(\´• ω •\`)ﾉ
		 *
		 * 	AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		 *
		 *
		 */
	`);
	
	}
});


const autosave = function(){
	let d = new Date()
	d.setTime(d.getTime() + 60*1000);

	document.cookie = "Cuackcode=["+editor.getValue()+";expires="+d.toUTCString()+";path=/;";
};

//const autosave_id =setInterval(autosave, 5000);

