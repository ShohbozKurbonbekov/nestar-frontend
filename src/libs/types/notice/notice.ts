import { Direction } from "../../enums/common.enum";
import {
  NoticeCategory,
  NoticePriority,
  NoticeSort,
  NoticeStatus,
  NoticeVisibility,
} from "../../enums/notice.enum";

interface ALNISearch {
  noticeTitle?: string;
  noticeCategory?: NoticeCategory;
  noticeVisibility?: NoticeVisibility;
  noticeStatus?: NoticeStatus;
}
export interface AllNoticesInquiry {
  page: number;
  limit: number;
  sort?: NoticeSort;
  direction?: Direction;
  search: ALNISearch;
}

export interface Notice {
  _id: string;
  noticeTitle: string;
  noticeContent: string;
  noticeCategory: NoticeCategory;
  noticeStatus: NoticeStatus;
  noticeVisibility: NoticeVisibility;
  noticePriority: NoticePriority;
  memberId: string;
  createdAt: string;
  updatedAt: string;
}
