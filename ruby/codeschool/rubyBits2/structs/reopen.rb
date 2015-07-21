class Timeline
	def initialize(tweets=[])
		@tweets  = tweets
	end

	attr_reader :tweets
	alias_method :contents, :tweets

	def print
		puts tweets.join("\n")
	end

end

class Timeline
	alias_method	:old_print, :print

	def print
		authenticate!
		old_print
	end

	def authenticate!
		puts "authenticate was called"
	end
end


timeline = Timeline.new(["tahi", "rua", "toru", "wha"])

timeline.print
