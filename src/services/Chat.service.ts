"use client";

import { getJwtToken } from "@/libs/auth";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { io, Socket } from "socket.io-client";

class ChatSocket {
  private socket: Socket | null = null;
  private readonly token = getJwtToken();

  connect() {
    if (this.socket) return;

    this.socket = io(process.env.NEXT_APP_API_WS ?? "http://127.0.0.1:3006", {
      transports: ["websocket"],
      timeout: 30000,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    this.socket.on("connect", () => {
      console.log("Websocket is Connected");

      if (this.token) {
        this.socket?.emit("user:online", this.token);
      }
    });

    this.socket.on("presence:update", (data) => {
      console.log("Presence: ", data);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    this.socket.on("chat:error", (error) => {
      console.error("Chat Error:", error);

      sweetErrorHandling(error.message ?? "Error in chatting");
    });
  }

  authenticate(token: string) {
    this.socket?.emit("user:authenticate", token);
  }

  checkPresence(userId: string) {
    this.socket?.emit("presence:check", userId);
  }

  logout(token: string) {
    this.socket?.emit("user:logout", token);
  }
  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const chatSocket = new ChatSocket();
