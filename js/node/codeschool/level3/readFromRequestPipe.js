// readFromRequestPipe.js
var http = require("http");
var port = 8080;

var server = http.createServer();

server.on("request", function(request, response){
	console.log("Got it");
	response.writeHead(200);
	request.pipe(response);
});

server.listen(port);
console.log("Listening on port " + port);