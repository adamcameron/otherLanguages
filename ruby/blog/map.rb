class Person

	def initialize(id, firstName, lastName)
		@id = id
		@firstName = firstName
		@lastName = lastName
	end
end

peopleData = {
	2 => {"firstName" => "Jane", "lastName" => "Campion"},
	4 => {"firstName" => "Lee", "lastName" => "Tamahori"},
	6 => {"firstName" => "Taika", "lastName" => "Waititi"}
}

people = peopleData.merge(peopleData) do |id, names|
	Person.new(id, names["firstName"], names["lastName"])
end	

puts "\n\n\n"
puts people
puts "\n\n\n"
puts peopleData
puts "\n\n\n"
