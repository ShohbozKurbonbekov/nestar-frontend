import { Stack, Typography } from "@mui/material";
import React from "react";

interface ProfileContentHeaderType {
  title?: string;
  subtitle?: string;
}

const ProfileContentHeader: React.FC<ProfileContentHeaderType> = React.memo(
  ({ subtitle = "Content subtitle", title = "Content title" }) => {
    return (
      <Stack className="mb-6 border-b border-slate-300/80 p-4">
        <Typography className="text-2xl md:text-3xl font-semibold">
          {title}
        </Typography>
        <Typography className="text-gray-500 text-sm md:text-base">
          {subtitle}
        </Typography>
      </Stack>
    );
  },
);

export default ProfileContentHeader;
