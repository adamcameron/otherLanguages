// example.groovy

numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.collect([]){
	localCopyOfTheseNumbers = numbers
	numbers.leftShift()
	return localCopyOfTheseNumbers
}

remappedNumbers.each() {
	println(it)
}
