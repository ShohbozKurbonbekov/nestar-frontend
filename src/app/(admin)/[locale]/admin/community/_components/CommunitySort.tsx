"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  {
    value: "createdAt",
    label: "Newest",
    icon: <CalendarTodayRoundedIcon fontSize="small" />,
  },
  {
    value: "updatedAt",
    label: "Recently Updated",
    icon: <UpdateRoundedIcon fontSize="small" />,
  },
  {
    value: "articleLikes",
    label: "Most Liked",
    icon: <ThumbUpAltRoundedIcon fontSize="small" />,
  },
  {
    value: "articleViews",
    label: "Most Viewed",
    icon: <VisibilityRoundedIcon fontSize="small" />,
  },
  {
    value: "featuredScore",
    label: "Featured",
    icon: <StarRoundedIcon fontSize="small" />,
  },
];

export default function CommunitySort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") || "createdAt";

  const onSort = (_: any, newSort: string) => {
    if (!newSort) return;
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    router.replace(`?${params.toString()}`);
  };

  return (
    <ToggleButtonGroup
      value={sort}
      exclusive
      onChange={onSort}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => (
        <ToggleButton
          key={opt.value}
          value={opt.value}
          classes={{ selected: "bg-indigo-500 text-white shadow-md" }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-1 text-sm capitalize font-medium rounded-lg transition-all duration-200 hover:bg-indigo-50 border border-slate-200"
        >
          {opt.icon}
          <span>{opt.label}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
