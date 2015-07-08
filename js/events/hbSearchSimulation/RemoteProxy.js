HB.RemoteProxy = function(element, listeners){
	this.element = $(element);

	this.listeners = listeners;
	this.bindEventHandlers();
};

HB.RemoteProxy.prototype.bindEventHandlers = function(){
	this.element.on("fetchData", $.proxy(this.fetchDataHandler, this));
}

HB.RemoteProxy.prototype.fetchDataHandler = function(e){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"RemoteProxy.fetchDataHandler() called"});
	}
	if (typeof this.listeners.pagination != "undefined"){
		this.listeners.pagination.element.trigger("dataFetched", {data:"some data"});
	}
}