function makeAPromise() {
	var p1 = new Promise(
		function(resolve, reject) {
			console.log("Promise callback")
			Math.floor(Math.random() * 2) ? resolve() : reject();
		}
	);

	p1.then(
		function() {
			console.log("First then() resolve callback");
		},
		function() {
			console.log("First then() reject callback");
			reject();
		}
	).then(
		function() {
			console.log("Second then() resolve callback");
		},
		function() {
			console.log("Second then() reject callback");
		}
	);
}
