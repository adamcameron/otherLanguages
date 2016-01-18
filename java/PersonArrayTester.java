public class PersonArrayTester{

	public static void changePeople(Person[] people){
		for (int i=0; i < people.length; i++){
			people[i].setFirstName("Sean");
			people[i].setLastName("Corfield");
		}
	}
	
	public static void main(String[] args){
		Person[] adams = new Person[2];
		
		System.out.println("Create person array with Adams Cameron & Haskell");
		adams[0] = new Person("Adam", "Cameron");
		adams[1] = new Person("Adam", "Haskell");
		System.out.println("Adam[0]: " + adams[0].getFullName());
		System.out.println("Adam[1]: " + adams[1].getFullName());
		
		System.out.println("Pass array into function which operates on said array, but doesn't return it");
		changePeople(adams);
		System.out.println("Adam[0]: " + adams[0].getFullName());
		System.out.println("Adam[1]: " + adams[1].getFullName());
	}
}