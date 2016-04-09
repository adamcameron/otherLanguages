class UsesThing {

	public static void main(String[] args){
		Thing thing = new Thing();
		Thing refToThing = thing.implementsFluentInterface().implementsFluentInterface();
		
		Thing anotherThing = (Thing) thing.returnsAnInstance();
		IThing andAnotherThing = thing.returnsAnInstance();
	
	}


}