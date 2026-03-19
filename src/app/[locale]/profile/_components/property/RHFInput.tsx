import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const RHFInput = ({ name, label, ...props }: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      fullWidth
      label={label}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
      size="small"
      {...props}
    />
  );
};
