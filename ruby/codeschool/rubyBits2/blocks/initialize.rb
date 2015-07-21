class Tweet
	def initialize
		yielf self if block_given?
	end
end


tweet = Tweet.new do |tweet|
	tweet.status = "Set in initialize"
	tweet.created_at = Time.now
end

puts tweet.status
puts tweet.created_at