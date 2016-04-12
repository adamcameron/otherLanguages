var SomeService = function(){};

SomeService.prototype.reverseString = function(string){
    return string.split("").reduceRight(function(reversedString,char){return reversedString += char;});
};

module.exports = SomeService;