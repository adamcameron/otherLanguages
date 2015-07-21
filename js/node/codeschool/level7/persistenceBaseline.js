//persistenceBaseline.js
var socket = require("socket.io");
var express = require("express");
var http = require("http");
var redis = require("redis");

var app = express();

var server = http.createServer(app);
var io = socket.listen(server);

var redisClient = redis.createClient();


var messages = [];
var storeMessage = function(name, data){
	messages.push({name: name, data: data});
	if (messages.length > 10){
		messages.shift();
	}
}

var storeMessageViaRedis = function(name, data){
	var message = JSON.stringify({name: name, data: data});
	redisClient.lpush("messages", message, function(){
		redisClient.ltrim("messages", 0, 10);
	});
}

io.sockets.on("connection", function(client){
	client.on("join", function(name){
		client.set("nickname", name);
		client.broadcast.emit("chat", name + " joined the chat");

		redisClient.lrange("messages", 0, -1, function(err, messages){
			messages = messages.reverse();
			messages.forEach(function(message){
				message = JSON.parse(message);
				client.emit("messages", message.name + ": " + message.data);
			});
		});

		client.broadcast.emit("add chatter", name);
		redisClient.sadd("chatters", name);

		client.broadcast.emit("add chatter", name);
		redisClient.smembers("names", function(err, names){
			names.forEach(function(name){
				client.emit("add chatter", name);
			});
		});
		redisClient.sadd("chatters", name);
	});

	client.on("messages", function(message){
		client.get("nickname", function(error, name){
			storeMessage(name, message);
			client.broadcast.emit("messages", name + ": " + message)
		});
	});

	client.on("disconnect", function(name){
		client.get("nickname", function(err, name){
			client.broadcast.emit("remove chatter", name);
			redisClient.srem("chatters", name);
		});
	});





});