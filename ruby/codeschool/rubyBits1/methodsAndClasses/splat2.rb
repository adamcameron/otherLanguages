# encoding: utf-8

def joinEm(firstOne, *middleOnes, lastOne)
	puts "First one: " + firstOne
	puts "Middle ones: " + middleOnes.join(" ")
	puts "Last one: " + lastOne
end

joinEm "tahi", "rua", "toru", "wha"
joinEm "whero", "karaka", "kowhai", "kakariki", "kikorangi", "tūāuri", "tawatawa"