"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import Image from "next/image";

import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { serverApi } from "@/libs/config";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { useRouter } from "next/navigation";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getBaseUrl } from "@/libs/utils/getBaseUrl";

interface PublicArticleCardType {
  article: BoardArticle;
  likeArticleHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
}

export default function PublicArticleCard({
  article,
  likeArticleHandler,
}: PublicArticleCardType) {
  const router = useRouter();
  const imageUrl = article?.articleImage
    ? `${getBaseUrl()}/${article.articleImage}`
    : "/images/default-blog.png";
  const preview = article.articleContent
    .replace(/<[^>]*>?/gm, "")
    .slice(0, 120);
  const user = useReactiveVar(userVar);

  return (
    <Card
      className="rounded-2xl overflow-hidden  hover:shadow-xl transition-all duration-300 bg-white group
    "
    >
      <div
        className="hover:cursor-pointer"
        onClick={() =>
          router.push(`/community/${article._id}`, { scroll: true })
        }
      >
        {/* IMAGE */}
        <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
          <Image
            fill
            src={imageUrl}
            alt={article?.articleTitle}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105
            "
          />

          {/* CATEGORY BADGE */}
          <Chip
            label={article.articleCategory}
            size="small"
            className="absolute top-3 left-3 bg-white text-gray-700 font-semibold"
          />
        </div>

        {/* CONTENT */}
        <CardContent className="space-y-4">
          {/* TITLE */}
          <Typography
            variant="h6"
            className="text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors
          "
          >
            {article.articleTitle}
          </Typography>

          {/* PREVIEW */}
          <Typography variant="body2" className="text-gray-600 line-clamp-3">
            {preview}...
          </Typography>

          {/* AUTHOR */}
          <div className="flex items-center gap-3">
            <Avatar
              src={
                article?.memberData?.memberImage
                  ? `${serverApi}/${article?.memberData?.memberImage}`
                  : `/images/default-user.png`
              }
              sx={{ width: 34, height: 34 }}
            />

            <div className="flex flex-col text-sm">
              <span className="font-medium text-gray-700">
                {article.memberData?.memberNick || "Anonymous"}
              </span>
              <span className="text-gray-400 text-xs">
                {timeFormatter(article?.createdAt)}
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="flex items-center justify-between text-gray-500 text-sm pt-2 border-t border-slate-300/80 px-5">
            <div className="flex items-center gap-1">
              <VisibilityIcon sx={{ fontSize: 18 }} />
              {article.articleViews}
            </div>

            <div className="flex items-center gap-1">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  likeArticleHandler(user, article._id);
                }}
                className="p-1 border border-slate-200"
              >
                {article?.meLiked?.[0]?.myFavorite ? (
                  <FavoriteIcon
                    sx={{ fontSize: 18 }}
                    className="text-red-500 cursor-pointer"
                  />
                ) : (
                  <FavoriteBorder
                    sx={{ fontSize: 18 }}
                    className="text-red-500 cursor-pointer"
                  />
                )}
              </IconButton>
              {article.articleLikes}
            </div>

            <div className="flex items-center gap-1">
              <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
              {article.articleComments}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
