// resolveAndReject.js

var makeAPromise = function(shouldResolve) {
	var p = new Promise(
		function(resolve, reject) {
			console.log("Promise callback");
			shouldResolve ? resolve(["resolution value in executor"]) : reject(["rejection reason in executor"]);
		}
	);

	p.then(
		function(value) {
			console.log("First then() resolve callback called with:");
			console.log(value);
			value.push("resolution value in first then()")
			return Promise.resolve(value);
		},
		function(reason) {
			console.log("First then() reject callback called with:");
			console.log(reason);
			reason.push("rejection value in first then()")
			return Promise.reject(reason);
		}
	).then(
		function(value) {
			console.log("Second then() resolve callback called with:");
			console.log(value);
			value.push("resolution value in second then()")
			return Promise.resolve(value);
		},
		function(reason) {
			console.log("Second then() reject callback called with:");
			console.log(reason);
			reason.push("rejection value in second then()")
			return Promise.reject(reason);
		}
	);
	return p;
}
var shouldResolve = window.location.search.match(/resolve=([^&]+)/)[1] == "true";

console.log("makeAPromise() which should " + (shouldResolve ? "" : "not ") + "resolve");
var p = makeAPromise(shouldResolve);

console.dir(p);
