const osc = require('osc');

let udpPort = new osc.UDPPort({
	localAddress: "127.0.0.1",
	localPort: 57121,
	remoteAddress: "127.0.0.1",
	remotePort: 7771,
	metadata : false
});

udpPort.open();

let prop = {dur: 1, amp:2, rate:4, name:"cp"};
prop = Object.keys(prop).map(function(key){ return [key, prop[key]]});

udpPort.on("ready", function () {
    udpPort.send({
        address: "/play",
        args: ["d1"].concat([].concat(...prop))
    }, "127.0.0.1", 7771);
	
});


