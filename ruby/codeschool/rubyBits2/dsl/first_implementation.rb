class Tweet
	def initialize(user)
		@user = user
		@tweet = []
	end

	def submit_to_twitter
		tweet_text = @tweet.join(" ")
		puts "#{@user}: #{tweet_text}"
	end

	def mention(str)
		@tweet << str
		self
	end

	def text(str)
		@tweet << str
		self
	end

	def hashtag(str)
		@tweet << "#" + str
		self
	end

	def link(str)
		@tweet << str
		self
	end
end

tweet = Tweet.new("Zachary")

def tweet_as(user, &block)
	tweet = Tweet.new(user)
	tweet.instance_eval(&block)
	tweet.submit_to_twitter
end


tweet_as 'Zachary' do
	mention('codeschool').text('I made a DSL').hashtag('hooray').hashtag('ruby').link('http://codeschool.com')
end
