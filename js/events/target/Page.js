Page = function(page){
	this.page = page;
};

Page.bindHandlers = function(page){
	$("#noProxy").on("click", page.clickHandlerWithoutProxy);
	$("#proxyRef").on("click", page.clickHandlerWithProxyRef());
	$("#jqueryProxy").on("click", $.proxy(page.clickHandlerUsingJQueryProxy, page));
	$("#usingBind").on("click", page.clickHandlerUsingBind.bind(page));
};

Page.prototype.clickHandlerWithoutProxy = function(e){
	console.log("'e.target' refers to the button that triggered the event: " + $(e.target).text());
	console.log("'this' also refers to the button that triggered the event: " + $(this).text());
	console.log("Cannot reference 'this' from the Page object");
};

Page.prototype.clickHandlerWithProxyRef = function(){
	var self = this;
	return function(e){
		console.log("'this' refers to the button that triggered the event: " + $(this).text());
		console.log("'self' still refers to the Page object: " + self.page);
	}
};

Page.prototype.clickHandlerUsingJQueryProxy = function(e){
	console.log("'e' refers to the button that triggered the event: " + $(e.target).text());
	console.log("'this' still refers to the Page object: " + this.page);
};

Page.prototype.clickHandlerUsingBind = function(e){
	console.log("'e' refers to the button that triggered the event: " + $(e.target).text());
	console.log("'this' still refers to the Page object: " + this.page);
};