"use client";

import Emty from "@/components/ui/Emty";
import React from "react";
import Image from "next/image";
import { Card, CardActionArea, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { serverApi } from "@/libs/config";

import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Member } from "@/libs/types/member/member";
import { getBaseUrl } from "@/libs/utils/getBaseUrl";

interface PublicTopAgentsType {
  agents: Member[];
}

const PublicTopAgents: React.FC<PublicTopAgentsType> = React.memo(
  ({ agents }) => {
    const router = useRouter();

    return (
      <div className="w-full border border-slate-300/80 rounded-2xl p-5 lg:p-6 bg-white">
        {/* Title */}
        <div className="my-5 text-center">
          <Typography variant="h4" className="text-slate-800">
            Top Agents
          </Typography>
        </div>

        {agents.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {agents.map((agent) => (
              <Card
                key={agent._id}
                className="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-none"
              >
                <CardActionArea
                  onClick={() =>
                    router.push(`/agents/${agent._id}`, { scroll: true })
                  }
                  className="flex items-stretch border border-slate-200"
                >
                  {/* IMAGE */}
                  <div className="relative w-28 sm:w-32 shrink-0 overflow-hidden">
                    <Image
                      src={
                        agent?.memberImage
                          ? `${getBaseUrl()}/${agent.memberImage}`
                          : "/images/default-user.png"
                      }
                      alt={agent?.memberNick}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-r  from-black/40 to-black/10" />

                    {/* TOP AGENT BADGE */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                      <EmojiEventsRoundedIcon className="text-amber-500 text-sm" />
                      <span className="text-[11px] font-semibold text-slate-700">
                        Top Agent
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-between p-4 flex-1">
                    {/* Top */}
                    <div>
                      <Typography
                        variant="body2"
                        className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                      >
                        {agent?.memberNick}
                      </Typography>

                      {/* Phone */}
                      <div className="flex items-center text-slate-500 text-xs mt-1">
                        <PersonRoundedIcon className="text-sm mr-1" />
                        {agent?.memberPhone}
                      </div>

                      {/* Description */}
                      <Typography
                        variant="caption"
                        className="text-slate-500 mt-2 line-clamp-2"
                      >
                        {agent?.memberDesc ??
                          "Professional real estate agent helping clients find the right property."}
                      </Typography>
                    </div>

                    {/* STATS */}
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <HomeWorkRoundedIcon className="text-sm" />
                          {agent?.memberProperties}
                        </span>

                        <span className="flex items-center gap-1">
                          <FavoriteRoundedIcon className="text-sm" />
                          {agent?.memberLikes}
                        </span>

                        <span className="flex items-center gap-1">
                          <VisibilityRoundedIcon className="text-sm" />
                          {agent?.memberViews}
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
          <Emty title="No top agents" />
        )}
      </div>
    );
  },
);

export default PublicTopAgents;
