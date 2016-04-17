describe("Tests for TranslationProvider", function() {

    var mockedLocale = "MOCKED_LOCALE";

    beforeEach(function(){
        this.dependencies = getTestDependencies();

        spyOn(this.dependencies.cacheService, "put");
        spyOn(this.dependencies.requestService, "getLocale").and.returnValue(mockedLocale);
        spyOn(this.dependencies.requestService, "isTranslatorEnabled").and.returnValue(true);
        spyOn(this.dependencies.mockedArrayLoader, "load");
        spyOn(this.dependencies.mockedTranslator, "load");
        spyOn(this.dependencies.translationFactory, "getArrayLoader").and.returnValue(this.dependencies.mockedArrayLoader);
        spyOn(this.dependencies.translationFactory, "getTranslator").and.returnValue(this.dependencies.mockedTranslator);

        this.translationProvider = getTestTranslationProvider(this.dependencies.mockedConfig);
    });

    describe("tests with fully-populated bundle", function(){
        beforeEach(function(){
            var mockedBundle = {mocked:"bundle"};
            spyOn(this.dependencies.translationRepository, "loadBundle").and.returnValue(mockedBundle);
            this.mockedBundle = mockedBundle;
        });

        it("sets the primary translations when the repository provides some", function(){
            var expectedPrimaryKey = getMockedCacheKeyForBundle("primary", mockedLocale);

            this.translationProvider.initialise(
                this.dependencies.mockedConfig.translation,
                this.dependencies.cacheService,
                this.dependencies.translationRepository,
                this.dependencies.requestService,
                this.dependencies.translationFactory
            );

            expect(this.dependencies.cacheService.put.calls.count()).toBeGreaterThan(0);
            expect(this.dependencies.cacheService.put.calls.argsFor(0)).toEqual([
                expectedPrimaryKey,
                this.mockedBundle,
                jasmine.any(String)
            ]);

            expect(this.dependencies.mockedArrayLoader.load.calls.count()).toEqual(2);
            expect(this.dependencies.mockedArrayLoader.load.calls.argsFor(0)).toEqual([this.mockedBundle]);
            expect(this.dependencies.mockedArrayLoader.load.calls.argsFor(1)).toEqual([this.mockedBundle]);

            expect(this.dependencies.mockedTranslator.load.calls.count()).toEqual(2);
            expect(this.dependencies.mockedTranslator.load.calls.argsFor(0)).toEqual([
                this.dependencies.mockedArrayLoader,
                "primary",
                mockedLocale
            ]);
            expect(this.dependencies.mockedTranslator.load.calls.argsFor(1)).toEqual([
                this.dependencies.mockedArrayLoader,
                "secondary",
                mockedLocale
            ]);
        });
    });

    describe("test with partially-populated bundle", function(){
        beforeEach(function(){
            var mockedBundle = {};
            spyOn(this.dependencies.translationRepository, "loadBundle").and.returnValue(mockedBundle);
            this.mockedBundle = mockedBundle;
        });
        
        it("sets the primary translations even when the repository doesn't provide any", function(){
            var expectedPrimaryKey = getMockedCacheKeyForBundle("primary", mockedLocale);

            this.translationProvider.initialise(
                this.dependencies.mockedConfig.translation,
                this.dependencies.cacheService,
                this.dependencies.translationRepository,
                this.dependencies.requestService,
                this.dependencies.translationFactory
            );

            expect(this.dependencies.cacheService.put.calls.count()).toBeGreaterThan(0);
            expect(this.dependencies.cacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, this.mockedBundle, jasmine.any(String)]);
        });
    });
});

var getTestDependencies = function(){
    var mockedConfig = getMockedConfig();
    var cacheService = getCacheService(mockedConfig);
    var translationRepository = getTranslationRepository();
    var requestService = getRequestService();
    var translationFactory = getTranslationFactory();
    var mockedArrayLoader = getMockedArrayLoader();
    var mockedTranslator = getMockedTranslator();

    return {
        mockedConfig : mockedConfig,
        cacheService : cacheService,
        translationRepository : translationRepository,
        requestService : requestService,
        translationFactory : translationFactory,
        mockedArrayLoader : mockedArrayLoader,
        mockedTranslator : mockedTranslator
    };
};

var getTestTranslationProvider = function(config){
    var TranslationProvider = require("../../src/provider/TranslationProvider.js");
    return new TranslationProvider(config.translation);
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

var getTranslationFactory = function(){
    var TranslationFactory = require("../../src/factory/TranslationFactory.js");
    return new TranslationFactory();
};

var getMockedCacheKeyForBundle = function(bundle, locale){
    return "MOCKED_TRANSLATIONS_" + bundle.toUpperCase() + "_" + locale;
};

var getMockedArrayLoader = function(){
    return {load:function(translations){}};
};

var getMockedTranslator = function(){
    return {load:function(loader, bundle, locale){}};
};
