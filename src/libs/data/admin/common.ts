import {
  BoardArticleCategory,
  BoardArticleStatus,
} from "@/libs/enums/board-article.enum";
import { PropertyStatus } from "@/libs/enums/property.enum";

export const PROPERTY_STATUS_OPTIONS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: PropertyStatus.ACTIVE,
  },
  {
    label: "Sold",
    value: PropertyStatus.SOLD,
  },
  {
    label: "Deleted",
    value: PropertyStatus.DELETE,
  },
];

export const BOARD_ARTICLE_STATUS_OPTIONS = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Active",
    value: BoardArticleStatus.ACTIVE,
  },
  {
    label: "Deleted",
    value: BoardArticleStatus.DELETE,
  },
];

export const BOARD_ARTICLE_CATEGORY_OPTIONS = [
  { label: "All", value: "ALL" },
  { label: "Free", value: BoardArticleCategory.FREE },
  { label: "Recommend", value: BoardArticleCategory.RECOMMEND },
  { label: "News", value: BoardArticleCategory.NEWS },
  { label: "Humor", value: BoardArticleCategory.HUMOR },
];
