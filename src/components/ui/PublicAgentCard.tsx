"use client";
import { Member } from "@/libs/types/member/member";
import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Typography,
  Stack,
  Chip,
  Box,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useRouter } from "next/navigation";
import { serverApi } from "@/libs/config";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
interface PublicAgentCardType {
  agent: Member;
  likeAgentHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
}
const PublicAgentCard: React.FC<PublicAgentCardType> = React.memo(
  ({ agent, likeAgentHandler }) => {
    const user = useReactiveVar(userVar);
    const router = useRouter();
    const imageUrl = agent.memberImage
      ? `${serverApi}/${agent.memberImage}`
      : "";
    return (
      <Card
        className="group rounded-2xl border border-slate-300/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl max-w-md mx-auto w-full shadow-none"
        sx={{ borderRadius: "20px" }}
      >
        <CardContent className="flex flex-col items-center p-6  h-full">
          {/* Agent Image */}
          <Avatar
            src={imageUrl}
            alt={agent?.memberFullName ?? "agent-picture"}
            variant="rounded"
            className="transition-transform duration-300 group-hover:scale-105 h-30 w-30 rounded-2xl cursor-pointer"
            onClick={() =>
              router.push(`/agents/${agent._id}`, { scroll: true })
            }
          />

          {/* Name */}
          <Typography variant="h6" className="mt-4 text-slate-800 text-center">
            {agent?.memberFullName}
          </Typography>

          {/* Nickname */}
          <Typography
            variant="body2"
            className="text-slate-500 cursor-pointer hover:text-slate-200 duration-300 ease-linear"
            onClick={() =>
              router.push(`/agents/${agent._id}`, { scroll: true })
            }
          >
            @{agent.memberNick}
          </Typography>

          {/* Location */}
          {agent.memberAddress && (
            <div className="flex flex-row gap-1  items-center text-slate-400 mt-1">
              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">{agent?.memberAddress}</Typography>
            </div>
          )}

          {/* Rank Badge */}
          <div className="mt-3">
            <Chip
              icon={<WorkspacePremiumIcon />}
              label={`Rank ${agent?.memberRank}`}
              size="small"
              color="warning"
              variant="outlined"
            />
          </div>

          {/* Description */}
          {agent.memberDesc && (
            <Typography
              variant="body2"
              className="text-center text-slate-600 mt-3 line-clamp-2"
            >
              {agent?.memberDesc}
            </Typography>
          )}

          <div className="flex-1  flex-col content-end">
            {/* Divider */}
            <div className="w-full border-t border-slate-200 mt-4 pt-4" />

            {/* Stats */}
            <div className="flex flex-row gap-8 justify-center text-slate-500 items-center">
              <Stack alignItems="center">
                <HomeWorkOutlinedIcon sx={{ fontSize: 20 }} />
                <Typography variant="caption">
                  {agent?.memberProperties}
                </Typography>
              </Stack>

              <Stack alignItems="center">
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    likeAgentHandler(user, agent._id);
                  }}
                  className="border border-slate-200/70"
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
                </IconButton>
                <Typography variant="caption">{agent.memberLikes}</Typography>
              </Stack>

              <Stack alignItems="center">
                <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                <Typography variant="caption">{agent?.memberViews}</Typography>
              </Stack>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
);
export default PublicAgentCard;
