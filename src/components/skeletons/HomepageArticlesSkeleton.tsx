"use client";
import { Skeleton } from "@mui/material";

interface HomepageArticleSkeletonType {
  variant: "main" | "vertical";
}
function HomepageArticleSkeleton({ variant }: HomepageArticleSkeletonType) {
  if (variant === "main") {
    return (
      <div
        className={
          "w-full h-full rounded-xl flex flex-col gap-5 justify-between border border-slate-200 p-3"
        }
      >
        <p className="py-20"></p>

        <div className="flex flex-col gap-2">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={40}
            width={"20%"}
            className="rounded-xl"
          />
          <Skeleton
            variant="rectangular"
            height={40}
            width="60%"
            animation="wave"
          />

          <Skeleton
            variant="rectangular"
            height={40}
            width="80%"
            animation="wave"
          />
        </div>
      </div>
    );
  } else if (variant === "vertical") {
    return (
      <div
        className={
          "w-full h-full rounded-xl flex flex-col border border-slate-200"
        }
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="h-7/12 w-full"
        />

        <div className="p-4 flex-1 flex flex-col gap-5 justify-between">
          <Skeleton
            variant="rectangular"
            height={40}
            width="80%"
            animation="wave"
          />

          <Skeleton
            variant="rectangular"
            height={40}
            width="60%"
            animation="wave"
          />
        </div>
      </div>
    );
  }
  return null;
}

export default function HomepageArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-64 sm:h-80 md:h-full">
        <HomepageArticleSkeleton variant="main" />
      </div>
      <div className="grid sm:grid-cols-2  lg:grid-cols-2 gap-4">
        {[1, 2].slice(1).map((el) => (
          <div className="h-64 lg:h-80" key={el}>
            <HomepageArticleSkeleton variant="vertical" />
          </div>
        ))}
      </div>
    </div>
  );
}
