"use client";
import { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import SortIcon from "@mui/icons-material/Sort";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import { SetStateType } from "@/libs/types/common";
import { Direction } from "@/libs/enums/common.enum";
import { useRouter } from "next/navigation";

const inputClasses = {
  ".MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#cbd5e1",
    },
  ".MuiInputBase-root.MuiOutlinedInput-root:hover  .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#94a3b8",
    },
};

interface AgentSearchFilterType {
  setFilter: SetStateType<AgentsInquiry>;
  filter: AgentsInquiry;
}
export default function AgentSearchFilter({
  setFilter,
  filter,
}: AgentSearchFilterType) {
  const router = useRouter();
  const [searchName, setSearchName] = useState(filter?.search?.text ?? "");
  const [address, setAddress] = useState(filter?.search?.location ?? "");
  const [sort, setSort] = useState("created");

  const onSort = (sort: string) => {
    switch (sort) {
      case "created":
        setFilter((prev) => ({
          ...prev,
          sort: "createdAt",
          direction: Direction.DESC,
        }));
        setSort(sort);
        break;
      case "updatedAt":
        setFilter((prev) => ({
          ...prev,
          sort: "updatedAt",
          direction: Direction.DESC,
        }));
        setSort(sort);
        break;
      case "memberLikes":
        setFilter((prev) => ({
          ...prev,
          sort: "memberLikes",
          direction: Direction.DESC,
        }));
        setSort(sort);
        break;
      case "memberViews":
        setFilter((prev) => ({
          ...prev,
          sort: "memberViews",
          direction: Direction.DESC,
        }));
        setSort(sort);
        break;
    }
  };
  return (
    <div className="max-w-8xl mx-auto px-4 my-10">
      <div className="w-full max-w-6xl mx-auto bg-white border border-slate-300/80 rounded-2xl shadow-sm p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
          {/* Agent Name */}
          <TextField
            fullWidth
            placeholder="Agent Name / @Nickname"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              startAdornment: <PersonIcon className="text-slate-400 mr-2" />,
            }}
            sx={inputClasses}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newFilter = {
                  ...filter,
                  search: {
                    ...filter.search,
                    text: searchName.trim(),
                  },
                };

                setFilter(newFilter);

                router.push(`/agents?input=${JSON.stringify(newFilter)}`);
              }
            }}
          />

          {/* Address */}
          <TextField
            fullWidth
            placeholder="Agent Location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{
              startAdornment: (
                <LocationOnIcon className="text-slate-400 mr-2" />
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newFilter = {
                  ...filter,
                  search: { ...filter.search, location: address.trim() },
                };

                router.push(`/agents?input=${JSON.stringify(newFilter)}`);
              }
            }}
            sx={inputClasses}
          />

          {/* Sort */}
          <FormControl fullWidth>
            <InputLabel className="text-slate-400">Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => onSort(e.target.value)}
              startAdornment={<SortIcon className="mr-2 text-slate-400" />}
              sx={{
                "&.MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#cbd5e1",
                  },
                "&.MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#94a3b8",
                  },
              }}
            >
              <MenuItem value="created">Newest Agents</MenuItem>
              <MenuItem value="updatedAt">Recently Updated</MenuItem>
              <MenuItem value="memberLikes">Most Liked</MenuItem>
              <MenuItem value="memberViews">Most Viewed</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
