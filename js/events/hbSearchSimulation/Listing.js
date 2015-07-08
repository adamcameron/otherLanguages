HB.Listing = function(element, listeners){
	this.element = $(element);

	this.listeners = listeners;
	this.bindEventHandlers();
};

HB.Listing.prototype.bindEventHandlers = function(){
	this.element.on("renderPage", $.proxy(this.renderPageHandler, this));
}

HB.Listing.prototype.renderPageHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Listing.renderPageHandler() called"});
	}
}
