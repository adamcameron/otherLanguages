public class TestNullString {
	public static void main(String[] args){
		System.out.println("Returns a string:");
		System.out.println(stringReturner(false));

		System.out.println("Returns a null:");
		System.out.println(stringReturner(true));
	}
	
	private static String stringReturner(Boolean returnNull){
		if (returnNull){
			return null;
		}else{
			return "G'day world";
		}
	}
}