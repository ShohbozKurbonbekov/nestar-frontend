"use client";

import Link from "next/link";
import { Box, Stack, Typography, Button } from "@mui/material";

import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function AdminNoticesHeader() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="mb-10"
    >
      {/* LEFT SIDE */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* ICON */}
        <Box className="p-4 rounded-2xl bg-linear-to-br from-sky-100 to-sky-200">
          <CampaignRoundedIcon className="text-slate-700" />
        </Box>

        {/* TEXT */}
        <Box>
          <Typography className="text-2xl font-semibold text-slate-800">
            Notice Management
          </Typography>

          <Typography className="text-sm text-slate-500 mt-1 max-w-xl">
            Create and manage platform notices, announcements, and updates to
            keep users informed and maintain transparency.
          </Typography>
        </Box>
      </Stack>

      {/* CREATE BUTTON */}
      <Link href="/admin/notice-create">
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          className="bg-slate-800 hover:bg-slate-700 rounded-xl px-5 py-2 shadow-sm capitalize"
        >
          Create Notice
        </Button>
      </Link>
    </Stack>
  );
}
