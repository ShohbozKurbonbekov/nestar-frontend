"use client";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";
import { Direction, Message } from "@/libs/enums/common.enum";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { T } from "@/libs/types/common";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import ArticlesCategory from "../_components/ArticlesCategory";
import PublicArticleSkeleton from "@/components/skeletons/PublicArticlesSkeleton";
import Emty from "@/components/ui/Emty";
import PublicArticleCard from "@/components/ui/PublicArticleCard";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetArticle } from "@/services/Article.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

const wrapperClasses =
  "my-10 max-w-8xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";

// ------------------------------------ Component ------------------------------------
export default function Community() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articlesInput = {
    limit: 8,
    page: Number(searchParams.get("page") ?? 1),
    search: {
      articleCategory:
        (searchParams.get("category") as BoardArticleCategory) ??
        BoardArticleCategory.FREE,
      text: searchParams.get("search") ?? "",
    },
    direction: Direction.DESC,
    sort: searchParams.get("sort") ?? "createdAt",
  };
  console.log("INPUT: ", articlesInput);
  const [articles, setArticles] = useState<BoardArticle[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  //*************************************************Apollo Fetch //************************************************* */
  const {
    loading: articlesLoading,
    data: articlesData,
    error: articlesError,
    refetch: articlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: articlesInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setArticles(data?.getBoardArticles?.list);
      setTotalArticles(data?.getBoardArticles?.metaCounter[0]?.total);
    },
  });

  const handlePaginationChange = async (_: any, value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(value));

    router.push(
      `/community?${params.toString()}`,

      {
        scroll: false,
      },
    );
  };

  const likeArticleHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetArticle(id);
        articlesRefetch({ input: articlesInput });

        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likeArticleHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [articlesRefetch, articlesInput],
  );

  return (
    <section className="py-20">
      <ArticlesCategory
        category={articlesInput?.search?.articleCategory}
        search={articlesInput?.search?.text}
        sort={articlesInput?.sort}
      />
      {articlesLoading ? (
        <PublicArticleSkeleton wrapperClasses={wrapperClasses} columns={4} />
      ) : articles.length ? (
        <>
          <div className={wrapperClasses}>
            {articles.map((article) => (
              <PublicArticleCard
                article={article}
                likeArticleHandler={likeArticleHandler}
              />
            ))}
          </div>
          <div className="max-w-8xl px-4 mx-auto mt-10 flex justify-center">
            <Pagination
              count={Math.ceil(totalArticles / articlesInput?.limit) ?? 1}
              variant="outlined"
              page={articlesInput?.page ?? 1}
              size="large"
              sx={{
                ".MuiPagination-ul": {
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px 5px",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .mui-69t2hf-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                  {
                    backgroundColor: "#CBD5E1CC",
                  },
              }}
              onChange={(e, value) => handlePaginationChange(e, value)}
            />
          </div>
        </>
      ) : (
        <Emty title="No articles" />
      )}
    </section>
  );
}
