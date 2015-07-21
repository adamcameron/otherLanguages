# exception.rb

class SomeException < StandardError
end

begin
	raise SomeException.new
rescue SomeException => e
	puts e
end