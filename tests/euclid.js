const euclid = function(m=1, k=1){
	if(k>m){
		[k,m ] = [m,k];
	}
	let seq = Array(k).fill([1]).concat(Array(m-k).fill([0]))
	
	function it(k, n){
		
		if(k==0 ){
			seq = [].concat(...seq)
			return seq
		}
		let head = seq.slice(0, seq.length - n);
		let tail = seq.slice(seq.length - n, seq.length);
		let res;
		if(tail.length == 1){
			res = head.concat(tail)
		}else{
			res = head.map(function(r,i){
				if(i<tail.length){
					return head[i].concat(tail[i])
				}else{
					return head[i]
				}
			});
		}
		console.log("RES",res, head, tail,k,n)
		seq = res;
		return it(n, k%n)

	};

	return it(m, k%m )
};


//console.log(euclid(5,13))
console.log(euclid(4,12))

