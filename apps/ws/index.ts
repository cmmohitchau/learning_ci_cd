import { prismaClient } from "@mohitprasad004/db/client";

const server = Bun.serve({
  port: 8081,
  fetch(req, server) {
    // Handle the upgrade request or HTTP routes
    if (server.upgrade(req)) return;
    return new Response("WebSocket Server running");
  },
  websocket: {
    open(ws) {
      console.log("Client connected");
    },
    async message(ws, message) {
     
      const data = message;

      const { username , password } = JSON.parse(data.toString());

      if(!username || !password ) return;

      const user = await prismaClient.user.create({
        data : {
            username : username,
            password : password
        }
      })

      ws.send(user.username.toString());
      
    },
    close(ws) {
      console.log("Connection closed");
    }
  }
});

console.log(`Listening on ${server.hostname}:${server.port}`);
