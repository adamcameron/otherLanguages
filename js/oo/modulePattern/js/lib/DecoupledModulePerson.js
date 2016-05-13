var ns = ns || {};

ns.DecoupledModulePerson = function(firstName, lastName){
    var fullName = firstName + " " + lastName;

    var capitalise = function(name){
        return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
    }

    return {
        getFullName : function(){
            return capitalise(fullName);
        },
        capitaliseName : capitalise
    };
};
