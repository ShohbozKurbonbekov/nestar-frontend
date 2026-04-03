import { NoticeCategory } from "../enums/notice.enum";

// CATEGORY COLORS
export const CAN_VIEW_CATEGORY_STYLES: Record<any, string> = {
  [NoticeCategory.ANNOUNCEMENT]:
    "bg-indigo-100 text-indigo-700 border-indigo-200",
  [NoticeCategory.UPDATE]: "bg-sky-100 text-sky-700 border-sky-200",
  [NoticeCategory.GENERAL]: "bg-slate-100 text-slate-700 border-slate-200",
};

// PRIORITY CONFIG
export const CAN_VIEW_PRIORITY_STYLES = {
  HIGH: {
    chip: "bg-red-100 text-red-700 border-red-200",
    label: "High Priority",
    alert: "⚠️ Critical notice. Immediate attention required.",
    alertStyle: "bg-red-50 text-red-700 border border-red-200",
  },
  MEDIUM: {
    chip: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Medium Priority",
    alert: "Important notice. Please review when possible.",
    alertStyle: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  LOW: {
    chip: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Low Priority",
    alert: "General information. No immediate action needed.",
    alertStyle: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};
