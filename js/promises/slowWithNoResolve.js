// slowWithNoResolve.js

slowThing = function(){
	console.log("Beginning of slowThing() process");
	var startTime=new Date();
	var words = ulyssesExtract.replace(/(\b\w+\b)(?=.*\1)/gi, "").replace(/\s+/g," ");
	var endTime = new Date();
	var elapsed = endTime - startTime;
	console.log("After slowThing() process (" + elapsed + "ms)\n\n\n");
};


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
