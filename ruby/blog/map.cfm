<cfscript>
peopleData = {
	2 = {"firstName" = "Jane", "lastName" = "Campion"},
	4 = {"firstName" = "Lee", "lastName" = "Tamahori"},
	6 = {"firstName" = "Taika", "lastName" = "Waititi"}
};

people = peopleData.map(function(id, names){
	return new Person(id, names.firstName, names.lastName);
});

writeDump(var=people,foramt="text");
</cfscript>