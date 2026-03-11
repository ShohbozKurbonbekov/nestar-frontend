"use client";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import {
  Visibility,
  ThumbUp,
  Star,
  Person,
  LocationOn,
} from "@mui/icons-material";
import { Member } from "@/libs/types/member/member";
import { useRouter } from "next/navigation";
import React from "react";
import { serverApi } from "@/libs/config";
import { Link } from "@/i18n/navigation";

interface AgentInfoType {
  agent: Member | undefined;
}

const AgentInfo: React.FC<AgentInfoType> = React.memo(({ agent }) => {
  const router = useRouter();
  if (!agent) return null;
  return (
    <Card className="border border-slate-300/80 rounded-2xl shadow-none  bg-white">
      <CardContent className="p-6">
        {/* Header */}
        <Typography
          variant="h6"
          className="flex items-center gap-2  text-slate-800 mb-6"
        >
          <Person className="text-slate-600" />
          Property Agent
        </Typography>

        {/* Main layout */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Avatar */}
          <div className="flex justify-center sm:justify-start">
            <Avatar
              src={
                agent?.memberImage ? `${serverApi}/${agent?.memberImage}` : ""
              }
              alt={agent?.memberNick}
              className="sm:w-24 sm:h-24 w-34 h-34"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col flex-1 items-center sm:items-start ">
            <Typography variant="h6" className="text-slate-900">
              {agent?.memberFullName}
            </Typography>

            <Typography variant="body2" className="text-slate-500">
              @{agent?.memberNick}
            </Typography>

            {agent?.memberAddress && (
              <Typography
                variant="body2"
                className="flex items-center gap-1 text-slate-600 mt-1"
              >
                <LocationOn fontSize="small" />
                {agent.memberAddress}
              </Typography>
            )}

            {/* Stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <Chip
                icon={<Visibility />}
                label={`${agent?.memberViews} Views`}
                size="small"
                className="bg-slate-100 px-2"
              />

              <Chip
                icon={<ThumbUp />}
                label={`${agent?.memberLikes} Likes`}
                size="small"
                className="bg-slate-100 px-2"
              />

              <Chip
                icon={<Star />}
                label={`${agent?.memberPoints} Points`}
                size="small"
                className="bg-slate-100 px-2"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        {agent?.memberDesc && (
          <Typography
            variant="body2"
            className="text-slate-600 mt-6 leading-relaxed text-center sm:text-left"
          >
            {agent.memberDesc}
          </Typography>
        )}

        {/* Action */}
        <div className="mt-6">
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/agents/${agent._id}`, { scroll: true });
            }}
            className="rounded-xl normal-case font-semibold"
          >
            View Agent Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default AgentInfo;
