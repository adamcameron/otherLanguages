describe("This is a minimal spec of SomeService", function(){
    var SomeService = require("../../src/service/SomeService.js");
    var someService = new SomeService();

    it("can be instantiated", function(){
        expect(someService instanceof SomeService).toBe(true);
    });

    it("reverses a string", function(){
        var string = "abc";
        var expectedReversedString = "cba";
        var reversedString = someService.reverseString(string);
        expect(reversedString).toBe(expectedReversedString);
    });
});