var RepositoryProvider = function(){};

RepositoryProvider.prototype.register = function(app){
	var TranslationRepository = require("../repository/TranslationRepository.js");

	app.repository = {
		translation : new TranslationRepository(["primary", "secondary"])
	};

	return app;
};

module.exports = RepositoryProvider;
