# map.py

from common import numbers, mapper

remappedNumbers = map(mapper, numbers)

for series in remappedNumbers:
	print(" ".join(series))

print("=============")
for series in remappedNumbers:
	print(" ".join(numbers))
