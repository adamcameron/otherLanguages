// defaultReject.js

new Promise(
	function(resolve, reject) {
		console.log("Promise with default reject()");
		reject("Not OK");
	}
);
