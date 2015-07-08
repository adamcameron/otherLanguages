pavel.Action = function(container){
	console.log("pavel.Action class declared");
	this.container = $(container);

	pavel.Action.bindEvents(this.container);
}

pavel.Action.bindEvents = function(container){
	var button = $("button", container);
	button.on("click", pavel.Action.buttonClickHandler);
}

pavel.Action.buttonClickHandler = function(e){
	console.log("buttonClickHandler() called");
	console.log("needResult event triggered");
	window.trigger("needResult");
}