class Thing implements IThing {

	public IThing returnsAnInstance(){
		return new Thing();
	}
	
	public Thing implementsFluentInterface(){
		return this;
	}

}