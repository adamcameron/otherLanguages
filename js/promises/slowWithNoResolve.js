// slowWithNoResolve.js

var startTime=new Date();
console.log("Before promise");

new Promise(
	function(resolve, reject) {
		console.log("Start of executor callback");
		slowThing();
		console.log("End of executor callback");
	}
);

var endTime = new Date();
var elapsed = endTime - startTime;
console.log("After promise (" + elapsed + "ms)\n\n\n");
