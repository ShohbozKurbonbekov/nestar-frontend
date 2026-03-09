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
import { likeTargetAgent } from "@/services/Agent.service";
import { Message } from "@/libs/enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";

const wrapperClasses = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";

interface PropertiesMainType {
  properties: Property[];
  loading: boolean;
  total: number;
}
export default function PropertiesMain({
  properties,
  loading,
  total,
}: PropertiesMainType) {
  const router = useRouter();
  const { filters } = usePropertiesFilter();
  // ---------------------------------- Handlers -------------------
  const handlePaginationChange = async (_: any, value: number) => {
    filters.page = Number(value);
    router.push(
      `/properties?input=${JSON.stringify(filters)}`,

      {
        scroll: false,
      },
    );
  };

  const likeAgentHandler = async (user: CustomJwtPayload, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      console.log("DATA: ", id);
      await likeTargetAgent(id);

      await sweetTopSmallSuccessAlert("succes", 1000);
    } catch (err: any) {
      console.log("ERROR, likeAgentHandler:", err.message);
      await sweetMixinErrorAlert(err.message);
    }
  };

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

          {loading ? (
            <PropertySkeleton classes={wrapperClasses} columns={3} />
          ) : properties.length === 0 ? (
            <Emty title="No results" />
          ) : (
            <div className={wrapperClasses}>
              {properties.map((property) => (
                <PropertyCard
                  likePropertyHandler={likeAgentHandler}
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
                count={Math.ceil(total / filters?.limit)}
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
