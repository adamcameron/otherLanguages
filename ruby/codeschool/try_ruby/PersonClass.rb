# PersonClass.rb
class Person
	attr_accessor :firstName, :lastName, :dob
end

kid = Person.new

kid.firstName = "Zachary"
kid.lastName = "Cameron Lynch"
kid.dob = Time.new(2011, 3, 24)

puts kid.dob