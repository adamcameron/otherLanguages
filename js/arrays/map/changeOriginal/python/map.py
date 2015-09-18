# map.py

from common import letters, mapper

remappedLetters = map(mapper, letters)

for series in remappedLetters:
	print(" ".join(series))
