"use client";
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TitleSearchInput from "./_components/TitleSearchInput";
import StatusSelect from "./_components/StatusSelect";
import LocationSelect from "./_components/LocationSelect";
import SelectedLocations from "./_components/SelectedLocation";
import { useRouter, useSearchParams } from "next/navigation";

export default function PropertiesSearchFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const propertyTitle = searchParams.get("propertyTitle") ?? "";
  const [search, setSearch] = useState<string>(propertyTitle);

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("propertyTitle");
    params.delete("propertyStatus");
    params.delete("propertyLocationList");
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
          Property Search Filter
        </Typography>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <TitleSearchInput search={search} setSearch={setSearch} />
        </div>

        <div className="col-span-3">
          <StatusSelect />
        </div>

        <div className="col-span-3">
          <LocationSelect />
        </div>
      </div>

      <SelectedLocations />
    </div>
  );
}
