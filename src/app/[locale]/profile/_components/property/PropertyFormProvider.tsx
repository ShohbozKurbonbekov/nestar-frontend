"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertySchema } from "@/libs/zod-schema/property";

export const PropertyFormProvider = ({ children, defaultValues }: any) => {
  const methods = useForm({
    resolver: zodResolver(PropertySchema),
    defaultValues,
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
