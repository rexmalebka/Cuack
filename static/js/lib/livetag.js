const cons = document.querySelector(".console");

const Clock = {
	_bpm : 120,
	globalTime : 0,
	time:0,
	starttime: 0,
	set bpm(value){
		console.log(`> Changed Clock bpm: ${value}`);
		this._bpm = value;
	},
	timerref : 0,
	timer: function(){
		Clock.globaltime = (performance.now() - Clock.starttime)/1000;
		Clock.time = Clock.globaltime % (Clock._bpm / 60);
		if(Clock.time > 1.98){
			console.log("Beep")
		}
		Clock.timerref = requestAnimationFrame(Clock.timer);
	},
	start : function(){
		Clock.starttime = performance.now();
		Clock.timerref = requestAnimationFrame(Clock.timer);
		return "aaaaa"
	},
	stop : function(){
		cancelAnimationFrame(Clock.timerref);
	}
};


const socket = new WebSocket("ws://127.0.0.1:3000");

socket.onopen = function(){
	console.log("socket connection opened.");
};

socket.onclose = function(){
	console.log("socket connection closed.")
}

socket.onmessage = function(message){
	let msg = JSON.parse(message.data);
	if(msg.com == "setClockbpm"){
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
			try{
				let evaluated = eval(text);
				cons.textContent = `${text} → ${typeof evaluated}`;
			}catch(error){
				cons.textContent = error;
			}
		},
		"Ctrl-Enter":function(f){
			const text = editor.getLine(editor.getCursor().line);
			try{
				let evaluated = eval(text);
				cons.textContent = `${text} → ${typeof evaluated}`;
			}catch(error){
				cons.textContent = error;
			}	
		}
	}
});


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



