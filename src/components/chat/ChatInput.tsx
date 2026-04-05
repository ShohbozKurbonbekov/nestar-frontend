import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";

import SendRounded from "@mui/icons-material/SendRounded";

export default function ChatInput({ setMessages }: any) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev: any) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: input,
      },
    ]);

    setInput("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box className="p-3 flex gap-2 bg-white">
      <TextField
        fullWidth
        size="small"
        placeholder="Ask about this property..."
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
    </Box>
  );
}
