class Tweet
	attr_accessor :user, :status

	def initialize(user, status)
		@user, @status = user,status
	end
end

tweet = Tweet.new("Zachary", "hi!")
tweet.user
tweet.status