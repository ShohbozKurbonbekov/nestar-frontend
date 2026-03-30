"use client";

import { Skeleton, Stack } from "@mui/material";

interface ProfilePropertyCardsSkeletonType {
  columns?: number;
}
const ProfilePropertyCardsSkeleton = ({
  columns = 4,
}: ProfilePropertyCardsSkeletonType) => {
  return Array.from({ length: columns }, (_, i) => (
    <div className="w-full overflow-x-auto" key={i}>
      <Stack
        direction="row"
        alignItems="center"
        className="min-w-250 bg-white rounded-xl px-4 py-3 gap-4 border border-gray-200"
      >
        {/* IMAGE */}
        <Skeleton
          variant="rectangular"
          className="w-30 h-20 shrink-0 rounded-lg"
        />

        {/* INFO */}
        <Stack className="min-w-40 flex-1">
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={20} />
        </Stack>

        {/* DATE */}
        <Stack className="min-w-35 shrink-0">
          <Skeleton variant="text" width="70%" height={16} />
        </Stack>

        {/* STATUS */}
        <Stack className="min-w-35 shrink-0">
          <Skeleton
            variant="rounded"
            width="100%"
            height={30}
            sx={{ borderRadius: "9999px" }}
          />
        </Stack>

        {/* VIEWS */}
        <Stack className="min-w-25 shrink-0 text-center">
          <Skeleton variant="text" width={30} height={20} />
          <Skeleton variant="text" width={40} height={12} />
        </Stack>

        {/* ACTIONS */}
        <Stack direction="row" className="flex-1 shrink-0 justify-end gap-2">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>
      </Stack>
    </div>
  ));
};

export default ProfilePropertyCardsSkeleton;
