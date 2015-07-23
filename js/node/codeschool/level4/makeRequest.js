// makeRequest.js

var http = require("http");

var makeRequest = function(message) {
	var options = {
		host:	"localhost",
		port:	 8080,
		path:	"/",
		method:	"POST" 
	};

	var request = http.request(options, function(response){
		response.on("data", function(data){
			console.log(data.toString());
		});
	});
	request.write(message); // begins the request
	request.end(); // finishes it
};

module.exports = makeRequest;