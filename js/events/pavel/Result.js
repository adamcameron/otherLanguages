pavel.Result = function(container){
	console.log("pavel.Result class declared");
	this.container = $(container);

	this.bindEvents();
}

pavel.Result.prototype.bindEvents = function(){
	this.container.on("needResult", $.proxy(this.needResultHandler, this));
	console.log("listening for needResult event");
}

pavel.Result.prototype.needResultHandler = function(e){
	console.log("needResultHandler() called");
	this.container.html("Result!");
};
