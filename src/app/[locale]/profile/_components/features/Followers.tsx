"use client";

import { useMemo, useState } from "react";
import { Divider, Pagination, Stack } from "@mui/material";
import ProfileContentHeader from "../ProfileContentHeader";
import { useQuery } from "@apollo/client";
import { GET_MEMBER_FOLLOWERS } from "@/apollo/user/query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { skip } from "node:test";
import ProfilePropertyCardsSkeleton from "@/components/skeletons/ProfilePropertyCardsSkeleton";
import Emty from "@/components/ui/Emty";
import ProfileFollowerCard from "../ProfileFollowerCard";
import { Follower } from "@/libs/types/follow/follow";
import { T } from "@/libs/types/common";

// ---------------------------------- Component ---------------------------------
interface FollowersType {
  isOwner: boolean;
}
export default function Followers({ isOwner }: FollowersType) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const memberId = params.userId;
  const followersInput = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: 5,
      search: {
        followingId: memberId,
      },
    };
  }, []);
  /************************ Apollo  **************************/
  const {
    data: followers,
    loading: getFollowersLoading,
    refetch: getFollowersRefetch,
  } = useQuery(GET_MEMBER_FOLLOWERS, {
    fetchPolicy: "cache-and-network",
    skip: !memberId,
    variables: {
      input: followersInput,
    },
    notifyOnNetworkStatusChange: true,
  });
  /************************ Apollo End  **************************/

  // -------------------------------- Handlers ---------------------------------

  const onPage = (e: T, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));

    router.replace(`?${params.toString()}`);
  };

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
        {/* TABLE HEADER (hidden on mobile) */}
        <div className="w-full overflow-x-auto">
          <Stack
            direction="row"
            className="md:flex min-w-250 px-4 py-3 gap-6 text-sm font-semibold text-gray-500 "
          >
            <div className="w-70 text-center">Listing</div>
            <div className="w-25 text-center">Followers</div>
            <div className="w-25 text-center">Followings</div>
            <div className="w-25 text-center">Likes</div>
            <div className="flex-1 flex justify-end gap-2">Actions</div>
          </Stack>
        </div>

        <Divider className="mt-2" />

        {/* LIST */}
        <Stack className="mt-6 mb-4 gap-3 ">
          {getFollowersLoading ? (
            <ProfilePropertyCardsSkeleton columns={4} />
          ) : !followers?.getMemberFollowers?.list.length ? (
            <Emty title="No followers" />
          ) : (
            followers?.getMemberFollowers?.list.map((follower: Follower) => (
              <ProfileFollowerCard key={follower._id} follower={follower} />
            ))
          )}
        </Stack>
        <Stack className="flex-1 flex flex-col justify-end  w-full">
          <div className="flex justify-center border-t border-slate-300/80 pt-5">
            {!!followers?.getMemberFollowers?.list.length && (
              <Pagination
                count={Math.ceil(
                  (followers.getMemberFollowers.metaCounter?.[0]?.total ?? 0) /
                    followersInput.limit,
                )}
                variant="outlined"
                page={followersInput?.page ?? 1}
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
