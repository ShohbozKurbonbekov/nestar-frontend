"use client";

import { Box, Paper, Chip, Stack } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import AdminUsersHeader from "./_components/AdminUsersHeader";
import AdminUsersMemberTypeFilter from "./_components/AdminUsersMemberTypeFilter";
import AdminUsersSearchStatus from "./_components/AdminUsersSearchStatus";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminUsers } from "@/libs/hooks/useAdminUsers";
import AdminUsersList from "./_components/AdminUsersList";

export default function AdminUsers() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberType = searchParams.get("memberType") ?? "ALL";
  const status = searchParams.get("memberStatus") ?? "ALL";
  const { query, totalAdminUsers } = useAdminUsers({
    searchParams,
  });

  const onQueryDelete = (name: "memberStatus" | "memberType") => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);
    router.replace(`?${params.toString()}`);
  };
  const onQuery = (
    name: "limit" | "page" | "memberType" | "memberStatus",
    value: string,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (name === "limit") {
      params.set("page", "1");
    }
    params.set(name, value.trim());
    router.replace(`?${params.toString()}`);
  };
  return (
    <Box className="mt-5">
      <AdminUsersHeader />

      <Paper className="py-7 rounded-2xl  bg-slate-50 shadow-none overflow-x-auto">
        <Box className="px-5 space-y-7">
          <AdminUsersMemberTypeFilter />

          <AdminUsersSearchStatus />

          <Stack direction="row" spacing={1}>
            {memberType !== "ALL" && (
              <Chip
                label={`Type: ${memberType}`}
                onDelete={() => onQueryDelete("memberType")}
              />
            )}
            {status !== "ALL" && (
              <Chip
                label={`Status: ${status}`}
                onDelete={() => onQueryDelete("memberStatus")}
              />
            )}
          </Stack>

          {/* USER LIST */}
          <Box className="w-full overflow-x-auto">
            <AdminUsersList />
          </Box>

          {!!totalAdminUsers && (
            <TablePagination
              component="div"
              count={totalAdminUsers}
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
