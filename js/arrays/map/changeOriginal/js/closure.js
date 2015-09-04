// closure.js

var numbers = ["a","b","c","d","e"];
var remappedNumbers = numbers.map(function(number,index){
	var localCopyOfTheseNumbers = numbers.slice();
	numbers.shift();
	return localCopyOfTheseNumbers;
});
remappedNumbers.forEach(function(series){
	console.log(series.join(" "));
});	