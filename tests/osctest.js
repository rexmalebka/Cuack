const osc = require('osc');
const config = require('./config.js');

let OSCClient = new osc.UDPPort({
	localAddress: config.OSCLocalAddr,
	localPort: config.OSCLocalPort,
	remoteAddress: config.SCAddr,
	remotePort: config.SCPort,
	metadata : false
});

console.log("config: ",config)
OSCClient.open();

let prop = {dur: 1, amp:2, rate:4, name:"cp"};
prop = Object.keys(prop).map(function(key){ return [key, prop[key]]});

OSCClient.on("ready", function () {
    OSCClient.send({
        address: "/Cuack.sched",
        args: '["p2",[["name","cp","dur", 0.25],["name","ooo","dur", 0.25]]]'    
    }, config.SCAddr, config.SCPort);
	
});


