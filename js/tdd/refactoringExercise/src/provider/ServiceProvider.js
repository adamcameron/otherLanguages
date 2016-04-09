me.adamcameron.refactoring.provider = me.adamcameron.refactoring.provider || {};

me.adamcameron.refactoring.provider.ServiceProvider = function(config){
	this.config = config;
};

me.adamcameron.refactoring.provider.ServiceProvider.prototype.register = function(app){
	require("../service/CacheService.js");
	require("../service/TranslationService.js");

	app.service = {};
	app.service.cache = new me.adamcameron.refactoring.service.CacheService(this.config.cache);
	app.service.translation = new me.adamcameron.refactoring.service.TranslationService(
		this.config.translation,
		app.service.cache,
		app.repository.translation
	);

	return app;
};
