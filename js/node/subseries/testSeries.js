// testSeries.js

var seriesToTest = eval(process.argv[2]) || []; // eg: [100,300,100,50,50,50,50,50,500,200,100]
var thresholdToTest = process.argv[3] || 0 

var Series = require("./Series.js");
var series = new Series(seriesToTest);
var subSeries = series.getSubseries(thresholdToTest);
console.log(subSeries);
