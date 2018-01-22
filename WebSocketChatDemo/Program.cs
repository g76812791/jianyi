using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebSocketChatDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            SimpleWebsocket simpleWebsocket = new SimpleWebsocket();
            
            simpleWebsocket.Start();
            Console.WriteLine("Press 'q' To Exit");

            while ('q' == Console.ReadKey().KeyChar)
            {
                simpleWebsocket.Stop();
            }
        }
    }
}
