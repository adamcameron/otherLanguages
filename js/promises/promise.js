function makeAPromise() {
	console.log("Before promise");
	var p1 = new Promise(
		function(resolve, reject) {
			console.log("Promise callback");
			resolve();
		}
	).then(function(){
		console.log("then() resolve callback")
	});
	console.log("After promise");
}
