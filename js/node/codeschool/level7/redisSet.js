// redisSet.js

client.sadd("names", "dog");
client.sadd("names", "spider");
client.sadd("names", "gregg");

client.srem("names", "spider");

client.smembers("names", function(err, names){
	console.log(names);
});