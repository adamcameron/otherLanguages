// raceAjaxRequests.js

console.log("Before creating array" + lap());
var promises = [1,2,3,4,5].map(function(i){
	return getAsyncResponse("../responder.cfm?ident=" + i, i);
});
console.log("After creating array" + lap());


console.log("Before calling race()" + lap());
var race = Promise.race(promises);
console.log("After calling race()" + lap());


console.log("Before binding resolver" + lap());
race.then(function(value){
	var indent = "        ";
	console.log(indent + "race() handled" + lap());
	console.log(indent + value);
});
console.log("After binding resolver" + lap());


console.log("End of mainline code" + lap());
