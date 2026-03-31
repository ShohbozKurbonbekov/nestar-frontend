"use client";

import { userVar } from "@/apollo/store";
import { UPDATE_PROPERTY } from "@/apollo/user/mutation";
import { GET_AGENT_PROPERTIES, GET_PROPERTIES } from "@/apollo/user/query";
import { Direction } from "@/libs/enums/common.enum";
import { PropertySort } from "@/libs/enums/property.enum";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { T } from "@/libs/types/common";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, Pagination, Chip, Divider } from "@mui/material";
import { Property } from "@/libs/types/property/property";
import { PropertyStatus } from "@/libs/enums/property.enum";
import ProfileContentHeader from "../ProfileContentHeader";
import Emty from "@/components/ui/Emty";
import ProfilePropertyCard from "../property/ProfilePropertyCard";
import ProfilePropertyCardsSkeleton from "@/components/skeletons/ProfilePropertyCardsSkeleton";

export default function MyProperties() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalProperties] = useState<number>(0);
  const user = useReactiveVar(userVar);
  const memberId = String(useParams().userId);
  const isOwner = user._id === memberId;
  const agentPropertiesInput = useMemo(() => {
    return {
      limit: 4,
      page: Number(searchParams.get("page")) || 1,
      search: {
        ...(isOwner
          ? {
              propertyStatus:
                (searchParams.get("status") as PropertyStatus) ||
                PropertyStatus.ACTIVE,
            }
          : {}),
        ...(!isOwner ? { memberId: memberId } : {}),
      },
      direction: Direction.DESC,
      sort: PropertySort.CREATED_AT,
    };
  }, [searchParams, isOwner, memberId]);
  // ******************************* Apollo  *******************************
  const [updateProperty] = useMutation(UPDATE_PROPERTY);
  const {
    loading: getAgentPropertiesLoading,
    refetch: getAgentPropertiesRefetch,
  } = useQuery(isOwner ? GET_AGENT_PROPERTIES : GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: agentPropertiesInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      if (isOwner) {
        setAgentProperties(data?.getAgentProperties?.list);
        setTotalProperties(
          data?.getAgentProperties?.metaCounter[0]?.total ?? 0,
        );
      } else {
        setAgentProperties(data?.getProperties?.list);
        setTotalProperties(data?.getProperties?.metaCounter[0]?.total);
      }
    },
  });

  // ******************************* Apollo  End *******************************

  // ------------------------------------ Handlers -----------------------------

  const onPage = (e: T, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));

    router.replace(`?${params.toString()}`);
  };

  const onStatusChange = useCallback(
    (value: PropertyStatus) => {
      const params = new URLSearchParams(searchParams);
      params.set("status", value);
      params.set("page", "1");

      router.replace(`?${params.toString()}`);
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

  const isActive =
    agentPropertiesInput.search.propertyStatus === PropertyStatus.ACTIVE;

  // ------------------------------------ Render -----------------------------
  return (
    <div className="w-full flex flex-col h-full">
      <ProfileContentHeader
        subtitle={
          isOwner
            ? "Welcome back — manage your listings efficiently"
            : undefined
        }
        title={isOwner ? "My Properties" : "Properties"}
      />

      <div className="p-4 flex-1 flex flex-col h-full">
        {isOwner && (
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
        )}

        {/* TABLE HEADER (hidden on mobile) */}
        <div className="w-full overflow-x-auto">
          <Stack
            direction="row"
            className="md:flex py-3 px-4 min-w-250 gap-6 text-sm font-semibold text-gray-500 "
          >
            <div className="min-w-70 text-center">Listing</div>
            <div className="min-w-35 text-center">Published</div>
            <div className="min-w-35 text-center">Status</div>
            <div className="min-w-25 text-center">Views</div>
            {isActive && (
              <div className="flex-1 flex justify-end ">Actions</div>
            )}
          </Stack>
        </div>

        <Divider className="mt-2" />

        {/* LIST */}
        <Stack className="mt-6 mb-4 gap-3 ">
          {getAgentPropertiesLoading ? (
            <ProfilePropertyCardsSkeleton />
          ) : !agentProperties.length ? (
            <Emty title="No agent properties" />
          ) : (
            agentProperties.map((property) => (
              <ProfilePropertyCard
                isOwner={isOwner}
                key={property._id}
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
                  "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
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
