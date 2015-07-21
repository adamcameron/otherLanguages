class Tweet
    def say_hi who
		puts "hi #{who}"
		yield
	end
end


class MethodLogger
	def log_method klass, method_name
		klass.class_eval do
			alias_method "#{method_name}_original", method_name
			define_method method_name do |*args, &block|
				puts "#{Time.now}: Called #{method_name}"
				send "#{method_name}_original", *args, &block
			end
		end
	end
end


logger = MethodLogger.new
logger.log_method(Tweet, :say_hi)

Tweet.new.say_hi("Zachary") {puts "boo"}