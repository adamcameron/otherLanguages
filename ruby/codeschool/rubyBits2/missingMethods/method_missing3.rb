class Tweet
	def initialize(text)
		@text = text
	end

	def to_s
		@text
	end

	def method_missing(method_name, *args)
		match = method_name.to_s.match(/^hash_(\w+)/)
		if match
			@text << " #" + match[1]
		else
			super
		end
	end
end

tweet = Tweet.new("Hi Zachary")
tweet.hash_gorgeous
tweet.hash_boy

puts tweet.to_s