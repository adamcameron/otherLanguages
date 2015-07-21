// redisLists.js
var message = "Hello this is dog";
client.lpush("messages", message, function(err, reply){
	console.log(reply);	// 1
});

var message = "Hello this is spider";
client.lpush("messages", message, function(err, reply){
	console.log(reply);	// 2
});


var message = "Oh sorry, wrong number";
client.lpush("messages", message, function(err, reply){
	client.ltrim("messages", 0, 1);	// trims everything except positions 0-1
});

client.lrange("messages", 0, -1, function(err, messages){	// -1 = last index
	console.log(messages);
});