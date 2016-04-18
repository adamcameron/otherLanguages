var TranslationProvider = function(config){

    TranslationProvider.prototype.register = function(app){
        app.service.translation = this.initialise(config, app.service.cache, app.repository.translation, app.service.request, app.factory.translation)
        return app;
    };

    TranslationProvider.prototype.initialise = function(config, cacheService, translationRepository, requestService, translationFactory){
        if (!requestService.isTranslatorEnabled()){
            return;
        }

        var currentLocale = requestService.getLocale();

        var cacheKeyPrimary = getCacheKey("primary", currentLocale);
        var cacheKeySecondary = getCacheKey("secondary", currentLocale);

        var okToGetFromCache = cacheService.isActive()
            && cacheService.exists(cacheKeyPrimary)
            && cacheService.exists(cacheKeySecondary);

        var translations = {primary:{},secondary:{}};
        //var translations = {};
        if (okToGetFromCache) {
            translations.primary = cacheService.get(cacheKeyPrimary);
            translations.secondary = cacheService.get(cacheKeySecondary);
        }else{

            var rawTranslations = {
                primary : translationRepository.loadBundle("primary", currentLocale),
                secondary : translationRepository.loadBundle("secondary", currentLocale)
            };

            for (var key in rawTranslations.primary){
                translations.primary = translations.primary || {};
                translations.primary[key] = rawTranslations.primary[key];
            }

            for (var key in rawTranslations.secondary){
                translations.secondary = translations.secondary || {};
                translations.secondary[key] = rawTranslations.secondary[key];
            }

            var ttl = config.ttl;

            cacheService.put(cacheKeyPrimary, translations.primary, ttl);
            cacheService.put(cacheKeySecondary, translations.secondary, ttl);
        }

        var translationService = translationFactory.getTranslator();
        var arrayLoader = translationFactory.getArrayLoader();

        translationService.load(arrayLoader.load(translations.primary), 'primary', currentLocale);
        translationService.load(arrayLoader.load(translations.secondary), 'secondary', currentLocale);

        return translationService;
    };

    var getCacheKey = function(bundle, locale){
        return config.bundles[bundle].cacheKey + "_" + locale;
    }
};

module.exports = TranslationProvider;
