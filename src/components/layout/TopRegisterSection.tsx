"use client";
import { Phone } from "@mui/icons-material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PersonIcon from "@mui/icons-material/Person";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { forwardRef } from "react";
import { Typography } from "@mui/material";

interface TopRegisterSectionType {
  refEl: HTMLElement;
}
const TopRegisterSection = forwardRef<HTMLElement>(({}, ref) => {
  const [language, setLanguage] = React.useState<string>("english");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof language>) => {
    setLanguage(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <section
      className="bg-blue-950 p-4 flex flex-col md:flex-row flex-wrap gap-5 md:items:center"
      ref={ref}
    >
      <div className="flex-1 flex gap-3 md:flex-nowrap flex-wrap">
        <div className="flex sm:text-nowrap space-x-2">
          <PinDropIcon color="info" />
          <Typography variant="body1" color="white">
            Gongju-si, Chungcheongnam-do, South Korea.
          </Typography>
        </div>
        <div className="flex space-x-2">
          <Phone color="info" />
          <Typography variant="body1" color="white">
            +82101234567
          </Typography>
        </div>
      </div>
      <div className="ms-auto  flex gap-5 items-center">
        <div className="flex space-x-2">
          <PersonIcon color="info" />
          <Typography variant="body1" color="white">
            Sing in
          </Typography>
        </div>
        <div>
          <FormControl
            sx={{
              minWidth: 100,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            size="small"
          >
            <InputLabel
              id="select-language"
              sx={{
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              }}
            >
              Language
            </InputLabel>
            <Select
              labelId="select-language"
              id="select-language"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={language}
              label="language"
              onChange={handleChange}
              sx={{
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "6px 12px", // smaller padding
                },
              }}
            >
              <MenuItem value={"english"}>English</MenuItem>
              <MenuItem value={"korean"}>Korean</MenuItem>
              <MenuItem value={"russian"}>Russian</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </section>
  );
});

export default TopRegisterSection;
