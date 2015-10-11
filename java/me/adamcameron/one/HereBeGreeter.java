package me.adamcameron.one;

class Greeter {
	
	String who;

	Greeter(String who){
		this.who = who;
	}

	String greetThem(){
		return "G'day " + who;
	}

}