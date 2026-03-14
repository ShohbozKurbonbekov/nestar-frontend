import { T } from "@/libs/types/common";
import { Member } from "@/libs/types/member/member";
import React from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import { Box, IconButton } from "@mui/material";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { motion } from "framer-motion";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { FavoriteBorder } from "@mui/icons-material";

// ------------------------------------- Helper Function  -------------------------------------
function Stat({ icon, value, label }: T) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Box className="text-slate-500">{icon}</Box>

      <div className="flex flex-col items-center gap-1">
        <div className="font-semibold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

// ------------------------------------- Component  -------------------------------------
interface AgentDetailStatisticsType {
  agent: Member;
  likeAgentHandler: (user: CustomJwtPayload, id: string) => Promise<void>;
}
const AgentDetailStatistics: React.FC<AgentDetailStatisticsType> = React.memo(
  ({ agent, likeAgentHandler }) => {
    const user = useReactiveVar(userVar);
    // ------------------------------------- Render  -------------------------------------
    return (
      <div className="border border-slate-300/80 rounded-2xl p-5 md:p-6 bg-white grid grid-cols-2 md:grid-cols-3 gap-6">
        <Stat
          icon={<HomeWorkIcon />}
          value={agent?.memberProperties}
          label="Properties"
        />

        <Stat
          icon={<ArticleIcon />}
          value={agent?.memberArticles}
          label="Articles"
        />

        <div className="flex flex-row items-center gap-2">
          <Box className="text-slate-500">
            <IconButton
              onClick={() => likeAgentHandler(user, agent._id)}
              className="border border-slate-200"
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
          </Box>

          <div className="flex flex-col items-center gap-1">
            <div className="font-semibold text-slate-900">
              {agent?.memberLikes}
            </div>
            <div className="text-xs text-slate-500">Likes</div>
          </div>
        </div>
        <Stat
          icon={<VisibilityIcon />}
          value={agent?.memberViews}
          label="Views"
        />

        <Stat
          icon={<PersonAddIcon />}
          value={agent.memberFollowings}
          label="Following"
        />

        <Stat
          icon={<GroupIcon />}
          value={agent.memberFollowers}
          label="Followers"
        />
      </div>
    );
  },
);
export default AgentDetailStatistics;
