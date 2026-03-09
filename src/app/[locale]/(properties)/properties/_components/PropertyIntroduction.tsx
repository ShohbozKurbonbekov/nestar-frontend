import { PropertyLocation } from "@/libs/enums/property.enum";
import { Box, Chip, Typography, Stack } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import React from "react";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { priceFormatter } from "@/libs/utils/priceFormatter";

interface PropertyIntroductionType {
  propertyTitle: string;
  propertyLocation: PropertyLocation;
  propertyPrice: number;
  propertyCreation: Date;
  isRent?: boolean;
  isBarter?: boolean;
  propertyDesc?: string;
}

const PropertyIntroduction: React.FC<PropertyIntroductionType> = React.memo(
  ({
    propertyCreation,
    propertyLocation,
    propertyPrice,
    propertyTitle,
    isBarter,
    isRent,
    propertyDesc,
  }: PropertyIntroductionType) => {
    return (
      <div className="max-w-8xl px-4 mx-auto mt-8">
        <Box className="border w-full border-slate-300/80 rounded-2xl p-5 md:p-6 bg-white">
          {/* Title */}
          <Typography variant="h5" className="text-slate-900 leading-snug">
            {propertyTitle}
          </Typography>

          {/* Decription */}
          {propertyDesc && (
            <Typography
              variant="body2"
              className="text-slate-400 leading-snug mt-2"
            >
              {propertyDesc}
            </Typography>
          )}

          {/* Location */}
          <div className="flex flex-row items-center gap-2 text-slate-500 mt-2">
            <LocationOnOutlined fontSize="small" />
            <Typography className="text-sm md:text-base">
              {propertyLocation}
            </Typography>
          </div>

          {/* Middle Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
            {/* Property Types */}
            <div className="flex flex-row gap-2">
              {isRent && (
                <Chip
                  label="Rent"
                  size="small"
                  className="bg-indigo-100 text-indigo-700 font-medium"
                />
              )}

              {isBarter && (
                <Chip
                  label="Barter"
                  size="small"
                  className="bg-emerald-100 text-emerald-700 font-medium"
                />
              )}
            </div>

            {/* Published Time */}
            <div className="flex flex-row items-center gap-2 text-slate-500">
              <AccessTimeOutlined fontSize="small" />
              <Typography className="text-sm">
                {timeFormatter(propertyCreation)}
              </Typography>
            </div>
          </div>

          {/* Price */}
          <Typography variant="h5" className="font-bold text-slate-900 mt-5">
            {priceFormatter(propertyPrice)}
          </Typography>
        </Box>
      </div>
    );
  },
);

export default PropertyIntroduction;
