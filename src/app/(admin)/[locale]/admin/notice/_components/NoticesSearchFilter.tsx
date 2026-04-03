"use client";

import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useRouter, useSearchParams } from "next/navigation";
import NoticesSearchInput from "../../../../../../components/ui/NoticesSearchInput";
import NoticesStatusSelect from "./NoticesStatusSelect";
import NoticesCategorySelect from "../../../../../../components/ui/NoticesCategorySelect";
import NoticesVisibilitySelect from "./NoticesVisibilitySelect";
import NoticesSort from "../../../../../../components/ui/NoticesSort";

export default function NoticesSearchFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const noticeTitle = searchParams.get("noticeTitle") ?? "";
  const [search, setSearch] = useState<string>(noticeTitle);

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("noticeTitle");
    params.delete("noticeCategory");
    params.delete("noticeStatus");
    params.delete("noticeVisibility");
    params.delete("sort");
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
          Notice Search & Filter
        </Typography>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <NoticesSearchInput search={search} setSearch={setSearch} />
        </div>

        <div className="col-span-2">
          <NoticesStatusSelect />
        </div>

        <div className="col-span-2">
          <NoticesCategorySelect />
        </div>

        <div className="col-span-2">
          <NoticesVisibilitySelect />
        </div>

        <div className="col-span-12">
          <NoticesSort />
        </div>
      </div>
    </div>
  );
}
