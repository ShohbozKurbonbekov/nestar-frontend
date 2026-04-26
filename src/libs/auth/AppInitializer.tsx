"use client";
import { ReactNode, useEffect } from "react";
import { initializeAuth } from ".";
import { authInitializedVar } from "@/apollo/store";
import { chatSocket } from "@/services/Chat.service";

export default function AppInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeAuth();
    authInitializedVar(true);

    return () => {
      chatSocket.disconnect();
      chatSocket.removeJoinSystem();
      chatSocket.removePresenceUpdate();
      chatSocket.removeSystemLeave();
      chatSocket.removeChatInit();
      chatSocket.removeSendMessage();
      chatSocket.removeGetOldMessages();
    };
  }, []);

  return <>{children}</>;
}
