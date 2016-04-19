var TranslationFactory = function(){

    TranslationFactory.prototype.getTranslator = function() {
        var Translator = require("../../vendor/translation/Translator.js");
        return new Translator();
    };

    TranslationFactory.prototype.getArrayLoader = function() {
        var ArrayLoader = require("../../vendor/translation/loader/ArrayLoader.js");
        return new ArrayLoader();
    };

};

module.exports = TranslationFactory;
