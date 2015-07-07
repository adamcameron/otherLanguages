// handledResolve.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with handled resolve()");
		resolve("OK");
	}
).then(function(value){
	console.log("resolve() provided via first then() using value " + value);
	return Promise.resolve(value + " again");
}).then(function(value){
	console.log("resolve() provided via second then() using value " + value);
	return Promise.resolve(value);
});

