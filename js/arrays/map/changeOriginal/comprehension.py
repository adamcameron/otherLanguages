from common import numbers, mapper

remappedNumbers = [mapper(number) for number in numbers]

for series in remappedNumbers:
	print(" ".join(series))