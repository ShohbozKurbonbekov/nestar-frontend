"use client";

import { Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { SetStateType } from "@/libs/types/common";
import { ChatMessage } from "@/libs/types/chat/message";

interface ChatWindowType {
  open: boolean;
  startChat: boolean;
  setStartChat: SetStateType<boolean>;
  setOpen: SetStateType<boolean>;
  onlineUsers: number;
  setOnlineUsers: SetStateType<number>;
}
export default function ChatWindow({
  open,
  startChat,
  setStartChat,
  setOpen,
  onlineUsers,
  setOnlineUsers,
}: ChatWindowType) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[91%] sm:w-auto px-2 sm:px-0"
        >
          <Paper
            elevation={8}
            className="w-full sm:w-105 h-[70vh] sm:h-150 rounded-3xl  overflow-hidden flex flex-col mx-auto"
          >
            <ChatHeader
              open={open}
              startChat={startChat}
              setOpen={setOpen}
              onlineUsers={onlineUsers}
              setStartChat={setStartChat}
              setOnlineUsers={setOnlineUsers}
            />

            <ChatMessages
              startChat={startChat}
              setStartChat={setStartChat}
              setOnlineUsers={setOnlineUsers}
            />

            <ChatInput startChat={startChat} />
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
