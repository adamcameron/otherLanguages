var me = me ||{};
me.adamcameron = me.adamcameron || {};
me.adamcameron.variations = me.adamcameron.variations || {};

me.adamcameron.variations.MePerson = function(firstName, lastName){
    var firstName = firstName;
    var lastName = lastName;

    var capitaliseName = function(name){
        return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
    }

    var Person = function(){};
    Person.prototype.getFullName = function(){
        return capitaliseName(firstName) + " " + capitaliseName(lastName);
    };
    return new Person();
};
