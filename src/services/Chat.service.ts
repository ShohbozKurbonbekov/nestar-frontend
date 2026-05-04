"use client";

import { getJwtToken } from "@/libs/auth";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import {
  ChatMessage,
  Messages,
  MessagesInput,
} from "@/libs/types/chat/message";
import { io, Socket } from "socket.io-client";

class ChatSocket {
  private socket: Socket | null = null;
  connect() {
    if (this.socket) return;
    this.socket = io(
      process.env.NEXT_PUBLIC_API_WS ?? "http://127.0.0.1:3006",
      {
        transports: ["websocket"],
        timeout: 30000,
        reconnection: true,
        reconnectionAttempts: 5,
        auth: {
          token: getJwtToken(),
        },
      },
    );

    this.socket.on("connect", () => {
      console.log("Websocket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    this.socket.on("chat:error", (error) => {
      console.log("Chat Error:", error);
      sweetErrorHandling(error ?? "Chat error");
    });
  }

  chatInit(event: "chat:init", callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  removeChatInit() {
    this.socket?.off("chat:init");
  }

  sendMessage(event: "message:new", callback: (data: ChatMessage) => void) {
    this.socket?.on(event, callback);
  }
  removeSendMessage() {
    this.socket?.off("message:new");
  }

  getOldMessages(event: "message:older", callback: (data: Messages) => void) {
    this.socket?.on(event, callback);
  }
  removeGetOldMessages() {
    this.socket?.off("message:older");
  }

  sendNewMessage(data: string) {
    this.socket?.emit("message:send", { message: data });
  }

  loadMore(data: MessagesInput) {
    this.socket?.emit("message:loadMore", data);
  }

  joinSystem(event: "system:join", callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  leaveSystem(event: "system:leave", callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }
  removeSystemLeave() {
    this.socket?.off("system:leave");
  }

  removeJoinSystem() {
    this.socket?.off("system:join");
  }

  presenceUpdate(event: "presence:update", callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  removePresenceUpdate() {
    this.socket?.off("presence:update");
  }

  disconnect() {
    if (!this.socket) return;
    console.log("Disconnected");
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const chatSocket = new ChatSocket();
