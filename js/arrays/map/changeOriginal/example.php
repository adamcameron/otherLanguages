<?php
$numbers = ["a","b","c","d","e"];
$remappedNumbers = array_map(function($number) use (&$numbers){
	$theseNumbers = $numbers;
	array_shift($numbers);
	return $theseNumbers;
}, $numbers);

foreach ($remappedNumbers as $series) {
	echo join($series, " ") . "\n";
}
