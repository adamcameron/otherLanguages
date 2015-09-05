# common.py

letters = ["a","b","c","d","e"]

def mapper(number):
	global letters
	localCopyOfTheseLetters = letters[:]
	letters.pop(0)
	return localCopyOfTheseLetters