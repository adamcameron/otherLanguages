var ServiceProvider = function(config){
	this.config = config;
};

ServiceProvider.prototype.register = function(app){
	var CacheService = require("../service/CacheService.js");
	var TranslationService = require("../service/TranslationService.js");

	app.service = {};
	app.service.cache = new CacheService(this.config.cache);
	app.service.translation = new TranslationService(
		this.config.translation,
		app.service.cache,
		app.repository.translation
	);

	return app;
};

module.exports = ServiceProvider;
