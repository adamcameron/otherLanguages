public class InternalOne {


	public InternalOne(){
		System.out.println("Default constructor");
	}

	
	public void neededInternally(){
		System.out.println("We need this internally");
	}
	
	public void okForExternal(){
		System.out.println("This is part of the API");
	}

}
