"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { ProfileSchema } from "@/libs/zod-schema/profile";

interface ProfileFormProviderType {
  children: ReactNode;
}
export const ProfileFormProvider = ({ children }: ProfileFormProviderType) => {
  const user = useReactiveVar(userVar);
  const methods = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      memberPhone: "",
      memberNick: "",
      memberFullName: "",
      memberImage: "",
      memberAddress: "",
      memberDesc: "",
    },
    mode: "onChange",
  });

  const { reset } = methods;

  useEffect(() => {
    if (user._id) {
      reset({
        memberPhone: user.memberPhone,
        memberNick: user.memberNick,
        memberFullName: user.memberFullName,
        memberImage: user.memberImage,
        memberAddress: user.memberAddress,
        memberDesc: user.memberDesc,
      });
    }
  }, [user, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
