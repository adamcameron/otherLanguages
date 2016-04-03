$(document).ready(function(){
    var mePerson = new me.adamcameron.variations.MePerson("zachary", "cameron lynch");
    console.dir(mePerson);
    console.log(mePerson.firstName);
    console.log(mePerson.lastName);
    console.log(mePerson.getFullName());
});