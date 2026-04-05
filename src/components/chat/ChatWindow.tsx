"use client";

import { Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  open,
  setOpen,
  messages,
  setMessages,
  isOnline,
}: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-0 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[91%] sm:w-auto px-2 sm:px-0"
        >
          <Paper
            elevation={8}
            className="w-full sm:w-105 h-[70vh] sm:h-150 rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
          >
            <ChatHeader setOpen={setOpen} isOnline={isOnline} />

            <ChatMessages messages={messages} />

            <ChatInput setMessages={setMessages} />
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
