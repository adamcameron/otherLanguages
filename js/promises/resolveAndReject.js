// resolveAndReject.js

(function(){
	var makeAPromise = function(shouldResolve) {
		var p1 = new Promise(
			function(resolve, reject) {
				console.log("Promise callback");
				shouldResolve ? resolve(["resolution value in executor"]) : reject(["rejection reason in executor"]);
			}
		);

		p1.then(
			function(value) {
				console.log("First then() resolve callback called with:");
				console.dir(value);
				value.push("resolution value in first then()")
				return Promise.resolve(value);
			},
			function(reason) {
				console.log("First then() reject callback called with:");
				console.dir(reason);
				reason.push("rejection value in first then()")
				return Promise.reject(reason);
			}
		).then(
			function(value) {
				console.log("Second then() resolve callback called with:");
				console.dir(value);
				value.push("resolution value in second then()")
				return Promise.resolve(value);
			},
			function(reason) {
				console.log("Second then() reject callback called with:");
				console.dir(reason);
				reason.push("rejection value in second then()")
				return Promise.reject(reason);
			}
		);
	}
	console.dir(window.location.search.match(/resolve=([^&]+)/));
	var shouldResolve = window.location.search.match(/resolve=([^&]+)/)[1] == "true";

	console.log("makeAPromise() which should " + (shouldResolve ? "" : "not ") + "resolve");
	makeAPromise(shouldResolve);
})();	

