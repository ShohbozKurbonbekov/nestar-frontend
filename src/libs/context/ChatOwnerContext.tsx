import { createContext, useContext } from "react";
import { ConversationGroupType } from "../enums/chat.enum";
import { SetStateType } from "../types/common";

// Types
export interface MembersStatus {
  isTargetOwnerOnline: boolean;
  isVisitorOnline: boolean;
}

export type ChatOwnerContextType = {
  chatOwnerImage: string | undefined;
  targetId?: string;
  conversationGroupType: ConversationGroupType;
  userId: string;
  targetOwnerId?: string;
};

export const ChatOwnerContext = createContext<ChatOwnerContextType | null>(
  null,
);

export const useChatOwnerContext = () => {
  const f = useContext(ChatOwnerContext);
  if (!f) {
    throw new Error(
      "useChatOwnerContext should be wrapped with ChatOwnerContextProvider",
    );
  }
  return f;
};
