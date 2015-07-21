class Tweet

	DELEGATED_METHODS = [:username, :avatar]


	def initialize(user)
		@user = user
	end

	def method_missing(method_name, *args)
		if DELEGATED_METHODS.include?(method_name)
			@user.send(method_name, *args)
		else
			puts "you tried to call #{self}.#{method_name} with these args: #{args}"
			super
		end
	end
end

class User
	def method_missing missing, *args
		puts "you tried to call #{self}.#{missing} with these args: #{args}"
		#super
	end
end

zachary = User.new
tweet = Tweet.new(zachary)

tweet.username "ZDACL"
tweet.avatar "Zachary"
tweet.send "now!"
