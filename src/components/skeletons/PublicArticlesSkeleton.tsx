"use client";

import { Card, CardContent, Skeleton, Avatar } from "@mui/material";

interface PublicArticlesSkeletonType {
  columns?: number;
  wrapperClasses: string;
}
export default function PublicArticleSkeleton({
  columns = 4,
  wrapperClasses,
}: PublicArticlesSkeletonType) {
  return (
    <div className={wrapperClasses}>
      {Array.from({ length: columns }, (_, i) => (
        <Card
          key={i}
          className="w-full rounded-2xl overflow-hidden border border-gray-200  bg-white max-w-md mx-auto"
        >
          {/* IMAGE SKELETON */}
          <Skeleton
            variant="rectangular"
            className="w-full h-52 sm:h-56 md:h-60 lg:h-64"
          />

          <CardContent className="space-y-4">
            {/* TITLE */}
            <Skeleton variant="text" height={28} width="80%" />

            {/* PREVIEW LINES */}
            <Skeleton variant="text" height={20} width="95%" />
            <Skeleton variant="text" height={20} width="90%" />
            <Skeleton variant="text" height={20} width="60%" />

            {/* AUTHOR ROW */}
            <div className="flex items-center gap-3 pt-2">
              <Skeleton variant="circular">
                <Avatar sx={{ width: 34, height: 34 }} />
              </Skeleton>

              <div className="flex flex-col gap-1">
                <Skeleton variant="text" width={90} height={18} />
                <Skeleton variant="text" width={60} height={14} />
              </div>
            </div>

            {/* STATS ROW */}
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <Skeleton variant="text" width={40} />
              <Skeleton variant="text" width={40} />
              <Skeleton variant="text" width={40} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
