"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from "@/libs/zod-schema/property";
import { ReactNode } from "react";
import { PropertyInput } from "@/libs/types/property/property.input";

interface PropertyFormProviderType {
  children: ReactNode;
  defaultValues: PropertyInput;
}
export const PropertyFormProvider = ({
  children,
  defaultValues,
}: PropertyFormProviderType) => {
  const methods = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues,
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
