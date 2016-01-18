public class ApiOne {

	/**
	 * @param args
	 */
	InternalOne wrappedInternalOne;

	public ApiOne(){
		
	}
	
	public ApiOne(InternalOne internalOne){
		wrappedInternalOne = internalOne;
	}
	
	public void okForExternal(){
		wrappedInternalOne.okForExternal();
	}
	
}
