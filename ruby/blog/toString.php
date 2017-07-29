    <?php
    class Person {

        public $firstName;
        public $lastName;

        function __construct($firstName, $lastName)
        {
            $this->firstName = $firstName;
            $this->lastName = $lastName;
        }
        
        function __toString()
        {
            return "{$this->firstName} {$this->lastName}";
        }
    }

    echo new Person("Adam", "Cameron"); // Adam Cameron
