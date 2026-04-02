"use client";

import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { BOARD_ARTICLE_CATEGORY_OPTIONS } from "@/libs/data/admin/common";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function CommunityCategorySelect() {
  const searchParams = useSearchParams();
  const category = searchParams.get("articleCategory") || "ALL";
  const router = useRouter();

  const onCategory = (category: string) => {
    const params = new URLSearchParams(searchParams);

    if (category === "ALL") {
      params.delete("articleCategory");
    } else {
      params.set("articleCategory", category);
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        sx={inputSx}
        renderValue={(selected) => {
          if (!selected) {
            return <span className="text-slate-400">Article Category</span>;
          }
          return selected;
        }}
      >
        {BOARD_ARTICLE_CATEGORY_OPTIONS.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
