# comprehension.py

from common import letters, mapper

remappedLetters = [mapper(number) for number in letters]

for series in remappedLetters:
	print(" ".join(series))