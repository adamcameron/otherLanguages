# ifReturn.rb

def markExam score
	result = if score >= 50
		:Pass
	else
		:Fail
	end
end

puts markExam(49).to_s