var TranslationProvider = function(config){

    TranslationProvider.prototype.register = function(app){
        app.service.translation = this.initialise(config, app.service.cache, app.repository.translation, app.service.request, app.factory.translation)
        return app;
    };

    TranslationProvider.prototype.initialise = function(config, cacheService, translationRepository, requestService, translationFactory){
        if (!requestService.isTranslatorEnabled()){
            return;
        }

        var locale = requestService.getLocale();
        var translations = getTranslations(cacheService, translationRepository, locale);
        var translationService = createTranslationService(translationFactory, translations, locale);

        return translationService;
    };

    var getTranslations = function(cacheService, translationRepository, locale){
        var cacheKeys = {
            primary : getCacheKey("primary", locale),
            secondary : getCacheKey("secondary", locale)
        };

        var okToGetFromCache = cacheService.isActive()
            && cacheService.exists(cacheKeys.primary)
            && cacheService.exists(cacheKeys.secondary);

        var translations;
        if (okToGetFromCache) {
            translations = {
                primary : cacheService.get(cacheKeys.primary),
                secondary:cacheService.get(cacheKeys.secondary)
            };
        }else{
            translations = loadTranslationsFromRepository(translationRepository, locale);
            cacheTranslations(config, cacheService, translations, cacheKeys);
        }

        return translations;
    };

    var loadTranslationsFromRepository = function(translationRepository, locale){
        var rawTranslations = {
            primary : translationRepository.loadBundle("primary", locale),
            secondary : translationRepository.loadBundle("secondary", locale)
        };

        var translations = {primary:{}, secondary:{}};

        for (var key in rawTranslations.primary){
            translations.primary = translations.primary || {};
            translations.primary[key] = rawTranslations.primary[key];
        }

        for (var key in rawTranslations.secondary){
            translations.secondary = translations.secondary || {};
            translations.secondary[key] = rawTranslations.secondary[key];
        }
        return translations;
    };

    var cacheTranslations = function(config, cacheService, translations, cacheKeys){
        var ttl = config.ttl;

        cacheService.put(cacheKeys.primary, translations.primary, ttl);
        cacheService.put(cacheKeys.secondary, translations.secondary, ttl);
    };

    var createTranslationService = function(translationFactory, translations, locale){
        var translationService = translationFactory.getTranslator();
        var arrayLoader = translationFactory.getArrayLoader();

        translationService.load(arrayLoader.load(translations.primary), 'primary', locale);
        translationService.load(arrayLoader.load(translations.secondary), 'secondary', locale);

        return translationService;
    };

    var getCacheKey = function(bundle, locale){
        return config.bundles[bundle].cacheKey + "_" + locale;
    }
};

module.exports = TranslationProvider;
