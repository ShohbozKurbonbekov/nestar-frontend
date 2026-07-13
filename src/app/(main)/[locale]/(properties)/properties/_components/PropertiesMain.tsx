import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesSearchCategory from "./PropertiesSearchCategory";
import ProperiesMainCardFooter from "./PropertiesMainCardFooter";
import Pagination from "@mui/material/Pagination";
import { Property } from "@/libs/types/property/property";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";
import Emty from "@/components/ui/Emty";
import { usePropertiesFilter } from "@/libs/hooks/PropertiesFilter";
import { useRouter } from "next/navigation";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { useCallback } from "react";
import { T } from "@/libs/types/common";
const wrapperClasses = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";

interface PropertiesMainType {
  getPropertiesData: undefined | T;
  properties: Property[];
  loading: boolean;
  total: number;
  likePropertyHandler?: (user: CustomJwtPayload, id: string) => Promise<void>;
}
export default function PropertiesMain({
  properties,
  loading,
  total,
  getPropertiesData,
  likePropertyHandler,
}: PropertiesMainType) {
  const router = useRouter();
  const { filters, setFilters } = usePropertiesFilter();
  // ---------------------------------- Handlers -------------------
  const handlePaginationChange = useCallback(
    async (_: any, value: number) => {
      const newFilter = { ...filters, page: Number(value) };
      setFilters(newFilter);
      router.push(
        `/properties?input=${JSON.stringify(newFilter)}`,

        {
          scroll: false,
        },
      );
    },
    [filters, setFilters],
  );

  return (
    <div className="px-4 mt-8">
      {/* Main Grid */}
      <div className="max-w-8xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR (Categories / Filters) */}
        <aside className="lg:col-span-3">
          <PropertiesSearchCategory />
        </aside>

        {/* RIGHT CONTENT (Properties List) */}
        <div className="lg:col-span-9 flex flex-col justify-between">
          {/* Properties Grid Placeholder */}

          {loading && !getPropertiesData ? (
            <PropertySkeleton classes={wrapperClasses} columns={3} />
          ) : properties.length === 0 ? (
            <Emty title="No results" />
          ) : (
            <div className={wrapperClasses}>
              {properties.map((property) => (
                <PropertyCard
                  likePropertyHandler={likePropertyHandler}
                  property={property}
                  cardFooter={
                    <ProperiesMainCardFooter
                      propertyLink={`/properties/${property?._id}`}
                      totalLikes={property?.propertyLikes}
                      totalViews={property?.propertyViews}
                    />
                  }
                  key={property?._id}
                />
              ))}
            </div>
          )}

          {/* Bottom Center Section (Pagination / Load More) */}
          <div className="mt-10 flex justify-center">
            {!!properties.length && (
              <Pagination
                count={Math.ceil(properties.length / filters?.limit)}
                variant="outlined"
                page={filters?.page ?? 1}
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
                onChange={(e, value) => handlePaginationChange(e, value)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
