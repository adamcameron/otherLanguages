class Tweet

    attr_accessor	:status

    states = [:draft, :posted, :deleted]
	states.each do |status|
        define_method status do
		    @status = status.to_s +  status.to_s
        end
	end

    private
    def secret
        "this is my secret stuff"
    end

end

tweet = Tweet.new

tweet.draft
puts tweet.status

tweet.posted
puts tweet.send("status")

tweet.deleted
puts tweet.send(:status)

puts tweet.send(:secret)