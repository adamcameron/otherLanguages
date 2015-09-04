<?php
// closure.php

$numbers = ["a","b","c","d","e"];
$remappedNumbers = array_map(function($number) use (&$numbers){
	$localCopyOfTheseNumbers = $numbers;
	array_shift($numbers);
	return $localCopyOfTheseNumbers;
}, $numbers);

foreach ($remappedNumbers as $series) {
	echo join($series, " ") . "\n";
}
