class Timeline
	def initialize(tweets=[])
		@tweets  = tweets
	end

	attr_reader: tweets

	def print
		puts tweets.join("\n")
	end

end

class AuthenticatedTimeline < Timeline

	def print
		authenticate!
		super
	end

	def authenticate!
		puts "authenticate was called"
	end
end


timeline = Timeline.new(["tahi", "rua", "toru", "wha"])

timeline.print
