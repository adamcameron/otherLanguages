numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.collect([]){
	theseNumbers = numbers
	numbers.leftShift()
	return theseNumbers
}

remappedNumbers.each() {
	println(it)
}
