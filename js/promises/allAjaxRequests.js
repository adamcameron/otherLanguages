// allAjaxRequests.js

console.log("Before creating array" + lap());
var promises = [1,2,3,4,5].map(function(i){
	return getAsyncResponse("../responder.cfm?ident=" + i, i);
});
console.log("After creating array" + lap());


console.log("Before calling all()" + lap());
var all = Promise.all(promises);
console.log("After calling all()" + lap());


console.log("Before binding resolver" + lap());
all.then(function(value){
	var indent = "        ";
	console.log(indent + "all() handled" + lap());
	var values = value.forEach(function(v, i){
		console.log(indent + "(" + i + ")" + v);
	});
});
console.log("After binding resolver" + lap());


console.log("End of mainline code" + lap());
