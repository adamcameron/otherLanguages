// Employee.java

public class Employee extends Person {

	protected String middleName;
	protected String employeeId;

	public Employee(String firstName, String middleName, String lastName, String employeeId){
		super(firstName, lastName);
		this.middleName = middleName;
		this.employeeId = employeeId;
	}

	public String getEmployeeId(){
		return this.employeeId;
	}

	protected void setFullName(){
		this.fullName = this.firstName + " " + this.middleName + " " + this.lastName;
	}

}