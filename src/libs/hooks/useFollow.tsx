import { SUBSCRIBE, UNSUBSCRIBE } from "@/apollo/user/mutation";
import {
  GET_MEMBER_FOLLOWERS,
  GET_MEMBER_FOLLOWINGS,
} from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { URLSearchParams } from "url";

interface UseFollowType {
  memberId?: string;
  searchParams: URLSearchParams;
}

export function useFollow({ searchParams, memberId }: UseFollowType) {
  const tab = searchParams.get("tab");
  // Input
  const input = React.useMemo(() => {
    return {
      limit: 5,
      page: Number(searchParams.get("page")) || 1,
      search: {
        ...(tab === "followers" ? { followingId: memberId } : {}),
        ...(tab === "followings" ? { followerId: memberId } : {}),
      },
    };
  }, [searchParams, memberId]);
  console.log("IUnput: ", input);

  // Query

  const targetQuery =
    tab === "followers" ? GET_MEMBER_FOLLOWERS : GET_MEMBER_FOLLOWINGS;
  const { data, loading, refetch } = useQuery(targetQuery, {
    variables: { input },
    skip: !memberId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchFollows = useCallback(async () => {
    await refetch({
      input,
    });
  }, [input, refetch]);

  return {
    follows:
      tab === "followers"
        ? data?.getMemberFollowers?.list
        : data?.getMemberFollowings?.list ?? [],
    totalFollows:
      tab === "followers"
        ? data?.getMemberFollowers?.metaCounter?.[0]?.total ?? 0
        : data?.getMemberFollowings?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchFollows,
    query: input,
  };
}
