public class TestThis {
	
	private String myString = "myString";
	
	public String publicMethod(){
		return "publicMethod(). this.myString=" + this.myString; 
	}
	
	private String privateMethod(){
		return "privateMethod(). this.myString=" + this.myString; 
	}
	
	public String privateWrapperMethod(){
		return "privateWrapperMethod(). privateMethod()=" + this.privateMethod(); 
	}
	
    public static void main(String[] args) {
    }
	
}