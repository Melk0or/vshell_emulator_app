namespace VShell
{
    class Program
    {
        static void Main(string[] args)
        {
            var vshell = new Shell(args);
            vshell.Run();
        }
    }
}