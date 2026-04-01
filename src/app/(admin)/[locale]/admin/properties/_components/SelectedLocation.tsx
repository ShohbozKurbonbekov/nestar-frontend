import { Chip } from "@mui/material";

export default function SelectedLocations({ locations, setLocations }: any) {
  if (!locations.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {locations.map((value) => (
        <Chip
          key={value}
          label={value}
          onDelete={() => setLocations(locations.filter((l) => l !== value))}
          className="bg-slate-100 text-slate-700 rounded-xl"
        />
      ))}
    </div>
  );
}
