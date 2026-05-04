"use client";

import { Avatar } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { motion } from "framer-motion";
import { SetStateType } from "@/libs/types/common";

interface ChatFloatingButtonType {
  setOpen: SetStateType<boolean>;
}
export default function ChatFloatingButton({
  setOpen,
}: ChatFloatingButtonType) {
  const onClick = () => {
    setOpen(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        whileHover={{ scale: 1.1 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="relative"
      >
        <motion.div
          className="absolute -inset-2 rounded-full  bg-green-400 blur-xl opacity-30"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        <div className="relative">
          <Avatar
            onClick={onClick}
            className="cursor-pointer shadow-2xl border-4 border-white"
            sx={{
              width: 50,
              height: 50,
              "@media (min-width:640px)": { width: 60, height: 60 },
              bgcolor: "#16a34a",
            }}
          >
            <GroupsRoundedIcon />
          </Avatar>
        </div>
      </motion.div>
    </div>
  );
}
