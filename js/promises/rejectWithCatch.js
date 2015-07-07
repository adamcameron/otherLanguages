// rejectWithCatch.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with handled reject()");
		reject("Not OK");
	}
).catch(function(reason){
	console.log("reject() provided via catch() using reason " + reason);
});