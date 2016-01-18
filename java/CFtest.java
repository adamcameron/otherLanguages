public class CFtest {

	public String name;
	
	public CFtest(String n){
		this.name = n;
	}
	
	public String getName(){
		return this.name;
	}
	
	public static void main(String[] args) {
		CFtest cf = new CFtest("java-cf test");
		System.out.println(cf.getName());
	}
}