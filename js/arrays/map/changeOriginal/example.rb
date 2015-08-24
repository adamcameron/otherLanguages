numbers = ["a","b","c","d","e"]
remappedNumbers = numbers.map do |number|
	theseNumbers = numbers.clone
	numbers.shift
	theseNumbers
end

remappedNumbers.each do |series|
	puts series.join " "
end