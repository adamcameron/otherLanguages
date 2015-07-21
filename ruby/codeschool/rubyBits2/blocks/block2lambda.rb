class Tweet
    def post(success,failure)
		if authenticate?
			success.call
		else
			failure.call
		end
	end
	
	def authenticate?
		false
	end
end


tweet = Tweet.new
good = lambda {puts "success!"}
bad = lambda {puts "failed!"}

tweet.post(good,bad)