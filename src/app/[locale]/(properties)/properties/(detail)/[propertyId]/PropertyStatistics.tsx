import { PropertyType } from "@/libs/enums/property.enum";
import React from "react";
import SquareFootOutlined from "@mui/icons-material/SquareFootOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import MeetingRoomOutlined from "@mui/icons-material/MeetingRoomOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import HomeWorkOutlined from "@mui/icons-material/HomeWorkOutlined";
import { Box, Typography, Stack } from "@mui/material";
import { timeFormatter } from "@/libs/utils/timeFormatter";

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
  if (!value) return null;

  return (
    <div className="flex flex-row items-center gap-2 overflow-hidden">
      <Box className="text-slate-500">{icon}</Box>

      <Box>
        <Typography variant="body1" className="text-slate-900 capitalize">
          {value}
        </Typography>

        <Typography variant="body2" className="text-slate-500  capitalize">
          {label}
        </Typography>
      </Box>
    </div>
  );
}

// ---------------------------Main Function ------------------------
interface PropertyStatisticsType {
  propertySquare: number;
  propertyLikes: number;
  propertyViews: number;
  propertyRooms: number;
  propertyBedrooms: number;
  propertyYearBuilt?: Date;
  propertyType: PropertyType;
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
  }) => {
    // --------------------------- Render -------------------------
    return (
      <Box className="border border-slate-300/80 rounded-2xl p-5 md:p-6 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatItem
            icon={<SquareFootOutlined />}
            value={propertySquare ? `${propertySquare} m²` : undefined}
            label="Square"
          />

          <StatItem
            icon={<FavoriteBorderOutlined />}
            value={propertyLikes}
            label="Likes"
          />

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
            value={propertyType}
            label="Property Type"
          />
        </div>
      </Box>
    );
  },
);

export default PropertyStatistics;
