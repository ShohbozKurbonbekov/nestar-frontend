import { Pagination, Stack } from "@mui/material";
import ProfileContentHeader from "../ProfileContentHeader";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useCallback, useMemo, useState } from "react";
import { Message } from "@/libs/enums/common.enum";
import { likeTargetProperty } from "@/services/Property.service";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import { GET_FAVORITES } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import { Property } from "@/libs/types/property/property";
import { useRouter, useSearchParams } from "next/navigation";
import { T } from "@/libs/types/common";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import Emty from "@/components/ui/Emty";
import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesTags from "@/app/(main)/[locale]/(home)/_components/PropertiesTags";
import ProperiesMainCardFooter from "@/app/(main)/[locale]/(properties)/properties/_components/PropertiesMainCardFooter";

const wrapperClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";

export default function MyFavorites() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [myFavorites, setMyFavorites] = useState<Property[]>([]);
  const [total, setTotal] = useState<number>(0);
  const initial = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: 4,
    };
  }, [searchParams]);
  // ******************************* Apollo  *******************************
  const { loading: getFavoritesLoading, refetch: getFavoritesRefetch } =
    useQuery(GET_FAVORITES, {
      fetchPolicy: "cache-and-network",
      variables: {
        input: initial,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data: T) => {
        setMyFavorites(data?.getFavorites?.list);
        setTotal(data?.getFavorites?.metaCounter[0]?.total || 0);
      },
      skip: !initial.page || initial.page < 0,
    });
  // ******************************* Apollo  End *******************************

  // -------------------------------- Handlers --------------------------------
  const likePropertyHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetProperty(id);
        getFavoritesRefetch({ input: initial });

        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likePropertyHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [getFavoritesRefetch, initial, likeTargetProperty],
  );

  const onPage = useCallback(
    async (_: any, value: number) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", String(value));

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );
  // -------------------------------- Render --------------------------------
  return (
    <div className="w-full flex flex-col h-full">
      <ProfileContentHeader
        title="Favorites"
        subtitle="Keep track of properties you’re interested in and remove the ones that don’t fit anymore."
      />

      <div className="p-4 flex-1 flex flex-col h-full">
        {/* LIST */}
        <Stack className="my-4 gap-3">
          {getFavoritesLoading ? (
            <PropertySkeleton classes={wrapperClasses} columns={3} />
          ) : !myFavorites.length ? (
            <Emty title="No Favorites" />
          ) : (
            <div className={wrapperClasses}>
              {myFavorites.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  cardFooter={
                    <ProperiesMainCardFooter
                      propertyLink={`/properties/${property?._id}`}
                      totalLikes={property?.propertyLikes}
                      totalViews={property?.propertyViews}
                    />
                  }
                  featuredTags={
                    <PropertiesTags
                      propertyType={
                        property.propertyBarter && property.propertyRent
                          ? "Barter & Rent"
                          : property.propertyRent
                            ? "Rent"
                            : "Barter"
                      }
                      propertyTag={"liked"}
                    />
                  }
                  likePropertyHandler={likePropertyHandler}
                />
              ))}
            </div>
          )}
        </Stack>
        {!!myFavorites.length && (
          <Stack className="flex-1 flex flex-col justify-end  w-full">
            <div className="flex justify-center border-t border-slate-300/80 pt-5">
              <Pagination
                count={Math.ceil(total / initial.limit)}
                variant="outlined"
                page={initial?.page ?? 1}
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
            </div>
          </Stack>
        )}
      </div>
    </div>
  );
}
