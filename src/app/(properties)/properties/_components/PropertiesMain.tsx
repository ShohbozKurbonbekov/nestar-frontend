import PropertyCard from "@/components/ui/PropertyCard";
import PropertiesSearchCategory from "./PropertiesSearchCategory";
import ProperiesMainCardFooter from "./PropertiesMainCardFooter";
import Pagination from "@mui/material/Pagination";
import { Suspense } from "react";
import PropertySkeleton from "@/components/skeletons/PropertySkeleton";

const wrapperClasses = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";
export default function PropertiesMain() {
  const propertiesList = [1, 2, 3, 4, 5, 6];

  return (
    <div className="px-4 mt-8">
      {/* Main Grid */}
      <div className="max-w-8xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR (Categories / Filters) */}
        <aside className="lg:col-span-3">
          <PropertiesSearchCategory />
        </aside>

        {/* RIGHT CONTENT (Properties List) */}
        <div className="lg:col-span-9 flex flex-col">
          {/* Properties Grid Placeholder */}
          <Suspense
            fallback={<PropertySkeleton classes={wrapperClasses} columns={6} />}
          >
            <div className={wrapperClasses}>
              {propertiesList.map((num) => (
                <PropertyCard
                  cardFooter={
                    <ProperiesMainCardFooter
                      propertyLink="/properties/id:gehrg"
                      totalLikes={100}
                      totalViews={140}
                    />
                  }
                  key={num}
                />
              ))}
            </div>
          </Suspense>

          {/* Bottom Center Section (Pagination / Load More) */}
          <div className="mt-10 flex justify-center">
            <Pagination
              count={10}
              variant="outlined"
              page={1}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
