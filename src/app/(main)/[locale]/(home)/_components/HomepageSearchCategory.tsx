"use client";

import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  FormControlLabel as MuiFormControlLabel,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import { PRICE_OPTIONS, PROPERTY_SQUARE } from "@/libs/data/static-data";
import { Direction } from "@/libs/enums/common.enum";
import { useRouter } from "next/navigation";
import { PropertiesInquiry } from "@/libs/types/property/property.input";

const select_border_style = {
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgb(148, 163, 184)",
  },
};
export default function HomepageSearchCategory() {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [price, setPrice] = useState<number[]>([0, 0]);
  const [square, setSquare] = useState<number[]>([0, 0]);
  const [title, setTitle] = useState<string>("");

  const propertyLocations = Object.keys(PropertyLocation);
  const propertyTypes = Object.keys(PropertyType);
  const roomOptions = ["0", "1", "2", "3", "4", "5+"];

  const onCancel = () => {
    setPrice([0, 0]);
    setSquare([0, 0]);
    setTitle("");
    setAdvancedOpen(false);
  };

  const onSearch = () => {
    const initialInput: PropertiesInquiry = {
      page: 1,
      limit: 6,
      sort: "createdAt",
      direction: Direction.DESC,
      search: {
        squaresRange: {
          start: Number(square[0]),
          end: Number(square[1]),
        },
        pricesRange: {
          start: Number(price[0]),
          end: Number(price[1]),
        },

        ...(location ? { locationList: [location] as PropertyLocation[] } : {}),
        ...(propertyType ? { typeList: [propertyType] as PropertyType[] } : {}),
        ...(rooms && parseInt(rooms) > 0 ? { roomsList: [Number(rooms)] } : {}),
        ...(title.trim() ? { text: title.trim() } : {}),
      },
    };

    router.push(`/properties?input=${JSON.stringify(initialInput)}`);
    console.log("Input: ", initialInput);
  };
  return (
    <div className="max-w-5xl w-full px-6 pb-20 md:pb-25 z-10 mx-auto  text-white">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-black rounded-2xl shadow-2xl p-4 md:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Location */}
            <div className="md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="location-label" className="text-slate-500">
                  Location
                </InputLabel>

                <Select
                  sx={select_border_style}
                  labelId="location-label"
                  value={location}
                  label="Location"
                  onChange={(e) =>
                    e.target.value.trim() === "NONE"
                      ? setLocation("")
                      : setLocation(e.target.value)
                  }
                >
                  {["NONE", ...propertyLocations].map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Property Type */}
            <div className="md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="property-type-label" className="text-slate-500">
                  Property Type
                </InputLabel>

                <Select
                  sx={select_border_style}
                  labelId="property-type-label"
                  value={propertyType}
                  label="Property Type"
                  onChange={(e) =>
                    e.target.value.trim() === "NONE"
                      ? setPropertyType("")
                      : setPropertyType(e.target.value)
                  }
                >
                  {["NONE", ...propertyTypes].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Rooms */}
            <div className="md:col-span-2">
              <FormControl fullWidth>
                <InputLabel id="rooms-label" className="text-slate-500">
                  Rooms
                </InputLabel>

                <Select
                  sx={select_border_style}
                  labelId="rooms-label"
                  value={rooms}
                  label="Rooms"
                  onChange={(e) =>
                    e.target.value.trim() === "NONE"
                      ? setRooms("")
                      : setRooms(e.target.value)
                  }
                >
                  {["NONE", ...roomOptions].map((room) => (
                    <MenuItem key={room} value={room}>
                      {room === "0" ? "Any" : room}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Advanced Switch */}
            <div className="md:col-span-2 flex justify-end md:justify-center">
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    checked={advancedOpen}
                    onChange={() => setAdvancedOpen(true)}
                  />
                }
                label={
                  <Typography variant="body1" className="text-sm text-gray-700">
                    More
                  </Typography>
                }
              />
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                fullWidth
                variant="contained"
                size="small"
                className="h-11.25 rounded-md"
                onClick={onSearch}
              >
                <Typography variant="body1" className="text-white capitalize">
                  Search
                </Typography>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Advanced Modal */}
      <Dialog
        open={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogContent className="space-y-6 mt-2">
          <div>
            <p className="mb-2 font-medium">Price Range ($)</p>
            <Slider
              step={500}
              value={price}
              onChange={(_, newValue) => setPrice(newValue as number[])}
              valueLabelDisplay="auto"
              min={PRICE_OPTIONS[0]}
              max={PRICE_OPTIONS.at(-1)}
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Square Range (m²)</p>
            <Slider
              value={square}
              onChange={(_, newValue) => setSquare(newValue as number[])}
              valueLabelDisplay="auto"
              min={PROPERTY_SQUARE[0]}
              max={PROPERTY_SQUARE.at(-1)}
            />
          </div>

          <TextField
            fullWidth
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(148, 163, 184)",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={() => setAdvancedOpen(false)}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
