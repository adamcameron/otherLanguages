HB.Pagination = function(elements, listeners){
	this.paginationControls = $(elements.pagination);
	this.pageSizeControls = $(elements.pageSize);

	this.element = this.paginationControls;

	this.listeners = listeners;
	this.bindEventHandlers();
};

HB.Pagination.prototype.bindEventHandlers = function(){
	this.element.on("loadDefaults", $.proxy(this.loadDefaultsHandler, this));

	var compoundHandler = this.compoundEventListener(["dataFetched", "defaultSettingsLoaded"]);
	this.element.on("dataFetched", $.proxy(compoundHandler, this));
	this.element.on("defaultSettingsLoaded", $.proxy(compoundHandler, this));

	this.element.on("dataAndSettingsReady", $.proxy(this.resetPageHandler, this));
	this.element.on("resetPage", $.proxy(this.resetPageHandler, this));
	this.element.on("renderPagination", $.proxy(this.renderPaginationHandler, this));

	this.pageSizeControls.on("click", $.proxy(this.pageSizeControlsClickHandler, this));
	this.element.on("setPage", $.proxy(this.setPageHandler, this));

	this.paginationControls.on("click", $.proxy(this.paginationControlsClickHandler, this));
}

HB.Pagination.prototype.loadDefaultsHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.loadDefaults() called"});
	}
	this.element.trigger("defaultSettingsLoaded", {settings:"some settings"});
}

HB.Pagination.prototype.compoundEventListener = function(events){
	var allEvents = events.reduce(function(events,event){
		events[event] = {
			data: null,
			status: false
		};
		return events;
	}, {});
	return function(e, eventData){
		if (typeof this.listeners.telemetry != "undefined"){
			this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination: "+ e.type + " completed"});
		}
		allEvents[e.type].status = true;
		allEvents[e.type].eventData = eventData;
		for (event in allEvents){
			if (!allEvents[event].status){
				return;
			}
		}
		this.element.trigger("dataAndSettingsReady", allEvents);
	}
};

HB.Pagination.prototype.resetPageHandler = function(e, eventData){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.resetPageHandler() called"});
	}
	if (typeof this.listeners.page != "undefined"){
		this.listeners.page.element.trigger("activateControls");
	}
	this.element.trigger("setPage", {page:1});
}

HB.Pagination.prototype.setListener = function(name, listener){
	this.listeners[name] = listener;
}

HB.Pagination.prototype.renderPaginationHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.renderPaginationHandler() called"});
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"==========================================="});
	}
}

HB.Pagination.prototype.pageSizeControlsClickHandler = function(){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.pageSizeControlsClickHandler() called"});
	}
	this.element.trigger("resetPage");
}

HB.Pagination.prototype.setPageHandler = function(e, eventData){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.setPageHandler() called with [" + eventData.page + "]"});
	}
	if (typeof this.listeners.listing != "undefined"){
		this.listeners.listing.element.trigger("renderPage");
	}
	this.element.trigger("renderPagination");
}

HB.Pagination.prototype.paginationControlsClickHandler = function(e, eventData){
	if (typeof this.listeners.telemetry != "undefined"){
		this.listeners.telemetry.element.trigger("sendTelemetry", {message:"Pagination.paginationControlsClickHandler() called"});
	}
	this.element.trigger("setPage", {page:"some different page"});
}
