// closure.js

var letters = ["a","b","c","d","e"];
var remappedLetters = letters.map(function(number,index){
	var localCopyOfTheseLetters = letters.slice();
	letters.shift();
	return localCopyOfTheseLetters;
});
remappedLetters.forEach(function(series){
	console.log(series.join(" "));
});	