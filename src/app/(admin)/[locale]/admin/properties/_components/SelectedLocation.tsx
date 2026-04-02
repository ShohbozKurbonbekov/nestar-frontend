"use client";
import { Chip } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SelectedLocations() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locations = searchParams.getAll("propertyLocationList");

  const onDelete = (locations: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete("propertyLocationList");

    locations.forEach((location) => {
      params.append("propertyLocationList", location);
    });
    router.replace(`?${params.toString()}`);
  };
  if (!locations || !locations.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {locations.map((value) => (
        <Chip
          key={value}
          label={value}
          onDelete={() => onDelete(locations.filter((l) => l !== value))}
          className="bg-slate-100 text-slate-700 rounded-xl"
        />
      ))}
    </div>
  );
}
