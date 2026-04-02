"use client";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRouter, useSearchParams } from "next/navigation";
import CommunitySearchInput from "./CommunitySearchInput";
import StatusSelect from "../../properties/_components/StatusSelect";
import CommunityStatusSelect from "./CommunityStatusSelect";
import LocationSelect from "../../properties/_components/LocationSelect";
import CommunityCategorySelect from "./CommunityCategorySelect";
import CommunitySort from "./CommunitySort";

export default function AdminCommunitySearchFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const articleTitle = searchParams.get("articleTitle") ?? "";
  const [search, setSearch] = useState<string>(articleTitle);

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("articleTitle");
    params.delete("articleStatus");
    params.delete("articleCategory");
    params.delete("page");
    setSearch("");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-slate-300 rounded-3xl p-7 relative">
      {/* Reset */}
      <div className="absolute right-6 top-6">
        <IconButton
          size="small"
          onClick={handleReset}
          className="border border-slate-200 hover:border-slate-400 rounded-xl"
        >
          <RestartAltIcon fontSize="small" className="text-slate-500" />
        </IconButton>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <FilterListIcon className="text-slate-600" />
        <Typography variant="h5" className="text-slate-700">
          Article Search & Filter
        </Typography>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <CommunitySearchInput search={search} setSearch={setSearch} />
        </div>

        <div className="col-span-3">
          <CommunityStatusSelect />
        </div>

        <div className="col-span-3">
          <CommunityCategorySelect />
        </div>
        <div className="col-span-12 flex items-start">
          <CommunitySort />
        </div>
      </div>
    </div>
  );
}
