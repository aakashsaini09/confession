// pages/api/socket.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | undefined;
let liveUsers = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const socketWithServer = res.socket as typeof res.socket & {
    server: HTTPServer & { io?: SocketIOServer };
  };

  // if server not started, create it once
  if (!socketWithServer.server.io) {
    io = new SocketIOServer(socketWithServer.server, {
      path: "/api/socket",
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    io.on("connection", (socket) => {
      liveUsers++;
      console.log("✅ User connected:", socket.id);

      io?.emit("users-count", liveUsers);

      socket.on("chat-message", (text: string) => {
        const message = { id: socket.id, text };
        console.log("💬 Message:", message);
        io?.emit("chat-message", message);
      });

      socket.on("disconnect", () => {
        liveUsers--;
        console.log("❌ User disconnected:", socket.id);
        io?.emit("users-count", liveUsers);
      });
    });

    socketWithServer.server.io = io;
    console.log("🚀 Socket.io server started");
  }

  res.end(); // nothing to render
}
