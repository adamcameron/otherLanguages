// promise.js

console.log("Before promise");
new Promise(
	function(resolve, reject) {
		console.log("Promise with no resolve()");
	}
);
console.log("After promise");
