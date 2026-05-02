"use client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Typography,
  Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";
import { SearchSharp } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useTranslations } from "next-intl";
import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import { useRouter } from "next/navigation";
import { usePropertiesFilter } from "@/libs/hooks/PropertiesFilter";
import { initialInput } from "../(list)/page";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { PRICE_OPTIONS, PROPERTY_SQUARE } from "@/libs/data/static-data";
import { priceFormatter } from "@/libs/utils/priceFormatter";

// ---------------------------- SX styles ---------------------

const inputClasses = {
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9ca3af",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#9ca3af",
  },
};
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
  const router = useRouter();
  const { filters, setFilters } = usePropertiesFilter();

  const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(
    Object.keys(PropertyLocation) as PropertyLocation[],
  );

  const [propertyType, setPropertyType] = useState<PropertyType[]>(
    Object.keys(PropertyType) as PropertyType[],
  );
  const [searchText, setSearchText] = useState<string>(
    filters.search.text ?? "",
  );
  const t = useTranslations("Properties");

  const price_options = useMemo(() => PRICE_OPTIONS, [PRICE_OPTIONS]);
  const property_square = useMemo(() => PROPERTY_SQUARE, [PROPERTY_SQUARE]);
  /** LIFECYCLES **/
  useEffect(() => {
    if (filters?.search?.locationList?.length === 0) {
      delete filters.search.locationList;
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
          },
        })}`,
        { scroll: false },
      );
    }

    if (filters?.search?.typeList?.length === 0) {
      delete filters.search.typeList;
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
          },
        })}`,
        { scroll: false },
      );
    }

    if (filters?.search?.roomsList?.length === 0) {
      delete filters.search.roomsList;
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
          },
        })}`,
        { scroll: false },
      );
    }

    if (filters?.search?.options?.length === 0) {
      delete filters.search.options;
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
          },
        })}`,
        { scroll: false },
      );
    }

    if (filters?.search?.bedsList?.length === 0) {
      delete filters.search.bedsList;
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
          },
        })}`,
        { scroll: false },
      );
    }
  }, [filters]);
  // ---------------------------- Handlers ---------------------
  const propertyLocationSelectHandler = async (e: any) => {
    try {
      const isChecked = e.target.checked;
      const value = e.target.value;
      if (isChecked) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              locationList: [...(filters?.search?.locationList || []), value],
            },
          })}`,
          { scroll: false },
        );
      } else if (filters?.search?.locationList?.includes(value)) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              locationList: filters?.search?.locationList?.filter(
                (item: string) => item !== value,
              ),
            },
          })}`,
          { scroll: false },
        );
      }

      if (filters?.search?.typeList?.length === 0) {
        alert("Error happened with Location");
      }

      console.log("propertyLocationSelectHandler:", e.target.value);
    } catch (err: any) {
      console.log("ERROR, propertyLocationSelectHandler:", err);
    }
  };

  const propertyTypeSelectHandler = async (e: any) => {
    try {
      const isChecked = e.target.checked;
      const value = e.target.value;
      if (isChecked) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              typeList: [...(filters?.search?.typeList || []), value],
            },
          })}`,
          { scroll: false },
        );
      } else if (filters?.search?.typeList?.includes(value)) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              typeList: filters?.search?.typeList?.filter(
                (item: string) => item !== value,
              ),
            },
          })}`,
          { scroll: false },
        );
      }

      if (filters?.search?.typeList?.length == 0) {
        alert("Error in Property type");
      }

      console.log("propertyTypeSelectHandler:", e.target.value);
    } catch (err: any) {
      console.log("ERROR, propertyTypeSelectHandler:", err);
    }
  };

  const propertyRoomSelectHandler = async (number: Number) => {
    try {
      if (number !== 0) {
        if (filters?.search?.roomsList?.includes(number)) {
          router.push(
            `/properties?input=${JSON.stringify({
              ...filters,
              search: {
                ...filters.search,
                roomsList: filters?.search?.roomsList?.filter(
                  (item: Number) => item !== number,
                ),
              },
            })}`,
            { scroll: false },
          );
        } else {
          router.push(
            `/properties?input=${JSON.stringify({
              ...filters,
              search: {
                ...filters.search,
                roomsList: [...(filters?.search?.roomsList || []), number],
              },
            })}`,
            { scroll: false },
          );
        }
      } else {
        console.log("ELSE: ", number);
        delete filters?.search.roomsList;
        setFilters({ ...filters });
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
            },
          })}`,
          { scroll: false },
        );
      }

      console.log("propertyRoomSelectHandler:", number);
    } catch (err: any) {
      console.log("ERROR, propertyRoomSelectHandler:", err);
    }
  };

  const propertyOptionSelectHandler = async (e: any) => {
    try {
      const isChecked = e.target.checked;
      const value = e.target.value;
      if (isChecked) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              options: [...(filters?.search?.options || []), value],
            },
          })}`,
          { scroll: false },
        );
      } else if (filters?.search?.options?.includes(value)) {
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
              options: filters?.search?.options?.filter(
                (item: string) => item !== value,
              ),
            },
          })}`,
          { scroll: false },
        );
      }

      console.log("propertyOptionSelectHandler:", e.target.value);
    } catch (err: any) {
      console.log("ERROR, propertyOptionSelectHandler:", err);
    }
  };

  const propertyBedSelectHandler = async (number: Number) => {
    try {
      if (number !== 0) {
        if (filters?.search?.bedsList?.includes(number)) {
          router.push(
            `/properties?input=${JSON.stringify({
              ...filters,
              search: {
                ...filters.search,
                bedsList: filters?.search?.bedsList?.filter(
                  (item: Number) => item !== number,
                ),
              },
            })}`,
            { scroll: false },
          );
        } else {
          router.push(
            `/properties?input=${JSON.stringify({
              ...filters,
              search: {
                ...filters.search,
                bedsList: [...(filters?.search?.bedsList || []), number],
              },
            })}`,
            { scroll: false },
          );
        }
      } else {
        delete filters?.search.bedsList;
        setFilters({ ...filters });
        router.push(
          `/properties?input=${JSON.stringify({
            ...filters,
            search: {
              ...filters.search,
            },
          })}`,
          { scroll: false },
        );
      }

      console.log("propertyBedSelectHandler:", number);
    } catch (err: any) {
      console.log("ERROR, propertyBedSelectHandler:", err);
    }
  };

  const propertySquareHandler = async (value: number, type: string) => {
    if (type === "start") {
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
            squaresRange: { ...filters.search.squaresRange, start: value },
          },
        })}`,
        { scroll: false },
      );
    } else {
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
            squaresRange: { ...filters.search.squaresRange, end: value },
          },
        })}`,
        { scroll: false },
      );
    }
  };

  const propertyPriceHandler = async (value: number, type: string) => {
    if (type === "start") {
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
            pricesRange: { ...filters.search.pricesRange, start: value * 1 },
          },
        })}`,
        { scroll: false },
      );
    } else {
      router.push(
        `/properties?input=${JSON.stringify({
          ...filters,
          search: {
            ...filters.search,
            pricesRange: { ...filters.search.pricesRange, end: value * 1 },
          },
        })}`,
        { scroll: false },
      );
    }
  };

  const refreshHandler = async () => {
    try {
      setSearchText("");
      setFilters(initialInput);
      router.push(`/properties?input=${JSON.stringify(initialInput)}`, {
        scroll: false,
      });
    } catch (err: any) {
      console.log("ERROR, refreshHandler:", err);
    }
  };

  // ---------------------------- Render ---------------------
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-300/80  space-y-4">
      {/* 1 Title Search */}
      <div className="flex flex-row items-center justify-center">
        <div className="flex gap-1 mt-3">
          <RestartAltIcon
            fontSize="medium"
            color="action"
            className="active:-rotate-90 transition-all duration-300 ease-linear cursor-pointer"
            onClick={refreshHandler}
          />
          <Typography variant="body1" className="text-gray-500">
            {t("reStart")}
          </Typography>
        </div>
      </div>
      <div className="relative">
        <TextField
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilters({
                ...filters,
                search: {
                  ...filters.search,
                  text: searchText.trim(),
                },
              });
            }
          }}
          size="small"
          placeholder={t("searchByTitle")}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #CBD5E1CC",
                borderRadius: "10px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#CBD5E1CC",
              },
            },
            "& .MuiInputBase-input": {
              padding: "15px 50px 15px",
            },
          }}
        />
        <SearchSharp className="p-0 absolute top-1/2 -translate-y-1/2 left-3 text-slate-400 text-3xl " />
        <HighlightOffIcon
          className="p-0 absolute top-1/2 -translate-y-1/2 right-3 text-slate-300 text-3xl cursor-pointer hover:text-slate-500 active:scale-95 transition-all ease-linear duration-200"
          onClick={() => {
            setSearchText("");
            setFilters({
              ...filters,
              search: {
                ...filters.search,
                text: "",
              },
            });
          }}
        />
      </div>

      <Divider />

      {/* 2 Locations */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">
            {t("locationOptions.label")}
          </span>
        </AccordionSummary>
        <AccordionDetails className="border-0">
          <div className={gridClasses}>
            {propertyLocation.map((city) => (
              <FormControlLabel
                key={city}
                control={
                  <Checkbox
                    color="default"
                    value={city}
                    checked={(filters?.search?.locationList || []).includes(
                      city,
                    )}
                    onChange={propertyLocationSelectHandler}
                  />
                }
                label={city}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 3 Property Type */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">
            {t("propertyTypeOptions.label")}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className={gridClasses}>
            {propertyType.map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    color={"default"}
                    value={type}
                    onChange={propertyTypeSelectHandler}
                    checked={(filters?.search?.typeList || []).includes(type)}
                  />
                }
                label={type}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 4 Rooms */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">{t("rooms")}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outlined"
              size="small"
              className={`${buttonDefaultClasses} ${!filters?.search?.roomsList ? buttonActiveClasses : ""}`}
              onClick={() => propertyRoomSelectHandler(0)}
            >
              any
            </Button>
            {[1, 2, 3, 4, 5].map((room: number) => (
              <Button
                key={room}
                variant="outlined"
                size="small"
                className={`${buttonDefaultClasses} ${filters?.search?.roomsList?.includes(room) ? buttonActiveClasses : ""}`}
                onClick={() => propertyRoomSelectHandler(room)}
              >
                {room}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 5 Bedrooms */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">{t("bedrooms")}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outlined"
              size="small"
              className={`${buttonDefaultClasses} ${!filters?.search?.bedsList ? buttonActiveClasses : ""}`}
              onClick={() => propertyBedSelectHandler(0)}
            >
              any
            </Button>
            {[1, 2, 3, 4, 5].map((bedroom) => (
              <Button
                key={bedroom}
                variant="outlined"
                size="small"
                className={`${buttonDefaultClasses} ${filters?.search?.bedsList?.includes(bedroom) ? buttonActiveClasses : ""}`}
                onClick={() => propertyBedSelectHandler(bedroom)}
              >
                {bedroom}
              </Button>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 6 Square (Min / Max) */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">
            {t("squareOptions.label")}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex gap-3">
            <Autocomplete
              fullWidth
              freeSolo
              options={property_square}
              value={filters?.search?.squaresRange?.start}
              onChange={(event, newValue) => {
                if (typeof newValue === "number")
                  propertySquareHandler(newValue, "start");
                else if (typeof newValue === "string")
                  propertySquareHandler(Number(newValue), "start");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("squareOptions.option1")}
                  placeholder="0"
                  size="small"
                  sx={inputClasses}
                />
              )}
              getOptionLabel={(option) =>
                typeof option === "number" ? String(option) : option
              }
            />

            <Autocomplete
              fullWidth
              freeSolo
              options={property_square}
              value={filters?.search?.squaresRange?.end}
              onChange={(event, newValue) => {
                if (typeof newValue === "number")
                  propertySquareHandler(newValue, "end");
                else if (typeof newValue === "string")
                  propertySquareHandler(Number(newValue), "end");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("squareOptions.option2")}
                  placeholder="0"
                  size="small"
                  sx={inputClasses}
                />
              )}
              getOptionLabel={(option) =>
                typeof option === "number" ? String(option) : option
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 7 Price (Min / Max) */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">
            {t("priceOptions.label")}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex gap-3">
            <Autocomplete
              fullWidth
              freeSolo
              options={price_options}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option.toLocaleString()}
                </li>
              )}
              value={filters?.search?.pricesRange?.start}
              onChange={(event, newValue) => {
                if (typeof newValue === "number")
                  propertyPriceHandler(newValue, "start");
                else if (typeof newValue === "string")
                  propertyPriceHandler(Number(newValue), "start");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("priceOptions.option1")}
                  placeholder="0"
                  size="small"
                />
              )}
              getOptionLabel={(option) =>
                typeof option === "number"
                  ? String(option).toLocaleString()
                  : option.toLocaleString()
              }
              sx={inputClasses}
            />

            <Autocomplete
              fullWidth
              freeSolo
              options={price_options}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option.toLocaleString()}
                </li>
              )}
              value={filters?.search?.pricesRange?.end}
              onChange={(event, newValue) => {
                if (typeof newValue === "number")
                  propertyPriceHandler(newValue, "end");
                else if (typeof newValue === "string")
                  propertyPriceHandler(Number(newValue), "end");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("priceOptions.option2")}
                  placeholder="0"
                  size="small"
                  sx={inputClasses}
                />
              )}
              getOptionLabel={(option) =>
                typeof option === "number"
                  ? String(option).toLocaleString()
                  : option.toLocaleString()
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>

      {/* 8 Rent or Barter */}
      <Accordion sx={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold text-gray-700">
            {t("transactionTypeOptions.label")}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className={gridClasses}>
            {[
              { name: "propertyBarter", label: "Barter" },
              { name: "propertyRent", label: "Rent" },
            ].map(({ label, name }) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox
                    value={name}
                    color="default"
                    onChange={propertyOptionSelectHandler}
                    checked={(filters?.search?.options || []).includes(name)}
                  />
                }
                label={label}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
