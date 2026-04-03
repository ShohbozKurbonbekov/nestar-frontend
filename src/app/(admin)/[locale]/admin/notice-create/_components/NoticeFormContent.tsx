"use client";

import { RHFInput } from "@/app/(main)/[locale]/profile/_components/property/RHFInput";
import { RHFSelect } from "@/app/(main)/[locale]/profile/_components/property/RHFSelect";
import {
  NoticeCategory,
  NoticePriority,
  NoticeVisibility,
} from "@/libs/enums/notice.enum";
import { Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface NoticeFormContentType {
  noticeId?: string | null;
  onCreate: (value: any) => Promise<void>;
  onUpdate: (value: any) => Promise<void>;
}

export default function NoticeFormContent({
  noticeId,
  onCreate,
  onUpdate,
}: NoticeFormContentType) {
  const { handleSubmit, formState } = useFormContext();

  return (
    <Box className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8">
      <Box className="grid  grid-cols-1 md:grid-cols-2 gap-5">
        <RHFInput name="noticeTitle" label="Notice Title" />

        <RHFSelect
          name="noticeCategory"
          label="Category"
          options={Object.keys(NoticeCategory)}
        />

        <RHFSelect
          name="noticeVisibility"
          label="Visibility"
          options={Object.keys(NoticeVisibility)}
        />

        <RHFSelect
          name="noticePriority"
          label="Priority"
          options={Object.keys(NoticePriority)}
        />
      </Box>

      <Box className="col-span-2 mt-5">
        <RHFInput
          name="noticeContent"
          label="Notice Content"
          multiline
          rows={6}
        />
      </Box>

      <Box className="flex justify-end mt-6">
        <Button
          variant="contained"
          disabled={formState.isSubmitting}
          onClick={handleSubmit(noticeId ? onUpdate : onCreate)}
          className="bg-slate-800 hover:bg-slate-700 rounded-xl px-6 py-2.5 capitalize"
        >
          {noticeId ? "Update Notice" : "Create Notice"}
        </Button>
      </Box>
    </Box>
  );
}
