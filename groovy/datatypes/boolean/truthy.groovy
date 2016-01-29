print "empty string: "
if ("") {
	println "truthy"
}else{
	println "falsy"
}
print "populated string: "
if (" ") {
	println "truthy"
}else{
	println "falsy"
}
println "============="

print "zero: "
if (0) {
	println "truthy"
}else{
	println "falsy"
}
print "non-zero: "
if (-1) {
	println "truthy"
}else{
	println "falsy"
}
println "============="

print "empty collection: "
if ([]) {
	println "truthy"
}else{
	println "falsy"
}
print "populated collection: "
if ([null]) {
	println "truthy"
}else{
	println "falsy"
}
println "============="

print "empty map: "
if ({}) {
	println "truthy"
}else{
	println "falsy"
}
print "populated map: "
if ({key:""}) {
	println "truthy"
}else{
	println "falsy"
}
print "populated map (null value): "
if ({key:null}) {
	println "truthy"
}else{
	println "falsy"
}
println "============="

class Test{
	String value
	
	Test(value){
		this.value = value
	}
	
	boolean asBoolean(){
		return (value == "truthy")
	}
}

print "truthy object: "
if (new Test("truthy")) {
	println "truthy"
}else{
	println "falsy"
}
print "falsy object: "
if (new Test("anything else")) {
	println "truthy"
}else{
	println "falsy"
}

