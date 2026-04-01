import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { textFieldSx } from "@/libs/data/admin/AdminPropertiesSharedStyles";

export default function TitleSearchInput({ value, onChange }: any) {
  return (
    <TextField
      fullWidth
      placeholder="Search property title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={textFieldSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" className="text-slate-400" />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => onChange("")}>
              <CloseIcon fontSize="small" className="text-slate-400" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
