<cfscript>
// closure.cfm

letters = ["a","b","c","d","e"];
remappedLetters = letters.map(function(number,index){
	var localCopyOfTheseLetters = duplicate(letters);
	letters.deleteAt(1);
	return localCopyOfTheseLetters;
});
remappedLetters.each(function(series){
	writeOutput(series.toList(" ") & "<br>");
});	
</cfscript>