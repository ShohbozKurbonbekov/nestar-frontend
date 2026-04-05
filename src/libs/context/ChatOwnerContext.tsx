import { createContext, useContext } from "react";

// Type
export type ChatOwnerContextType = {
  chatOwnerImage: string | undefined;
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
