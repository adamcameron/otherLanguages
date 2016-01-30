print("none")
if None:
    print("truthy")
else:
    print("falsy")
print("=====================")


print("empty string")
if "":
    print("truthy")
else:
    print("falsy")
print("=====================")

print("non-empty string")
if "0":
    print("truthy")
else:
    print("falsy")
print("=====================")

print("zero")
if 0:
    print("truthy")
else:
    print("falsy")
print("=====================")

print("non-zero")
if -1:
    print("truthy")
else:
    print("falsy")
print("=====================")

print("empty list")
if []:
    print("truthy")
else:
    print("falsy")
print("=====================")


print("non-empty list")
if [None]:
    print("truthy")
else:
    print("falsy")
print("=====================")


print("empty dictionary")
if {}:
    print("truthy")
else:
    print("falsy")
print("=====================")

print("non-empty dictionary")
if {"key":None}:
    print("truthy")
else:
    print("falsy")
print("=====================")

class Test:
    def __init__(self, value):
        self.value = value

    def __bool__(self):
        return self.value == "truthy"

print("truthy object")
test = Test("truthy")
if test:
    print("truthy")
else:
    print("falsy")
print("=====================")

print("non-truthy object")
if Test("anything else"):
    print("truthy")
else:
    print("falsy")
print("=====================")
