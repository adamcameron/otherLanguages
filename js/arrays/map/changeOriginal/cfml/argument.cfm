<cfscript>
// argument.cfm

numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.map(function(number,index,numbersAsArgument){
	var localCopyOfTheseNumbers = duplicate(numbersAsArgument);
	numbersAsArgument.deleteAt(1);
	return localCopyOfTheseNumbers;
});
remappedNumbers.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>