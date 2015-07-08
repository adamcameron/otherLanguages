Worker = function(element, result){
	this.element = $(element);
	this.result = result;

	this.bindEvents(element);
}

Worker.prototype.bindEvents = function(){
	this.element.on("click", $.proxy(this.buttonClickHandler, this));
}

Worker.prototype.buttonClickHandler = function(e){
	this.result.trigger("jobComplete");
}