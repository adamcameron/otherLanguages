package me.adamcameron.bug;

public class PublicPerson {

	private String name;

	public PublicPerson(){
		
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