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

	def respond_to_missing?(method_name, x)
		method_name =~ /^hash_\w+/ || super
	end

end

tweet = Tweet.new("Hi Zachary")

myMethod = tweet.method(:hash_dude)
