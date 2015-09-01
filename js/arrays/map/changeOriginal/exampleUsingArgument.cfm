<cfscript>
numbers = ["a","b","c","d","e"];
remappedNumbers = numbers.map(function(number,index,numbersAsArgument){
	var theseNumbers = duplicate(numbersAsArgument);
	numbersAsArgument.deleteAt(1);
	return theseNumbers;
});
remappedNumbers.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>