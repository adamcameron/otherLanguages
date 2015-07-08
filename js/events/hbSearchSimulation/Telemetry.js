HB.Telemetry = function(element){
	this.element = $(element);
	this.bindEventHandlers();
};
HB.Telemetry.prototype.bindEventHandlers = function(){
	this.element.on("sendTelemetry", $.proxy(this.sendTelemetryHandler, this));
}

HB.Telemetry.prototype.sendTelemetryHandler = function(e, eventData){
	this.element.append("\r\n" + eventData.message);
}