var ArrayLoader = function(){

    var loadedTranslations = {};

    ArrayLoader.prototype.load = function(translationsToLoad) {
        loadedTranslations = translationsToLoad;
        return this;
    };

    ArrayLoader.prototype.get = function() {
        return loadedTranslations;
    };

};

module.exports = ArrayLoader;
