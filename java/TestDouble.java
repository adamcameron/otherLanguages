public class TestDouble {

	private double d1 = 123.45;
	private double d2 = 23.4;
	private double d3 = 100.05;

	private double d4 = d1 - d2;

	private boolean b1 = (d1 - d2) == d3;
	private boolean b2 = d4 == d3;


	public void main(String[] asArgs){}

	public double getD1() {return d1;}
	public double getD2() {return d2;}
	public double getD3() {return d3;}
	public double getD4() {return d4;}

	public boolean getB1() {return b1;}
	public boolean getB2() {return b2;}

}
