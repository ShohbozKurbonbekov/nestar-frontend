"use client";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";
import { Direction } from "@/libs/enums/common.enum";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { T } from "@/libs/types/common";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import ArticlesCategory from "../_components/ArticlesCategory";

export default function Community() {
  const [articlesInput, setArticlesInput] = useState<BoardArticlesInquiry>({
    limit: 6,
    page: 1,
    search: {
      articleCategory: BoardArticleCategory.FREE,
      text: "",
    },
    direction: Direction.DESC,
    sort: "createdAt",
  });
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

  return (
    <section className="py-20">
      <ArticlesCategory
        articlesInput={articlesInput}
        setArticlesInput={setArticlesInput}
      />
    </section>
  );
}
