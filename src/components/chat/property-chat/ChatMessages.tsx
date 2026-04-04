import { Box, Avatar, Fade, Divider } from "@mui/material";

import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";

export default function ChatMessages({ messages }: any) {
  return (
    <>
      <Box
        className="flex-1 overflow-y-auto p-4 space-y-4"
        sx={{
          background: "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)",
        }}
      >
        {messages.map((msg: any) => (
          <Fade key={msg.id} in timeout={400}>
            <div
              className={`flex gap-2 items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "agent" && (
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#16a34a",
                  }}
                >
                  <SupportAgentRounded sx={{ fontSize: 18 }} />
                </Avatar>
              )}

              <Box className="flex flex-col max-w-[72%] ">
                <Box
                  className={`px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-green-500 text-white rounded-2xl rounded-br-none"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100"
                  }`}
                >
                  {msg.text}
                </Box>

                <Box
                  className={`text-[10px] text-slate-500 mt-1 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  just now {msg.sender === "user" && "✓ Read"}
                </Box>
              </Box>
            </div>
          </Fade>
        ))}
      </Box>

      <Divider />
    </>
  );
}
