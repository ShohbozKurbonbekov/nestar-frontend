"use client";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import HomepageArticlesSkeleton from "@/components/skeletons/HomepageArticlesSkeleton";
import ArticleCard from "@/components/ui/ArticleCard";
import BlueHoveredBtn from "@/components/ui/Blue-hovered-btn";
import Emty from "@/components/ui/Emty";
import { Direction } from "@/libs/enums/common.enum";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { T } from "@/libs/types/common";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const initialInput: BoardArticlesInquiry = {
  page: 1,
  limit: 5,
  sort: "articleViews",
  direction: Direction.DESC,
  search: {},
};

export default function HomepageArticles() {
  const [articles, setArticles] = useState<BoardArticle[]>([]);
  const {
    loading: getArticlesLoading,
    data: getArticlesData,
    error: getArticlesError,
    refetch: getArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "network-only",
    variables: {
      input: initialInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setArticles(data?.getBoardArticles?.list);
    },
  });

  if (getArticlesLoading) {
    return <HomepageArticlesSkeleton />;
  }
  return articles.length === 0 ? (
    <Emty title="No Articles" />
  ) : (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="h-64 sm:h-80 md:h-full">
          <ArticleCard
            id={articles[0]?._id}
            variant="main"
            title={articles[0]?.articleTitle}
            author={articles[0]?.memberData?.memberNick}
            category={articles[0]?.articleCategory}
            comments={articles[0]?.articleComments}
            date={articles[0]?.createdAt}
            image={articles[0]?.articleImage}
          />
        </div>
        <div className="grid sm:grid-cols-2  lg:grid-cols-2 gap-4">
          {articles.slice(1).map((article) => (
            <div className="h-64 lg:h-80" key={article._id}>
              <ArticleCard
                id={article?._id}
                variant="vertical"
                title={article?.articleTitle}
                author={article?.memberData?.memberNick}
                category={article?.articleCategory}
                comments={article?.articleComments}
                date={article?.createdAt}
                image={article?.articleImage}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-16 flex justify-center">
        <BlueHoveredBtn
          btnText="browseMore"
          pathname="/community"
          translationTargetText="HomePage"
        />
      </div>
    </>
  );
}
