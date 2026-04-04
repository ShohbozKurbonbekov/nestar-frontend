"use client";

import { propertyChatSocket } from "@/libs/websocket/property-chat";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function ChatTest() {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    propertyChatSocket.connect(() => {
      propertyChatSocket.joinConversation("test123");
    });

    propertyChatSocket.onNewMessage((msg) => {
      console.log("New Message:", msg);
    });

    return () => {
      propertyChatSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    propertyChatSocket.sendMessage({
      conversationId: "test123",
      msg: text.trim(),
    });

    setText("");
  };

  return (
    <input
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      className="bg-white text-gray-900 ml-3 border px-3 py-2"
      placeholder="Type a message"
    />
  );
}
