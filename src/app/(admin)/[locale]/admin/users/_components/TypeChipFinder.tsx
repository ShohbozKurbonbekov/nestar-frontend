import { Chip } from "@mui/material";

export const TypeChipFinder = ({ type }: { type: string }) => {
  return <Chip label={type} variant="outlined" size="small" />;
};
