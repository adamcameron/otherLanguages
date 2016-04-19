describe("Tests for TranslationProvider", function() {

    var mockedLocale = "MOCKED_LOCALE";

    beforeEach(function(){
        this.dependencies = getTestDependencies();

        spyOn(this.dependencies.requestService, "getLocale").and.returnValue(mockedLocale);
        spyOn(this.dependencies.requestService, "isTranslatorEnabled").and.returnValue(true);

        spyOn(this.dependencies.cacheService, "isActive").and.returnValue(false);

        spyOn(this.dependencies.cacheService, "put");

        spyOn(this.dependencies.mockedArrayLoader, "load").and.returnValue(this.dependencies.mockedArrayLoader);
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

            var translationService = this.translationProvider.initialise(
                this.dependencies.mockedConfig.translation,
                this.dependencies.cacheService,
                this.dependencies.translationRepository,
                this.dependencies.requestService,
                this.dependencies.translationFactory
            );

            testDependencyExpectations(this.dependencies, this.mockedBundle, mockedLocale);

            expect(translationService).toEqual(this.dependencies.mockedTranslator);
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

            var translationService = this.translationProvider.initialise(
                this.dependencies.mockedConfig.translation,
                this.dependencies.cacheService,
                this.dependencies.translationRepository,
                this.dependencies.requestService,
                this.dependencies.translationFactory
            );

     testDependencyExpectations(this.dependencies, this.mockedBundle, mockedLocale);

           expect(translationService).toEqual(this.dependencies.mockedTranslator);
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
    return {
        isActive : function(){},
        exists : function(key){},
        get : function(key){},
        put : function(key, value){}
    };
};

var getTranslationRepository = function(){
    return {loadBundle : function(bundle, locale){}};
};

var getRequestService = function(){
    return {
        isTranslatorEnabled : function(){},
        getLocale : function(){}
    };
};

var getTranslationFactory = function(){
    return {
        getArrayLoader : function(){},
        getTranslator : function(){}
    };
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

var testDependencyExpectations = function(dependencies, mockedBundle, mockedLocale){
    var expectedPrimaryKey = getMockedCacheKeyForBundle("primary", mockedLocale);
    var expectedSecondaryKey = getMockedCacheKeyForBundle("secondary", mockedLocale);

    expect(dependencies.requestService.isTranslatorEnabled.calls.count()).toEqual(1);
    expect(dependencies.requestService.getLocale.calls.count()).toEqual(1);

    expect(dependencies.cacheService.isActive.calls.count()).toEqual(1);

    expect(dependencies.translationRepository.loadBundle.calls.count()).toEqual(2);
    expect(dependencies.translationRepository.loadBundle.calls.argsFor(0)).toEqual([
        "primary",
        mockedLocale
    ]);
    expect(dependencies.translationRepository.loadBundle.calls.argsFor(1)).toEqual([
        "secondary",
        mockedLocale
    ]);

    expect(dependencies.cacheService.put.calls.count()).toEqual(2);
    expect(dependencies.cacheService.put.calls.argsFor(0)[1]).toEqual(mockedBundle);
    expect(dependencies.cacheService.put.calls.argsFor(1)[1]).toEqual(mockedBundle);

    expect(dependencies.translationFactory.getTranslator.calls.count()).toEqual(1);
    expect(dependencies.translationFactory.getArrayLoader.calls.count()).toEqual(1);


    expect(dependencies.mockedArrayLoader.load.calls.count()).toEqual(2);
    expect(dependencies.mockedArrayLoader.load.calls.argsFor(0)).toEqual([mockedBundle]);
    expect(dependencies.mockedArrayLoader.load.calls.argsFor(1)).toEqual([mockedBundle]);

    expect(dependencies.mockedTranslator.load.calls.count()).toEqual(2);
    expect(dependencies.mockedTranslator.load.calls.argsFor(0)).toEqual([
        dependencies.mockedArrayLoader,
        "primary",
        mockedLocale
    ]);
    expect(dependencies.mockedTranslator.load.calls.argsFor(1)).toEqual([
        dependencies.mockedArrayLoader,
        "secondary",
        mockedLocale
    ]);

};
