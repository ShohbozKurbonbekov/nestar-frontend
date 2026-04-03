"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { NoticeSchema } from "@/libs/zod-schema/create-notice";
import {
  NoticeCategory,
  NoticePriority,
  NoticeVisibility,
} from "@/libs/enums/notice.enum";
import { T } from "@/libs/types/common";
import { Notice } from "@/libs/types/notice/notice";

interface NoticeFormProviderType {
  children: ReactNode;
  notice?: Notice;
}

export const NoticeFormProvider = ({
  children,
  notice,
}: NoticeFormProviderType) => {
  const methods = useForm({
    resolver: zodResolver(NoticeSchema),
    mode: "onChange",
    defaultValues: {
      noticeTitle: "",
      noticeContent: "",
      noticeCategory: NoticeCategory.GENERAL,
      noticeVisibility: NoticeVisibility.PUBLIC,
      noticePriority: NoticePriority.LOW,
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (notice) {
      reset({
        noticeTitle: notice.noticeTitle,
        noticeContent: notice.noticeContent,
        noticeCategory: notice.noticeCategory,
        noticeVisibility: notice.noticeVisibility,
        noticePriority: notice.noticePriority,
      });
    }
  }, [notice, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
