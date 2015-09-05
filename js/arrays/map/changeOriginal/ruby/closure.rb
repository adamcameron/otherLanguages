# closure.rb

letters = ["a","b","c","d","e"]
remappedLetters = letters.map do |number|
	localCopyOfTheseLetters = letters.clone
	letters.shift
	localCopyOfTheseLetters
end

remappedLetters.each do |series|
	puts series.join " "
end