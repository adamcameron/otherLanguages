using System;

namespace try_csharp.level3
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("What is the name of your band?");
            string name = Console.ReadLine();

            Console.WriteLine("How many people are in your band?");
            int numberOfMembers = 0;
            while (!int.TryParse(Console.ReadLine(), out numberOfMembers)) {
                Console.WriteLine("Input was not valid, try again");
                //Environment.Exit(0);
            }
            if (numberOfMembers < 0) {
                Console.WriteLine("You must have at least one member");
            } else if (numberOfMembers == 1) {
                Console.WriteLine("is a solo");
            } else if (numberOfMembers == 2) {
                Console.WriteLine("is a duo");
            } else {
                Console.WriteLine(name + " has " + numberOfMembers + " members.");
            }
        }
    }
}
