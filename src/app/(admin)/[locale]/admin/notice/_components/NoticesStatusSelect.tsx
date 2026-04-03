"use client";

import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Hold", value: "HOLD" },
  { label: "Deleted", value: "DELETE" },
];

export default function NoticesStatusSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get("noticeStatus") || "ALL";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "ALL") params.delete("noticeStatus");
    else {
      params.set("noticeStatus", value);
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={status}
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
