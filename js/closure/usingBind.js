console.log("Working example using inline function and implicit closure");
var usingInline = function(firstThree, fourth, type){
	var allFour = firstThree;
	allFour.push(fourth);
	var prefix = type; // defined in calling context
	allFour.forEach(function(element){
		console.log(prefix + ": " + element); // prefix available due to closure
	});
};

var oneTwoThreeInMaori = ["tahi", "rua", "toru"];
var fourInMaori = "wha";
usingInline(oneTwoThreeInMaori, fourInMaori, "Number");
console.log("\n\n\n\n");



console.log("Working example using wrapper to effect closure");
var usingWrapper = function(firstThree, fourth, type){
	var allFour = firstThree;
	allFour.push(fourth);
	var prefix = type;

	allFour.forEach(function(element){
		eachHandlerToUseWithWrapper(prefix, element);
	}); // bind prefix to function
};

var eachHandlerToUseWithWrapper = function(prefix, element){
	console.log(prefix + ": " + element);
};


var oneTwoThreeInMaori = ["tahi", "rua", "toru"];
var fourInMaori = "wha";
usingWrapper(oneTwoThreeInMaori, fourInMaori, "Number");
console.log("\n\n\n\n");


console.log("Working example using bind to implement closure explicitly");
var usingExtractedWithBind = function(firstThree, fourth, type){
	var allFour = firstThree;
	allFour.push(fourth);
	var prefix = type;

	allFour.forEach(eachHandlerToUseWithBind.bind(undefined, prefix)); // bind prefix to function
};

var eachHandlerToUseWithBind = function(prefix, element){ // prefix is the FIRST argument to the callback, then the normal args that forEach() passes
	console.log(prefix + ": " + element);
};


var oneTwoThreeInMaori = ["tahi", "rua", "toru"];
var fourInMaori = "wha";
usingExtractedWithBind(oneTwoThreeInMaori, fourInMaori, "Number");
console.log("\n\n\n\n");



console.log("Broken example");
var usingExtractedWithoutBind = function(firstThree, fourth, type){
	var allFour = firstThree;
	allFour.push(fourth);
	var prefix = type;

	allFour.forEach(eachHandler);
};

var eachHandler = function(element){
	console.log(prefix + ": " + element); // prefix is not defined in this context, so this will break
};

var oneTwoThreeInMaori = ["tahi", "rua", "toru"];
var fourInMaori = "wha";
usingExtractedWithoutBind(oneTwoThreeInMaori, fourInMaori, "Number");
console.log("\n\n\n\n");
