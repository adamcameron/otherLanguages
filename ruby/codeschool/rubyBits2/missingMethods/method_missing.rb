class Tweet

	def method_missing missing, *args
		puts "you tried to call #{missing} with these args: #{args}"
		super
	end
end

tweet = Tweet.new

tweet.foo "bar", "moo"