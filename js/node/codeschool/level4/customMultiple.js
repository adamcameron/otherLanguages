// customMultiple.js
var foo = function(){
	console.log("foo()!");
};
var bar = function(){
	console.log("bar()!");
};

// remains private
var baz = function(){
	console.log("baz()!");
};

exports.foo = foo;
exports.bar = bar;