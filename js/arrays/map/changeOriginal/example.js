var numbers = ["a","b","c","d","e"];
var remappedNumbers = numbers.map(function(number,index){
	var theseNumbers = numbers.slice();
	numbers.shift();
	return theseNumbers;
});
remappedNumbers.forEach(function(series){
	console.log(series.join(" "));
});	