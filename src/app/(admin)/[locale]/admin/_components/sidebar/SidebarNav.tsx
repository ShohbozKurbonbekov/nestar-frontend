"use client";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";
import { usePathname, useRouter } from "next/navigation";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export const items = [
  {
    label: "Community",
    value: "community",
    href: "/admin/community",
    icon: <GroupsIcon fontSize="small" />,
  },

  {
    label: "Notice",
    value: "notice",
    href: "/admin/notice",
    icon: <CampaignRoundedIcon fontSize="small" />,
  },
  {
    label: "Properties",
    value: "properties",
    href: "/admin/properties",
    icon: <HomeWorkIcon fontSize="small" />,
  },
  {
    label: "Users",
    value: "users",
    href: "/admin/users",
    icon: <PeopleIcon fontSize="small" />,
  },
];
export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <List className="flex-1 px-3 py-4">
      {items.map((item) => {
        const active = pathname.includes(item.href);
        const router = useRouter();

        return (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.href)}
              className={`rounded-2xl mb-1 transition-all duration-300
              ${active ? "bg-blue-700/20" : "hover:bg-slate-800"}`}
            >
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
