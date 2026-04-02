import { PropertyStatus } from "@/libs/enums/property.enum";

export const PROPERTY_STATUS_OPTIONS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: PropertyStatus.ACTIVE,
  },
  {
    label: "Sold",
    value: PropertyStatus.SOLD,
  },
  {
    label: "Deleted",
    value: PropertyStatus.DELETE,
  },
];
