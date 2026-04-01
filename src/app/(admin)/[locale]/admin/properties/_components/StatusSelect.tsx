import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { PropertyStatus } from "@/libs/enums/property.enum";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function StatusSelect({ value, onChange }: any) {
  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={inputSx}
        renderValue={(selected) => {
          if (!selected) {
            return <span className="text-slate-400">Property Status</span>;
          }
          return selected;
        }}
      >
        {Object.keys(PropertyStatus).map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
