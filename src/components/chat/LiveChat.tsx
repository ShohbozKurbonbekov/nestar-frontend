"use client";

import { useState } from "react";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow";

export default function PropertyLiveChat() {
  const [open, setOpen] = useState(false);
  const [isOnline] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      text: "👋 Welcome! I'm Daniel. Ask me anything about this property.",
    },
  ]);

  return (
    <>
      <ChatFloatingButton setOpen={setOpen} isOnline={isOnline} />

      <ChatWindow
        open={open}
        setOpen={setOpen}
        messages={messages}
        setMessages={setMessages}
        isOnline={isOnline}
      />
    </>
  );
}
