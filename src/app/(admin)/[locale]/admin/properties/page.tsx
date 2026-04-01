"use client";
import { Box, Paper, Stack, TablePagination } from "@mui/material";
import AdminPropertiesHeader from "./_components/AdminPropertiesHeader";
import PropertySearchFilter from "./PropertiesSearchFilter";
import { useAdminProperties } from "@/libs/hooks/useAdminProperties";
import { useSearchParams } from "next/navigation";

export default function AdminProperties() {
  const searchParams = useSearchParams();
  const {
    adminProperties,
    loading,
    query,
    refetchAdminProperties,
    totalAdminProperties,
  } = useAdminProperties({ searchParams });
  return (
    <Box className="mt-5">
      <AdminPropertiesHeader />

      <Paper className="py-7 rounded-2xl  bg-slate-50 shadow-none overflow-x-auto">
        <Box className="px-5 space-y-7">
          <PropertySearchFilter />
          <Box className="w-full overflow-x-auto">
            {/* <AdminUsersList /> */}
          </Box>
          (
          {/* <TablePagination
            component="div"
            count={totalAdminUsers}
            page={query.page - 1}
            onPageChange={(_, newPage) => onQuery("page", String(newPage + 1))}
            rowsPerPage={query.limit}
            onRowsPerPageChange={(e) => {
              onQuery("limit", String(e.target.value));
            }}
            rowsPerPageOptions={[5, 10, 20, 40, 60]}
          /> */}
          )
        </Box>
      </Paper>
    </Box>
  );
}
