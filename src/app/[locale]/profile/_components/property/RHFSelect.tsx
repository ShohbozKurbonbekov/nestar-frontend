// fields/RHFSelect.tsx
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const RHFSelect = ({ name, label, options }: any) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth size="small" error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} label={label}>
            {options.map((opt: any) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message as string}</FormHelperText>
    </FormControl>
  );
};
