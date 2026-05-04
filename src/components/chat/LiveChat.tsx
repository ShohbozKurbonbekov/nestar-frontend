"use client";

import { useState } from "react";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow";

export default function PublicLiveChat() {
  const [open, setOpen] = useState(false);
  const [startChat, setStartChat] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  return (
    <>
      <ChatFloatingButton setOpen={setOpen} />

      <ChatWindow
        startChat={startChat}
        setStartChat={setStartChat}
        open={open}
        setOpen={setOpen}
        setOnlineUsers={setOnlineUsers}
        onlineUsers={onlineUsers}
      />
    </>
  );
}
