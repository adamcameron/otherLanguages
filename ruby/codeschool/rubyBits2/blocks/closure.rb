def tweet_as(user)
	lambda {|tweet| puts "#{user}: #{tweet}"}
end

zachary_tweet = tweet_as("Zachary")

zachary_tweet.call("Hi! :-)")

