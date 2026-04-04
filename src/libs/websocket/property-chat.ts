"use client";

import { io, Socket } from "socket.io-client";

type MessagePayload = {
  conversationId: string;
  message: string;
  senderId: string;
  receiverId: string;
};

class PropertyChatSocket {
  private socket: Socket | null = null;

  connect(callback?: () => void) {
    if (this.socket) return;

    this.socket = io(process.env.NEXT_APP_API_WS ?? "http://127.0.0.1:3006", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 30000,
    });

    this.socket.on("connect", () => {
      console.log("Socket Connected:", this.socket?.id);
      callback?.();
    });
  }

  joinConversation(conversationId: string) {
    this.socket?.emit("property:joinConversation", conversationId);
  }

  sendMessage(payload: { conversationId: string; msg: string }) {
    this.socket?.emit("property:sendMessage", payload);
  }

  onNewMessage(callback: (data: any) => void) {
    this.socket?.on("property:newMessage", callback);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const propertyChatSocket = new PropertyChatSocket();
