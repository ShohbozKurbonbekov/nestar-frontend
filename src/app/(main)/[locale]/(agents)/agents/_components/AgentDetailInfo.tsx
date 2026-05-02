"use client";
import Image from "next/image";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { Member } from "@/libs/types/member/member";
import React from "react";
import { T } from "@/libs/types/common";
import { serverApi } from "@/libs/config";
import { getBaseUrl } from "@/libs/utils/getBaseUrl";

// ------------------------------------- Helper Function  -------------------------------------
function Stat({ icon, value, label }: T) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-slate-500">{icon}</div>
      <div className="font-semibold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

// ------------------------------------- Component  -------------------------------------
interface AgentDetailInfoType {
  agent: Member;
  goMemberPage: (id: string) => void;
}
const AgentDetailInfo: React.FC<AgentDetailInfoType> = React.memo(
  ({ agent, goMemberPage }) => {
    const imageUrl = agent?.memberImage
      ? `${getBaseUrl()}/${agent.memberImage}`
      : "/images/default-user.png";
    return (
      <div className="max-w-8xl mx-auto px-4">
        <Card className="rounded-2xl  border border-slate-300/80 shadow-none">
          {/* Agent Image */}
          <div className="w-full flex justify-center pt-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-slate-200">
              <Image
                src={imageUrl}
                alt={agent?.memberNick}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <CardContent className="text-center mt-4">
            <Typography variant="h4" className="text-slate-900">
              {agent?.memberFullName}
            </Typography>
            {/* Agent Nick */}
            <Typography
              variant="h5"
              className="text-slate-900 hover:text-blue-600 duration-200 ease-in-out transition-colors cursor-pointer"
              onClick={() => goMemberPage(agent._id)}
            >
              @{agent?.memberNick}
            </Typography>

            {/* Phone */}
            <Typography variant="body2" className="text-slate-500 mt-1">
              {agent?.memberPhone}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              className="text-slate-600 mt-4 max-w-xl mx-auto"
            >
              {agent.memberDesc ??
                "Professional real estate agent helping clients find the perfect home and investment opportunities."}
            </Typography>

            {/* Joined Date */}
            <Typography variant="caption" className="block mt-3 text-slate-400">
              Joined {new Date(agent.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  },
);

export default AgentDetailInfo;
