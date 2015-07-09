// resolveAndReject.js

var makeAPromise = function(shouldResolve) {
	console.log("Before promise");
	var p = new Promise(
		function(resolve, reject) {
			console.log("Promise callback");
			shouldResolve ? resolve(["resolution value in executor"]) : reject(["rejection reason in executor"]);
		}
	).then(
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
	console.log("After promise");
	return p;
}
var shouldResolveMatch = window.location.search.match(/resolve=([^&]+)/);
var shouldResolve = (shouldResolveMatch !== null) && (shouldResolveMatch[1] == "true");

console.log("makeAPromise() which should " + (shouldResolve ? "" : "not ") + "resolve");
var p = makeAPromise(shouldResolve);

console.dir(p);
