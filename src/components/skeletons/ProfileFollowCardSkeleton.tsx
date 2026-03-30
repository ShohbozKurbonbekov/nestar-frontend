"use client";

import { Skeleton, Stack } from "@mui/material";

interface ProfileFollowerCardSkeletonType {
  columns?: number;
}
const ProfileFollowerCardSkeleton = ({
  columns = 4,
}: ProfileFollowerCardSkeletonType) => {
  return Array.from({ length: columns }, (_, i) => (
    <div className="w-full overflow-x-auto" key={i}>
      <Stack
        direction="row"
        alignItems="center"
        className="min-w-250 bg-white rounded-xl shadow-sm px-4 py-3 gap-6 border border-gray-200"
      >
        {/* IMAGE */}
        <Skeleton
          variant="rectangular"
          width={120}
          height={80}
          className="shrink-0 rounded-lg"
        />

        {/* INFO */}
        <Stack className="w-40 shrink-0 gap-1">
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={100} height={14} />
        </Stack>

        {/* Followers */}
        <Stack className="w-25 shrink-0 items-center">
          <Skeleton variant="text" width={70} height={20} />
          <Skeleton variant="text" width={30} height={16} />
        </Stack>

        {/* Followings */}
        <Stack className="w-25 shrink-0 items-center">
          <Skeleton variant="text" width={70} height={20} />
          <Skeleton variant="text" width={30} height={16} />
        </Stack>

        {/* Likes */}
        <Stack direction="row" alignItems="center" className="gap-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={20} height={20} />
        </Stack>

        {/* ACTIONS */}
        <Stack className="flex-1 flex flex-row justify-end">
          <Stack direction="row" className="gap-3 items-center">
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={100} height={32} />
          </Stack>
        </Stack>
      </Stack>
    </div>
  ));
};

export default ProfileFollowerCardSkeleton;
