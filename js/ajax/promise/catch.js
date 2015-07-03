executor = function(resolve, reject){
	console.log("Promise executor handler called");
	reject();
};
thenResolve = function(){
	console.log("then() resolve handler called");
};
thenReject = function(){
	console.log("then() reject handler called");
};
catchReject = function(){
	console.log("catch() reject handler called");
};

p = new Promise(executor)
	.catch(catchReject);