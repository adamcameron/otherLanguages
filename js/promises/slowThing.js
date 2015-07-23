slowThing = function(label){
	console.log(label);
	console.log("Beginning of slowThing(\"" + label + "\") process");
	startTime=new Date();
	var words = ulyssesExtract.replace(/(\b\w+\b)(?=.*\1)/gi, "").replace(/\s+/g," ");
	endTime = new Date();
	elapsed = endTime - startTime;
	console.log("After slowThing(\"" + label + "\") process (" + elapsed + "ms)\n\n\n");
};