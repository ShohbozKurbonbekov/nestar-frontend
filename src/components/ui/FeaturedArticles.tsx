"use client";

import Image from "next/image";
import { Card, CardActionArea, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { serverApi } from "@/libs/config";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Emty from "@/components/ui/Emty";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
interface FeaturedArticlesType {
  featuredArticles: BoardArticle[];
}

// ----------------------------------- Component -----------------------------------
const FeaturedArticles: React.FC<FeaturedArticlesType> = React.memo(
  ({ featuredArticles }) => {
    const router = useRouter();
    // ---------------------------------- Handlers -----------------------------------
    const stripHtml = (html: string) => {
      return html.replace(/<[^>]+>/g, "");
    };
    // ---------------------------------Render  -----------------------------------
    return (
      <div className="w-full border border-slate-300/80 rounded-2xl p-5 lg:p-6 bg-white">
        {/* Title */}
        <div className="my-5 text-center">
          <Typography variant="h4" className="text-slate-800">
            Featured Articles
          </Typography>
        </div>

        {featuredArticles.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {featuredArticles.map((article) => (
              <Card
                key={article._id}
                className="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-none"
              >
                <CardActionArea
                  onClick={() =>
                    router.push(`/community/${article._id}`, { scroll: true })
                  }
                  className="flex items-stretch border border-slate-200"
                >
                  {/* IMAGE */}
                  <div className="relative w-28  sm:w-32 shrink-0 overflow-hidden">
                    <Image
                      src={
                        article?.articleImage
                          ? `${serverApi}/${article?.articleImage}`
                          : "/images/default-blog.png"
                      }
                      alt={article?.articleTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-r  from-black/40 to-black/10" />

                    {/* TOP AGENT BADGE */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                      <ElectricBoltIcon className="text-amber-500 text-sm" />
                      <span className="text-[10px] font-semibold text-slate-700">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                      <Typography
                        variant="body2"
                        className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                      >
                        {article?.articleTitle}
                      </Typography>

                      <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                        <AccessTimeRoundedIcon className="text-sm" />
                        {new Date(article.createdAt).toLocaleDateString()}
                      </div>

                      {/* Description */}
                      <Typography
                        variant="caption"
                        className="text-slate-500 mt-2 line-clamp-1"
                      >
                        {stripHtml(article.articleContent)}
                      </Typography>
                    </div>

                    {/* STATS */}
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-3 ">
                        <span className="flex items-center gap-1">
                          <VisibilityRoundedIcon className="text-sm" />
                          {article.articleViews}
                        </span>

                        <span className="flex items-center gap-1">
                          <FavoriteRoundedIcon className="text-sm" />
                          {article.articleLikes}
                        </span>

                        <span className="flex items-center gap-1">
                          <ForumRoundedIcon className="text-sm" />
                          {article.articleComments}
                        </span>
                      </div>

                      <OpenInNewRoundedIcon className="text-slate-400 group-hover:text-indigo-500 transition-colors text-lg" />
                    </div>
                  </div>
                </CardActionArea>
              </Card>
            ))}
          </div>
        ) : (
          <Emty title="No featured articles" />
        )}
      </div>
    );
  },
);

export default FeaturedArticles;
