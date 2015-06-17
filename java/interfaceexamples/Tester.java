package interfaceexamples;

public class Tester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Sub sub = new Sub();
		Integer x = Integer.parseInt(args[0]);
		Integer y = sub.f(x);
		System.out.println(y);

	}

}
