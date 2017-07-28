<?php
class Person {

	public $id;
	public $firstName;
	public $lastName;

	function __construct($id, $firstName, $lastName)
	{
		$this->id = $id;
		$this->firstName = $firstName;
		$this->lastName = $lastName;
	}
}

$peopleData = [
	2 => ['firstName' => 'Jane', 'lastName' => 'Campion'],
	4 => ['firstName' => 'Lee', 'lastName' => 'Tamahori'],
	6 => ['firstName' => 'Taika', 'lastName' => 'Waititi']
];

$people = array_map(function($names, $id) {
	return new Person($id, $names['firstName'], $names['lastName']);
	
}, $peopleData, array_keys($peopleData));

var_dump($people);
