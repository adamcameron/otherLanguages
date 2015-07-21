// intro2.js
var http = require("http");
var port = 8080;

http.createServer(function(request, response){
	response.writeHead(200);
	response.write("Dog is running\n");
	setTimeout(function(){
		response.write("Dog is done\n");
		response.end();
	}, 5000);
}).listen(port);