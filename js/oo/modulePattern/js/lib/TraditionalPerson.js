var ns = ns ||{};

ns.TraditionalPerson = function(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
};

ns.TraditionalPerson.capitaliseName = function(name){
    return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
}

ns.TraditionalPerson.prototype.getFullName = function(){
    return ns.TraditionalPerson.capitaliseName(this.firstName)
        + " "
        + ns.TraditionalPerson.capitaliseName(this.lastName);
};
