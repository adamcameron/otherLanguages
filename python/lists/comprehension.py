numbers = ["a","b","c","d","e"]

def mapper(number):
	global numbers
	theseNumbers = numbers[:]
	numbers.pop(0)
	return theseNumbers

remappedNumbers = [mapper(number) for number in numbers]

for series in remappedNumbers:
	print(" ".join(series))
