const osc = require('osc');

const OSCserver = new osc.UDPPort({
	localAddress: "127.0.0.1",
	localPort: 57121,
	remoteAddress: "127.0.0.1",
	remotePort: 7771,
	metadata : false
});

OSCserver.open();

OSCserver.on("ready", function(){
	console.log("> OSC server ready");
	OSCserver.sendsynth = function(player, props){
		let prop = Object.keys(props).map(function(key){ return [key, props[key]]});
		prop = [].concat(...prop);


		OSCserver.send({
			address: "/play",
			args: [player].concat(prop)
		},"127.0.0.1", 7771);
	}
});


module.exports = OSCserver;
