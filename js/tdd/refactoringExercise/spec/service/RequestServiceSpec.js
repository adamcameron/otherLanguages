var baseLineTests = function(){
    var mockedApp = getMockedApp();

    var RequestService = require("../../src/service/RequestService.js");
    var requestService = new RequestService(mockedApp);

    it("can be instantiated", function(){
        expect(requestService instanceof RequestService).toBe(true);
    });
};

var getMockedApp = function(){
    var app = {
        session : {
            getCacheEnabled : function(){
                return true;
            }
        },
        request : {
            getCurrentLocale : function(){
                return "en_NZ";
            }
        }
    };

    return app;
};

describe("Testing method creation strategy", baseLineTests);
