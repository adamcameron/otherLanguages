me.adamcameron.refactoring.provider = me.adamcameron.refactoring.provider || {};

me.adamcameron.refactoring.provider.RepositoryProvider = function(){};

me.adamcameron.refactoring.provider.RepositoryProvider.prototype.register = function(app){
	require("../repository/TranslationRepository.js");

	app.repository = {
		translation : new me.adamcameron.refactoring.repository.TranslationRepository(["primary", "secondary"])
	};

	return app;
};
