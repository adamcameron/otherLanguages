// values.js


var n = 5;
var startTime = new Date();

var executor = function(resolve, reject){
	setTimeout(function(){
		console.log("Promise executor handler called with " + n);
		resolve(n);
	}, 1000);
};
var resolver = function(result){
	console.log("then() resolve handler called with: " + result);
	if (--n > 0){
		return new Promise(executor);
	}else{
		return Promise.resolve("done");
	}
};


var p = new Promise(executor)
	.then(resolver)
	.then(resolver)
	.then(resolver)
	.then(resolver)
	.then(resolver)
	.then(resolver)
	.then(resolver);

var elapsed = new Date() - startTime;
console.log("Elapsed time: " + elapsed + "ms", "Promise status immediately after call");

var delay = 6000;
setTimeout(function(){
	console.dir(["Promise status after " + delay + "ms", p]);
}, delay);

setInterval(function(){
	var elapsed = new Date() - startTime;
	if (elapsed < 6000){
		console.log(elapsed + "ms have elapsed...");
	}else{
		clearInterval();
	}
}, 1000);

console.log("Mainline code complete");
