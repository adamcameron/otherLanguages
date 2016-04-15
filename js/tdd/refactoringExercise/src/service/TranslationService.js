var TranslationService = function(config, cacheService, translationRepository, requestService){
	var config = config;
	var cacheService = cacheService;
	var translationRepository = translationRepository;
	var requestService = requestService;

	var translations = {};

	TranslationService.prototype.initialise = function(){
		if (!requestService.isTranslatorEnabled()){
			return;
		}

		var currentLocale = requestService.getLocale();

		var cacheKeyPrimary = getCacheKey("primary", currentLocale);
		var cacheKeySecondary = getCacheKey("secondary", currentLocale);

		var okToGetFromCache = cacheService.isActive()
			&& cacheService.exists(cacheKeyPrimary)
			&& cacheService.exists(cacheKeySecondary);

		if (okToGetFromCache) {
			translations.primary = cacheService.get(cacheKeyPrimary);
			translations.secondary = cacheService.get(cacheKeySecondary);
		}else{

			var rawTranslations = {
				primary : translationRepository.loadBundle("primary", currentLocale),
				secondary : translationRepository.loadBundle("secondary", currentLocale)
			};
			translations.primary = {};
			for (var key in rawTranslations.primary){
				translations.primary = translations.primary || {};
				translations.primary[key] = rawTranslations.primary[key];
			}

			translations.secondary = {};
			for (var key in rawTranslations.secondary){
				translations.secondary = translations.secondary || {};
				translations.secondary[key] = rawTranslations.secondary[key];
			}

			var ttl = config.ttl;

			cacheService.put(cacheKeyPrimary, translations.primary, ttl);
			cacheService.put(cacheKeySecondary, translations.secondary, ttl);
		}
	};

	TranslationService.prototype.translate = function(key){
		for (var bundle in translations){
			if (translations[bundle].hasOwnProperty(key)){
				return translations[bundle][key];
			}
		}
		return key.toUpperCase();
	};

	var getCacheKey = function(bundle, locale){
		return config.bundles[bundle].cacheKey + "_" + locale;
	}
};

module.exports = TranslationService;
