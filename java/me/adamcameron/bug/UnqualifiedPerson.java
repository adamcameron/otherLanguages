package me.adamcameron.bug;

class UnqualifiedPerson {

	private String name;

	public UnqualifiedPerson(){
		
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public String getName(){
		return this.name;
	}
	
	public static String greet(String name){
		return "G'day " + name;
	}

}