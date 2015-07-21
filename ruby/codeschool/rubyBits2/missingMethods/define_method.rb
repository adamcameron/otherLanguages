class Tweet
    def initialize(text)
		@text = text
	end

	def to_s
		@text
	end

	def method_missing(method_name, *args)
		puts "In method_missing() for #{method_name}"
		match = method_name.to_s.match(/^hash_(\w+)/)
		if match
			puts "Matched hash method for #{method_name}"
			self.class.class_eval do 
				define_method(method_name) do
					@text << " #" + match[1]
				end
			end
			puts "Hash method created for #{method_name}"
			send(method_name)
			puts "Hash method called for #{method_name}"
		else
			super
		end
	end

	def respond_to_missing?(method_name, include_all=false)
		method_name =~ /^hash_\w+/ || super
	end

end

tweet = Tweet.new("Hi Zachary")
tweet.hash_gorgeous
tweet.hash_gorgeous
tweet.hash_dude

puts tweet