import { Avatar, Box, Typography, IconButton } from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import { SetStateType } from "@/libs/types/common";
import { chatSocket } from "@/services/Chat.service";

interface ChatHeaderType {
  setOpen: SetStateType<boolean>;
  onlineUsers: number;
  setOnlineUsers: SetStateType<number>;
  setStartChat: SetStateType<boolean>;
}

export default function ChatHeader({
  setOpen,
  onlineUsers,
  setStartChat,
  setOnlineUsers,
}: ChatHeaderType) {
  const onClick = () => {
    setStartChat(false);
    setOnlineUsers(0);
    setOpen(false);
    chatSocket.disconnect();
    chatSocket.removeJoinSystem();
    chatSocket.removePresenceUpdate();
    chatSocket.removeSystemLeave();
    chatSocket.removeChatInit();
    chatSocket.removeSendMessage();
    chatSocket.removeGetOldMessages();
  };
  return (
    <Box className="bg-linear-to-r from-emerald-600 via-green-500 to-teal-500 text-white px-5 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar sx={{ bgcolor: "white", color: "#10b981" }}>
              <GroupsRounded />
            </Avatar>

            {/* Live pulse indicator */}
            <span className="absolute bottom-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-white"></span>
            </span>
          </div>

          <div>
            <Typography variant="body2" fontWeight={600}>
              Public Live Chat
            </Typography>

            <Typography fontSize={12} className="opacity-90">
              {onlineUsers} users online
            </Typography>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <IconButton onClick={onClick}>
          <CloseRounded className="text-white" />
        </IconButton>
      </div>
    </Box>
  );
}
