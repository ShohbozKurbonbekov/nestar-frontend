"use client";

import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "All Categories", value: "ALL" },
  { label: "General", value: "GENERAL" },
  { label: "Announcement", value: "ANNOUNCEMENT" },
  { label: "Update", value: "UPDATE" },
  { label: "Event", value: "EVENT" },
];

export default function NoticesCategorySelect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("noticeCategory") || "ALL";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "ALL") params.delete("noticeCategory");
    else {
      params.set("noticeCategory", value);
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={category}
        onChange={(e) => onChange(e.target.value)}
        sx={inputSx}
      >
        {OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
