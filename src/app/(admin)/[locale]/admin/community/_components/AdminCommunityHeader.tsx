"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function AdminCommunityHeader() {
  return (
    <Stack direction="row" spacing={2} alignItems="center" className="mb-10">
      {/* ICON */}
      <Box className="p-4 rounded-2xl bg-linear-to-br from-indigo-500 to-sky-500 ">
        <ArticleRoundedIcon className="text-white text-[28px]" />
      </Box>

      {/* TEXT */}
      <Box>
        <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
          <Typography className="text-2xl font-semibold text-slate-800">
            Board Articles{" "}
          </Typography>
          <Chip
            size="small"
            icon={<AutoAwesomeRoundedIcon />}
            label="Content Management"
            className="bg-sky-50 text-sky-600 font-medium"
          />
        </Stack>

        <Typography className="text-sm text-slate-500 mt-1 max-w-xl">
          Create, manage, and moderate board articles. Control publishing
          workflow, monitor engagement, and maintain high‑quality platform
          content across your system.
        </Typography>
      </Box>
    </Stack>
  );
}
