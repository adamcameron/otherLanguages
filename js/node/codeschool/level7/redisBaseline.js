// redisBaseline.js
var redis = require("redis");
var client = redis.createClient();

client.set("message1", "hello, yes this is dog");
client.set("message2", "hello, yes this is spider");


client.get("message1", function(err, reply){
	console.log(arguments);
});