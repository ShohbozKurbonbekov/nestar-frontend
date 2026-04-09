"use client";

import { Avatar } from "@mui/material";
import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";
import { motion } from "framer-motion";
import { SetStateType } from "@/libs/types/common";
import { serverApi } from "@/libs/config";
import { useChatOwnerContext } from "@/libs/context/ChatOwnerContext";

interface ChatFloatingButtonType {
  setOpen: SetStateType<boolean>;
  isChatOwnerOnline: boolean;
}
export default function ChatFloatingButton({
  isChatOwnerOnline,
  setOpen,
}: ChatFloatingButtonType) {
  const { chatOwnerImage, conversationGroupType, targetId, targetOwnerId } =
    useChatOwnerContext();
  const onChat = async () => {
    if (targetId && targetOwnerId) {
    }
  };

  const onClick = () => {
    setOpen(true);
    onChat();
  };

  const imageUrl = chatOwnerImage ? `${serverApi}/${chatOwnerImage}` : "";
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <motion.div
        whileHover={{ scale: 1.08 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="relative"
      >
        <motion.div
          className="absolute -inset-2 rounded-full  bg-green-400 blur-xl opacity-30"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <div className="relative">
          <Avatar
            onClick={onClick}
            className="cursor-pointer shadow-2xl border-4 border-white"
            sx={{
              width: 40,
              height: 40,
              "@media (min-width:640px)": { width: 50, height: 50 },
              bgcolor: "#16a34a",
            }}
            src={imageUrl}
          >
            <SupportAgentRounded />
          </Avatar>

          {isChatOwnerOnline && (
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
