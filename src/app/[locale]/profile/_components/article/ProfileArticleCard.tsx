"use client";

import React from "react";
import Image from "next/image";
import { IconButton, Stack, Typography } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { serverApi } from "@/libs/config";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { useRouter } from "next/navigation";

interface ProfileArticleCardType {
  article: BoardArticle;
  onDelete: (id: string) => Promise<void>;
}
const ProfileArticleCard: React.FC<ProfileArticleCardType> = React.memo(
  ({ article, onDelete }) => {
    const router = useRouter();
    const imageUrl = article?.articleImage
      ? `${serverApi}/${article.articleImage}`
      : "/images/default-blog.png";
    const preview = article.articleContent
      .replace(/<[^>]*>?/gm, "")
      .slice(0, 120);

    const pushWriteArticle = (articleId: string) => {
      if (!articleId) return;
      const setterParams = new URLSearchParams();
      setterParams.set("tab", "writeArticle");
      setterParams.set("articleId", articleId);
      router.replace(`${window.location.pathname}?${setterParams.toString()}`);
    };

    return (
      <div className="w-full overflow-x-auto">
        <Stack direction="row" className="gap-4 min-w-max p-2">
          <Stack
            key={article._id}
            direction="row"
            alignItems="center"
            className="min-w-175 bg-white rounded-xl shadow-sm px-4 py-3 gap-6 border border-gray-200 hover:shadow-md transition"
          >
            {/* IMAGE */}
            <Stack className="w-30 h-20 shrink-0 rounded-lg overflow-hidden relative">
              <Image
                fill
                src={imageUrl}
                alt={article.articleTitle}
                className="object-cover"
              />
            </Stack>

            {/* INFO */}
            <Stack className="min-w-40 max-w-50 overflow-hidden flex flex-col items-start">
              <Typography className="text-sm font-semibold line-clamp-1">
                {article.articleTitle}
              </Typography>
              <Typography className="text-xs text-gray-500 line-clamp-1">
                {preview}
              </Typography>
              <span className="text-[10px] text-blue-700 bg-blue-200 mt-1 px-2 py-0.5 rounded-2xl ">
                {article.articleCategory}
              </span>
            </Stack>

            {/* DATE */}
            <Stack className="min-w-35 shrink-0">
              <Typography className="text-xs text-gray-500">
                {timeFormatter(article.createdAt)}
              </Typography>
            </Stack>

            {/* VIEWS */}
            <Stack className="min-w-25 shrink-0 text-center">
              <Typography className="text-sm">
                {article.articleViews}
              </Typography>
              <Typography className="text-[10px] text-gray-400">
                views
              </Typography>
            </Stack>

            {/* LIKES */}
            <Stack className="min-w-25 shrink-0 text-center">
              <Typography className="text-sm">
                {article.articleLikes}
              </Typography>
              <Typography className="text-[10px] text-gray-400">
                likes
              </Typography>
            </Stack>

            {/* COMMENTS */}
            <Stack className="min-w-25 shrink-0 text-center">
              <Typography className="text-sm">
                {article.articleComments}
              </Typography>
              <Typography className="text-[10px] text-gray-400">
                comments
              </Typography>
            </Stack>

            {/* Actions */}
            <Stack
              direction="row"
              className="min-w-30 shrink-0  justify-end gap-1"
            >
              <IconButton onClick={() => pushWriteArticle(article._id)}>
                <ModeIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => onDelete(article._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </div>
    );
  },
);

export default ProfileArticleCard;
