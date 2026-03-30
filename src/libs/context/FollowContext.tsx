import { createContext, useContext } from "react";
import { useFollow } from "../hooks/useFollow";

// Type
type FollowContextType = {
  onFollow: (target?: string) => Promise<void>;
  onUnFollow: (target?: string) => Promise<void>;
};

export const FollowContext = createContext<FollowContextType | null>(null);

export const useFollowContext = () => {
  const f = useContext(FollowContext);
  if (!f) {
    throw new Error("useFollowContext should be wrapped with FollowProvider");
  }
  return f;
};
