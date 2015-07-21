// slowWithNoResolve.js

slowThing = function(label){
	console.log(label);
	console.log("Beginning of slowThing(\"" + label + "\") process");
	var startTime=new Date();
	var words = ulyssesExtract.replace(/(\b\w+\b)(?=.*\1)/gi, "").replace(/\s+/g," ");
	var endTime = new Date();
	var elapsed = endTime - startTime;
	console.log("After slowThing(\"" + label + "\") process (" + elapsed + "ms)\n\n\n");
};


var startTime=new Date();
console.log("Before promise");

new Promise(
	function(resolve, reject) {
		slowThing("Executor");
	}
);

var endTime = new Date();
var elapsed = endTime - startTime;
console.log("After promise (" + elapsed + "ms)\n\n\n");
