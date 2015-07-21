module MaoriWordsUtils

	def getNumbers
		["tahi", "rua", "toru", "wha"]
	end

end

class MaoriWords


end

maoriWords1 = MaoriWords.new
maoriWords2 = MaoriWords.new

maoriWords1.extend MaoriWordsUtils

puts maoriWords1.getNumbers
puts maoriWords2.getNumbers