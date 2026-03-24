"use client";
import { PropertyFormProvider } from "./PropertyFormProvider";
import PropertyFormContent from "./PropertyFormContent";
import { PropertyInput } from "@/libs/types/property/property.input";
import { Property } from "@/libs/types/property/property";

interface PropertyFormType {
  onSubmit: (values: any) => Promise<void>;
  onUpdate: (value: any) => Promise<void>;

  propertyData: Property;
}
export default function PropertyForm({
  propertyData,
  onSubmit,
  onUpdate,
}: PropertyFormType) {
  return (
    <PropertyFormProvider propertyData={propertyData}>
      <PropertyFormContent onSubmit={onSubmit} onUpdate={onUpdate} />
    </PropertyFormProvider>
  );
}
