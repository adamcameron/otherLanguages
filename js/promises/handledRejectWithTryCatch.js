// handledRejectWithTryCatch.js

console.log("Before promise");
try {
	p = new Promise(
		function(resolve, reject) {
			console.log("Promise with handled reject()");
			try {
				reject("Not OK");
			} catch (e){
				console.log("Caught execption in mainline");
				console.dir(e);
			}
		}
	).then(null, function(reason){
		console.log("reject() provided via first then() using reason " + reason);
		return Promise.reject(reason);
	});
} catch(e){
	console.log("Caught execption in mainline");
	console.dir(e);
}
console.log("After promise");
console.dir(p);