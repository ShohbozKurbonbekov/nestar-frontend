"use client";
import { ReactNode, useEffect } from "react";
import { initializeAuth } from ".";

export default function AppInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return children;
}
