class Tweet
	def initialize(user)
		@user = user
		@tweet = []
		@annotations = {}
	end

	def submit_to_twitter
		tweet_text = @tweet.join(" ")
		if tweet_text.length <= 140
			puts "#{@user}: #{tweet_text}"
			puts @annotations.inspect unless @annotations.empty?
		else
			raise "Your tweet is too long"
		end
	end

	def method_missing(method, *args)
		@annotations[method] = *args.join(", ")
	end


	def mention(*users)
		users.each do |user|
			@tweet << "@#{user}"
		end
		self
	end

	def text(str)
		@tweet << str
		self
	end

	def hashtag(str)
		@tweet << "##{str}"
		self
	end

	def link(str)
		@tweet << str
		self
	end
end

def tweet_as(user, text=nil, &block)
	tweet = Tweet.new(user)
	tweet.text(text) if text
	tweet.instance_eval(&block) if block_given?
	tweet.submit_to_twitter
end

=begin
	
rescue Exception => e
	
end
tweet_as 'Zachary', "This is a simple tweet"

tweet_as 'Zachary' do
	mention('codeschool').text('I made a DSL').hashtag('hooray').hashtag('ruby').link('http://codeschool.com')
end

tweet_as 'Zachary' do
	mention "codeschool", "envylabs"
	text('I made a DSL').hashtag('hooray').hashtag('ruby').link('http://codeschool.com')
end
=end

tweet_as 'Zachary' do
	mention "codeschool", "envylabs"
	text("I am Dad's little boy, and I am an angel and the best boy in the world. Just ask Dad, he'll tell you")
	hashtag('hooray')
	hashtag('ruby')
	link('http://codeschool.com')
	long 28.415833
	lat -81.298889
	mood "smiley boy"
end

