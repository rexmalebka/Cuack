const express = require('express'),
	app = express(),
	path = require('path'),
	Socketserver = require('./SocketServer.js'),
	gen = require('./generate.js'),
	OSCserver = require('./OSCserver.js');
	//Clock = require('./ClockTempo.js');
	//SClang = require('./SCrun.js');

// startclock
OSCserver.start();
//Clock.start(OSCserver)

app.use(express.static(__dirname+'/static'));
app.use(express.static(__dirname+'/views'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/prueba', function(req, res){
	res.sendFile(path.join(__dirname+'/views/prueba.html'));
});

let webserver = app.listen(3000, function () {
  console.log("Cuack: web server started, listening on port 3000");
});

Socketserver.start(webserver, OSCserver);
OSCserver.socketserver = Socketserver;
