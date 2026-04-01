"use client";

import { Box, Stack, Typography } from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

export default function AdminPropertiesHeader() {
  return (
    <Stack direction="row" spacing={2} alignItems="center" className="mb-10">
      {/* ICON */}
      <Box className="p-4 rounded-2xl bg-linear-to-br from-sky-100 to-sky-200 shadow-sm transition-all duration-200 hover:shadow-md">
        <HomeWorkRoundedIcon className="text-sky-600 text-[28px]" />
      </Box>

      {/* TEXT */}
      <Box>
        <Typography className="text-2xl font-semibold text-slate-800">
          Property Management
        </Typography>

        <Typography className="text-sm text-slate-500 mt-1 max-w-xl">
          Manage property listings, update statuses, remove invalid entries, and
          oversee platform content to maintain quality and accuracy.
        </Typography>
      </Box>
    </Stack>
  );
}
