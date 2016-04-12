var App = require("./app/App.js");
var app = new App();

var translation = app.service.translation.translate("Zachary");
console.log(translation);

var translation = app.service.translation.translate("one");
console.log(translation);

app.service.translation.initialise();
var translation = app.service.translation.translate("red");
console.log(translation);
