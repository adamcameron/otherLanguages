me.adamcameron.refactoring.App = function(){
	require("./Config.js");
	require("../provider/RepositoryProvider.js");
	require("../provider/ServiceProvider.js");

	var config = new me.adamcameron.refactoring.Config();
	var repositoryProvider = new me.adamcameron.refactoring.provider.RepositoryProvider();
	var serviceProvider = new me.adamcameron.refactoring.provider.ServiceProvider(config);

	repositoryProvider.register(this);
	serviceProvider.register(this);
	return this;
};
