"use client";

import React from "react";
import { Card, CardContent, Stack, Skeleton, Box } from "@mui/material";
interface PublicNoticeSkeletonsType {
  columns?: number;
}
export function PublicNoticeSkeletons({
  columns = 2,
}: PublicNoticeSkeletonsType) {
  return Array.from({ length: columns }, (_, i) => (
    <Card className="border border-slate-200 rounded-2xl" key={i}>
      <CardContent>
        <Stack spacing={2}>
          {/* ALERT */}
          <Skeleton variant="rounded" height={32} className="rounded-lg" />

          {/* HEADER */}
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="text" width="20%" height={20} />
          </Stack>

          {/* CONTENT */}
          <Stack spacing={0.5}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
          </Stack>

          {/* CHIPS */}
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={90} height={24} />
            <Skeleton variant="rounded" width={110} height={24} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  ));
}
