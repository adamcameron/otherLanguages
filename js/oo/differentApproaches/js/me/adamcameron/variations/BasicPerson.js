var me = me ||{};
me.adamcameron = me.adamcameron || {};
me.adamcameron.variations = me.adamcameron.variations || {};

me.adamcameron.variations.BasicPerson = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
};

me.adamcameron.variations.BasicPerson.capitaliseName = function(name){
    return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
}

me.adamcameron.variations.BasicPerson.prototype.getFullName = function(){
    return me.adamcameron.variations.BasicPerson.capitaliseName(this.firstName)
        + " "
        + me.adamcameron.variations.BasicPerson.capitaliseName(this.lastName);
};