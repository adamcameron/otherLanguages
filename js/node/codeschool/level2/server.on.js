// server.on.js
var http = require("http");
var port = 8080;

var server = http.createServer().listen(port);

server.on("request", function(request, response){
	response.writeHead(200);
	response.write("Hello, this is dog again");
	response.end();
});

console.log("Listening on port " + port);