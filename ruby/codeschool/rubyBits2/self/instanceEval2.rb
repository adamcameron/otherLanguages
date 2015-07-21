class Tweet
	attr_accessor	:user, :status

	def initialize(&block)
		instance_eval(&block) if block_given?
	end
end

tweet = Tweet.new do
	self.status = "I was set in the initalise block"
	self.user = "Zachary" 
end

puts tweet.status
puts tweet.user

