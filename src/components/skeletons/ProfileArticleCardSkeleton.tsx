"use client";

import { Stack, Skeleton } from "@mui/material";

interface ProfileArticleCardSkeleton {
  columns?: number;
  direction?: "row" | "column";
}
const ProfileArticleCardSkeleton = ({
  columns = 4,
  direction = "column",
}: ProfileArticleCardSkeleton) => {
  return (
    <div className="w-full overflow-x-auto">
      <Stack direction={direction} className="gap-4 min-w-max p-2">
        {Array.from({ length: columns }).map((_, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems="center"
            className="min-w-175 bg-white rounded-xl px-4 py-3 gap-6 border border-gray-200"
          >
            {/* IMAGE */}
            <Stack className="w-30 h-20 shrink-0 rounded-lg overflow-hidden">
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Stack>

            {/* INFO */}
            <Stack className="w-40 overflow-hidden flex flex-col items-start gap-1">
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="60%" height={16} />
              <Skeleton
                variant="rectangular"
                width={60}
                height={18}
                className="rounded-full mt-1"
              />
            </Stack>

            {/* DATE */}
            <Stack className="w-35 shrink-0">
              <Skeleton variant="text" width="80%" height={16} />
            </Stack>

            {/* VIEWS */}
            <Stack className="w-25 shrink-0 items-center">
              <Skeleton variant="text" width={30} height={20} />
              <Skeleton variant="text" width={40} height={12} />
            </Stack>

            {/* LIKES */}
            <Stack className="w-25 shrink-0 items-center">
              <Skeleton variant="text" width={30} height={20} />
              <Skeleton variant="text" width={40} height={12} />
            </Stack>

            {/* COMMENTS */}
            <Stack className="w-25 shrink-0 items-center">
              <Skeleton variant="text" width={30} height={20} />
              <Skeleton variant="text" width={60} height={12} />
            </Stack>

            {/* ACTIONS */}
            <Stack
              direction="row"
              className="min-w-30 shrink-0 justify-end gap-2"
            >
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default ProfileArticleCardSkeleton;
