$(document).ready(function(){
    var preliminaryWorkPerson = new me.adamcameron.variations.PreliminaryWorkPerson("Zachary", "Cameron Lynch");
    console.dir(preliminaryWorkPerson);
    console.log(preliminaryWorkPerson.firstName);
    console.log(preliminaryWorkPerson.lastName);
    console.log(preliminaryWorkPerson.getFullName());
});