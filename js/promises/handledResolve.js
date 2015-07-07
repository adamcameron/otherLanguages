// handledResolve.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with handled resolve()");
		resolve("OK");
	}
).then(function(value){
	console.log("resolve() provided via then() using value " + value);
});

