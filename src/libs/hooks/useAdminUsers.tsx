"use client";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { URLSearchParams } from "url";
import { MembersInquiry } from "../types/member/member.input";
import { Direction } from "../enums/common.enum";
import { GET_ALL_MEMBERS_BY_ADMIN } from "@/apollo/admin/query";
import { userVar } from "@/apollo/store";
import { MemberType } from "../enums/member.enum";

interface UseAdminUsersType {
  searchParams: URLSearchParams;
}

export function useAdminUsers({ searchParams }: UseAdminUsersType) {
  const user = useReactiveVar(userVar);
  const memberInquery = useMemo(() => {
    return {
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
      search: {
        ...(searchParams.get("memberType")
          ? { memberType: searchParams.get("memberType") }
          : {}),
        ...(searchParams.get("memberStatus")
          ? { memberStatus: searchParams.get("memberStatus") }
          : {}),
        ...(searchParams.get("text") ? { text: searchParams.get("text") } : {}),
      },

      direction: Direction.DESC,
      sort: "createdAt",
    };
  }, [searchParams]);

  // Query
  const { data, loading, refetch } = useQuery(GET_ALL_MEMBERS_BY_ADMIN, {
    variables: { input: memberInquery },
    skip: user?.memberType !== MemberType.ADMIN,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchAdminUsers = useCallback(async () => {
    await refetch({
      input: memberInquery,
    });
  }, [memberInquery, refetch]);

  return {
    adminUsers: data?.getAllMembersByAdmin?.list ?? [],
    totalAdminUsers: data?.getAllMembersByAdmin?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchAdminUsers,
    query: memberInquery,
  };
}
