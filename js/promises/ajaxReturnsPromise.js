// ajaxReturnsPromise.js

console.log("Before initiating request" + lap());
request = getAsyncResponse("../slow.cfm", 1);

console.log("Before binding resolver" + lap());
request.then(function(value){
	console.log("        Response handled: " + value + lap());
});

console.log("End of mainline code" + lap());
