var ServiceProvider = function(config){

	ServiceProvider.prototype.register = function(app){
		var CacheService = require("../service/CacheService.js");
		var RequestService = require("../service/RequestService.js");

		app.service = {
			cache :	 new CacheService(config.cache),
			request : new RequestService(app)
		};
		return app;
	};
};

module.exports = ServiceProvider;
