$(document).ready(function(){
    var basicPerson = new me.adamcameron.variations.BasicPerson("Zachary", "Cameron Lynch");
    console.dir(basicPerson);
    console.log(basicPerson.firstName);
    console.log(basicPerson.lastName);
    console.log(basicPerson.getFullName());
});