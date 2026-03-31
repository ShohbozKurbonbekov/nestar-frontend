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
    <FormControl
      fullWidth
      size="medium"
      error={!!errors[name]}
      sx={{
        "& .MuiInputLabel-root.Mui-focused": {
          color: "rgba(148, 163, 184, 1)",
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            sx={{
              "&.MuiInputBase-root.MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "rgba(148, 163, 184, 1)",
                },
            }}
          >
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
