// ajaxTestsSharedCode.js

var startTime = new Date();
var lap = function(){
	var elapsed = new Date() - startTime;
	return " (" + elapsed + "ms)";
}


var getAsyncResponse = function(targetUrl, ident){
	ident = ident || 0;

	return new Promise(function(resolve, reject){
		console.log("    (" + ident + ") Beginning of Promise" + lap());

		var xhr = new XMLHttpRequest();
		xhr.onload = function(){
			console.log("    (" + ident + ") Response received" + lap());
			resolve(this.responseText);
		};
		xhr.open("get", targetUrl, true);
		xhr.send();

		console.log("    (" + ident + ") Request sent" + lap());
	});

};
