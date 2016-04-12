var translationServiceTests = function(){
    var TranslationService = require("../../src/service/TranslationService.js");

    var mockedConfig = getMockedConfig();

    var translationService = new TranslationService(mockedConfig);

    it("can be instantiated", function(){
        expect(translationService).toEqual(jasmine.any(TranslationService));
    });
};

var getMockedConfig = function(){
    var Config = require("../../src/app/Config.js");
    var config = new Config();

    return config;
};

describe("Tests for TranslationService", translationServiceTests);
