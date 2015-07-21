# PersonClass2.rb
class Person
	attr_accessor :firstName, :lastName, :dob
	
	def initialize (firstName, lastName, dob)
		@firstName, @lastname = firstName, lastName
		@dob = dob
	end
	
end

kid = Person.new "Zachary", "Cameron Lynch", Time.new(2011, 3, 24)

puts kid.dob