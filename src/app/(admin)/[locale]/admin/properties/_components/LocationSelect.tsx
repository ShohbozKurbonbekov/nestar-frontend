"use client";
import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { PropertyLocation } from "@/libs/enums/property.enum";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function LocationSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locations = searchParams.get("propertyLocationList")
    ? searchParams.getAll("propertyLocationList")
    : [];

  const onLocation = (locations: string[]) => {
    const params = new URLSearchParams(searchParams);
    params.delete("propertyLocationList");

    locations.forEach((location: string) => {
      params.append("propertyLocationList", location);
    });
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <FormControl fullWidth>
      <Select
        multiple
        displayEmpty
        value={locations}
        onChange={(e) => onLocation(e.target.value as string[])}
        sx={inputSx}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="text-slate-400">Property Locations</span>;
          }

          return `${selected.length} selected`;
        }}
      >
        {Object.keys(PropertyLocation).map((location) => (
          <MenuItem key={location} value={location}>
            <Checkbox checked={locations?.includes(location)} />
            <ListItemText primary={location} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
