"use client";
import { FormControl, Select, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslations } from "next-intl";

type SortOption = "newest" | "price_desc" | "price_asc";

export default function PropertySort() {
  const t = useTranslations("Properties");
  const [sort, setSort] = useState<SortOption>("newest");

  return (
    <div className="max-w-8xl px-4 mx-auto flex justify-end gap-5 mb-5 items-center">
      <Typography variant="body1" className=" capitalize">
        {t("sortBy")}
      </Typography>

      {/* Right Side Select */}
      <div className="w-48">
        <FormControl fullWidth size="small">
          <Select
            labelId="property-sort-label"
            id="property-sort"
            value={sort}
            label="Select"
            onChange={(e) => setSort(e.target.value)}
            sx={{
              "&.MuiOutlinedInput-root .mui-trm6af-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  border: "2px solid #CBD5E1",
                  borderRadius: "10px",
                },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "0",
              },
            }}
          >
            <MenuItem value="newest">{t("newest")}</MenuItem>
            <MenuItem value="price_desc">{t("highest")}</MenuItem>
            <MenuItem value="price_asc">{t("lowest")}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
