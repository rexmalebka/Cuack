const osc = require('osc');
const config = require('./config.js');
const OSCserver = {
	server: new osc.UDPPort({
		localAddress: config.OSCLocalAddr,
		localPort: config.OSCLocalPort,
		remoteAddress: config.SCAddr,
		remotePort: config.SCPort,
		metadata : false
	})
};

OSCserver.server.open();

OSCserver.server.on("ready", function(){
	console.log("Cuack: OSC server ready");
	OSCserver.sendsynth = function(msg){
			let oscmsg = JSON.stringify([msg.player,...msg.value]);
			OSCserver.server.send({
				address: "/Cuack.sched",
				args: oscmsg
			}, config.SCAddr, config.SCPort);
	}
});


module.exports = OSCserver;
