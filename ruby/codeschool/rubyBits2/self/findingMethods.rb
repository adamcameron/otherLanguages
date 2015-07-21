class Tweet
	attr_accessor :status

	def initialize(status)
		@status = status
		set_up_some_things
	end

	def set_up_some_things
		# do stuff
	end
end

