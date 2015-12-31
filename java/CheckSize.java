import java.io.*;

public class CheckSize {

	public static void main(String[] args) throws java.io.FileNotFoundException, java.io.IOException {
		File f		= new File("C:/temp/s.txt");
		FileReader fr	= new FileReader(f);
		char[] cBuffer	= new char[100];
		int iLen	= fr.read(cBuffer, 0, cBuffer.length);
		String sBuffer	= new String(cBuffer, 0, iLen);

		System.out.println("buffer: " + sBuffer);
		System.out.println("Size: " + sBuffer.length());

	}



}