public class Person implements Cloneable {
	String sFirstName;
	String sLastName;
	
	public Person(){}

	public Person (String firstName, String lastName){
		sFirstName = firstName;
		sLastName = lastName;
	}

	public String getFullName(){
		return sFirstName + " " + sLastName;
	}
	
	public void setFirstName(String firstName){
		sFirstName = firstName;
	}
	
	public void setLastName(String lastName){
		sLastName = lastName;
	}
	
	public Person clone(){
		Person newPerson = new Person(sFirstName, sLastName);
		return newPerson;
	}
	
	public static void main(String[] args){}
	
}