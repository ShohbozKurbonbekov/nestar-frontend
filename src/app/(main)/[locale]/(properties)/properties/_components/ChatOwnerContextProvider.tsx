import {
  ChatOwnerContext,
  ChatOwnerContextType,
} from "@/libs/context/ChatOwnerContext";
import { ReactNode } from "react";

interface ChatOwnerContextProviderType {
  children: ReactNode;
  data: ChatOwnerContextType;
}

function ChatOwnerContextProvider({
  children,
  data,
}: ChatOwnerContextProviderType) {
  return (
    <ChatOwnerContext.Provider value={data}>
      {children}
    </ChatOwnerContext.Provider>
  );
}

export default ChatOwnerContextProvider;
