print "populated string: "
println " " ? "truthy" : "falsy" 

print "empty string: "
println "" ? "truthy" : "falsy" 
println "============="

print "non-zero: "
println (-1 ? "truthy" : "falsy") 

print "zero: "
println 0 ? "truthy" : "falsy" 
println "============="

print "populated collection: "
println([null] ? "truthy" : "falsy") 

print "empty collection: "
println([] ? "truthy" : "falsy") 
println "============="

print "populated map: "
println([key:""] ? "truthy" : "falsy") 

print "empty map: "
println([:] ? "truthy" : "falsy")
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
println new Test("truthy") ? "truthy" : "falsy" 

print "falsy object: "
println new Test("anything else") ? "truthy" : "falsy" 
println "============="
