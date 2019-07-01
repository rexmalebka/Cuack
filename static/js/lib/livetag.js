const lodash = _;
const Clock = {
	_bpm : 120,
	_time : 0,

	get bpm(){
		return this._bpm;
	},
	set bpm(value){
		console.log(value);
		this._bpm = value;
	},
	get time(){
		return this._time
	},
	start : function(){
		return "aaaaa"
	},
	stop : function(){
	}
};

const socket = new WebSocket("ws://127.0.0.1:3000");

socket.onopen = function(){
	console.log("open connection");
};

socket.onmessage = function(message){
	let msg = JSON.parse(message.data);
	if(msg.com == "setClockbpm"){
		Clock.bpm = msg.value; 
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
			console.log(editor.getValue());
			eval(editor.getValue());
		},
		"Ctrl-Enter":function(f){
			console.log(editor.getLine(editor.getCursor().line));
			eval(editor.getLine(editor.getCursor().line));
		
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
