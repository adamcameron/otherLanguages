// baselineWebSocket.js
var socket = require("socket.io");
var express = require("express");
var http = require("http");

var app = express();


app.get("/", function(request, response){
	console.log("/ requested");
	response.sendfile(__dirname + "/index.html");
});

var server = http.createServer(app);
var io = socket.listen(server);

io.sockets.on("connection", function(client){
	console.log("Client connected...");
	client.emit("messages", {hello: "world"});
});

io.sockets.on("connection", function(client){
	client.on("messages", function(data){
		console.log(data);
	});
});


server.listen(8080);