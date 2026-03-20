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
      placeholder={label}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
      size="small"
      {...props}
      sx={{
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(148, 163, 184, 1)",
        },
        "& .MuiTextField-root .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(148, 163, 184, 1)",
        },
      }}
    />
  );
};
