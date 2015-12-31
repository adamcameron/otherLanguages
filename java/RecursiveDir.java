import java.io.*;
import java.util.Vector;

public class RecursiveDir
{
    static Vector output = new Vector();

    public static void main(String[] args)
    {
        if (args.length == 0)
        {
            System.out.println("Give me a place to start from!");
            System.exit(1);
        }
        String start = args[0];
        File file = new File(start);
        if (!file.exists())
        {
            System.out.println("Start point doesn't exist: " + start);
            System.exit(1);
        }

        parseFile(file);
        System.out.println("Here's the results:\n");
        for (int x=0; x<output.size(); x++)
        {
            System.out.println(output.elementAt(x).toString());
        }
    }

    private static void parseFile(File file)
    {
        output.addElement(file.getPath());
        if (file.isDirectory())
        {
            File[] contents = file.listFiles();
            for (int x=0; x<contents.length; x++)
            {
                parseFile(contents[x]);
            }
        }
    }

} 