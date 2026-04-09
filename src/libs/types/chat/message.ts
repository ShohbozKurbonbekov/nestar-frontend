import {
  ChatGroupType,
  ChatMessageStatus,
  ChatMessageType,
} from "@/libs/enums/chat.enum";

export interface ChatMessage {
  _id: string;
  conversationId: string;
  chatGroupType: ChatGroupType;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  messageStatus: ChatMessageStatus;
  messageType: ChatMessageType;
  createdAt: Date;
  updatedAt: Date;
}
