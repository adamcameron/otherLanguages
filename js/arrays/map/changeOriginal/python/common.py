# common.py

numbers = ["a","b","c","d","e"]

def mapper(number):
	global numbers
	localCopyOfTheseNumbers = numbers[:]
	numbers.pop(0)
	return localCopyOfTheseNumbers