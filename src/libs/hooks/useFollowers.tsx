import { SUBSCRIBE, UNSUBSCRIBE } from "@/apollo/user/mutation";
import { GET_MEMBER_FOLLOWERS } from "@/apollo/user/query";
import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { URLSearchParams } from "url";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../sweetAlert";

interface UseFollowersType {
  memberId?: string;
  searchParams: URLSearchParams;
}

export function useFollowers({ searchParams, memberId }: UseFollowersType) {
  // Input
  const input = React.useMemo(() => {
    return {
      limit: 5,
      page: Number(searchParams.get("page")) || 1,
      search: {
        followingId: memberId,
      },
    };
  }, [searchParams, memberId]);

  // Query

  const { data, loading, refetch } = useQuery(GET_MEMBER_FOLLOWERS, {
    variables: { input: input },
    skip: !memberId,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Mutation

  const [subscribe] = useMutation(SUBSCRIBE);
  const [unSubscribe] = useMutation(UNSUBSCRIBE);

  // Handlers

  const onFollow = useCallback(
    async (targetId?: string) => {
      if (!targetId) return;
      try {
        await subscribe({
          variables: {
            input: targetId,
          },
        });
        await refetch({ input: input });
        await sweetTopSuccessAlert("Success", 1000);
      } catch (error: any) {
        console.log("Error in onFollow function: ", error.message);
        await sweetErrorHandling(error);
      }
    },
    [subscribe, input]
  );

  const onUnFollow = useCallback(
    async (targetId?: string) => {
      if (!targetId) return;
      try {
        await unSubscribe({
          variables: {
            input: targetId,
          },
        });
        await refetch({ input });
        await sweetTopSuccessAlert("Success", 1000);
      } catch (error: any) {
        console.log("Error in onFollow function: ", error.message);
        await sweetErrorHandling(error);
      }
    },
    [unSubscribe, input]
  );

  return {
    followers: data?.getMemberFollowers?.list ?? [],
    totalFollowers: data?.getMemberFollowers?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetch,
    onFollow,
    onUnFollow,
    query: input,
  };
}
