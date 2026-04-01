"use client";
import { useState } from "react";
import { Chip, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TitleSearchInput from "./_components/TitleSearchInput";
import StatusSelect from "./_components/StatusSelect";
import LocationSelect from "./_components/LocationSelect";
import SelectedLocations from "./_components/SelectedLocation";

export default function PropertiesSearchFilter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [locations, setLocations] = useState([]);

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setLocations([]);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-7 relative">
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
          <h2 className="text-xl font-semibold text-slate-700">
            Property Search Filter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <TitleSearchInput value={search} onChange={setSearch} />
          </div>

          <div className="md:col-span-3">
            <StatusSelect value={status} onChange={setStatus} />
          </div>

          <div className="md:col-span-3">
            <LocationSelect value={locations} onChange={setLocations} />
          </div>
        </div>

        <SelectedLocations locations={locations} setLocations={setLocations} />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  );
}
