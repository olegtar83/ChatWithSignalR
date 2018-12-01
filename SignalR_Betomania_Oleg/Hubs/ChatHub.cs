using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace SignalRChat
{

    public class ChatHub : Hub
    {
        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public void Send(string name, string message, string connID)
        {
             // Call the broadcastMessage method to update clients.
              Clients.Group(name).ReceiveMessage(message);
           
        }

        public void AddGroup(string group, string connID)
        {
            Groups.Add(connID, group);
        }
    


    }
}