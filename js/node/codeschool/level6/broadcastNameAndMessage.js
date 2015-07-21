// broadcastNameAndMessage.js

io.socket.on("connection", function(client){
	client.on("join", function(name){
		client.set("nickname", name);
	});
});

io.socket.on("messages", function(data){
	client.get("nickname", function(err, name){
		client.broadcast.emit("chat", name + ": " + message);
	});
});