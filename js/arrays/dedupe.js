// dedupe.js

abbccc = ["a", "b", "b", "c", "c", "c"];
abc = Object.keys(abbccc.reduce(function(obj, key){
	obj[key]=true;
	return obj;
},{}));

console.log(abc);