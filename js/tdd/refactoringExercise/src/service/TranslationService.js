var TranslationService = function(config, cacheService, translationRepository){
	var config = config;
	var cacheService = cacheService;
	var translationRepository = translationRepository;

	var translations = {};

	var TranslationService = function(){};
	TranslationService.prototype.initialise = function(){
		if (!config.enabled){
			return;
		}

		var cacheKeyPrimary = config.bundles["primary"].cacheKey;
		var cacheKeySecondary = config.bundles["secondary"].cacheKey;

		var okToGetFromCache = cacheService.isActive()
			&& cacheService.exists(cacheKeyPrimary)
			&& cacheService.exists(cacheKeySecondary);

		if (okToGetFromCache) {
			translations.primary = cacheService.get(cacheKeyPrimary);
			translations.secondary = cacheService.get(cacheKeySecondary);
		}else{
			var rawTranslations = {
				primary : translationRepository.loadBundle("primary"),
				secondary : translationRepository.loadBundle("secondary")
			};

			for (var translationKey in rawTranslations.primary){
				translations.primary = translations.primary || {};
				translations.primary[key] = rawTranslations.primary[key];
			}

			for (var translationKey in rawTranslations.secondary){
				translations.secondary = translations.secondary || {};
				translations.secondary[key] = rawTranslations.secondary[key];
			}
console.dir(translations);
			cacheService.put(cacheKeyPrimary, translations.primary);
			cacheService.put(cacheKeySecondary, translations.secondary);
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

	var translationService = new TranslationService();
	translationService.initialise();
	return translationService;
};

module.exports = TranslationService;
