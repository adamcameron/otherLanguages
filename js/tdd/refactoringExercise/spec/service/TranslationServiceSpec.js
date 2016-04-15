var testHappyPath = function(){
    console.log("testHappyPath() called");
    var dependencies = getTestDependencies();
    var translationService = getTestTranslatorService(dependencies);
    var mockedBundle = getMockedBundle();

    beforeEach(function(){
        spyOn(dependencies.translationRepository, "loadBundle").and.returnValue(mockedBundle);
    });

    it("sets the primary translations when the repository provides some", checkExpectations.bind(this, translationService, dependencies, mockedBundle));
};

var testNoTranslationsBug = function(){
    console.log("testNoTranslationsBug() called");
    var dependencies = getTestDependencies();
    var translationService = getTestTranslatorService(dependencies);
    var mockedBundle = {};

    beforeEach(function(){
        spyOn(dependencies.translationRepository, "loadBundle").and.returnValue(mockedBundle);
    });

    it("sets the primary translations even when the repository doesn't provide any", checkExpectations.bind(this, translationService, dependencies, mockedBundle));
};

var checkExpectations = function(translationService, dependencies, mockedBundle){
    var mockedTtl = getMockedTtl();

    var expectedPrimaryKey = getMockedCacheKeyForBundle("primary");

    translationService.initialise();

    expect(dependencies.cacheService.put.calls.count()).toBeGreaterThan(0);
    expect(dependencies.cacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, mockedBundle, jasmine.any(String)]);
};


var getTestTranslatorService = function(dependencies){
    var TranslationService = require("../../src/service/TranslationService.js");
    var translationService = new TranslationService(
        dependencies.config.translation,
        dependencies.cacheService,
        dependencies.translationRepository,
        dependencies.requestService
    );

    return translationService;
};

var getTestDependencies = function(){
    var mockedConfig = getMockedConfig();
    var mockedCacheService = getMockedCacheService();
    var mockedTranslationRepository = getMockedTranslationRepository();
    var mockedRequestService = getMockedRequestService();
    console.log("getTestDependencies() was run");
    return {
        config : mockedConfig,
        cacheService : mockedCacheService,
        translationRepository : mockedTranslationRepository,
        requestService : mockedRequestService
    };
};

var getMockedConfig = function(){
    var mockedConfig = {
        cache : {
            active : false
        },
        translation : {
            bundles : {
                primary : {cacheKey : "MOCKED_TRANSLATIONS_PRIMARY"},
                secondary : {cacheKey : "MOCKED_TRANSLATIONS_SECONDARY"}
            },
            enabled : true,
            ttl : getMockedTtl()
        }
    };

    return mockedConfig;
};

var getMockedCacheService = function(){
    var mockedConfig = getMockedConfig();
    var CacheService = require("../../src/service/CacheService.js");
    var mockedCacheService = new CacheService(mockedConfig.cache);

    beforeEach(function(){
        spyOn(mockedCacheService, "put");
    });

    return mockedCacheService;
};

var getMockedTranslationRepository = function(){
    var TranslationRepository = require("../../src/repository/TranslationRepository.js");
    var mockedTranslationRepository = new TranslationRepository();

    return mockedTranslationRepository;
};
var getMockedRequestService = function(){

console.log("getMockedRequestService() was run");

    var RequestService = require("../../src/service/RequestService.js");
    var mockedRequestService = new RequestService({});

    beforeEach(function(){
        console.log("beforeEach() for mockedRequestService called");
        spyOn(mockedRequestService, "getLocale").and.returnValue(getMockedLocale());
        spyOn(mockedRequestService, "isTranslatorEnabled").and.returnValue(true);
    });

    return mockedRequestService;
};

var getMockedBundle = function(){
    return {mocked:"bundle"};
};

var getMockedLocale = function(){
    return "MOCKED_LOCALE";
};

var getMockedTtl = function(){
    return "MOCKED_TTL";
};

var getMockedCacheKeyForBundle = function(bundle){
    var mockedLocale = getMockedLocale();
    return "MOCKED_TRANSLATIONS_" + bundle.toUpperCase() + "_" + mockedLocale;
};


describe("Tests for TranslationService", function() {
    describe("Tests for the happy path", testHappyPath.bind(this));
    describe("Bug tests", testNoTranslationsBug.bind(this));
});