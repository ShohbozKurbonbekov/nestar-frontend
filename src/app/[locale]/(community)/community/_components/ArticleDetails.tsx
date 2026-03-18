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
import dynamic from "next/dynamic";
import TViewer from "./TViewer";

interface ArticleDetailsType {
  article: BoardArticle;
  likeArticleHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
  goMemberPage: (id: string) => void;
}

const ArticleDetails: React.FC<ArticleDetailsType> = React.memo(
  ({ article, likeArticleHandler, goMemberPage }) => {
    const member = article?.memberData;
    const user = useReactiveVar(userVar);

    return (
      <>
        <Box className="w-full flex flex-col  items-start gap-5">
          {/* STATS */}
          <Chip
            label={article.articleCategory}
            size="small"
            className="p-4 bg-blue-100 text-blue-700 font-semibold"
          />
          <Typography variant="h4" className="leading-snug">
            {article.articleTitle}
          </Typography>
          <Box className="w-full flex flex-row items-center flex-wrap gap-x-5 gap-y-2 justify-between">
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
            </div>
            <Typography className="text-sm text-gray-400">
              {timeFormatter(article.createdAt)}
            </Typography>
          </Box>

          <TViewer markdown={article?.articleContent} />

          <div className="flex items-center gap-4">
            <Avatar
              src={
                member?.memberImage
                  ? `${serverApi}/${member?.memberImage}`
                  : "/images/default-user.png"
              }
              sx={{ width: 75, height: 75 }}
            />

            <Box className="flex flex-col flex-1 items-start">
              <Button
                className="p-0 bg-transparent capitalize hover:text-blue-300 transition"
                onClick={() => goMemberPage(article?.memberData?._id!)}
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
        </Box>
      </>
    );
  },
);

export default ArticleDetails;
