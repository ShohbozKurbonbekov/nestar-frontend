// fields/RHFNumberInput.tsx
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const RHFNumberInput = ({ name, label }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      type="number"
      fullWidth
      label={label}
      size="small"
      {...register(name, {
        valueAsNumber: true,
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
    />
  );
};
