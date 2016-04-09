$(document).ready(function(){
    var workPerson = (function(firstName, lastName){

        var capitaliseName = function(name){
            return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
        }

        return {
            getFullName : function(){
                return capitaliseName(firstName) + " " + capitaliseName(lastName);
            }
        };
    })("zachary", "cameron lynch");

    console.dir(workPerson);
    console.log(workPerson.firstName);
    console.log(workPerson.lastName);
    console.log(workPerson.getFullName());
});