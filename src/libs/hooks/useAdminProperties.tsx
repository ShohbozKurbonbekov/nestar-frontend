"use client";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { URLSearchParams } from "url";
import { Direction } from "../enums/common.enum";
import { userVar } from "@/apollo/store";
import { AllPropertiesInquiry } from "../types/property/property.input";
import { PropertyLocation, PropertyStatus } from "../enums/property.enum";
import { GET_ALL_PROPERTIES_BY_ADMIN } from "@/apollo/admin/query";
import { MemberType } from "../enums/member.enum";

interface UseAdminPropertiesType {
  searchParams: URLSearchParams;
}

export function useAdminProperties({ searchParams }: UseAdminPropertiesType) {
  const user = useReactiveVar(userVar);
  const propertiesInquery: AllPropertiesInquiry = useMemo(() => {
    return {
      limit: Number(searchParams.get("limit")) || 10,
      page: Number(searchParams.get("page")) || 1,
      direction: Direction.DESC,
      sort: "createdAt",
      search: {
        ...(searchParams.get("propertyStatus")
          ? {
              propertyStatus: searchParams.get(
                "propertyStatus",
              ) as PropertyStatus,
            }
          : {}),
        ...((searchParams.get("propertyLocationList")
          ? {
              propertyLocationList: searchParams.getAll("propertyLocationList"),
            }
          : {}) as PropertyLocation[]),
        ...(searchParams.get("propertyTitle")
          ? { propertyTitle: searchParams.get("propertyTitle") as string }
          : {}),
      },
    };
  }, [searchParams]);

  // Query
  const { data, loading, refetch } = useQuery(GET_ALL_PROPERTIES_BY_ADMIN, {
    variables: { input: propertiesInquery },
    skip: user?.memberType !== MemberType.ADMIN,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // Handlers
  const refetchAdminProperties = useCallback(async () => {
    await refetch({
      input: propertiesInquery,
    });
  }, [propertiesInquery, refetch]);

  return {
    adminProperties: data?.getAllPropertiesByAdmin?.list ?? [],
    totalAdminProperties:
      data?.getAllPropertiesByAdmin?.metaCounter?.[0]?.total ?? 0,
    loading,
    refetchAdminProperties,
    query: propertiesInquery,
  };
}
