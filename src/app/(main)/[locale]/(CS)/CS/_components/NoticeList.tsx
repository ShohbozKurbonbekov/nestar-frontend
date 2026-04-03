"use client";

import { usePublicNotices } from "@/libs/hooks/usePublicNotices";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
  Pagination,
} from "@mui/material";
import { Notice } from "@/libs/types/notice/notice";
import {
  CAN_VIEW_CATEGORY_STYLES,
  CAN_VIEW_PRIORITY_STYLES,
} from "@/libs/data/mix-styles";
import { canViewNotice } from "@/libs/utils/canViewFinder";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import Emty from "@/components/ui/Emty";
import { PublicNoticeSkeletons } from "@/components/skeletons/PublicNoticeSkeletons";

export default function NoticeList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const { publicNotices, totalPublicNotices, query, loading } =
    usePublicNotices({
      searchParams,
    });

  const onPage = (_: any, page: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Stack gap={5}>
      <div className="w-full  space-y-3">
        {loading ? (
          <PublicNoticeSkeletons columns={3} />
        ) : !publicNotices.length ? (
          <Emty title="No Notices Yet" />
        ) : (
          publicNotices.map((notice: Notice) => {
            const priority = CAN_VIEW_PRIORITY_STYLES[notice.noticePriority];
            const canSee = canViewNotice(
              notice.noticeVisibility,
              user.memberType,
            );
            return canSee ? (
              <Card
                key={notice._id}
                className="border border-slate-200 rounded-2xl hover:shadow-lg transition"
              >
                <CardContent>
                  <Stack spacing={2}>
                    {/* ALERT */}
                    <Box
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${priority.alertStyle}`}
                    >
                      {priority.alert}
                    </Box>

                    {/* HEADER */}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems={"center"}
                      flexWrap={"wrap"}
                      gap={2}
                    >
                      <Typography className="font-semibold text-slate-800 text-base">
                        {notice.noticeTitle}
                      </Typography>

                      <Typography className="text-xs text-slate-400">
                        {timeFormatter(notice.createdAt)}
                      </Typography>
                    </Stack>

                    {/* CONTENT */}
                    <Typography className="text-sm text-slate-600">
                      {notice.noticeContent}
                    </Typography>

                    {/* CHIPS */}
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={notice.noticeCategory}
                        size="small"
                        className={
                          CAN_VIEW_CATEGORY_STYLES[notice.noticeCategory]
                        }
                      />

                      <Chip
                        label={priority.label}
                        size="small"
                        className={priority.chip + " font-medium"}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ) : null;
          })
        )}
      </div>

      {/* Pagination */}
      {!!publicNotices.length && (
        <Pagination
          count={Math.ceil(totalPublicNotices / query?.limit)}
          variant="outlined"
          page={query?.page ?? 1}
          size="large"
          sx={{
            ".MuiPagination-ul": {
              display: "flex",
              flexDirection: "row",
              gap: "10px 5px",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          onChange={(e, value) => onPage(e, String(value))}
        />
      )}
    </Stack>
  );
}
