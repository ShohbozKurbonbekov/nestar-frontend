"use client";

import { userVar } from "@/apollo/store";
import { UPDATE_PROPERTY } from "@/apollo/user/mutation";
import { GET_AGENT_PROPERTIES } from "@/apollo/user/query";
import { Direction } from "@/libs/enums/common.enum";
import { MemberType } from "@/libs/enums/member.enum";
import { PropertySort } from "@/libs/enums/property.enum";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { T } from "@/libs/types/common";
import { AgentPropertiesInquiry } from "@/libs/types/property/property.input";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, Typography, Pagination, Chip, Divider } from "@mui/material";
import { Property } from "@/libs/types/property/property";
import { PropertyStatus } from "@/libs/enums/property.enum";
import ProfileContentHeader from "../ProfileContentHeader";
import Emty from "@/components/ui/Emty";
import ProfilePropertyCard from "../property/ProfilePropertyCard";

export default function MyProperties() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalPorperties] = useState<number>(0);
  const user = useReactiveVar(userVar);
  const agentPropertiesInput: AgentPropertiesInquiry = useMemo(() => {
    return {
      limit: 2,
      page: Number(searchParams.get("page")) || 1,
      search: {
        propertyStatus:
          (searchParams.get("status") as PropertyStatus) ||
          PropertyStatus.ACTIVE,
      },
      direction: Direction.DESC,
      sort: searchParams.get("sort") || PropertySort.CREATED_AT,
    };
  }, [searchParams]);

  // ******************************* Apollo  *******************************
  const [updateProperty] = useMutation(UPDATE_PROPERTY);

  const {
    loading: getAgentPropertiesLoading,
    error: getAgentPropertiesError,
    refetch: getAgentPropertiesRefetch,
  } = useQuery(GET_AGENT_PROPERTIES, {
    fetchPolicy: "network-only",
    variables: {
      input: agentPropertiesInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setAgentProperties(data?.getAgentProperties?.list);
      setTotalPorperties(data?.getAgentProperties?.metaCounter[0]?.total ?? 0);
    },
    skip: user.memberType !== MemberType.AGENT,
  });

  // ******************************* Apollo  End *******************************

  useEffect(() => {
    if (!user?._id || user.memberType !== MemberType.AGENT) {
      return router.replace("/");
    }
  }, [user, router]);
  // ------------------------------------ Handlers -----------------------------

  const onPage = (e: T, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));

    router.push(`?${params.toString()}`);
  };

  const onStatusChange = useCallback(
    (value: PropertyStatus) => {
      const params = new URLSearchParams(searchParams);
      params.set("status", value);
      params.set("page", "1");

      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const onDelete = useCallback(
    async (id: string) => {
      try {
        if (await sweetConfirmAlert("Are you sure to delete this property?")) {
          await updateProperty({
            variables: {
              input: {
                _id: id,
                propertyStatus: PropertyStatus.DELETE,
              },
            },
          });
          await getAgentPropertiesRefetch({ input: agentPropertiesInput });
        }
      } catch (error: any) {
        await sweetErrorHandling(error);
      }
    },
    [updateProperty, getAgentPropertiesRefetch, agentPropertiesInput],
  );

  const onUpdate = useCallback(
    async (status: PropertyStatus, id: string) => {
      try {
        if (
          await sweetConfirmAlert(`Are you sure to change to ${status} status?`)
        ) {
          await updateProperty({
            variables: {
              input: {
                _id: id,
                propertyStatus: status,
              },
            },
          });
          await getAgentPropertiesRefetch({ input: agentPropertiesInput });
        }
      } catch (error: any) {
        await sweetErrorHandling(error);
      }
    },
    [updateProperty, getAgentPropertiesRefetch, agentPropertiesInput],
  );

  // const onSortChange = useCallback(
  //   (sort: PropertySort) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set("sort", sort);
  //     params.set("page", "1");
  //     router.push(`?${params.toString()}`);
  //   },
  //   [router, searchParams],
  // );

  const isActive =
    agentPropertiesInput.search.propertyStatus === PropertyStatus.ACTIVE;
  // ------------------------------------ Render -----------------------------
  return (
    <div className="w-full flex flex-col h-full">
      <ProfileContentHeader
        subtitle="Welcome back — manage your listings efficiently
"
        title="My Properties
"
      />

      <div className="p-4 flex-1 flex flex-col h-full">
        <Stack direction="row" spacing={2} className="mb-4 overflow-x-auto ">
          <Chip
            label="On Sale"
            clickable
            color={isActive ? "primary" : "default"}
            onClick={() => onStatusChange(PropertyStatus.ACTIVE)}
          />
          <Chip
            label="Sold"
            clickable
            color={!isActive ? "primary" : "default"}
            onClick={() => onStatusChange(PropertyStatus.SOLD)}
          />
        </Stack>

        {/* TABLE HEADER (hidden on mobile) */}
        <Stack
          direction="row"
          className="hidden md:flex py-2 text-sm font-semibold text-gray-500"
        >
          <div className="w-[35%]">Listing</div>
          <div className="w-[20%]">Published</div>
          <div className="w-[15%]">Status</div>
          <div className="w-[15%]">Views</div>
          {isActive && <div className="w-[15%] text-right">Actions</div>}
        </Stack>

        <Divider />

        {/* LIST */}
        <Stack className="mt-6 gap-3 ">
          {!agentProperties ? (
            <Emty title="No agent properties" />
          ) : (
            agentProperties.map((property) => (
              <ProfilePropertyCard
                onDelete={onDelete}
                onUpdate={onUpdate}
                property={property}
              />
            ))
          )}
        </Stack>
        <Stack className="flex-1 flex flex-col justify-end  w-full">
          <div className="flex justify-center border-t border-slate-300/80 pt-5">
            {!!agentProperties.length && (
              <Pagination
                count={Math.ceil(totalProperties / agentPropertiesInput.limit)}
                variant="outlined"
                page={agentPropertiesInput?.page ?? 1}
                size="large"
                sx={{
                  ".MuiPagination-ul": {
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px 5px",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  "& .mui-69t2hf-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                    {
                      backgroundColor: "#CBD5E1CC",
                    },
                }}
                onChange={(e, value) => onPage(e, value)}
              />
            )}
          </div>
        </Stack>
      </div>
    </div>
  );
}
