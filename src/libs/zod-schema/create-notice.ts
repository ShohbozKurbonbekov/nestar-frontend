import { z } from "zod";
import {
  NoticeCategory,
  NoticePriority,
  NoticeVisibility,
} from "../enums/notice.enum";

export const NoticeSchema = z.object({
  noticeTitle: z
    .string()
    .trim()
    .min(1, "Title must be given")
    .max(100, "Max is 100 characters"),

  noticeContent: z
    .string()
    .trim()
    .min(1, "Content in required")
    .max(200, "Max limit is 200 characters"),

  noticeCategory: z.nativeEnum(NoticeCategory),

  noticeVisibility: z.nativeEnum(NoticeVisibility),

  noticePriority: z.nativeEnum(NoticePriority),
});

export type NoticeFormType = z.infer<typeof NoticeSchema>;
export type NoticeFormInput = z.input<typeof NoticeSchema>;
