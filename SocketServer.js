const webSocket = require('ws');

const wss = {
	start: function(webserver, oscserver){
		console.log("Cuack: websocket started.")
		wss.oscserver = oscserver;
		wss.server =  new webSocket.Server({server : webserver});

		wss.server.on('connection', function connection(ws) {
			console.log("Cuack: Connected to websocket.")
			wss.ws = ws;
			ws.on('message', wss.parse);
		});
	},

	parse: function(message){
		let msg = {}
		try{
			msg = JSON.parse(message); 
		}catch(err){
			console.log("Cuack: Error parsing incoming message")
			msg = {};
		};
		
		if(Object.entries(msg).length==0){
			console.log("Cuack: raw message was: ",message)
		}else if(msg.com == "Cuack.setClockbpm"){
			console.log("Cuack: setting Clock bpm.")
			wss.oscserver.setclockbpm(msg.value);			
		}else if(msg.com == "Cuack.sched"){
			console.log("Cuack: scheduling.")
			wss.oscserver.sendsynth(msg);
		}else if(msg.com == "Cuack.browserclose"){
			console.log("Cuack: conection lost.")
			wss.oscserver.browserclose();
		}
	},
	sendmsg: function(msg){
		if(wss.hasOwnProperty("ws")){
			wss.ws.send(JSON.stringify(msg))
		}
	}
}

module.exports = wss;
