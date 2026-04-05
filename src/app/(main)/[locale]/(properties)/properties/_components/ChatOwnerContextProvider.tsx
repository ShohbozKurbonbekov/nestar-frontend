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
  // Mutation

  // Handlers

  return (
    <ChatOwnerContext.Provider value={data}>
      {children}
    </ChatOwnerContext.Provider>
  );
}

export default ChatOwnerContextProvider;
