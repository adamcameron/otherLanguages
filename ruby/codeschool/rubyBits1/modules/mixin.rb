module MaoriWordsUtils

	def getNumbers
		["tahi", "rua", "toru", "wha"]
	end

end

class MaoriWords

	include MaoriWordsUtils

end

words = MaoriWords.new

puts words.getNumbers