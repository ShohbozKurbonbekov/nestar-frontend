"use client";

import { Skeleton } from "@mui/material";

interface AgentSkeletonType {
  classes?: string;
  columns?: number;
  imageHeight?: number;
}
export default function AgentSkeleton({
  classes = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3",
  columns = 3,
  imageHeight,
}: AgentSkeletonType) {
  return (
    <div className={`${classes}`}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          className={"rounded-2xl overflow-hidden w-full bg-white shadow-sm"}
          key={i}
        >
          {/* Image Skeleton */}
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="w-full"
            height={imageHeight ?? 300}
          />

          <div className="p-6 ">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={63}
                  width="100%"
                  animation="wave"
                />
              ))}
            </div>
            {/* Buttons */}
            <div className="mt-3 w-full">
              <Skeleton
                variant="rectangular"
                height={40}
                width="40%"
                animation="wave"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
