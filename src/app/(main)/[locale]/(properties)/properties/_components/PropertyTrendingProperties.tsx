import Emty from "@/components/ui/Emty";
import { Property } from "@/libs/types/property/property";
import { Chip, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { Card, CardActionArea } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useRouter } from "next/navigation";
import { serverApi } from "@/libs/config";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import { priceFormatter } from "@/libs/utils/priceFormatter";
import { getBaseUrl } from "@/libs/utils/getBaseUrl";

interface PropertyTrendingPropertiesType {
  properties: Property[];
}

const PropertyTrendingProperties: React.FC<PropertyTrendingPropertiesType> =
  React.memo(({ properties }) => {
    const router = useRouter();
    return (
      <div className="mt-10 w-full border border-slate-300/80 rounded-2xl p-4">
        {/* Title */}
        <div className="mb-5 mt-4 flex flex-col items-center ">
          <Typography variant="h4" className="text-slate-800">
            Trending Properties
          </Typography>
          <Typography variant="body2" className="text-slate-500 mt-1">
            Popular listings people are exploring right now
          </Typography>
        </div>
        {properties.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {properties.map((property) => (
              <Card
                key={property._id}
                className="group overflow-hidden rounded-xl  bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardActionArea
                  onClick={() =>
                    router.push(`/properties/${property._id}`, { scroll: true })
                  }
                  className="flex items-stretch"
                >
                  {/* Image */}
                  <div className="relative w-28 sm:w-32  shrink-0 overflow-hidden">
                    <Image
                      src={
                        property?.propertyImages[0]
                          ? `${getBaseUrl()}/${property.propertyImages[0]}`
                          : ""
                      }
                      alt={property?.propertyTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* subtle gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/40 to-black/20" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-4 flex-1">
                    {/* Top */}
                    <div>
                      {/* title */}
                      <Typography
                        variant="body2"
                        className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                      >
                        {property?.propertyTitle}
                      </Typography>

                      {/* location */}
                      <div className="flex items-center text-slate-500 text-xs mt-1 line-clamp-1">
                        <LocationOnRoundedIcon className="text-sm mr-1" />
                        {property.propertyAddress}
                      </div>

                      {/* property type */}
                      {property?.propertyType && (
                        <div className="mt-2">
                          <Chip
                            label={property.propertyType}
                            size="small"
                            className="bg-indigo-50 text-indigo-600 font-medium px-1 text-xs"
                          />
                        </div>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="flex items-center justify-between mt-3">
                      {/* price */}
                      <span className="text-gray-600 font-semibold text-base">
                        {priceFormatter(property?.propertyPrice)}
                      </span>

                      {/* open icon */}
                      <OpenInNewRoundedIcon className="text-slate-400 group-hover:text-indigo-500 transition-colors text-lg" />
                    </div>
                  </div>
                </CardActionArea>
              </Card>
            ))}
          </div>
        ) : (
          <Emty title="No trending properties" />
        )}
      </div>
    );
  });
export default PropertyTrendingProperties;
