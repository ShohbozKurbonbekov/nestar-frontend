"use client";

import Link from "next/link";
import { Box, Breadcrumbs, Typography, Stack } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";

export default function AdminNoticeCreateHeader() {
  return (
    <Box className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        <Link href="/admin">
          <Typography className="text-slate-500 hover:text-slate-800 cursor-pointer">
            Admin
          </Typography>
        </Link>

        <Link href="/admin/notice">
          <Typography className="text-slate-500 hover:text-slate-800 cursor-pointer">
            Notice
          </Typography>
        </Link>

        <Typography className="text-slate-800 font-medium">
          Create Notice
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box className="p-4 rounded-2xl bg-linear-to-br from-sky-100 to-sky-200 shadow-sm">
          <CampaignRoundedIcon className="text-slate-700" />
        </Box>

        <Box>
          <Typography className="text-2xl font-semibold text-slate-800">
            Create Notice
          </Typography>

          <Typography className="text-sm text-slate-500 mt-1">
            Create new platform notice, announcements, and updates.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
