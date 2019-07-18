const osc = require('osc');
const config = require('./config.js');
const OSCserver = {
	start: function(){
		OSCserver.server = new osc.UDPPort({
			localAddress: config.OSCLocalAddr,
			localPort: config.OSCLocalPort,
			remoteAddress: config.SCAddr,
			remotePort: config.SCPort,
			metadata : false
		});
		OSCserver.server.open();
		OSCserver.server.on("ready", function(){
			console.log("Cuack: OSC server ready");

			OSCserver.sendsynth = function(msg){
					let oscmsg = JSON.stringify([msg.player,...msg.value]);
					OSCserver.server.send({
						address: "/Cuack.sched",
						args: oscmsg
					}, config.SCAddr, config.SCPort);
			};

			OSCserver.setclockbpm = function(bpm){
				OSCserver.server.send({
					address: "/Cuack.setclockbpm",
					args: bpm
				}, config.SCAddr, config.SCPort);
			}

			OSCserver.browserclose = function(){
				OSCserver.server.send({
					address: "/Cuack.browserclose",
					args: ""
				}, config.SCAddr, config.SCPort);
			}

			OSCserver.server.on("message", function (oscMsg) {
				if(oscMsg.address=="/Cuack.beat"){
					//send to ws
					//console.log("beep");
					OSCserver.socketserver.sendmsg({com:"Cuack.beat", value:"beep"})
				}else if(oscMsg.address=="/Cuack.scping"){
					OSCserver.socketserver.sendmsg({com:"Cuack.scping", value:"ping"});
					console.log("Cuack: SC says hi.")
				}
			});
		});
	},
	
};



module.exports = OSCserver;
