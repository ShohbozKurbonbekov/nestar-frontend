"use client";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { URLSearchParams } from "url";
import { Direction } from "../enums/common.enum";
import { userVar } from "@/apollo/store";
import { MemberType } from "../enums/member.enum";
import { AllBoardArticlesInquiry } from "../types/board-article/board-article.input";
import {
  BoardArticleCategory,
  BoardArticleStatus,
} from "../enums/board-article.enum";
import { GET_ALL_BOARD_ARTICLES_BY_ADMIN } from "@/apollo/admin/query";

interface UseAdminCommunityType {
  searchParams: URLSearchParams;
}

export function useAdminCommunity({ searchParams }: UseAdminCommunityType) {
  const user = useReactiveVar(userVar);
  const communityInquery: AllBoardArticlesInquiry = useMemo(() => {
    return {
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
      direction: Direction.DESC,
      sort: "createdAt",
      search: {
        ...(!!searchParams.get("articleStatus")
          ? {
              articleStatus: searchParams.get(
                "articleStatus",
              ) as BoardArticleStatus,
            }
          : {}),
        ...(!!searchParams.get("articleCategory")
          ? {
              articleCategory: searchParams.get(
                "articleCategory",
              ) as BoardArticleCategory,
            }
          : {}),
        ...(!!searchParams.get("articleTitle")
          ? { articleTitle: searchParams.get("articleTitle") as string }
          : {}),
      },
    };
  }, [searchParams]);

  // Query
  const { data, loading, refetch } = useQuery(GET_ALL_BOARD_ARTICLES_BY_ADMIN, {
    variables: { input: communityInquery },
    skip: user?.memberType !== MemberType.ADMIN,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchAdminCommunity = useCallback(async () => {
    await refetch({
      input: communityInquery,
    });
  }, [communityInquery, refetch]);

  return {
    adminCommunityList: data?.getAllBoardArticlesByAdmin?.list ?? [],
    totalAdminCommunity:
      data?.getAllBoardArticlesByAdmin?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchAdminCommunity,
    query: communityInquery,
  };
}
