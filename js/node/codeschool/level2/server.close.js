// server.close.js
var http = require("http");
var port = 8080;

var server = http.createServer();

server.on("request", function(request, response){
	response.writeHead(200);
	response.write("Hello, this is dog again");
	response.end();
});
server.on("request", function(request, response){
	console.log("New request coming in...");
});
server.on("close", function(){
	console.log("Server closing down...");
});


server.listen(port);


console.log("Listening on port " + port);