"use client";
import { useAdminNotices } from "@/libs/hooks/useAdminNotices";
import { Box, Paper, Stack, TablePagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import AdminNoticesHeader from "./_components/AdminNoticesHeader";
import NoticesSearchFilter from "./_components/NoticesSearchFilter";
import AdminNoticesList from "./_components/AdminNoticesList";

export default function AdminNotices() {
  const searchParams = useSearchParams();
  const { query, totalAdminNotices } = useAdminNotices({ searchParams });
  const router = useRouter();

  const onQuery = (name: "limit" | "page", value: string) => {
    const params = new URLSearchParams(searchParams);

    if (name === "limit") {
      params.set("page", "1");
    }
    params.set(name, value.trim());
    router.replace(`?${params.toString()}`);
  };
  return (
    <Box className="mt-5">
      <AdminNoticesHeader />

      <Paper className="py-7 rounded-2xl  bg-slate-50 shadow-none overflow-x-auto">
        <Box className="px-5 space-y-7">
          <NoticesSearchFilter />
          <Box className="w-full overflow-x-auto">
            <AdminNoticesList />
          </Box>
          {!!totalAdminNotices && (
            <TablePagination
              component="div"
              count={totalAdminNotices}
              page={query.page - 1}
              onPageChange={(_, newPage) =>
                onQuery("page", String(newPage + 1))
              }
              rowsPerPage={query.limit}
              onRowsPerPageChange={(e) => {
                onQuery("limit", String(e.target.value));
              }}
              rowsPerPageOptions={[5, 10, 20, 40, 60]}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
