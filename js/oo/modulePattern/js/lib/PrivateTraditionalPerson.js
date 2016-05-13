var ns = ns ||{};

ns.PrivateTraditionalPerson = function(firstName, lastName){
    var capitalise = function(name){
        return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
    };

    var fullName = capitalise(firstName + " " + lastName);

    ns.PrivateTraditionalPerson.prototype.getFullName = function(){
        return fullName;
    };

    ns.PrivateTraditionalPerson.prototype.toJSON = function(){
        return {firstName:firstName, lastName:lastName, fullName:fullName};
    };

    ns.PrivateTraditionalPerson.capitaliseName = capitalise;
};



