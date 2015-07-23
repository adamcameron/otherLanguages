// handledRejectWithResolve.js

console.log("Before promise");
p = new Promise(
	function(resolve, reject) {
		console.log("Promise with handled reject()");
		reject("Not OK");
	}
).then(null, function(reason){
	console.log("reject() provided via first then() using reason " + reason);
	return Promise.reject(reason);
}).then(null, function(reason){
	console.log("reject() provided via second then() using reason " + reason);

	// perform some remedial action

	return Promise.resolve("Rejected promise (" + reason + ") now resolved");
});
console.log("After promise");
console.dir(p);