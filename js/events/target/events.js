Page = function(page){
	this.page = page;
};

Page.bindHandlers = function(page){
	$("#btn1").on("click", $.proxy(page.clickHandlerUsingProxy, page));
	$("#btn2").on("click", page.clickHandlerWithoutProxy);
};

Page.prototype.clickHandlerUsingProxy = function(e){
	console.log("'e' refers to the object triggering the event: " + $(e.target).text());
	console.log("'this' still refers to the object: " + this.page);
};
Page.prototype.clickHandlerWithoutProxy = function(e){
	console.log("'e' refers to the object triggering the event: " + $(e.target).text());
	console.log("'this' also refers to the object triggering the event: " + $(this).text());
};

$(document).ready(function(){
	page = new Page("Home page");
	
	Page.bindHandlers(page);
});