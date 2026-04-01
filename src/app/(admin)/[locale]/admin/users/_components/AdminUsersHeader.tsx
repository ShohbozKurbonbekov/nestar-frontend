import { Box, Stack, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function AdminUserHeader() {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      alignItems={"center"}
      className="mb-10"
    >
      <Box className="p-4 rounded-2xl bg-slate-200 text-slate-700 shadow-sm">
        <PeopleAltIcon />
      </Box>
      <Box>
        <Typography variant="h4">Member Management </Typography>
        <Typography className="text-slate-500 text-sm mt-1">
          Manage platform users, filter by role and status, and control access.
        </Typography>
      </Box>
    </Stack>
  );
}
