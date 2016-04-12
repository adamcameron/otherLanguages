var translationServiceTests = function(){
    var dependencies = getTestDependencies();
    var translationService = getTestTranslatorService(dependencies);

    it("sets the primary translations", function(){
        //expect(dependencies.cacheService.put).toHaveBeenCalledWith(["MOCKED_TRANSLATIONS_PRIMARY", {}]);
        expect(dependencies.cacheService.put.calls.argsFor(0)).toBe(["MOCKED_TRANSLATIONS_PRIMARY", {}]);
        expect(dependencies.cacheService.put.calls.argsFor(1)).toBe(["MOCKED_TRANSLATIONS_SECONDARY", {}]);
    });
};

var getTestTranslatorService = function(dependencies){
    var TranslationService = require("../../src/service/TranslationService.js");
    var translationService = new TranslationService(
        dependencies.config.translation,
        dependencies.cacheService,
        dependencies.translationRepository
    );
    beforeEach(function(){
        spyOn(dependencies.cacheService, "put");
    });
    return translationService;
};

var getTestDependencies = function(){
    var mockedConfig = getMockedConfig();
    var mockedCacheService = getMockedCacheService();
    var mockedTranslationRepository = getMockedTranslationRepository();

    return {
        config : mockedConfig,
        cacheService : mockedCacheService,
        translationRepository : mockedTranslationRepository
    };
};

var getMockedConfig = function(){
    var mockedConfig = {
        cache : {
            active : true
        },
        translation : {
            bundles : {
                primary : {cacheKey : "MOCKED_TRANSLATIONS_PRIMARY"},
                secondary : {cacheKey : "MOCKED_TRANSLATIONS_SECONDARY"}
            },
            enabled : true
        }
    };

    return mockedConfig;
};

var getMockedCacheService = function(){
    var mockedConfig = getMockedConfig();
    var CacheService = require("../../src/service/CacheService.js");
    var mockedCacheService = new CacheService(mockedConfig.cache);


    return mockedCacheService;
};

var getMockedTranslationRepository = function(){
    var TranslationRepository = require("../../src/repository/TranslationRepository.js");
    var mockedTranslationRepository = new TranslationRepository();

    return mockedTranslationRepository;

};

describe("Tests for TranslationService", translationServiceTests);
