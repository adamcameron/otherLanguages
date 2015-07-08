HB.Filters = function(element, listeners){
	this.element = $(element);

	this.listeners = listeners;

	this.bindEventHandlers();
};

HB.Filters.prototype.bindEventHandlers = function(){
	this.element.on("click", $.proxy(this.clickHandler, this));
}

HB.Filters.prototype.clickHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Filters.clickHandler() called"});
	}
	if (typeof this.listeners.pagination != "undefined"){
		this.listeners.pagination.element.trigger("resetPage");
	}
}