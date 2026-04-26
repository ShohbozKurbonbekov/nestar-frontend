import { useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";

import SendRounded from "@mui/icons-material/SendRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import { chatSocket } from "@/services/Chat.service";

export default function ChatInput({ setMessages, startChat }: any) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    chatSocket.sendNewMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="p-3 bg-white border-t border-gray-100">
      {!startChat && (
        <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
          <ChatBubbleOutlineRounded />
          <Typography fontSize={13}>
            Press{" "}
            <span className="font-medium text-gray-500">Start Chatting</span> to
            join the conversation
          </Typography>
        </div>
      )}

      {startChat && (
        <div className="flex gap-2">
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#f1f5f9",
                borderRadius: "12px",
              },
            }}
          />

          <IconButton
            onClick={handleSend}
            sx={{
              bgcolor: "#16a34a",
              color: "white",
              "&:hover": {
                bgcolor: "#15803d",
              },
            }}
          >
            <SendRounded />
          </IconButton>
        </div>
      )}
    </Box>
  );
}
