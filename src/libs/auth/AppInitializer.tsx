"use client";
import { ReactNode, useEffect } from "react";
import { initializeAuth } from ".";
import { authInitializedVar } from "@/apollo/store";
import { chatSocket } from "@/services/Chat.service";

export default function AppInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeAuth();
    authInitializedVar(true);

    chatSocket.connect();

    return () => {
      chatSocket.disconnect();
    };
  }, []);

  return <>{children}</>;
}
