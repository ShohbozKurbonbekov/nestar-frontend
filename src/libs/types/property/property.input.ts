import { Direction } from "@/libs/enums/common.enum";
import {
  PropertyLocation,
  PropertyStatus,
  PropertyType,
} from "@/libs/enums/property.enum";

export interface PropertyInput {
  _id?: string;
  propertyType: PropertyType;
  propertyLocation: PropertyLocation;
  propertyAddress: string;
  propertyTitle: string;
  propertyPrice: number;
  propertySquare: number;
  propertyBeds: number;
  propertyRooms: number;
  propertyImages: string[];
  propertyDesc?: string;
  propertyBarter?: boolean;
  propertyRent?: boolean;
  memberId?: string;
  constructedAt?: Date;
}

interface PISearch {
  memberId?: string;
  locationList?: PropertyLocation[];
  typeList?: PropertyType[];
  roomsList?: Number[];
  options?: string[];
  bedsList?: Number[];
  pricesRange?: Range;
  periodsRange?: PeriodsRange;
  squaresRange?: Range;
  text?: string;
}

export interface PropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: PISearch;
}

interface APISearch {
  propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: APISearch;
}

interface ALPISearch {
  propertyStatus?: PropertyStatus;
  propertyLocationList?: PropertyLocation[];
  propertyTitle?: string;
}

export interface AllPropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ALPISearch;
}

interface Range {
  start: number;
  end: number;
}

interface PeriodsRange {
  start: Date | number;
  end: Date | number;
}
