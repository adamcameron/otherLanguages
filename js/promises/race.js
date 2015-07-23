// race.js

promiseGenerator = {};
promiseGenerator[Symbol.iterator] = function*(){
	var count = 0;
	while (++count <= 5){
		console.log("yielding with (" + count + ")");
		yield getIndexedPromise(count);
	}
};


getIndexedPromise = function(index){
	return new Promise(function(resolve,reject){
		console.log("(" + index + ") Promise executor");
		resolve(index);
	}).then(function(value){
		slowThing("(" + value + ") then() resolver");
		return Promise.resolve(value);
	});
};

console.log("Before finalPromise is created");
finalPromise = Promise.race(promiseGenerator);

console.log("Before finalPromise has then() attached");
finalPromise.then(function(value){
	console.dir(value);
	console.log("finalPromise's then()'s resolve() called with " + value);
});
console.log("End of processing");


