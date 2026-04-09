"use client";

import { useEffect, useState } from "react";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow";
import { useChatOwnerContext } from "@/libs/context/ChatOwnerContext";

export default function PropertyLiveChat() {
  const [open, setOpen] = useState(false);
  const { targetOwnerId } = useChatOwnerContext();
  const [isChatOwnerOnline, setChatOwnerOnline] = useState<boolean>(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      text: "👋 Welcome! I'm Daniel. Ask me anything about this property.",
    },
  ]);

  return (
    <>
      <ChatFloatingButton
        setOpen={setOpen}
        isChatOwnerOnline={isChatOwnerOnline}
      />

      <ChatWindow
        open={open}
        setOpen={setOpen}
        messages={messages}
        setMessages={setMessages}
        isOnline={isChatOwnerOnline}
      />
    </>
  );
}
