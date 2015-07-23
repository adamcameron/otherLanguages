// multipleResolve.js

resolver = function(resolution){
	resolution.handler(resolution.message);
	return Promise.resolve(resolution.message);
};

firstResolution = function(resolutionMessage){
	console.log("firstResolution(): start");
	slowThing(resolutionMessage + "first slow thing");
	console.log("firstResolution(): between slow things");
	slowThing(resolutionMessage + "first slow thing");
	console.log("firstResolution(): end");
};

secondResolution = function(resolutionMessage){
	console.log("secondResolution(): start");
	slowThing(resolutionMessage + "first slow thing");
	console.log("secondResolution(): between slow things");
	slowThing(resolutionMessage + "first slow thing");
	console.log("secondResolution(): end");
};



console.log("Before promise");
p = new Promise(
	function(resolve, reject) {
		console.log("executor: start");
		console.log("executor: before first resolve");
		resolve({handler:firstResolution, message: "1: "});
		console.log("executor: before second resolve");
		resolve({handler:secondResolution, message: "2: "});
		console.log("executor: end");
	}
).then(resolver);
console.log("After promise");
console.dir(p);
