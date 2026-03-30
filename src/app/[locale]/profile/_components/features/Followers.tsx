"use client";

import { useCallback } from "react";
import { Divider, Pagination, Stack } from "@mui/material";
import ProfileContentHeader from "../ProfileContentHeader";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Emty from "@/components/ui/Emty";
import ProfileFollowerCard from "../ProfileFollowerCard";
import { Follower } from "@/libs/types/follow/follow";
import { T } from "@/libs/types/common";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { Message } from "@/libs/enums/common.enum";
import { likeTargetMember } from "@/services/Agent.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import ProfileFollowerCardSkeleton from "@/components/skeletons/ProfileFollowCardSkeleton";
import { useFollowersContext } from "@/libs/context/FollowersContext";

// ---------------------------------- Component ---------------------------------
interface FollowersType {
  isOwner: boolean;
}
export default function Followers({ isOwner }: FollowersType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { followers, loading, refetch, query, totalFollowers } =
    useFollowersContext();
  // -------------------------------- Handlers ---------------------------------

  const onPage = (e: T, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));

    router.replace(`?${params.toString()}`);
  };

  const onLike = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetMember(id);
        await refetch();
        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, onLike:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [refetch]
  );

  // --------------------------------- Render ---------------------------------
  return (
    <div className="w-full flex flex-col h-full">
      <ProfileContentHeader
        subtitle={
          isOwner
            ? "Manage and track people who follow you"
            : "Explore this user's followers and connections"
        }
        title={isOwner ? "My Followers" : "Followers"}
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
            <ProfileFollowerCardSkeleton columns={4} />
          ) : !followers.length ? (
            <Emty title="No followers" />
          ) : (
            followers.map((follower: Follower) => (
              <ProfileFollowerCard
                key={follower._id}
                follower={follower}
                likeTargetMember={onLike}
              />
            ))
          )}
        </Stack>
        <Stack className="flex-1 flex flex-col justify-end  w-full">
          <div className="flex justify-center border-t border-slate-300/80 pt-5">
            {!!followers.length && (
              <Pagination
                count={Math.ceil(totalFollowers / query.limit)}
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
