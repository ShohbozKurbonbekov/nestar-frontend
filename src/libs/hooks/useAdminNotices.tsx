"use client";

import { userVar } from "@/apollo/store";
import { useQuery, useReactiveVar } from "@apollo/client";
import { AllNoticesInquiry } from "../types/notice/notice";
import { useCallback, useMemo } from "react";
import { Direction } from "../enums/common.enum";
import {
  NoticeCategory,
  NoticeSort,
  NoticeStatus,
  NoticeVisibility,
} from "../enums/notice.enum";
import { GET_ALL_NOTICES_BY_ADMIN } from "@/apollo/admin/query";
import { MemberType } from "../enums/member.enum";

interface UseAdminNoticesType {
  searchParams: URLSearchParams;
}

export function useAdminNotices({ searchParams }: UseAdminNoticesType) {
  const user = useReactiveVar(userVar);
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
        ...(searchParams.get("noticeStatus")
          ? {
              noticeStatus: searchParams.get("noticeStatus") as NoticeStatus,
            }
          : {}),
        ...(searchParams.get("noticeCategory")
          ? {
              noticeCategory: searchParams.get(
                "noticeCategory",
              ) as NoticeCategory,
            }
          : {}),
        ...(searchParams.get("noticeVisibility")
          ? {
              noticeVisibility: searchParams.get(
                "noticeVisibility",
              ) as NoticeVisibility,
            }
          : {}),
        ...(searchParams.get("noticeTitle")
          ? { noticeTitle: searchParams.get("noticeTitle") as string }
          : {}),
      },
    };
  }, [searchParams]);
  // Query
  const { data, loading, refetch } = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
    variables: { input: noticeInquery },
    skip: user?.memberType !== MemberType.ADMIN,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchAdminNotices = useCallback(async () => {
    await refetch({
      input: noticeInquery,
    });
  }, [noticeInquery, refetch]);

  return {
    adminNotices: data?.getNoticesByAdmin?.list ?? [],
    totalAdminNotices: data?.getNoticesByAdmin?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchAdminNotices,
    query: noticeInquery,
  };
}
