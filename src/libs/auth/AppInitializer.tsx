"use client";
import { ReactNode, useEffect } from "react";
import { initializeAuth } from ".";
import { authInitializedVar } from "@/apollo/store";

export default function AppInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeAuth();
    authInitializedVar(true);
  }, []);

  return <>{children}</>;
}
