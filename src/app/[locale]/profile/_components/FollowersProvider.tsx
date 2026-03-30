import { FollowersContext } from "@/libs/context/FollowersContext";
import { useFollowers } from "@/libs/hooks/useFollowers";
import { ReactNode } from "react";
import { URLSearchParams } from "url";

interface FollowersProviderType {
  children: ReactNode;
  memberId?: string;
  searchParams: URLSearchParams;
}

function FollowersProvider({
  children,
  searchParams,
  memberId,
}: FollowersProviderType) {
  const values = useFollowers({ searchParams, memberId });
  return (
    <FollowersContext.Provider value={values}>
      {children}
    </FollowersContext.Provider>
  );
}

export default FollowersProvider;
