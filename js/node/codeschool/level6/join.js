//join.js

io.socket.on("connection", function(client){
	client.on("join", function(name){
		client.set("nickname", name);
	});
});