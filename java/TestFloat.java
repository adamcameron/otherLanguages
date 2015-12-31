public class TestFloat {

	private float f1 = (float)123.45;
	private float f2 = (float)23.4;
	private float f3 = (float)100.05;

	private float f4 = f1 - f2;

	private boolean b1 = (f1 - f2) == f3;
	private boolean b2 = f4 == f3;


	public void main(String[] asArgs){}

	public float getF1() {return f1;}
	public float getF2() {return f2;}
	public float getF3() {return f3;}
	public float getF4() {return f4;}

	public boolean getB1() {return b1;}
	public boolean getB2() {return b2;}

}
