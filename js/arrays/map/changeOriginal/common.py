numbers = ["a","b","c","d","e"]

def mapper(number):
	global numbers
	theseNumbers = numbers[:]
	numbers.pop(0)
	return theseNumbers