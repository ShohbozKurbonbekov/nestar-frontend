import { inputSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";
import { PropertyLocation } from "@/libs/enums/property.enum";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export default function LocationSelect({ value, onChange }: any) {
  return (
    <FormControl fullWidth>
      <Select
        multiple
        displayEmpty
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
            <Checkbox checked={value.indexOf(location) > -1} />
            <ListItemText primary={location} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
