class Timeline
	def initialize(tweets=[])
		@tweets  = tweets
	end

	attr_reader :tweets

	alias_method :contents, :tweets

end

timeline = Timeline.new(["tahi", "rua", "toru", "wha"])

puts timeline.contents.to_s