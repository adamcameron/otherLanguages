var App = function(){
	var Config = require("./Config.js");
	var RepositoryProvider = require("../provider/RepositoryProvider.js");
	var ServiceProvider = require("../provider/ServiceProvider.js");

	var config = new Config();
	var repositoryProvider = new RepositoryProvider();
	var serviceProvider = new ServiceProvider(config);

	repositoryProvider.register(this);
	serviceProvider.register(this);
	return this;
};

module.exports = App;