"use client";
import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { PROPERTY_STATUS_OPTIONS } from "@/libs/data/admin/common";
import { PropertyStatus } from "@/libs/enums/property.enum";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function StatusSelect() {
  const searchParams = useSearchParams();
  const status = searchParams.get("propertyStatus") || "ALL";
  const router = useRouter();

  const onStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status === "ALL") {
      params.delete("propertyStatus");
    } else {
      params.set("propertyStatus", status);
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={status}
        onChange={(e) => onStatus(e.target.value)}
        sx={inputSx}
        renderValue={(selected) => {
          if (!selected) {
            return <span className="text-slate-400">Property Status</span>;
          }
          return selected;
        }}
      >
        {PROPERTY_STATUS_OPTIONS.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
