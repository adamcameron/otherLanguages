describe("Tests for TranslationProvider", function() {

    var mockedLocale = "MOCKED_LOCALE";

    beforeEach(function(){
        var dependencies = getTestDependencies();

        spyOn(dependencies.cacheService, "put");
        spyOn(dependencies.requestService, "getLocale").and.returnValue(mockedLocale);
        spyOn(dependencies.requestService, "isTranslatorEnabled").and.returnValue(true);

        this.translationProvider = getTestTranslationProvider(dependencies);
        this.cacheService = dependencies.cacheService;
        this.translationRepository = dependencies.translationRepository;
    });

    describe("tests with fully-populated bundle", function(){
        beforeEach(function(){
            var mockedBundle = {mocked:"bundle"};
            spyOn(this.translationRepository, "loadBundle").and.returnValue(mockedBundle);
            this.mockedBundle = mockedBundle;
        });

        it("sets the primary translations when the repository provides some", function(){
            var expectedPrimaryKey = getMockedCacheKeyForBundle("primary", mockedLocale);

            this.translationProvider.initialise();

            expect(this.cacheService.put.calls.count()).toBeGreaterThan(0);
            expect(this.cacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, this.mockedBundle, jasmine.any(String)]);
        });
    });

    describe("test with partially-populated bundle", function(){
        beforeEach(function(){
            var mockedBundle = {};
            spyOn(this.translationRepository, "loadBundle").and.returnValue(mockedBundle);
            this.mockedBundle = mockedBundle;
        });
        
        it("sets the primary translations even when the repository doesn't provide any", function(){
            var expectedPrimaryKey = getMockedCacheKeyForBundle("primary", mockedLocale);

            this.translationProvider.initialise();

            expect(this.cacheService.put.calls.count()).toBeGreaterThan(0);
            expect(this.cacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, this.mockedBundle, jasmine.any(String)]);
        });
    });
});

var getTestDependencies = function(){
    var mockedConfig = getMockedConfig();
    var cacheService = getCacheService(mockedConfig);
    var translationRepository = getTranslationRepository();
    var requestService = getRequestService();

    return {
        mockedConfig : mockedConfig,
        cacheService : cacheService,
        translationRepository : translationRepository,
        requestService : requestService
    };
};

var getTestTranslationProvider = function(dependencies){
    var TranslationProvider = require("../../src/provider/TranslationProvider.js");
    return new TranslationProvider(
        dependencies.mockedConfig.translation,
        dependencies.cacheService,
        dependencies.translationRepository,
        dependencies.requestService
    );
};

var getMockedConfig = function(){
    return {
        cache : {
            active : false
        },
        translation : {
            bundles : {
                primary : {cacheKey : "MOCKED_TRANSLATIONS_PRIMARY"},
                secondary : {cacheKey : "MOCKED_TRANSLATIONS_SECONDARY"}
            },
            enabled : true,
            ttl : "MOCKED_TTL"
        }
    };
};

var getCacheService = function(config){
    var CacheService = require("../../src/service/CacheService.js");
    return new CacheService(config.cache);
};

var getTranslationRepository = function(){
    var TranslationRepository = require("../../src/repository/TranslationRepository.js");
    return new TranslationRepository();
};

var getRequestService = function(){
    var RequestService = require("../../src/service/RequestService.js");
    return new RequestService({});
};

var getMockedCacheKeyForBundle = function(bundle, locale){
    return "MOCKED_TRANSLATIONS_" + bundle.toUpperCase() + "_" + locale;
};
