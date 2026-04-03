"use client";

import { userVar } from "@/apollo/store";
import { serverApi } from "@/libs/config";
import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";

export default function AdminWelcome() {
  const admin = useReactiveVar(userVar);
  const imageUrl = admin.memberImage
    ? `${serverApi}/${admin.memberImage}`
    : "/images/default-user.png";
  return (
    <Card className="mx-auto shadow-none mt-10 bg-linear-to-br from-slate-100 to-black/10 w-full max-w-2xl rounded-3xl border border-slate-200">
      <CardContent>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Avatar */}
          <Avatar
            src={imageUrl}
            className="w-30 h-30 border border-slate-200"
          />

          {/* Welcome Text */}
          <Stack spacing={1}>
            <Typography className="text-sm text-slate-500">
              Welcome back 👋
            </Typography>

            <Typography className="text-3xl font-semibold text-slate-900">
              {admin.memberFullName}
            </Typography>

            <Typography className="text-slate-500 max-w-md text-sm">
              Manage your platform and navigate through the system using the
              sidebar. All administrative tools are available across dedicated
              pages.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
