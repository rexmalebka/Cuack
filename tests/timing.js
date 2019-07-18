/*[0.25, 0.75] 
[0.5, 1.5] 
*/
let a=[{dur:1}, {dur:2}, [{dur:4}]  ]

function spread(seq, sum=0){
	
	let l;
	while(seq.length!=0){
		l = seq.shift()
		console.log("L",l)
		if(Array.isArray(l)){
			console.log("YO")
			sum += spread(l)
		}else{
			sum +=l.dur
			console.log(sum)
		}
	}
	return sum
}

console.log(spread(a))
