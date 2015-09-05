<cfscript>
// argument.cfm

letters = ["a","b","c","d","e"];
remappedLetters = letters.map(function(number,index,lettersAsArgument){
	var localCopyOfTheseLetters = duplicate(lettersAsArgument);
	lettersAsArgument.deleteAt(1);
	return localCopyOfTheseLetters;
});
remappedLetters.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>