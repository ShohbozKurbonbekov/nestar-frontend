"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from "@/libs/zod-schema/property";
import { ReactNode, useEffect } from "react";
import { PropertyLocation, PropertyType } from "@/libs/enums/property.enum";
import { Property } from "@/libs/types/property/property";

interface PropertyFormProviderType {
  children: ReactNode;
  propertyData: Property;
}
export const PropertyFormProvider = ({
  children,
  propertyData,
}: PropertyFormProviderType) => {
  const methods = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      propertyTitle: "",
      propertyPrice: 0,
      propertyType: PropertyType.APARTMENT,
      propertyLocation: PropertyLocation.SEOUL,
      propertyAddress: "",
      propertyBarter: false,
      propertyRent: false,
      propertyRooms: 0,
      propertyBeds: 0,
      propertySquare: 0,
      propertyDesc: "",
      propertyImages: [],
    },
    mode: "onChange",
  });

  const { reset } = methods;

  useEffect(() => {
    if (propertyData) {
      reset({
        propertyTitle: propertyData.propertyTitle,
        propertyPrice: propertyData.propertyPrice,
        propertyType: propertyData.propertyType,
        propertyLocation: propertyData.propertyLocation,
        propertyAddress: propertyData.propertyAddress,
        propertyBarter: propertyData.propertyBarter,
        propertyRent: propertyData.propertyRent,
        propertyRooms: propertyData.propertyRooms,
        propertyBeds: propertyData.propertyBeds,
        propertySquare: propertyData.propertySquare,
        propertyDesc: propertyData.propertyDesc,
        propertyImages: propertyData.propertyImages,
      });
    }
  }, [propertyData, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
