// slow.js

console.log("Before promise");
new Promise(
	function(resolve, reject) {
		slowThing("Executor");
		resolve();
	}
).then(function(){
	slowThing("first then() resolve()");
	return Promise.resolve();
}).then(function(){
	slowThing("second then() resolve()");
	return Promise.resolve();
});
console.log("After promise");
