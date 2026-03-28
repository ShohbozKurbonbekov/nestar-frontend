"use client";

import { userVar } from "@/apollo/store";
import { UPDATE_BOARD_ARTICLE } from "@/apollo/user/mutation";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import { Direction } from "@/libs/enums/common.enum";
import { PropertySort } from "@/libs/enums/property.enum";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { T } from "@/libs/types/common";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, Pagination, Divider } from "@mui/material";
import ProfileContentHeader from "../ProfileContentHeader";
import Emty from "@/components/ui/Emty";
import ProfilePropertyCardsSkeleton from "@/components/skeletons/ProfilePropertyCardsSkeleton";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { BoardArticleStatus } from "@/libs/enums/board-article.enum";
import ProfileArticleCard from "../article/ProfileArticleCard";
import { Member } from "@/libs/types/member/member";
import React from "react";

interface MyArticlesType {
  member: Member | null;
  isOwner: boolean;
}
const MyArticles: React.FC<MyArticlesType> = React.memo(
  ({ member, isOwner }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [myArticles, setMyArticles] = useState<BoardArticle[]>([]);
    const [totalArticles, setTotalArticles] = useState<number>(0);
    const user = useReactiveVar(userVar);

    const myArticlesInquiry: BoardArticlesInquiry = useMemo(() => {
      return {
        limit: 4,
        page: Number(searchParams.get("page")) || 1,
        search: {
          memberId: isOwner ? user._id : member?._id,
        },
        direction: Direction.DESC,
        sort: PropertySort.CREATED_AT,
      };
    }, [searchParams]);

    // ******************************* Apollo  *******************************
    const [updateArticle] = useMutation(UPDATE_BOARD_ARTICLE);

    const {
      loading: boardArticlesLoading,
      data: boardArticlesData,
      error: getBoardArticlesError,
      refetch: boardArticlesRefetch,
    } = useQuery(GET_BOARD_ARTICLES, {
      fetchPolicy: "cache-and-network",
      variables: {
        input: myArticlesInquiry,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data: T) => {
        setMyArticles(data?.getBoardArticles?.list);
        setTotalArticles(data?.getBoardArticles?.metaCounter[0]?.total);
      },
      skip: !user?._id,
    });

    // ******************************* Apollo  End *******************************

    useEffect(() => {
      if (!user?._id) {
        return router.replace("/");
      }
    }, [user, router]);
    // ------------------------------------ Handlers -----------------------------

    const onPage = (e: T, value: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(value));

      router.replace(`?${params.toString()}`);
    };

    const onDelete = useCallback(
      async (id: string) => {
        try {
          if (await sweetConfirmAlert("Are you sure to delete this article?")) {
            await updateArticle({
              variables: {
                input: {
                  _id: id,
                  articleStatus: BoardArticleStatus.DELETE,
                },
              },
            });
            await boardArticlesRefetch({ input: myArticlesInquiry });
          }
        } catch (error: any) {
          await sweetErrorHandling(error);
        }
      },
      [updateArticle, boardArticlesRefetch],
    );

    // ------------------------------------ Render -----------------------------
    return (
      <div className="w-full flex flex-col h-full">
        <ProfileContentHeader
          subtitle="Welcome back — manage your listings efficiently
"
          title="My Properties
"
        />

        <div className="p-4 flex-1 flex flex-col h-full">
          {/* TABLE HEADER (hidden on mobile) */}
          <Stack
            direction="row"
            className="hidden md:flex py-2 text-sm font-semibold text-gray-500 overflow-auto"
          >
            <div className="min-w-70 max-w-80 text-center">Listing</div>
            <div className="min-w-35 shrink-0">Published</div>
            <div className="min-w-25 text-center shrink-0">Views</div>
            <div className="min-w-25 text-center shrink-0">Likes</div>
            <div className="min-w-25 text-center shrink-0">Comments</div>
            <div className="min-w-30 flex flex-row justify-end">Actions</div>
          </Stack>

          <Divider />

          {/* LIST */}
          <Stack className="mt-6 mb-4 gap-3 ">
            {boardArticlesLoading ? (
              <ProfilePropertyCardsSkeleton />
            ) : !myArticles.length ? (
              <Emty title="No articles" />
            ) : (
              myArticles.map((article) => (
                <ProfileArticleCard
                  key={article._id}
                  onDelete={onDelete}
                  article={article}
                />
              ))
            )}
          </Stack>
          <Stack className="flex-1 flex flex-col justify-end  w-full">
            <div className="flex justify-center border-t border-slate-300/80 pt-5">
              {!!myArticles.length && (
                <Pagination
                  count={Math.ceil(totalArticles / myArticlesInquiry.limit)}
                  variant="outlined"
                  page={myArticlesInquiry?.page ?? 1}
                  size="large"
                  sx={{
                    ".MuiPagination-ul": {
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px 5px",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected":
                      {
                        backgroundColor: "#CBD5E1CC",
                      },
                  }}
                  onChange={(e, value) => onPage(e, value)}
                />
              )}
            </div>
          </Stack>
        </div>
      </div>
    );
  },
);

export default MyArticles;
