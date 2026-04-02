"use client";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { textFieldSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateType } from "@/libs/types/common";
import React from "react";

interface TitleSearchInputType {
  search: string;
  setSearch: SetStateType<string>;
}
const TitleSearchInput: React.FC<TitleSearchInputType> = React.memo(
  ({ search, setSearch }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onEnter = () => {
      const params = new URLSearchParams(searchParams);
      if (search.trim() === "") {
        params.delete("propertyTitle");
      } else {
        params.set("propertyTitle", search.trim());
        params.set("page", "1");
      }
      router.replace(`?${params.toString()}`);
    };

    const onDelete = () => {
      setSearch("");
      const params = new URLSearchParams(searchParams);
      params.delete("propertyTitle");
      router.replace(`?${params.toString()}`);
    };
    return (
      <TextField
        fullWidth
        placeholder="Search property title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={textFieldSx}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="medium" className="text-slate-400" />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onDelete}>
                <CloseIcon fontSize="small" className="text-slate-400" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);
export default TitleSearchInput;
