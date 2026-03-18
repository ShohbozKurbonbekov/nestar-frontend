import {
  BoardArticleCategory,
  BoardArticleStatus,
} from "@/libs/enums/board-article.enum";
import { Direction } from "@/libs/enums/common.enum";

export interface BoardArticleInput {
  articleCategory: BoardArticleCategory;
  articleTitle: string;
  articleContent: string;
  articleImage: string;
  memberId?: string;
}

interface BAISearch {
  articleCategory?: BoardArticleCategory;
  text?: string;
  isFeatured?: boolean;
}

export interface BoardArticlesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: BAISearch;
}

interface ABAISearch {
  articleStatus?: BoardArticleStatus;
  articleCategory?: BoardArticleCategory;
}

export interface AllBoardArticlesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ABAISearch;
}
