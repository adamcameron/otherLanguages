// defaultReject.js
console.log("Before promise");
new Promise(
	function(resolve, reject) {
		console.log("Promise with default reject()");
		reject("Not OK");
	}
);
console.log("After promise");