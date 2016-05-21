var ns = ns || {};

ns.person = (function(firstName, lastName){
    var fullName = firstName + " " + lastName;

    var capitaliseName = function(name){
        return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
    }

    return {
        getFullName : function(){
            return capitaliseName(fullName);
        },
        capitaliseName : capitaliseName
    };
})("jerry", "mateparae");

