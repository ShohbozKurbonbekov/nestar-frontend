import { Chip } from "@mui/material";

interface PropertiesTagsType {
  propertyType: string;
  propertyTag: string;
}
export default function PropertiesTags({
  propertyType,
  propertyTag,
}: PropertiesTagsType) {
  return (
    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
      <Chip
        label={propertyTag}
        size="small"
        className="bg-slate-400 text-white px-2 py-1 capitalize"
      />
      <Chip
        label={propertyType}
        size="small"
        className="bg-white text-gray-700 px-2 py-1 capitalize"
      />
    </div>
  );
}
