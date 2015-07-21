class Tweet
	def self.find(keyword)
		puts "Inside a class method: #{self}"
	end
end

Tweet.find "rubybits"