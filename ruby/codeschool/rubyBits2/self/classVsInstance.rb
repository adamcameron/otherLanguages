puts "================================================================"
40.times {|x| puts ""}



class Number

	attr_accessor	:name

	def get_name
		name
	end

	def self.get_name
		"null"
	end	

end

number = Number.new
number.name = "tahi"
puts number.get_name
puts Number.get_name