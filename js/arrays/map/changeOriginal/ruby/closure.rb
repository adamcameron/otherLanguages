# closure.rb

numbers = ["a","b","c","d","e"]
remappedNumbers = numbers.map do |number|
	localCopyOfTheseNumbers = numbers.clone
	numbers.shift
	localCopyOfTheseNumbers
end

remappedNumbers.each do |series|
	puts series.join " "
end