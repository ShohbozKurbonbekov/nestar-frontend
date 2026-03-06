"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import VerifiedIcon from "@mui/icons-material/Verified";
import Image from "next/image";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useState } from "react";
import { FavoriteBorder } from "@mui/icons-material";
import { Link } from "@/i18n/navigation";
import { Member } from "@/libs/types/member/member";
import { serverApi } from "@/libs/config";
import BlueHoveredBtn from "./Blue-hovered-btn";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

interface AgentCardType {
  agentFeaturedTag?: React.ReactNode;
  agentLink: string;
  agent: Member;
  likeAgentHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
}
export default function AgentCard({
  agentFeaturedTag,
  agentLink,
  agent,
  likeAgentHandler,
}: AgentCardType) {
  const user = useReactiveVar(userVar);
  const imageUrl = agent?.memberImage
    ? `${serverApi}/${agent.memberImage}`
    : "/images/default-user.png";
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="w-full"
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
        mass: 0.8,
      }}
    >
      <Card className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
        {/* Image Section */}
        <Box className="relative w-full aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={agent.memberNick}
            className="w-full h-full object-cover"
            fill={true}
            loading="lazy"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Ranking Badge */}
          {agentFeaturedTag && agentFeaturedTag}

          {/* Bottom Info Over Image */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-2">
              <Typography variant="h6" className="truncate">
                {agent?.memberNick}
              </Typography>
              <VerifiedIcon fontSize="small" className="text-blue-400" />
            </div>
            <Typography
              variant="body2"
              className="opacity-80 gap-1 flex flex-items truncate"
            >
              <LocationPinIcon fontSize="small" className="text-blue-400" />

              {agent?.memberAddress}
            </Typography>
          </div>
        </Box>

        {/* Content Section */}
        <CardContent className="p-6 space-y-5">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <HomeWorkIcon fontSize="small" />
              <Typography variant="subtitle1" className="font-semibold">
                {agent?.memberProperties ?? 0}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Properties
              </Typography>
            </div>

            <Divider orientation="vertical" flexItem />

            <div className="flex flex-col items-center">
              <VisibilityIcon fontSize="small" />
              <Typography variant="subtitle1">
                {agent?.memberViews ?? 0}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Views
              </Typography>
            </div>

            <Divider orientation="vertical" flexItem />

            <div className="flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 1.25 }}
                onClick={() => likeAgentHandler(user, agent._id)}
              >
                {agent?.meLiked?.[0]?.myFavorite ? (
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
              </motion.div>
              <Typography variant="subtitle1">
                {agent?.memberLikes ?? 0}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Likes
              </Typography>
            </div>
          </div>

          {/* Visit Button */}
          <BlueHoveredBtn
            pathname={agentLink}
            btnText={"viewProfile"}
            translationTargetText={"HomePage"}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
