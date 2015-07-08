Result = function(element){
	this.element = $(element);

	this.bindEvents();
};

Result.prototype.bindEvents = function(){
	this.element.on("jobComplete", $.proxy(this.workTracker(), this));
	this.element.on("allWorkComplete", $.proxy(this.allWorkCompleteHandler, this));
};

Result.prototype.workTracker = function(){
	var completionCount = 0;
	return function(){
		completionCount++;
		if (completionCount >= 3){
			return this.element.trigger("allWorkComplete");
		}
		this.element.html("Jobs completed: " + completionCount);
	}
};

Result.prototype.allWorkCompleteHandler = function(){
	this.element.html("All work completed");
};
