// promise.js

(function(){
	new Promise(
		function(resolve, reject) {
			console.log("Promise with no resolve()");
		}
	);
})();	
