var App = function(){
	var Session = require("./Session.js");
	var Request = require("./Request.js");

	this.session = new Session();
	this.request = new Request();

	var Config = require("./Config.js");
	var RepositoryProvider = require("../provider/RepositoryProvider.js");
	var ServiceProvider = require("../provider/ServiceProvider.js");
	var FactoryProvider = require("../provider/FactoryProvider.js");
	var TranslationProvider = require("../provider/TranslationProvider.js");

	var config = new Config();
	var repositoryProvider = new RepositoryProvider();
	var serviceProvider = new ServiceProvider(config);
	var factoryProvider = new FactoryProvider();
	var translationProvider = new TranslationProvider(config.translation);

	repositoryProvider.register(this);
	serviceProvider.register(this);
	factoryProvider.register(this);
	translationProvider.register(this);
	return this;
};

module.exports = App;