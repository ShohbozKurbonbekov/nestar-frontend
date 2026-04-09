import {
  ConversationGroupType,
  ConversationStatus,
} from "@/libs/enums/chat.enum";

export interface Conversation {
  _id: string;
  targetId?: string;
  converstationStatus: ConversationStatus;
  conversationGroupType: ConversationGroupType;
  userId: string;
  targetOwnerId?: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  userUnreadCount: number;
  targetOwnerUnreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatJoinData {
  targetId: string;
  targetOwnerId: string;
  roomType: ConversationGroupType;
}
