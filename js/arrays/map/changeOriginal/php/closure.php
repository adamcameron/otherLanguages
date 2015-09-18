<?php
// closure.php

$letters = ["a","b","c","d","e"];
$remappedLetters = array_map(function($number) use (&$letters){
	$localCopyOfTheseLetters = $letters;
	array_shift($letters);
	return $localCopyOfTheseLetters;
}, $letters);

foreach ($remappedLetters as $series) {
	echo join($series, " ") . "\n";
}
