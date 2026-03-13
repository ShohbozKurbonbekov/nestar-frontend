"use client";

import { Skeleton } from "@mui/material";

interface PublicAgentCardSkeletonType {
  num: number;
}
export default function PublicAgentCardSkeleton({
  num,
}: PublicAgentCardSkeletonType) {
  return Array.from({ length: num }, (_, i) => (
    <div
      className="border border-slate-300/80 rounded-2xl bg-white p-6 flex flex-col items-center"
      key={i}
    >
      {/* Avatar */}
      <Skeleton
        variant="rounded"
        width={110}
        height={110}
        sx={{ borderRadius: "18px" }}
      />

      {/* Nickname */}
      <Skeleton variant="text" width={120} height={28} className="mt-4" />

      {/* Location */}
      <Skeleton variant="text" width={150} height={20} />

      {/* Rank */}
      <Skeleton
        variant="rounded"
        width={80}
        height={26}
        className="mt-3"
        sx={{ borderRadius: "999px" }}
      />

      {/* Divider */}
      <div className="w-full border-t border-slate-200 my-5" />

      {/* Stats */}
      <div className="flex justify-between w-full px-4">
        <div className="flex flex-col items-center gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={20} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={20} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={20} />
        </div>
      </div>
    </div>
  ));
}
