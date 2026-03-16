"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import React from "react";
import { serverApi } from "@/libs/config";
import Image from "next/image";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { useRouter } from "next/navigation";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { FavoriteBorder } from "@mui/icons-material";
import { motion } from "framer-motion";

interface ArticleDetailsType {
  article: BoardArticle;
  likeArticleHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
}

const ArticleDetails: React.FC<ArticleDetailsType> = React.memo(
  ({ article, likeArticleHandler }) => {
    console.log("LIKED ", article.meLiked);
    const router = useRouter();
    const articleImage = article?.articleImage
      ? `${serverApi}/${article.articleImage}`
      : "/images/default-blog.png";
    const member = article?.memberData;
    const user = useReactiveVar(userVar);
    const content = article.articleContent.replace(/<[^>]*>?/gm, "");

    return (
      <>
        <Box className="w-full flex flex-col gap-5">
          {/* COVER IMAGE */}
          <Box className="w-full h-[80vh] rounded-xl overflow-hidden bg-gray-200  relative">
            <Image
              fill
              src={articleImage}
              alt={article.articleTitle}
              className="w-full h-full object-cover object-top"
            />
          </Box>
          {/* STATS */}
          <Box className="flex items-center flex-wrap  justify-between gap-x-5 gap-y-2">
            <Chip
              label={article.articleCategory}
              size="small"
              className="px-4 py-3 bg-blue-100 text-blue-700 font-semibold"
            />
            <div className="flex gap-x-6 gap-y-2 text-gray-600 items-center flex-wrap">
              <Box className="flex items-center gap-1">
                <VisibilityIcon fontSize="small" />
                <Typography>{article.articleViews}</Typography>
              </Box>

              <Box className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 1.25 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    likeArticleHandler(user, article._id);
                  }}
                >
                  {article?.meLiked?.[0]?.myFavorite ? (
                    <FavoriteIcon
                      fontSize="small"
                      className="text-red-500 cursor-pointer"
                    />
                  ) : (
                    <FavoriteBorder
                      fontSize="small"
                      className="text-red-500 cursor-pointer"
                    />
                  )}
                </motion.button>
                <Typography>{article.articleLikes}</Typography>
              </Box>

              <Box className="flex items-center gap-1">
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography>{article.articleComments}</Typography>
              </Box>

              <Typography className="text-sm text-gray-400">
                {timeFormatter(article.createdAt)}
              </Typography>
            </div>
          </Box>

          <Typography variant="h4" className="leading-snug">
            {article.articleTitle}
          </Typography>

          {/* CONTENT */}
          <Typography variant="caption" className="text-base text-slate-500">
            {content}
          </Typography>

          <div className="mt-3">
            <div className="flex items-center gap-4">
              <Avatar
                src={
                  member?.memberImage
                    ? `${serverApi}/${member?.memberImage}`
                    : "/images/default-user.png"
                }
                sx={{ width: 64, height: 64 }}
              />

              <Box className="flex flex-col flex-1 items-start">
                <Button
                  className="p-0 bg-transparent capitalize hover:text-blue-300 transition"
                  onClick={() => router.push(`/my-profile`, { scroll: true })}
                >
                  {member?.memberFullName}
                </Button>

                <Typography className="text-sm text-gray-500">
                  @{member?.memberNick}
                </Typography>

                <Box className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <LocationOnIcon fontSize="small" />
                  {member?.memberAddress}
                </Box>
              </Box>
            </div>
          </div>
        </Box>
        {/* AUTHOR */}
      </>
    );
  },
);

export default ArticleDetails;
