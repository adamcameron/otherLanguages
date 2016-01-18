package me.adamcameron.miscellany;

public class NativeVoidTest {

	public static void sayItWasTrue(){
		System.out.println("It was true");
	}

	public static void sayItWasFalse(){
		System.out.println("It was false");
	}

	public static void main(String[] args){
		Object o = true ? sayItWasTrue() : sayItWasFalse();
	}
	
}