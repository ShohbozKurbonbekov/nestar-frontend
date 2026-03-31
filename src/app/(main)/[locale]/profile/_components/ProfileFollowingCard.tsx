import { Follower, Following } from "@/libs/types/follow/follow";
import React from "react";
import { serverApi } from "@/libs/config";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@mui/icons-material";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";

interface ProfileFollowingCardType {
  handleFollow: (id?: string) => Promise<void>;
  handleUnFollow: (id?: string) => Promise<void>;
  following: Following;
  likeTargetMember?: (user: CustomJwtPayload, id: string) => Promise<void>;
}

const ProfileFollowingCard: React.FC<ProfileFollowingCardType> = React.memo(
  ({ following, likeTargetMember, handleFollow, handleUnFollow }) => {
    const user = useReactiveVar(userVar);
    const router = useRouter();
    const imageUrl = following?.followingData?.memberImage
      ? `${serverApi}/${following?.followingData?.memberImage}`
      : "/images/default-user.png";

    const onPushMemberDetail = (id: string | undefined) => {
      if (!id) return;
      router.push(`/profile/${id}`);
    };
    return (
      <div className="w-full overflow-x-auto">
        <Stack
          direction="row"
          alignItems="center"
          className="min-w-250 bg-white rounded-xl shadow-sm px-4 py-3 gap-6 border border-gray-200 hover:shadow-md transition"
        >
          {/* IMAGE */}
          <Stack
            className={`w-30 h-20 shrink-0 rounded-lg overflow-hidden cursor-pointer relative`}
            onClick={() => onPushMemberDetail(following?.followingData?._id)}
          >
            <Image
              fill
              src={imageUrl}
              alt={following?.followingData?.memberNick || "Unknown"}
              className="w-full h-full object-cover object-top"
            />
            <div className="overlay absolute inset-0  bg-linear-to-r from-black/50 to-black/20"></div>
          </Stack>

          {/* INFO */}
          <Stack
            className={`w-40 cursor-pointer shrink-0 overflow-hidden hover:opacity-60 duration-200 ease-in-out transition-opacity`}
            onClick={() => onPushMemberDetail(following?.followingData?._id)}
          >
            <Typography className="text-sm font-semibold line-clamp-1">
              {following?.followingData?.memberFullName ?? "Unknown"}
            </Typography>
            <Typography className="text-xs text-gray-500 line-clamp-1">
              @{following?.followingData?.memberNick ?? "No Nickname"}
            </Typography>
            <Typography className="text-[10px]  text-gray-400 mt-1 line-clamp-1">
              {following?.followingData?.memberAddress ?? "No Address"}
            </Typography>
          </Stack>

          {/* Statistics */}
          <Stack className="w-25 shrink-0 text-center overflow-hidden">
            <Typography className="text-sm font-medium text-gray-700">
              Followers
            </Typography>
            <Typography className="text-[10px] text-gray-400">
              {following?.followingData?.memberFollowers ?? 0}
            </Typography>
          </Stack>

          <Stack className="w-25 shrink-0 text-center overflow-hidden">
            <Typography className="text-sm font-medium text-gray-700">
              Followings
            </Typography>
            <Typography className="text-[10px] text-gray-400">
              {following?.followingData?.memberFollowings ?? 0}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" className="gap-1">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                if (likeTargetMember) {
                  likeTargetMember(user, following?.followingData?._id!);
                }
              }}
              className="bg-white hover:bg-red-300 hover:text-white transition"
            >
              {following?.meLiked?.[0]?.myFavorite ? (
                <Favorite className="text-red-500" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            <Typography className="text-sm font-medium">
              {following?.followingData?.memberLikes}
            </Typography>
          </Stack>

          {/* ACTIONS */}
          <Stack className="flex-1 flex flex-row justify-end">
            {user?._id !== following?.followingId && (
              <Stack className="flex flex-row gap-3 items-center">
                {following.meFollowed &&
                following.meFollowed[0]?.myFollowing ? (
                  <>
                    <Typography className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-200">
                      ✓ Following
                    </Typography>
                    <Button
                      variant="outlined"
                      className="bg-[#ed5858] hover:bg-[#ee7171] capitalize text-white border-transparent"
                      onClick={() =>
                        handleUnFollow(following?.followingData?._id)
                      }
                    >
                      Unfollow
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    className="bg-[#60eb60d4] capitalize hover:bg-[#60eb60d4]"
                    onClick={() => handleFollow(following?.followingData?._id)}
                  >
                    Follow
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    );
  }
);

export default ProfileFollowingCard;
