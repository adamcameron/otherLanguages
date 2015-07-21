# encoding: utf-8
require "active_support/concern.rb" 

module MaoriWordsUtils

	extend ActiveSupport::Concern

	module ClassMethods
		def getNumbers
			["tahi", "rua", "toru", "wha"]
		end
	end
	
	def getColour index
		["whero", "karaka", "kowhai", "kakariki", "kikorangi", "tūāuri", "tawatawa"][index]
	end

end

class MaoriWords
	include MaoriWordsUtils
end


puts MaoriWords.getNumbers
puts "\n"
maoriWords = MaoriWords.new
puts maoriWords.getColour 2

