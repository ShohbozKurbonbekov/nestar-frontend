import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import ArticleCard from "@/components/ui/ArticleCard";
import { Direction } from "@/libs/enums/common.enum";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { T } from "@/libs/types/common";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const initialInput: BoardArticlesInquiry = {
  page: 1,
  limit: 3,
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

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 min-h-175">
      {/* COLUMN 1 */}
      <div className="lg:col-span-5 md:col-span-2">
        {articles?.length && articles[0] ? (
          <ArticleCard article={articles[0]} variant="featured" />
        ) : (
          <div>Blog</div>
        )}
      </div>

      {/* COLUMN 2 */}
      <div className="lg:col-span-3 md:col-span-1 grid grid-rows-2 gap-4">
        {articles
          .filter((_, i) => i === 1 || i === 2)
          .map((article) => (
            <ArticleCard
              article={article}
              key={article._id}
              variant="vertical"
            />
          ))}
      </div>

      {/* COLUMN 3 */}
      <div className="lg:col-span-4 md:col-span-1 grid grid-rows-6 gap-4">
        {articles
          .filter((_, i) => i > 2 && i <= 5)
          .map((article) => (
            <ArticleCard
              article={article}
              key={article._id}
              variant="horizontal"
            />
          ))}
      </div>
    </div>
  );
}
