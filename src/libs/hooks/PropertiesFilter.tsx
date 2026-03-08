"use client";

import { createContext, useContext } from "react";
import { PropertiesInquiry } from "../types/property/property.input";
import { SetStateType } from "../types/common";

export type PropertiesFilterType = {
  filters: PropertiesInquiry;
  setFilters: SetStateType<PropertiesInquiry>;
};

export const PropertiesFilter = createContext<PropertiesFilterType | null>(
  null,
);

export function usePropertiesFilter() {
  const f = useContext(PropertiesFilter);

  if (!f)
    throw new Error(
      "usePropertiesFilter must be used inside PropertiesFilterProvider",
    );

  return f;
}
