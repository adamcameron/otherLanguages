// broadcast.js

io.socket.on("connection", function(client){
	client.on("messages", function(data){
		client.broadcast.emit("messages", data);
	});
});