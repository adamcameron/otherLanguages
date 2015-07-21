# private.rb

class Accessibility

	def myPublicMethod
	end
	
	private
	def myFirstPrivateMethod
	end
	
	def myOtherPrivateMethod
	end

end


test = Accessibility.new

test.myPublicMethod
test.myOtherPrivateMethod