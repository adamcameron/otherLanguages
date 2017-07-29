    // Person.cfc
    component {

        function init(id, firstName, lastName){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
        }
        
        function toString(){
            return "#this.firstName# #this.lastName#"
        }
    }

    // test.cfm
    writeOutput(new Person("Adam", "Cameron"));

