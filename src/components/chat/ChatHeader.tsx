import { Avatar, Box, Typography, IconButton } from "@mui/material";

import CloseRounded from "@mui/icons-material/CloseRounded";
import SupportAgentRounded from "@mui/icons-material/SupportAgentRounded";
import { SetStateType } from "@/libs/types/common";

interface ChatHeaderType {
  setOpen: SetStateType<boolean>;
  isChatOwnerOnline: boolean;
}
export default function ChatHeader({
  setOpen,
  isChatOwnerOnline,
}: ChatHeaderType) {
  return (
    <Box className="bg-linear-to-r from-green-600 to-emerald-500 text-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar sx={{ bgcolor: "white", color: "#16a34a" }}>
              <SupportAgentRounded />
            </Avatar>

            {isChatOwnerOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            )}
          </div>

          <div>
            <Typography variant="h6">Property Agent</Typography>

            <Typography fontSize={12}>
              {isChatOwnerOnline ? "Online now" : "Offline"}
            </Typography>
          </div>
        </div>

        <IconButton onClick={() => setOpen(false)}>
          <CloseRounded className="text-white" />
        </IconButton>
      </div>
    </Box>
  );
}
