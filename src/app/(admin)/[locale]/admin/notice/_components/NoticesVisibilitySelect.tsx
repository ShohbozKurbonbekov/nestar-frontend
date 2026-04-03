"use client";

import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "All Visibility", value: "ALL" },
  { label: "Public", value: "PUBLIC" },
  { label: "Agent", value: "AGENT" },
  { label: "Admin", value: "ADMIN" },
];

export default function NoticesVisibilitySelect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const visibility = searchParams.get("noticeVisibility") || "ALL";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "ALL") params.delete("noticeVisibility");
    else {
      params.set("noticeVisibility", value);
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={visibility}
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
