"use client";
import { Typography, IconButton, Chip } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import SquareFootOutlined from "@mui/icons-material/SquareFootOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React, { useState } from "react";
import { Bookmark, Favorite } from "@mui/icons-material";
import { Property } from "@/libs/types/property/property";
import { serverApi } from "@/libs/config";
import Image from "next/image";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { priceFormatter } from "@/libs/utils/priceFormatter";
import { PropertyType } from "@/libs/enums/property.enum";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VillaIcon from "@mui/icons-material/Villa";
import HomeIcon from "@mui/icons-material/Home";

const propertyConfig = {
  [PropertyType.APARTMENT]: {
    label: "Apartment",
    icon: <ApartmentIcon className="text-base" />,
    style:
      "bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-slate-200",
  },
  [PropertyType.VILLA]: {
    label: "Villa",
    icon: <VillaIcon className="text-base" />,
    style:
      "bg-amber-100 text-amber-700 border border-amber-200 group-hover:bg-amber-200",
  },
  [PropertyType.HOUSE]: {
    label: "House",
    icon: <HomeIcon className="text-base" />,
    style:
      "bg-emerald-100 text-emerald-700 border border-emerald-200 group-hover:bg-emerald-200",
  },
};

const typeStyles: Record<"propertyBarter" | "propertyRent" | "both", string> = {
  propertyRent: "bg-blue-100 text-blue-700 border-blue-200",
  propertyBarter: "bg-purple-100 text-purple-700 border-purple-200",
  both: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

interface PropertyCardType {
  likePropertyHandler?: (user: CustomJwtPayload, id: string) => Promise<void>;
  property: Property;
  mainCardClasses?: string;
  featuredTags?: React.ReactNode;
  cardFooter: React.ReactNode;
}
const PropertyCard: React.FC<PropertyCardType> = React.memo(
  ({
    mainCardClasses = "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full",
    property,
    featuredTags,
    cardFooter,
    likePropertyHandler,
  }) => {
    const user = useReactiveVar(userVar);
    const [saved, setSaved] = useState(false);
    const imageUrl = property?.propertyImages[0]
      ? `${serverApi}/${property?.propertyImages[0]}`
      : `/images/default-property.png`;

    const item = propertyConfig[property?.propertyType];
    return (
      <div className={mainCardClasses}>
        {/* Image Wrapper */}
        <div className="relative h-64 w-full overflow-hidden">
          {/* Image */}
          <Image
            src={imageUrl}
            fill
            alt={property?.propertyTitle ?? "Property-title"}
            className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
            loading="lazy"
          />

          {/* Featured Tags */}
          {featuredTags ? (
            featuredTags
          ) : (
            <Chip
              className={`absolute bottom-2 left-2 font-semibold tracking-wide px-2 py-1 shadow-sm border 
                  ${
                    property.propertyBarter && property.propertyRent
                      ? typeStyles["both"]
                      : property.propertyBarter
                        ? typeStyles["propertyBarter"]
                        : typeStyles["propertyRent"]
                  }`}
              label={
                property?.propertyBarter && property?.propertyRent
                  ? "Rent & Barter"
                  : property?.propertyBarter
                    ? "Barter"
                    : "Rent"
              }
            />
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center gap-4">
            {/* TODO Toggle Like  */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                if (likePropertyHandler) {
                  likePropertyHandler(user, property._id).then();
                }
              }}
              className="bg-white hover:bg-red-300 hover:text-white transition"
            >
              {property?.meLiked?.[0]?.myFavorite ? (
                <Favorite className="text-red-500" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            {/* TODO Toggle Save  */}

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSaved((prev) => !prev);
              }}
              className="bg-white hover:bg-slate-200 transition"
            >
              {saved ? (
                <Bookmark className="text-slate-700" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-1">
            <Chip
              icon={item.icon}
              label={item.label}
              className={`
        ${item.style} font-medium tracking-wide px-2 py-1 rounded-lg transition duration-200
      `}
            />
          </div>
          <Typography variant="h6" className="capitalize truncate">
            {property?.propertyTitle}
          </Typography>

          <div className="flex items-center text-gray-500 mt-2">
            <LocationOnOutlined sx={{ fontSize: 18 }} />
            <Typography variant="body2" className="ml-1 truncate">
              {property?.propertyAddress}
            </Typography>
          </div>

          {/* Features */}
          <div className="flex gap-4 mt-4  text-gray-600 truncate">
            <div className="flex items-center gap-1">
              <BedOutlined sx={{ fontSize: 16 }} />
              <Typography variant="body2" className="truncate">
                {property?.propertyBeds ?? 0} Bed
                {property?.propertyBeds > 0 ? "s" : ""}
              </Typography>
            </div>

            <div className="flex items-center gap-1">
              <BedroomParentIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" className="truncate">
                {property?.propertyRooms ?? 0} Room
                {property?.propertyRooms > 0 ? "s" : ""}
              </Typography>
            </div>

            <div className="flex items-center gap-1">
              <SquareFootOutlined sx={{ fontSize: 16 }} />
              <Typography variant="body2" className="truncate">
                {property?.propertySquare ?? 0} Sqft
              </Typography>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 flex items-center justify-between">
            <Typography variant="h6" className="text-gray-800 truncate">
              {priceFormatter(property?.propertyPrice)}
            </Typography>

            {cardFooter && cardFooter}
          </div>
        </div>
      </div>
    );
  },
);

export default PropertyCard;
