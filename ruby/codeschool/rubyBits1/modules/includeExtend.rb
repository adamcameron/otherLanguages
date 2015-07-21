# encoding: utf-8

module MaoriWordsUtils

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
	extend	MaoriWordsUtils::ClassMethods
end


puts MaoriWords.getNumbers
puts "\n"
maoriWords = MaoriWords.new
puts maoriWords.getColour 2