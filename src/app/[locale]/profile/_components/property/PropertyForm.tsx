"use client";
import { PropertyFormProvider } from "./PropertyFormProvider";
import PropertyFormContent from "./PropertyFormContent";
import { PropertyInput } from "@/libs/types/property/property.input";

interface PropertyFormType {
  onSubmit: (values: any) => Promise<void>;
  defaultValues: PropertyInput;
}
export default function PropertyForm({
  defaultValues,
  onSubmit,
}: PropertyFormType) {
  return (
    <PropertyFormProvider defaultValues={defaultValues}>
      <PropertyFormContent onSubmit={onSubmit} />
    </PropertyFormProvider>
  );
}
