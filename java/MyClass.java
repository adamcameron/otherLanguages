interface IMyInterface {
	
	// note the return type
	public IMyInterface myMethod();
}

public class MyClass implements IMyInterface {
	private static String foo = "bar";

	// note the return type
	public MyClass myMethod(){
		return this;
	}

	public static String getFoo(){
		return foo;
	}

	public static void main(String[] args){
		System.out.println(getFoo());
	}
}