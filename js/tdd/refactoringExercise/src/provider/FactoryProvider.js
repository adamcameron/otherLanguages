var FactoryProvider = function(){};

FactoryProvider.prototype.register = function(app){
    var TranslationFactory = require("../factory/TranslationFactory.js");

    app.factory = {
        translation : new TranslationFactory()
    };

    return app;
};

module.exports = FactoryProvider;
