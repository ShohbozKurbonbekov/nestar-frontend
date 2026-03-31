import { Property } from "@/libs/types/property/property";
import { Pagination, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Emty from "@/components/ui/Emty";
import PropertyCard from "@/components/ui/PropertyCard";
import TrendingPropertiesFooter from "@/app/(main)/[locale]/(home)/_components/TrendingPropertiesFooter";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { ChangeEvent } from "react";

interface AgentPropertiesType {
  totalAgentProperties: number;
  properties: Property[];
  propertiesInquiry: PropertiesInquiry;
  propertyPaginationChangeHandler: (
    event: ChangeEvent<unknown>,
    value: number,
  ) => Promise<void>;
  likePropertyHandler?: (user: CustomJwtPayload, id: string) => Promise<void>;
}
export default function AgentProperties({
  properties,
  likePropertyHandler,
  propertiesInquiry,
  propertyPaginationChangeHandler,
  totalAgentProperties,
}: AgentPropertiesType) {
  return (
    <div className="mt-10 bg-white border border-slate-300/80 rounded-2xl pb-5">
      <div className="flex flex-col items-center mt-4">
        <Typography variant="h4" className="text-slate-800 my-6">
          Agent Properties
        </Typography>
        {properties.length ? (
          <div className="flex flex-col gap-5 w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4 px-4">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
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

            <div className="mt-5 flex justify-center">
              <Pagination
                page={propertiesInquiry.page}
                count={
                  Math.ceil(totalAgentProperties / propertiesInquiry.limit) || 1
                }
                onChange={propertyPaginationChangeHandler}
                shape="circular"
                color="standard"
              />
            </div>
          </div>
        ) : (
          <Emty title="No agent properties" />
        )}
      </div>
    </div>
  );
}
