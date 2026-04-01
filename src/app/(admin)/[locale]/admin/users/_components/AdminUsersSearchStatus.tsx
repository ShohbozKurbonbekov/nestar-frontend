"use client";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchIcon from "@mui/icons-material/Search";
import { MemberStatus } from "@/libs/enums/member.enum";

export default function AdminUsersSearchStatus() {
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberStatus = searchParams.get("memberStatus") ?? "ALL";

  const onQuery = (name: "text" | "memberStatus", value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value.trim());
    router.replace(`?${params.toString()}`);
  };

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <TextField
        fullWidth
        placeholder="Search Users...."
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onQuery("text", search.trim());
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {search && (
                <CancelRoundedIcon
                  className="cursor-pointer mr-2 text-slate-400 hover:text-slate-700"
                  onClick={() => {
                    setSearch("");
                    onQuery("text", "");
                  }}
                />
              )}
              <SearchIcon className="text-slate-500" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "56px",
            borderRadius: "14px",
            "& fieldset": { borderColor: "#cbd5e1" },
            "&:hover fieldset": { borderColor: "#64748b" },
            "&.Mui-focused fieldset": { borderColor: "#475569" },
          },
        }}
      />

      <FormControl
        size="medium"
        sx={{
          minWidth: 180,
        }}
      >
        <Select
          value={memberStatus}
          onChange={(e) => onQuery("memberStatus", e.target.value)}
          displayEmpty
          sx={{
            height: "56px",
            borderRadius: "14px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#cbd5e1",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#64748b",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#475569",
            },
          }}
        >
          <MenuItem value="ALL"> All Status</MenuItem>
          <MenuItem value={MemberStatus.ACTIVE}> Active</MenuItem>
          <MenuItem value={MemberStatus.BLOCK}> Blocked</MenuItem>
          <MenuItem value={MemberStatus.DELETE}> Deleted</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
