using System;

namespace try_csharp.level2
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("What is the name of your band?");
            string name = Console.ReadLine();

            Console.WriteLine("How many people are in your band?");
            int numberOfMembers = int.Parse(Console.ReadLine());

            Console.WriteLine(name + " has " + numberOfMembers + " members.");
        }
    }
}
