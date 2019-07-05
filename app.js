const express = require('express'),
	app = express(),
	path = require('path'),
	webSocket = require('ws'),
	gen = require('./generate.js'),
	OSCserver = require('./OSCserver.js'),
	Clock = require('./ClockTempo.js');
	//SClang = require('./SCrun.js');

// startclock
Clock.start(OSCserver)


app.use(express.static(__dirname+'/static'));
app.use(express.static(__dirname+'/views'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/prueba', function(req, res){
	res.sendFile(path.join(__dirname+'/views/prueba.html'));
});

let webserver = app.listen(3000, function () {
  console.log('> web server started, listening on port 3000');
});


const wss = new webSocket.Server({server : webserver});

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message){
		let msg = JSON.parse(message); // TODO possible error if parsing bad websocket message
		/*
		 * TODO: websocket commands for getting clock information, updating params, etc;
		 */
		if(msg.com == "getClockbpm"){
			ws.send(JSON.stringify({com:"getClockbpm",value:Clock.bpm}));
		}else if(msg.com == "schedule"){
			Clock.update(msg.value);
		}
	});
	ws.send(JSON.stringify({com:"status", value:'connected'}));
});
