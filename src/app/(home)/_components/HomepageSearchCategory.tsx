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
  Checkbox,
  FormGroup,
  FormControlLabel as MuiFormControlLabel,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function HomepageSearchCategory() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [price, setPrice] = useState<number[]>([50, 5000]);

  const propertyLocations = ["Seoul", "Busan", "Gwangju"];
  const propertyTypes = ["Apartment", "House", "Villa", "Studio"];
  const roomOptions = ["1", "2", "3", "4+"];
  const amenities = ["Parking", "Balcony", "Elevator", "Pet Friendly"];

  return (
    <div className="max-w-5xl w-full px-6 pb-20 md:pb-25 z-10 mx-auto  text-white">
      <div>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Find Your Perfect Property
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Search apartments, houses, and villas tailored to your lifestyle.
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-black rounded-2xl shadow-2xl p-4 md:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Location */}
            <div className="md:col-span-3">
              <TextField
                select
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {propertyLocations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Property Type */}
            <div className="md:col-span-3">
              <TextField
                select
                fullWidth
                label="Property Type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Rooms */}
            <div className="md:col-span-2">
              <TextField
                select
                fullWidth
                label="Rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                {roomOptions.map((room) => (
                  <MenuItem key={room} value={room}>
                    {room}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {/* Advanced Switch */}
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <FormControlLabel
                control={
                  <Switch
                    size="medium"
                    checked={advancedOpen}
                    onChange={() => setAdvancedOpen(true)}
                  />
                }
                label={
                  <Typography
                    variant="body1"
                    className="text-sm! text-gray-700!"
                  >
                    {" "}
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
                className="h-11.25! rounded-md!"
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
              value={price}
              onChange={(_, newValue) => setPrice(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
          </div>

          <TextField fullWidth label="District / Area" />

          <div>
            <p className="mb-2 font-medium">Amenities</p>
            <FormGroup>
              {amenities.map((item) => (
                <MuiFormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdvancedOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAdvancedOpen(false)}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
