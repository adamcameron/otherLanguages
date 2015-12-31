public class PersonTester{

	public static void changePerson(Person aPerson){
		aPerson.setFirstName("Sean");
		aPerson.setLastName("Corfield");
	}
	
	
	public static void main(String[] args){
		System.out.println("Create new Person adam1");
		Person adam1 = new Person("Adam", "Cameron");
		System.out.println("Adam1: " + adam1.getFullName());

		System.out.println("Assign adam2 = adam1, set last name");
		Person adam2 = adam1;
		adam2.setLastName("Haskell");
		System.out.println("Adam1: " + adam1.getFullName());
		System.out.println("Adam2: " + adam2.getFullName());

		System.out.println("Clone adam1 as adam3, set last name");
		Person adam3 = adam1.clone();
		adam3.setLastName("Lehman");
		System.out.println("Adam1: " + adam1.getFullName());
		System.out.println("Adam2: " + adam2.getFullName());
		System.out.println("Adam3: " + adam3.getFullName());
		
		System.out.println("Pass adam1 into function, change it");
		changePerson(adam1);
		System.out.println("Adam1: " + adam1.getFullName());
		System.out.println("Adam2: " + adam2.getFullName());
		System.out.println("Adam3: " + adam3.getFullName());

	}
	
	
}