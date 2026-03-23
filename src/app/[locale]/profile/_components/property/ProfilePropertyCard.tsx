import { serverApi } from "@/libs/config";
import { PropertyStatus } from "@/libs/enums/property.enum";
import { Property } from "@/libs/types/property/property";
import { priceFormatter } from "@/libs/utils/priceFormatter";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { Member } from "@/libs/types/member/member";

interface ProfilePropertyCardType {
  property: Property;
  member?: Member;
  onDelete: (proeprtyId: string) => Promise<void>;
  onUpdate: (status: PropertyStatus, propertyId: string) => Promise<void>;
}

const ProfilePropertyCard: React.FC<ProfilePropertyCardType> = React.memo(
  ({ property, onUpdate, onDelete, member }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // ---------------------------- Handlers ---------------------
    const onPropertyDetail = async (id: string) => {
      if (member) router.push(`/properties/${id}`);
      else return;
    };

    const onStatusChange = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div className="w-full overflow-x-auto">
        <Stack
          direction="row"
          alignItems="center"
          className="min-w-250 bg-white rounded-xl shadow-sm px-4 py-3 gap-4 border border-gray-200 hover:shadow-md transition"
        >
          {/* IMAGE */}
          <Stack
            className={`w-30 h-20 shrink-0 rounded-lg overflow-hidden ${member ? "cursor-pointer" : ""} relative`}
            onClick={() => onPropertyDetail(property?._id)}
          >
            <Image
              fill
              src={`${serverApi}/${property.propertyImages[0]}`}
              alt={property?.propertyTitle}
              className="w-full h-full object-cover"
            />
            <div className="overlay absolute inset-0  bg-linear-to-r from-black/50 to-black/20"></div>
          </Stack>

          {/* INFO */}
          <Stack
            className={`min-w-40 ${member ? "cursor-pointer" : ""} overflow-hidden`}
            onClick={() => onPropertyDetail(property?._id)}
          >
            <Typography className="text-sm font-semibold line-clamp-1">
              {property?.propertyTitle}
            </Typography>
            <Typography className="text-xs text-gray-500 line-clamp-1">
              {property?.propertyAddress}
            </Typography>
            <Typography className="text-sm font-bold text-blue-600 mt-1">
              {priceFormatter(property?.propertyPrice)}
            </Typography>
          </Stack>

          {/* DATE */}
          <Stack className="min-w-35  shrink-0 overflow-hidden">
            <Typography className="text-xs text-gray-500 line-clamp-1">
              {timeFormatter(property?.createdAt)}
            </Typography>
          </Stack>

          {/* STATUS */}
          <Stack className="min-w-35 overflow-hidden shrink-0">
            <Stack
              onClick={onStatusChange}
              className="px-3 py-1 rounded-full text-center cursor-pointer w-full h-full"
              sx={{
                backgroundColor: "#E5F0FD",
              }}
            >
              <Typography className="line-clamp-1 text-sm">
                {property?.propertyStatus}
              </Typography>
            </Stack>
          </Stack>

          {/* MENU */}
          {!member && property.propertyStatus !== "SOLD" && (
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {property.propertyStatus === PropertyStatus.ACTIVE && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    onUpdate(PropertyStatus.SOLD, property?._id);
                  }}
                >
                  Sold
                </MenuItem>
              )}
            </Menu>
          )}

          {/* VIEWS */}
          <Stack className="min-w-25 shrink-0 text-center overflow-hidden">
            <Typography className="text-sm font-medium text-gray-700">
              {property.propertyViews}
            </Typography>
            <Typography className="text-[10px] text-gray-400">views</Typography>
          </Stack>

          {/* ACTIONS */}
          {!member && property.propertyStatus === PropertyStatus.ACTIVE && (
            <Stack
              direction="row"
              className="flex-1 shrink-0  justify-end gap-1"
            >
              <IconButton onClick={() => onPropertyDetail(property._id)}>
                <ModeIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => onDelete(property._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </div>
    );
  },
);

export default ProfilePropertyCard;
