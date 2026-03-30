import { createContext, useContext } from "react";
import { useFollowers } from "../hooks/useFollowers";

// Type
type FollowersContextType = ReturnType<typeof useFollowers>;

export const FollowersContext = createContext<FollowersContextType | null>(
  null
);

export const useFollowersContext = () => {
  const f = useContext(FollowersContext);
  if (!f) {
    throw new Error(
      "useFollowersContext should be wrapped with FollowersProvider"
    );
  }
  return f;
};
