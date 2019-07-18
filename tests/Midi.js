const midi = require('midi');

let input = new midi.input();

let devices = []
for(var k=0;k<input.getPortCount();k++){
	devices.push(input.getPortName(k));

}
console.log(input.getPortCount())
console.log(devices)

