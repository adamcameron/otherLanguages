/*
function* getNumbers(){
	['tahi', 'rua', 'toru', 'wha'].forEach(function(number){
		yield number;
	});
}
*/


function* getNumbers(){
	for (number of ['tahi', 'rua', 'toru', 'wha']){
		message = yield number;
		console.log(message);
	}
}


numbers = getNumbers();

console.log(numbers.next("a").value);
console.log(numbers.next("b").value);
console.log(numbers.next("c").value);
console.log(numbers.next("d").value);