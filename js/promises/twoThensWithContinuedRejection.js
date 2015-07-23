// twoThensWithContinuedRejection.js

executor = function(resolve, reject) {
	console.log("Promise with handled resolve()");
	reject("Not OK");
};

resolveHandler = function(value){
	console.log("resolve() using value " + value);
};

firstRejectHandler = function(value){
	console.log("reject() using reason " + value);
	return Promise.reject("Explicit rejection");
};

secondRejectHandler = function(value){
	console.log("reject() using reason " + value);
	return Promise.resolve("Explicit resolution");
};


console.log("Before promise");

p = new Promise(executor)
	.then(resolveHandler, firstRejectHandler)
	.then(resolveHandler, secondRejectHandler);

console.log("After promise");
console.dir(p);