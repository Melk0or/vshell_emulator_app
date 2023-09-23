using System.IO.Compression;

namespace VShell
{
    public class Shell
    {
        private string currentDirectory;
        private string[] args;

        public Shell(string[] args)
        {

            currentDirectory = "/";
            this.args = args;
        }

        public void Run()
        {
            while (true)
            {
                Console.Write($"{currentDirectory}$ ");
                string? input = Console.ReadLine();

                if (input == "exit")
                {
                    break;
                }

                string[] commandParts = input.Split(' ');

                switch (commandParts[0])
                {
                    case "pwd":
                        {
                            PrintWorkingDirectory();
                            break;
                        }
                    case "ls":
                        {
                            ListFiles();
                            break;
                        }
                    case "cd":
                        {
                            ChangeDirectory(commandParts[1]);
                            break;
                        }
                    case "cat":
                        {
                            ReadFile(commandParts[1]);
                            break;
                        }
                    default:
                        {
                            Console.WriteLine("Unknown command");
                            break;
                        }
                }
            }
        }

        private void PrintWorkingDirectory()
        {
            Console.WriteLine(currentDirectory);
        }

        private void ListFiles()
        {
            using (ZipArchive archive = ZipFile.OpenRead(args[0]))
            {
                foreach (var target in archive.Entries)
                {
                    if ((currentDirectory + target.Name) == ("/" + target.FullName))
                    {
                        if (target.FullName.EndsWith("/"))
                        {
                            Console.ForegroundColor = ConsoleColor.Blue;
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Gray;
                        }
                        Console.Write($"{target.FullName} ");
                    }
                }
                Console.WriteLine();
            }
        }

        private void ChangeDirectory(string directory)
        {
            string newDirectory = Path.Combine(currentDirectory, directory);

            if (Directory.Exists(newDirectory))
            {
                currentDirectory = newDirectory;
            }
            else
            {
                Console.WriteLine("Directory not found.");
            }
        }

        private void ReadFile(string file)
        {
            string filePath = Path.Combine(currentDirectory, file);

            if (File.Exists(filePath))
            {
                string content = File.ReadAllText(filePath);
                Console.WriteLine(content);
            }
            else
            {
                Console.WriteLine("File not found.");
            }
        }
    }
}
