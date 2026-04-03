"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import { useRouter, useSearchParams } from "next/navigation";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const OPTIONS = [
  {
    value: "NEWEST",
    label: "Newest",
    icon: <CalendarTodayRoundedIcon fontSize="small" />,
  },
  {
    value: "OLDEST",
    label: "Oldest",
    icon: <HistoryRoundedIcon fontSize="small" />,
  },
  {
    value: "UPDATED",
    label: "Recently Updated",
    icon: <UpdateRoundedIcon fontSize="small" />,
  },
];
export default function NoticesSort() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sort = searchParams.get("sort") || "NEWEST";

  const onSort = (_: any, value: string) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };

  return (
    <ToggleButtonGroup
      value={sort}
      exclusive
      onChange={onSort}
      className="flex gap-2"
    >
      {OPTIONS.map((opt) => (
        <ToggleButton
          key={opt.value}
          value={opt.value}
          classes={{ selected: "bg-indigo-500 text-white shadow-md" }}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 capitalize"
        >
          {opt.icon}
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
