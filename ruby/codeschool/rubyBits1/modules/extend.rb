module MaoriWordsUtils

	def getNumbers
		["tahi", "rua", "toru", "wha"]
	end

end

class MaoriWords

	extend MaoriWordsUtils

end

puts MaoriWords.getNumbers