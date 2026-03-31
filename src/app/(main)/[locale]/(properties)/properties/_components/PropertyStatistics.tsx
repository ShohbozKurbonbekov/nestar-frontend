import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import React from "react";
import SquareFootOutlined from "@mui/icons-material/SquareFootOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import MeetingRoomOutlined from "@mui/icons-material/MeetingRoomOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import HomeWorkOutlined from "@mui/icons-material/HomeWorkOutlined";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { firstLetterCapitalizer } from "@/libs/utils/firstLetterCapitalizer";

// ---------------------------Helper Function -------------------------
function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value?: string | number;
  label: string;
}) {
  if (value === "undefined" || value === null) return null;

  return (
    <div className="flex flex-row items-center gap-2">
      <Box className="text-slate-500">{icon}</Box>

      <div className="line-clamp-1">
        <Typography
          variant="body1"
          className="text-slate-900 capitalize line-clamp-1"
        >
          {value}
        </Typography>

        <Typography
          variant="body2"
          className="text-slate-500  capitalize line-clamp-1"
        >
          {label}
        </Typography>
      </div>
    </div>
  );
}

// ---------------------------Main Function ------------------------
interface PropertyStatisticsType {
  _id: string;
  propertySquare: number;
  propertyLikes: number;
  propertyViews: number;
  propertyRooms: number;
  propertyBedrooms: number;
  propertyYearBuilt?: Date;
  propertyType: PropertyType;
  propertyLiked: boolean | undefined;
  propertyLocation: PropertyLocation;

  likePropertyHandler?: (user: CustomJwtPayload, id: string) => Promise<void>;
}

const PropertyStatistics: React.FC<PropertyStatisticsType> = React.memo(
  ({
    propertyBedrooms,
    propertyLikes,
    propertyRooms,
    propertySquare,
    propertyType,
    propertyViews,
    propertyYearBuilt,
    likePropertyHandler,
    _id,
    propertyLiked,
    propertyLocation,
  }) => {
    const user = useReactiveVar(userVar);
    // --------------------------- Render -------------------------
    return (
      <Box className="border border-slate-300/80 rounded-2xl p-5 md:p-6 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatItem
            icon={<SquareFootOutlined />}
            value={propertySquare ? `${propertySquare} m²` : undefined}
            label="Square"
          />

          <div className="flex flex-row items-center gap-2 overflow-hidden">
            <IconButton
              className="text-slate-500 bg-slate-100 hover:bg-slate-200 border border-slate-200"
              onClick={(e) => {
                if (likePropertyHandler) {
                  likePropertyHandler(user, _id).then();
                }
              }}
            >
              {!!propertyLiked && propertyLiked ? (
                <Favorite className="text-red-500" />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            <Box>
              <Typography variant="body1" className="text-slate-900 capitalize">
                {propertyLikes}
              </Typography>

              <Typography
                variant="body2"
                className="text-slate-500  capitalize"
              >
                Likes
              </Typography>
            </Box>
          </div>

          <StatItem
            icon={<VisibilityOutlined />}
            value={propertyViews}
            label="Seen"
          />

          <StatItem
            icon={<MeetingRoomOutlined />}
            value={propertyRooms}
            label="Rooms"
          />

          <StatItem
            icon={<BedOutlined />}
            value={propertyBedrooms}
            label="Bedrooms"
          />

          {propertyYearBuilt && (
            <div className="flex flex-row items-center gap-2">
              <Box className="text-slate-500">
                <CalendarMonthOutlined />
              </Box>

              <Box>
                <Typography variant="body1" className="text-slate-900">
                  {timeFormatter(propertyYearBuilt)}
                </Typography>

                <Typography variant="body2" className="text-slate-500">
                  Year Built
                </Typography>
              </Box>
            </div>
          )}

          <StatItem
            icon={<HomeWorkOutlined />}
            value={firstLetterCapitalizer(propertyType)}
            label="Property Type"
          />

          <StatItem
            icon={<LocationOnIcon />}
            value={firstLetterCapitalizer(propertyLocation)}
            label="Location"
          />
        </div>
      </Box>
    );
  },
);

export default PropertyStatistics;
