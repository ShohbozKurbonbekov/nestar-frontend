"use client";

import { useAdminCommunity } from "@/libs/hooks/useAdminCommunity";
import { Box, Paper, TablePagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import AdminCommunityHeader from "./_components/AdminCommunityHeader";
import AdminCommunitySearchFilter from "./_components/AdminCommunitySearchFilter";
import AdminCommunityList from "./AdminCommunityList ";

export default function AdminCommunity() {
  const searchParams = useSearchParams();
  const {
    query,
    adminCommunityList,
    refetchAdminCommunity,
    totalAdminCommunity,
  } = useAdminCommunity({ searchParams });
  const router = useRouter();

  const onQueryDelete = (name: "articleStatus" | "articleCategory") => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);
    router.replace(`?${params.toString()}`);
  };

  const onQuery = (
    name: "limit" | "page" | "articleStatus" | "articleCategory",
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
      <AdminCommunityHeader />

      <Paper className="py-7 rounded-2xl  bg-slate-50 shadow-none overflow-x-auto">
        <Box className="px-5 space-y-7">
          <AdminCommunitySearchFilter />
          <Box className="w-full overflow-x-auto">
            <AdminCommunityList />
          </Box>
          {!!totalAdminCommunity && (
            <TablePagination
              component="div"
              count={totalAdminCommunity}
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
