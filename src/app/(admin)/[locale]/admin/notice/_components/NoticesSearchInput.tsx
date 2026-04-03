"use client";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { SetStateType } from "@/libs/types/common";
import { textFieldSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";

interface NoticesSearchInputType {
  search: string;
  setSearch: SetStateType<string>;
}

const NoticesSearchInput: React.FC<NoticesSearchInputType> = React.memo(
  ({ search, setSearch }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onEnter = () => {
      const params = new URLSearchParams(searchParams);

      if (!search.trim()) {
        params.delete("noticeTitle");
      } else {
        params.set("noticeTitle", search.trim());
        params.set("page", "1");
      }

      router.replace(`?${params.toString()}`);
    };

    const onDelete = () => {
      setSearch("");

      const params = new URLSearchParams(searchParams);
      params.delete("noticeTitle");

      router.replace(`?${params.toString()}`);
    };

    return (
      <TextField
        fullWidth
        placeholder="Search notice title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={textFieldSx}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-slate-400" />
            </InputAdornment>
          ),

          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onDelete}>
                <CloseIcon className="text-slate-400" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);

export default NoticesSearchInput;
