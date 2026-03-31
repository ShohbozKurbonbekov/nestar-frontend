// fields/RHFRadio.tsx

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface RHFRadioProps {
  name: string;
  label: string;
  options: { label: string; value: any }[];
  row?: boolean;
}

export const RHFRadio = ({
  name,
  label,
  options,
  row = true,
}: RHFRadioProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      error={!!errors[name]}
      sx={{
        "& .MuiRadio-root.Mui-checked": {
          color: "rgba(71, 85, 105, 1)",
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: "rgba(51, 65, 85, 1)",
        },
      }}
    >
      <FormLabel>{label}</FormLabel>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            row={row}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;

              // Convert string → boolean if needed
              if (value === "true") field.onChange(true);
              else if (value === "false") field.onChange(false);
              else field.onChange(value);
            }}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt.label}
                value={String(opt.value)}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
        )}
      />

      <FormHelperText>{errors[name]?.message as string}</FormHelperText>
    </FormControl>
  );
};
