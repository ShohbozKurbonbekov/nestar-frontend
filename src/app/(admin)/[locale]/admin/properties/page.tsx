"use client";
import { Box, Paper, Stack, TablePagination } from "@mui/material";
import AdminPropertiesHeader from "./_components/AdminPropertiesHeader";
import PropertySearchFilter from "./PropertiesSearchFilter";
import { useAdminProperties } from "@/libs/hooks/useAdminProperties";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPropertiesList from "./_components/AdminPropertiesList";

export default function AdminProperties() {
  const searchParams = useSearchParams();
  const {
    adminProperties,
    loading,
    query,
    refetchAdminProperties,
    totalAdminProperties,
  } = useAdminProperties({ searchParams });
  const router = useRouter();

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
      <AdminPropertiesHeader />

      <Paper className="py-7 rounded-2xl  bg-slate-50 shadow-none overflow-x-auto">
        <Box className="px-5 space-y-7">
          <PropertySearchFilter />
          <Box className="w-full overflow-x-auto">
            <AdminPropertiesList />
          </Box>
          {!!totalAdminProperties && (
            <TablePagination
              component="div"
              count={totalAdminProperties}
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
