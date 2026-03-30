"use client";

import {
  Avatar,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import {
  Home,
  Favorite,
  History,
  Article,
  Person,
  Group,
  AddCircle,
  GridView,
  EditNote,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { Member } from "@/libs/types/member/member";
import { MemberType } from "@/libs/enums/member.enum";
import { serverApi } from "@/libs/config";
import { firstLetterCapitalizer } from "@/libs/utils/firstLetterCapitalizer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useFollowersContext } from "@/libs/context/FollowersContext";

interface ProfileSidebarType {
  member: Member;
  variant: "OWNER" | "VISITOR";
}
export default function ProfileSidebar({
  member,
  variant,
}: ProfileSidebarType) {
  const { onUnFollow, onFollow } = useFollowersContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab =
    searchParams.get("tab") ??
    (variant === "OWNER"
      ? "myProfile"
      : member.memberType === MemberType.USER
      ? "followers"
      : "myProperties");

  const onTab = (value: string) => {
    const setterParams = new URLSearchParams();
    setterParams.set("tab", value);
    router.replace(`?${setterParams.toString()}`);
  };

  const isFollowing = member?.meFollowed?.[0]?.myFollowing;
  const menu = {
    OWNER: [
      {
        title: "Interactions",
        items: [
          {
            label: "Followers",
            value: "followers",
            icon: <Group />,
          },
          {
            label: "Followings",
            value: "followings",
            icon: <PersonAddAlt1Icon />,
          },
        ],
      },
      {
        title: "Manage",
        items: [
          member.memberType === MemberType.AGENT && {
            label: "Add Property",
            value: "addProperty",
            icon: <AddCircle />,
          },
          member.memberType === MemberType.AGENT && {
            label: "My Properties",
            value: "myProperties",
            icon: <GridView />,
          },
          { label: "Favorites", value: "myFavorites", icon: <Favorite /> },

          {
            label: "Recently Visited",
            value: "recentlyVisited",
            icon: <History />,
          },
        ].filter(Boolean),
      },
      {
        title: "Community",
        items: [
          { label: "My Articles", value: "myArticles", icon: <Article /> },
          { label: "Write Article", value: "writeArticle", icon: <EditNote /> },
        ],
      },
      {
        title: "Account",
        items: [{ label: "My Profile", value: "myProfile", icon: <Person /> }],
      },
    ],

    VISITOR: [
      {
        title: "Details",
        items: [
          member.memberType === "AGENT" && {
            label: "Properties",
            value: "myProperties",
            icon: <Home />,
          },
          { label: "Followers", value: "followers", icon: <Group /> },
          {
            label: "Followings",
            value: "followings",
            icon: <PersonAddAlt1Icon />,
          },
        ].filter(Boolean),
      },
      {
        title: "Community",
        items: [{ label: "Articles", value: "myArticles", icon: <Article /> }],
      },
    ],
  };

  return (
    <Box className="w-full bg-white  p-4 ">
      {/* Profile */}
      <Box className="flex flex-col items-center mb-4">
        <Avatar
          src={
            member.memberImage
              ? `${serverApi}/${member?.memberImage}`
              : "/images/default-user.png"
          }
          sx={{
            width: {
              xs: 80,
              md: 100,
              lg: 120,
            },
            height: {
              xs: 80,
              md: 100,
              lg: 120,
            },
          }}
        />
        <Typography variant="h6" className="mt-2 capitalize">
          {member.memberNick}
        </Typography>
        <Typography className="text-xs md:text-sm  py-1 px-2 bg-green-600 rounded-lg text-white">
          {firstLetterCapitalizer(member.memberType)}
        </Typography>
      </Box>

      {/* Action */}
      {variant === "OWNER" ? (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="capitalize rounded-lg"
          onClick={() => onTab("myProfile")}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          fullWidth
          variant={isFollowing ? "outlined" : "contained"}
          color={isFollowing ? "inherit" : "primary"}
          onClick={() =>
            isFollowing ? onUnFollow?.(member._id) : onFollow?.(member._id)
          }
          className="mt-2"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Divider className="my-4" />

      {/* Menu */}
      {menu[variant].map((section, i) => (
        <Box key={i} className="mb-4">
          <Typography className="text-xs lg:text-sm text-gray-400 px-2 mb-1">
            {section.title.toUpperCase()}
          </Typography>

          <List>
            {section.items.map((item: any) => (
              <ListItemButton
                key={item.value}
                selected={tab === item.value}
                onClick={() => onTab(item.value)}
                className="rounded-lg mb-1 truncate"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "0.8rem",
                      md: "1rem",
                    },
                  },
                  "& .MuiListItemIcon-root": {
                    minWidth: 0,
                    marginRight: "8px",

                    "& svg": {
                      fontSize: {
                        xs: 16,
                        md: 18,
                        lg: 22,
                      },
                    },
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#10b981",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
