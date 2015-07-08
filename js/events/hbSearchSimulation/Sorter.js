HB.Sorter = function(element, listeners){
	this.element = $(element);

	this.listeners = listeners;

	this.bindEventHandlers();
};

HB.Sorter.prototype.bindEventHandlers = function(){
	this.element.on("click", $.proxy(this.clickHandler, this));
}

HB.Sorter.prototype.clickHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Sorter.clickHandler() called"});
	}
	if (typeof this.listeners.pagination != "undefined"){
		this.listeners.pagination.element.trigger("resetPage");
	}
}