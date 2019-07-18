function shuffle() {
	let a = this;
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}
Array.prototype.shuffle =shuffle

console.log([1,2,3,4,5,6].shuffle())
