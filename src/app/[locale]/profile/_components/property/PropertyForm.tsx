"use client";
import { PropertyFormProvider } from "./PropertyFormProvider";
import PropertyFormContent from "./PropertyFormContent";

export default function PropertyForm({ defaultValues, onSubmit }: any) {
  return (
    <PropertyFormProvider defaultValues={defaultValues}>
      <PropertyFormContent onSubmit={onSubmit} />
    </PropertyFormProvider>
  );
}
