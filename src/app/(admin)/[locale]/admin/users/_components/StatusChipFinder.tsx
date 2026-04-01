import { Chip } from "@mui/material";

export const StatusChipFinder = ({ status, onClick }: any) => {
  const color =
    status === "ACTIVE"
      ? "success"
      : status === "BLOCKED"
        ? "error"
        : "warning";

  return (
    <Chip
      label={status}
      color={color}
      size="small"
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    />
  );
};
