code = '''
class Person {
	String firstName
	String lastName
	
	Person(firstName, lastName){
		this.firstName = firstName
		this.lastName = lastName
	}
	
	def getFullName(){
		"$firstName $lastName"
	}
}
'''


classLoader = new GroovyClassLoader()
parsedClass = classLoader.parseClass(code)

son = parsedClass.newInstance("Zachary", "Cameron Lynch")
println son.getFullName()
