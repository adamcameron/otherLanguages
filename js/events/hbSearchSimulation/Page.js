HB.Page = function(element, listeners){
	this.element = $(element);
	this.listeners = listeners;
	this.currentPage = 1;
	this.pageSize = 20;

	this.bindEventHandlers();
};

HB.Page.prototype.bindEventHandlers = function(){
	this.element.on("click", $.proxy(this.clickHandler, this));
	this.element.on("activateControls", $.proxy(this.activateControlsHandler, this));
}

HB.Page.prototype.clickHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Page.clickHandler() called"});
	}
	if (typeof this.listeners.pagination != "undefined"){
		this.listeners.pagination.element.trigger("loadDefaults");
	}
	if (typeof this.listeners.remoteProxy != "undefined"){
		this.listeners.remoteProxy.element.trigger("fetchData");
	}
}

HB.Page.prototype.activateControlsHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Page.activateControlsHandler() called"});
	}
	this.element.off("activateControls");
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Page.activateControls handler detached"});
	}
}
