// property.schema.ts
import { z } from "zod";
import { PropertyLocation, PropertyType } from "../enums/property.enum";

export const PropertySchema = z.object({
  propertyType: z.nativeEnum(PropertyType),
  propertyLocation: z.nativeEnum(PropertyLocation),
  propertyAddress: z.string().min(1, { message: "Address is required" }),
  propertyTitle: z.string().min(1, { message: "Title is required" }),
  propertyPrice: z.number().min(1),
  propertySquare: z.number().min(1),
  propertyBeds: z.number().min(1),
  propertyRooms: z.number().min(1),
  propertyImages: z.array(z.string()).min(1),
  propertyDesc: z.string().optional(),

  propertyBarter: z.boolean().default(false),
  propertyRent: z.boolean().default(false),

  constructedAt: z.date().optional(),
});
