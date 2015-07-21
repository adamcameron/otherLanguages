require "active_support/concern.rb" 

module Utils

	extend ActiveSupport::Concern

	included do
		puts "Kia ora"
	end

end

class SomeClass
	include Utils
end