"use client";

import { Message } from "@/libs/enums/common.enum";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
  sweetTopSuccessAlert,
} from "@/libs/sweetAlert";
import { T } from "@/libs/types/common";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetMember } from "@/services/Agent.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import ProfileContentHeader from "../ProfileContentHeader";
import { Divider, Pagination, Stack } from "@mui/material";
import ProfileFollowCardSkeleton from "@/components/skeletons/ProfileFollowCardSkeleton";
import Emty from "@/components/ui/Emty";
import { Following } from "@/libs/types/follow/follow";
import ProfileFollowCard from "../ProfileFollowerCard";
import { useFollow } from "@/libs/hooks/useFollow";
import { Member } from "@/libs/types/member/member";
import ProfileFollowingCard from "../ProfileFollowingCard";
import { useFollowContext } from "@/libs/context/FollowContext";

// ---------------------------------- Component ---------------------------------
interface FollowingsType {
  isOwner: boolean;
  member?: Member;
}
export default function Followings({ isOwner, member }: FollowingsType) {
  const searchParams = useSearchParams();
  const { onFollow, onUnFollow } = useFollowContext();
  const router = useRouter();
  const { follows, loading, query, totalFollows, refetchFollows } = useFollow({
    searchParams,
    memberId: member?._id,
  });
  // -------------------------------- Handlers ---------------------------------

  const onPage = (e: T, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));

    router.replace(`?${params.toString()}`);
  };

  const handleFollow = async (targetId?: string) => {
    try {
      await onFollow(targetId);
      await sweetTopSuccessAlert("Success", 1000);
      await refetchFollows();
    } catch (error: any) {
      console.log(
        "Error in handleFollow and onFollow functions: ",
        error.message
      );
      await sweetErrorHandling(error);
    }
  };

  const handleUnFollow = async (targetId?: string) => {
    try {
      await onUnFollow(targetId);
      await sweetTopSuccessAlert("Success", 1000);
      await refetchFollows();
    } catch (error: any) {
      console.log(
        "Error in handleUnFollow and onUnFollow functions: ",
        error.message
      );
      await sweetErrorHandling(error);
    }
  };

  const onLike = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetMember(id);
        await refetchFollows();
        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, onLike:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [refetchFollows, likeTargetMember]
  );

  // --------------------------------- Render ---------------------------------
  return (
    <div className="w-full flex flex-col h-full">
      <ProfileContentHeader
        subtitle={
          isOwner
            ? "Stay updated with the people and profiles you follow."
            : "People this user follows and keeps up with."
        }
        title={isOwner ? "People you follow" : "Following"}
      />

      <div className="p-4 flex-1 flex flex-col h-full">
        <div className="w-full overflow-x-auto">
          <Stack
            direction="row"
            className="md:flex min-w-250 px-4 py-3 gap-6 text-sm font-semibold text-gray-500 "
          >
            <div className="w-70 text-center">Listing</div>
            <div className="w-25 text-center">Followers</div>
            <div className="w-25 text-center">Followings</div>
            <div className="w-25 text-center">Likes</div>
            <div className="flex-1 flex justify-end">Actions</div>
          </Stack>
        </div>

        <Divider className="mt-2" />

        {/* LIST */}
        <Stack className="mt-6 mb-4 gap-3 ">
          {loading ? (
            <ProfileFollowCardSkeleton columns={4} />
          ) : !follows.length ? (
            <Emty title="No followings" />
          ) : (
            follows.map((following: Following) => (
              <ProfileFollowingCard
                handleFollow={handleFollow}
                handleUnFollow={handleUnFollow}
                key={following._id}
                following={following}
                likeTargetMember={onLike}
              />
            ))
          )}
        </Stack>
        <Stack className="flex-1 flex flex-col justify-end  w-full">
          <div className="flex justify-center border-t border-slate-300/80 pt-5">
            {!!follows.length && (
              <Pagination
                count={Math.ceil(totalFollows / query.limit)}
                variant="outlined"
                page={query.page ?? 1}
                size="large"
                sx={{
                  ".MuiPagination-ul": {
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px 5px",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#CBD5E1CC",
                  },
                }}
                onChange={(e, value) => onPage(e, value)}
              />
            )}
          </div>
        </Stack>
      </div>
    </div>
  );
}
