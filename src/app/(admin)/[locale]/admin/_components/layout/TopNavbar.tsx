"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
import { adminDrawerWidth, serverApi } from "@/libs/config";
import { NAVBAR_LINKS } from "@/libs/data/static-data";
import { useRouter } from "next/navigation";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "@/libs/auth";

interface TopNavbarType {
  handleDrawerToggle: () => void;
}
export default function TopNavbar({ handleDrawerToggle }: TopNavbarType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [avatarEl, setAvatarEl] = useState<null | HTMLElement>(null);
  const avatarOpen = Boolean(avatarEl);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${adminDrawerWidth}px)` },
        ml: { md: `${adminDrawerWidth}px` },
        background: "#fff",
        color: "#000",
        boxShadow: "0 1px 10px rgba(0,0,0,0.1)",
        py: "5px",
      }}
    >
      <Toolbar className="flex justify-between">
        <div className="flex items-center gap-3 w-full">
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="flex items-center bg-slate-100 px-4 py-3 rounded-xl w-full max-w-xl">
            <SearchIcon />
            <input
              autoFocus
              placeholder="Search properties..."
              className="ml-2 w-full bg-transparent focus-visible:ring-0 outline-0 text-lg placeholder:text-base "
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="bg-slate-100"
          >
            <AppsIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              className:
                "mt-2 rounded-2xl shadow-xl border border-gray-100 min-w-[180px]",
            }}
          >
            {NAVBAR_LINKS.map((link) => (
              <MenuItem
                key={link.label}
                onClick={() => {
                  setAnchorEl(null);
                  router.push(link.href, { scroll: true });
                }}
                className="px-4 py-2.5 mx-2 my-1 rounded-xl text-sm font-medium text-gray-700 hover:bg-slate-100 hover:text-black transition-all duration-200"
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
          <IconButton
            onClick={(e) => setAvatarEl(e.currentTarget)}
            className="ml-1"
          >
            <Avatar
              className="w-9 h-9"
              src={
                user.memberImage
                  ? `${serverApi}/${user.memberImage}`
                  : "/images/default-user.png"
              }
            />
          </IconButton>
          <Menu
            anchorEl={avatarEl}
            open={avatarOpen}
            onClose={() => setAvatarEl(null)}
            PaperProps={{
              className:
                "mt-2 rounded-2xl shadow-xl border border-gray-100 min-w-[220px] p-2",
            }}
          >
            <MenuItem
              onClick={() => {
                setAvatarEl(null);
                router.push("/admin/profile");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-slate-100 transition-all"
            >
              <PersonIcon fontSize="small" />
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                setAvatarEl(null);
                router.push("/admin/settings");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-slate-100 transition-all"
            >
              <SettingsIcon fontSize="small" />
              Settings
            </MenuItem>

            <Divider className="my-1 bg-gray-100" />

            <MenuItem
              onClick={() => {
                setAvatarEl(null);
                logOut();
                router.push("/");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all"
            >
              <LogoutIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
