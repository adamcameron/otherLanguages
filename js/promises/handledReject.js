// handledReject.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with handled reject()");
		reject("Not OK");
	}
).then(null, function(reason){
	console.log("reject() provided via then() using reason " + reason);
});
