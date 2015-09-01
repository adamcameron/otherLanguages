<cfscript>
numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.map(function(number,index){
	var theseNumbers = duplicate(numbers);
	numbers.deleteAt(1);
	return theseNumbers;
});
remappedNumbers.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>