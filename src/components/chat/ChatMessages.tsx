import {
  Box,
  Avatar,
  Fade,
  Divider,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import PersonRounded from "@mui/icons-material/PersonRounded";
import { chatSocket } from "@/services/Chat.service";
import { sweetErrorAlert } from "@/libs/sweetAlert";
import { Message } from "@/libs/enums/common.enum";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  ChatMessage,
  Messages,
  PresenceUpdate,
  SystemJoinLeave,
} from "@/libs/types/chat/message";
import { SetStateType } from "@/libs/types/common";
import { timeFormatter } from "@/libs/utils/timeFormatter";

type ChatItem =
  | {
      type: "message";
      id: string;
      sender: string;
      text: string;
      createdAt: string;
    }
  | { type: "system"; id: string; text: string };

interface ChatMessagesType {
  startChat: boolean;
  setStartChat: SetStateType<boolean>;
  setOnlineUsers: SetStateType<number>;
}
export default function ChatMessages({
  startChat,
  setStartChat,
  setOnlineUsers,
}: ChatMessagesType) {
  const [loading, setLoading] = useState<boolean>(true);
  const user = useReactiveVar(userVar);
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight + 50;
  };

  const loadMore = () => {
    if (!hasMore || !chatItems.length) return;

    const oldest = chatItems.find((i) => i.type === "message");

    oldest && chatSocket.loadMore({ before: oldest.createdAt });
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el || !hasMore) return;
    if (el.scrollTop < 50) {
      loadMore();
    }
  };

  const onClick = () => {
    if (!user._id) {
      return sweetErrorAlert(Message.NOT_AUTHENTICATED);
    }

    setStartChat(true);
    chatSocket.connect();
    chatSocket.chatInit("chat:init", (data: Messages) => {
      setChatItems(
        data.messages.map((msg: any) => ({
          type: "message",
          id: msg._id,
          sender: msg.userId,
          text: msg.message,
          createdAt: msg.createdAt,
        })),
      );
      setLoading(false);
      setHasMore(data.hasMore);
    });

    chatSocket.sendMessage("message:new", (data: ChatMessage) => {
      setChatItems((prev: any) => {
        const updated = [
          ...prev,
          {
            type: "message",
            createdAt: data.createdAt,
            id: data._id,
            sender: data.userId,
            text: data.message,
          },
        ];

        setTimeout(() => {
          scrollToBottom();
        }, 0);

        return updated;
      });
    });

    chatSocket.joinSystem("system:join", (data: SystemJoinLeave) => {
      setChatItems((prev: any) => {
        const updated = [
          ...prev,
          { type: "system", id: uuidv4(), text: data.message },
        ];

        setTimeout(() => {
          scrollToBottom();
        }, 0);

        return updated;
      });
    });

    chatSocket.leaveSystem("system:leave", (data: SystemJoinLeave) => {
      setChatItems((prev: any) => {
        const updated = [
          ...prev,
          { type: "system", id: uuidv4(), text: data.message },
        ];

        setTimeout(() => {
          scrollToBottom();
        }, 0);

        return updated;
      });
    });

    chatSocket.getOldMessages("message:older", (data: Messages) => {
      setChatItems((prev: any) => [
        ...data.messages.map((msg: ChatMessage) => ({
          type: "message",
          createdAt: msg.createdAt,
          id: msg._id,
          sender: msg.userId,
          text: msg.message,
        })),
        ...prev,
      ]);
      setHasMore(data.hasMore);
    });

    chatSocket.presenceUpdate("presence:update", (data: PresenceUpdate) => {
      setOnlineUsers(data.totalOnlineUsers);
    });
  };

  return (
    <>
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 relative"
        sx={{
          background: "linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)",
        }}
      >
        <Box className="flex flex-col">
          {!startChat && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "#10b981",
                  mb: 2,
                }}
              >
                <PersonRounded sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography variant="h6" fontWeight={600} gutterBottom>
                Welcome to Public Chat
              </Typography>

              <Typography fontSize={14} className="text-gray-500 mb-6">
                Join the conversation and see what others are talking about in
                real-time.
              </Typography>

              <Button
                variant="contained"
                onClick={onClick}
                className="bg-green-500 hover:bg-green-600 rounded-full px-6 py-2 shadow-md capitalize"
              >
                Start Chatting
              </Button>
            </div>
          )}

          {startChat && (
            <Box className="flex flex-col">
              {loading ? (
                <div className="flex justify-center mt-2 mb-4">
                  <CircularProgress size={18} thickness={5} />
                </div>
              ) : chatItems.length ? (
                chatItems.map((item, i) => {
                  if (item.type === "system") {
                    return (
                      <div key={i} className="flex justify-center my-2">
                        <div className="px-4 py-2 text-xs text-gray-200 bg-gray-600/70 rounded-full">
                          {item.text}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Fade key={item.id} in timeout={400}>
                      <div
                        className={`flex gap-2 items-end my-2  ${
                          item.sender === user._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {item.sender !== user._id && (
                          <Avatar sx={{ width: 30, height: 30 }}>
                            <GroupsRounded sx={{ fontSize: 18 }} />
                          </Avatar>
                        )}

                        <Box className="max-w-[72%] flex flex-col">
                          <Box
                            className={`px-4 py-2 text-sm rounded-4xl ${
                              item.sender === user._id
                                ? "bg-green-500 text-white rounded-br-none self-end"
                                : "bg-white text-gray-800 rounded-bl-none self-start"
                            }`}
                          >
                            {item.text}
                          </Box>

                          {/* Timestamp */}
                          <Typography
                            variant="caption"
                            className={`mt-1 text-gray-400 ${
                              item.sender === user._id
                                ? "text-right pr-1"
                                : "text-left pl-1"
                            }`}
                          >
                            {timeFormatter(item.createdAt)}
                          </Typography>
                        </Box>
                      </div>
                    </Fade>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="px-4 py-2 text-xs text-gray-400 bg-gray-800/60 rounded-full border border-gray-700 mb-3">
                    No messages yet
                  </div>
                  <p className="text-sm text-gray-500">
                    Start the conversation and send the first message
                  </p>
                </div>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Divider />
    </>
  );
}
