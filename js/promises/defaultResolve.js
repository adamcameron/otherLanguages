// defaultResolve.js

console.log("Before promise");
p = new Promise(
	function(resolve, reject) {
		console.log("Promise with default resolve()");
		resolve("OK");
	}
);
console.log("After promise");
console.dir(p);
