// raceViaArray.js

getIndexedPromise = function(index){
	return new Promise(function(resolve,reject){
		console.log("(" + index + ") Promise executor");
		resolve(index);
	}).then(function(value){
		slowThing("(" + value + ") then() resolver");
		return Promise.resolve(value);
	});
};

console.log("Before promises are created");
promises = [1,2,3,4,5].map(function(v){
	return getIndexedPromise(v);
});
console.log("After promises are created");

console.log("Before finalPromise is created");
finalPromise = Promise.race(promises);

console.log("Before finalPromise has then() attached");
finalPromise.then(function(value){
	console.dir(value);
	console.log("finalPromise's then()'s resolve() called with " + value);
});
console.log("End of processing");
