class Tweet
	def initialize(status)
		puts "Inside a method: #{self}"
		@status = status
	end
end

Tweet.new("What is self, anyway?")