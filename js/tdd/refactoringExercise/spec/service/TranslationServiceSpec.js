describe("Tests for TranslationService", function() {

    beforeEach(function(){
        setTestDependencies.call(this);
        setMockedBundle.call(this);
        spyOn(this.mockedTranslationRepository, "loadBundle").and.returnValue(this.mockedBundle);
        spyOn(this.mockedCacheService, "put");
        spyOn(this.mockedRequestService, "getLocale").and.returnValue(getMockedLocale());
        spyOn(this.mockedRequestService, "isTranslatorEnabled").and.returnValue(true);
    });

    it("sets the primary translations when the repository provides some", function(){
        setTestTranslationService.call(this);
        var mockedTtl = getMockedTtl();

        var expectedPrimaryKey = getMockedCacheKeyForBundle("primary");

        this.translationService.initialise();

        expect(this.mockedCacheService.put.calls.count()).toBeGreaterThan(0);
        expect(this.mockedCacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, this.mockedBundle, jasmine.any(String)]);
    });

    it("sets the primary translations even when the repository doesn't provide any", function(){
        setTestTranslationService.call(this);
        var mockedTtl = getMockedTtl();

        var expectedPrimaryKey = getMockedCacheKeyForBundle("primary");

        this.translationService.initialise();

        expect(this.mockedCacheService.put.calls.count()).toBeGreaterThan(0);
        expect(this.mockedCacheService.put.calls.argsFor(0)).toEqual([expectedPrimaryKey, this.mockedBundle, jasmine.any(String)]);
    });
});


var setTestTranslationService = function(){
    var TranslationService = require("../../src/service/TranslationService.js");
    this.translationService = new TranslationService(
        this.mockedConfig.translation,
        this.mockedCacheService,
        this.mockedTranslationRepository,
        this.mockedRequestService
    );
};

var setTestDependencies = function(){
    setMockedConfig.call(this);
    setMockedCacheService.call(this);
    setMockedTranslationRepository.call(this);
    setMockedRequestService.call(this);
};

var setMockedConfig = function(){
    this.mockedConfig = {
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
};

var setMockedCacheService = function(){
    var CacheService = require("../../src/service/CacheService.js");
    this.mockedCacheService = new CacheService(this.mockedConfig.cache);
};

var setMockedTranslationRepository = function(){
    var TranslationRepository = require("../../src/repository/TranslationRepository.js");
    this.mockedTranslationRepository = new TranslationRepository();
};

var setMockedRequestService = function(){
    var RequestService = require("../../src/service/RequestService.js");
    this.mockedRequestService = new RequestService({});
};

var setMockedBundle = function(){
    this.mockedBundle = {mocked:"bundle"};
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
