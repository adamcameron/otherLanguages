<cfscript>
// closure.cfm

numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.map(function(number,index){
	var localCopyOfTheseNumbers = duplicate(numbers);
	numbers.deleteAt(1);
	return localCopyOfTheseNumbers;
});
remappedNumbers.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>