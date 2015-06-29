var count = 0;

function makeAPromise() {
	var thisPromiseIndex = ++count;
	var logStatus = function (message){
		var seconds = new Date().getSeconds();
		var indent = " ".repeat(thisPromiseIndex*4); 
		console.log(indent + "(" + thisPromiseIndex + ") " + message + " (" + seconds + "sec)");
	}

	var emulatedLongRunningTask = function(resolve,reject){
		var delay = 1000 + Math.round(Math.random() * 5) * 1000;
		logStatus("Before setTimeout() called with delay of " + delay + "ms");
		window.setTimeout(
			function() {
				logStatus("setTimeout() callback called");
				logStatus("Before calling resolve() / reject()");
				thisPromiseIndex % 2 ? resolve(delay) : reject("Even indexed Promises are rejected. This is Promise [" + thisPromiseIndex +"]");
				logStatus("After calling resolve() / reject()")
			},
			delay
		);
		logStatus("After setTimeout() called");
	}

	logStatus("Before promise created");
	var p1 = new Promise(
		function(resolve, reject) {
			logStatus("Promise callback called");
			emulatedLongRunningTask(resolve,reject);
	});
	logStatus("After promise created");



	logStatus("Before first then() called");
	p1.then(
		function(delay) {
			logStatus("First then() onFulfilled callback called after delay of " + delay + "ms");
			return "Value returned from first then() onFulfilled callback"
		},
		function(reason) {
			logStatus("First then() onRejected callback called with reason: [" + reason + "]");
			return "Value returned from first then() onRejected callback"
		}
	).then(function(message) {
		logStatus("Second then() onFulfilled callback called, receiving [" + message + "]");
	});
	logStatus("After first then() called");


}

function resetCount(){
	count = 0;
}