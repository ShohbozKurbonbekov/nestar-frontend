"use client";

import { useQuery } from "@apollo/client";
import { AllNoticesInquiry } from "../types/notice/notice";
import { useCallback, useMemo } from "react";
import { Direction } from "../enums/common.enum";
import { NoticeCategory, NoticeSort } from "../enums/notice.enum";

import { GET_NOTICES } from "@/apollo/user/query";

interface UsePublicNoticesType {
  searchParams: URLSearchParams;
}

export function usePublicNotices({ searchParams }: UsePublicNoticesType) {
  const noticeInquery: AllNoticesInquiry = useMemo(() => {
    return {
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
      direction:
        searchParams.get("sort") === NoticeSort.OLDEST
          ? Direction.ASC
          : Direction.DESC,
      sort: (searchParams.get("sort") as NoticeSort) ?? NoticeSort.NEWEST,
      search: {
        ...(searchParams.get("noticeCategory")
          ? {
              noticeCategory: searchParams.get(
                "noticeCategory",
              ) as NoticeCategory,
            }
          : {}),
        ...(searchParams.get("noticeTitle")
          ? { noticeTitle: searchParams.get("noticeTitle") as string }
          : {}),
      },
    };
  }, [searchParams]);
  // Query
  const { data, loading, refetch } = useQuery(GET_NOTICES, {
    variables: { input: noticeInquery },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchPublicNotices = useCallback(async () => {
    await refetch({
      input: noticeInquery,
    });
  }, [noticeInquery, refetch]);

  return {
    publicNotices: data?.getNotices?.list ?? [],
    totalPublicNotices: data?.getNotices?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchPublicNotices,
    query: noticeInquery,
  };
}
