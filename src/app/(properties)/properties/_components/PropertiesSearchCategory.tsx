"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// ---------------------------- SX styles ---------------------
const textStyles = {
  "&:hover": {
    border: "0",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#cbd5e1", // green-600
    },
  },

  "& .MuiInputLabel-root": {
    color: "#666",
  },
};

const accordionStyles = {
  "&": {
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    boxShadow: "none",
  },
  "&::before": {
    display: "none",
  },
};

// ---------------------------- Classes ---------------------
const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1";

const buttonDefaultClasses =
  "min-w-12 sm:min-w-20 lg:min-w-12  duration-300 ease-in-out transition-colors text-blue-600 border-blue-600 border";

const buttonActiveClasses = "border-0 bg-blue-400 text-white";

// ---------------------------- Component ---------------------
export default function PropertiesSearchCategory() {
  const [activeRoom, setActiveRoom] = useState<number>(0);
  const [activeBedroom, setActiveBedroom] = useState<number>(0);

  // ---------------------------- Render ---------------------
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-300/80  space-y-4">
      {/* 1 Title Search */}
      <div className="relative">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by Title"
          variant="outlined"
          sx={{
            "& .mui-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "15px  50px 15px",
            },
            "& .mui-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline":
              {
                border: "2px solid #CBD5E1CC",
                borderRadius: "10px",
              },
            "& .mui-8cmb7g-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#CBD5E1CC",
              },
          }}
        />
        <SearchSharp className="p-0 absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-3xl " />
        <IconButton className=" p-0 absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 text-3xl">
          <RestartAltIcon className="" />
        </IconButton>
      </div>

      <Divider />

      {/* 2 Locations */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Location</span>
        </AccordionSummary>
        <AccordionDetails className="border-0">
          <div className={gridClasses}>
            {["Seoul", "Gongju", "Busan"].map((city) => (
              <FormControlLabel
                key={city}
                control={<Checkbox />}
                label={city}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 3 Property Type */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Property Type</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className={gridClasses}>
            {["Apartment", "House", "Villa", "Studio"].map((type) => (
              <FormControlLabel
                key={type}
                control={<Checkbox />}
                label={type}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 4 Rooms */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Rooms</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((room: number) => (
              <Button
                key={room}
                variant="outlined"
                size="small"
                className={`${buttonDefaultClasses} ${activeRoom === room ? buttonActiveClasses : ""}`}
                onClick={() =>
                  setActiveRoom((prev) => (prev === room ? 0 : room))
                }
              >
                {room}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              className={`${buttonDefaultClasses} ${activeRoom === 5 ? buttonActiveClasses : ""}`}
              onClick={() => setActiveRoom((prev) => (prev === 5 ? 0 : 5))}
            >
              5+
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 5 Bedrooms */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Bedrooms</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((bedroom) => (
              <Button
                key={bedroom}
                variant="outlined"
                size="small"
                className={`${buttonDefaultClasses} ${activeBedroom === bedroom ? buttonActiveClasses : ""}`}
                onClick={() =>
                  setActiveBedroom((prev) => (prev === bedroom ? 0 : bedroom))
                }
              >
                {bedroom}
              </Button>
            ))}
            <Button
              variant="outlined"
              size="small"
              className={`${buttonDefaultClasses} ${activeBedroom === 5 ? buttonActiveClasses : ""}`}
              onClick={() => setActiveBedroom((prev) => (prev === 5 ? 0 : 5))}
            >
              5+
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 6 Square (Min / Max) */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Square (㎡)</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex gap-3">
            <TextField
              fullWidth
              size="small"
              label="Min"
              type="number"
              sx={textStyles}
            />
            <TextField
              fullWidth
              size="small"
              label="Max"
              type="number"
              sx={textStyles}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 7 Price (Min / Max) */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Price</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex gap-3">
            <TextField
              fullWidth
              size="small"
              label="Min"
              type="number"
              sx={textStyles}
            />
            <TextField
              fullWidth
              size="small"
              label="Max"
              type="number"
              sx={textStyles}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 8 Rent or Barter */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">Transaction Type</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup>
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
              <FormControlLabel
                value="barter"
                control={<Radio />}
                label="Barter"
              />
              <FormControlLabel value="sell" control={<Radio />} label="Sell" />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* 🔎 Search Button */}
      <div>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          className=" capitalize bg-slate-500 text-white border-0 py-3 "
        >
          <Typography variant="body1">Search Properties</Typography>
        </Button>
      </div>
    </div>
  );
}
