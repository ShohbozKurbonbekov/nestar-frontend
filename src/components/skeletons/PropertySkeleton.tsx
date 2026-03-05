"use client";

import { Skeleton, Divider, Button } from "@mui/material";

interface PropertySkeletonType {
  classes?: string;
  columns?: number;
  imageHeight?: number;
}
export default function PropertySkeleton({
  classes = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3",
  columns = 3,
  imageHeight,
}: PropertySkeletonType) {
  return (
    <div className={`${classes}`}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={i}
          className={
            "bg-white w-full rounded-2xl overflow-hidden border-slate-300/80"
          }
        >
          {/* Image Skeleton */}
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-full"
            height={imageHeight ?? 256}
          />

          <div className="p-6 space-y-4">
            {/* Content Skeleton Lines */}
            <Skeleton variant="text" height={28} width="70%" animation="wave" />
            <Skeleton variant="text" height={22} width="90%" animation="wave" />
            <Skeleton variant="text" height={22} width="60%" animation="wave" />

            {/* Divider */}
            <Divider />

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="contained"
                disabled
                sx={{ width: 100, borderRadius: "12px" }}
              >
                &nbsp;
              </Button>

              <Button
                variant="outlined"
                disabled
                sx={{ width: 100, borderRadius: "12px" }}
              >
                &nbsp;
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
