require("./app/me.adamcameron.refactoring.js");
require("./app/App.js");
var app = new me.adamcameron.refactoring.App();

var translation = app.service.translation.translate("Zachary");
console.log(translation);

var translation = app.service.translation.translate("one");
console.log(translation);

app.service.translation.initialise();
var translation = app.service.translation.translate("red");
console.log(translation);
