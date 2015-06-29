// Person.java

package inheritance;

public class Person {
	protected String firstName;
	protected String lastName;
	protected String fullName;

	public Person(String firstName, String lastName){
		this.firstName	= firstName;
		this.lastName	= lastName;
		setFullName();
	}

	protected void setFullName(){
		this.fullName = this.firstName + " " + this.lastName;
	}

	public String getFullname(){
		return this.fullName;
	}

}