import { Property } from "@/libs/types/property/property";
import { Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Emty from "@/components/ui/Emty";
import PropertyCard from "@/components/ui/PropertyCard";
import TrendingPropertiesFooter from "@/app/[locale]/(home)/_components/TrendingPropertiesFooter";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";

interface SameLocationPropertiesType {
  properties: Property[];
  likePropertyHandler?: (user: CustomJwtPayload, id: string) => Promise<void>;
}
export default function SameLocationProperties({
  properties,
  likePropertyHandler,
}: SameLocationPropertiesType) {
  return (
    <div className="mt-10 bg-white">
      <div className="flex flex-col items-center mt-4">
        <Typography variant="h4" className="text-slate-800 mb-6">
          Similar Properties Nearby
        </Typography>
        {properties.length ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4">
            {properties.map((property) => (
              <PropertyCard
                property={property}
                likePropertyHandler={likePropertyHandler}
                cardFooter={
                  <TrendingPropertiesFooter
                    propertyLink={`/properties/${property._id}`}
                    totalLikes={property?.propertyLikes}
                    totalViews={property?.propertyViews}
                  />
                }
              />
            ))}
          </div>
        ) : (
          <Emty title="No related properties" />
        )}
      </div>
    </div>
  );
}
