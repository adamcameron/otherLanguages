// twoThensWithRejection.js

executor = function(resolve, reject) {
	console.log("Promise with handled resolve()");
	reject("Not OK");
};

resolveHandler = function(value){
	console.log("resolve() using value " + value);
};

rejectHandler = function(value){
	console.log("reject() using reason " + value);
};

console.log("Before promise");

p = new Promise(executor)
	.then(resolveHandler, rejectHandler)
	.then(resolveHandler, rejectHandler);

console.log("After promise");
console.dir(p);