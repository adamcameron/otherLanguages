var http = require('http');
var port = 1337;
var ip = "127.0.0.1"
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("G'day World!\n");
}).listen(port, ip);
console.log("Server running at http://" + ip + ":" + port + "/");