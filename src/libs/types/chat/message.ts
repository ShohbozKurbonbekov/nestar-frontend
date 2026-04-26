import { ChatMessageStatus } from "@/libs/enums/chat.enum";

export interface ChatMessage {
  _id: string;
  userId: string;
  messageStatus: ChatMessageStatus;
  messageReportedBy: string[];
  message: string;
  messageReports: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessagesInput {
  before?: string;
  limit?: number;
}

export interface Messages {
  messages: ChatMessage[];
  hasMore: boolean;
}

interface SystemJoinLeaveUser {
  nick: string;
  id: string;
}

export interface SystemJoinLeave {
  user: SystemJoinLeaveUser;
  message: string;
}

export interface PresenceUpdate {
  totalOnlineUsers: number;
}
