"use client";
import Image from "next/image";
import { Typography, IconButton } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import SquareFootOutlined from "@mui/icons-material/SquareFootOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React, { useState } from "react";
import { Bookmark, Favorite } from "@mui/icons-material";

interface PropertyCardType {
  mainCardClasses?: string;
  featuredTags?: React.ReactNode;
  cardFooter: React.ReactNode;
}
const PropertyCard: React.FC<PropertyCardType> = React.memo(
  ({
    mainCardClasses = "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full",
    featuredTags,
    cardFooter,
  }) => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
      <div className={mainCardClasses}>
        {/* Image Wrapper */}
        <div className="relative h-64 w-full overflow-hidden">
          {/* Image */}
          <Image
            src="/images/header-images/homepage-header.jpg"
            alt={"image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            quality={80}
          />

          {/* Featured Tags */}
          {featuredTags && featuredTags}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center gap-4">
            {/* LIKE BUTTON */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setLiked((prev) => !prev);
              }}
              className="bg-white hover:bg-red-300 hover:text-white transition"
            >
              {liked ? (
                <Favorite className="text-red-500" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

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
          <Typography variant="h6" className="capitalize truncate">
            Elegant Studio Flat
          </Typography>

          <div className="flex items-center text-gray-500 mt-2">
            <LocationOnOutlined sx={{ fontSize: 18 }} />
            <Typography variant="body2" className="ml-1 truncate">
              Ingraham St, Brooklyn, NY 11237
            </Typography>
          </div>

          {/* Features */}
          <div className="flex gap-4 mt-4 flex-wrap text-gray-600">
            <div className="flex items-center gap-1">
              <BedOutlined sx={{ fontSize: 16 }} />
              <Typography variant="body2">3 Beds</Typography>
            </div>

            <div className="flex items-center gap-1">
              <BedroomParentIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">3 rooms</Typography>
            </div>

            <div className="flex items-center gap-1">
              <SquareFootOutlined sx={{ fontSize: 16 }} />
              <Typography variant="body2">4043 Sqft</Typography>
            </div>
          </div>

          <div className="border-t mt-6 pt-4 flex items-center justify-between">
            <Typography variant="h6" className="text-gray-800">
              ${(8060).toLocaleString()}
            </Typography>

            {cardFooter && cardFooter}
          </div>
        </div>
      </div>
    );
  },
);

export default PropertyCard;
