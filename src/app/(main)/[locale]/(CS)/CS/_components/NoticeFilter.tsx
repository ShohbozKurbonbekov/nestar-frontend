"use client";
import NoticesCategorySelect from "@/components/ui/NoticesCategorySelect";
import NoticesSearchInput from "@/components/ui/NoticesSearchInput";
import NoticesSort from "@/components/ui/NoticesSort";
import { Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NoticeFilter() {
  const searchParams = useSearchParams();
  const noticeTitle = searchParams.get("noticeTitle") ?? "";
  const [search, setSearch] = useState<string>(noticeTitle);
  return (
    <Paper className="max-w-6xl mx-auto w-full bg-slate-50 border border-slate-300 rounded-3xl p-7 shadow-none">
      <div className="grid grid-cols-1  md:grid-cols-10 gap-3">
        <div className="md:col-span-7 bg-white">
          <NoticesSearchInput search={search} setSearch={setSearch} />
        </div>
        <div className="md:col-span-3 bg-white">
          <NoticesCategorySelect />
        </div>
        <div className="md:col-span-9">
          <NoticesSort />
        </div>
      </div>
    </Paper>
  );
}
