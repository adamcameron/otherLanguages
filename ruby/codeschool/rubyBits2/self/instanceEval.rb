class Tweet
	attr_accessor :user, :status
end

tweet = Tweet.new
tweet.status ="draft"
puts tweet.status

tweet.instance_eval do
	self.status = "Changing the tweet's status"
end

puts tweet.status