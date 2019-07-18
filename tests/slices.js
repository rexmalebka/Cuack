l = [{},{},{},{},{},{}]
r = [10,20,30];

l = l.map(function(k,i){
	return r[ Math.floor(r.length*(i)/l.length)]
});

console.log(l);
