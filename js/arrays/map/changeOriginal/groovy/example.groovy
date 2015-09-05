// example.groovy

letters = ["a","b","c","d","e"];
remappedLetters = letters.collect([]){
	localCopyOfTheseLetters = letters
	letters.leftShift()
	return localCopyOfTheseLetters
}

remappedLetters.each() {
	println(it)
}
