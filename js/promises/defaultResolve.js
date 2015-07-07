// defaultResolve.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with default resolve()");
		resolve("OK");
	}
);
