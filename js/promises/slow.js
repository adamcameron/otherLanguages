// slow.js

slowThing = function(label){
	console.log(label);
	console.log("Before process");
	startTime=new Date();
	var words = ulyssesExtract.replace(/(\b\w+\b)(?=.*\1)/gi, "").replace(/\s+/g," ");
	endTime = new Date();
	elapsed = endTime - startTime;
	console.log("After process (" + elapsed + "ms)\n\n\n");
};


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
