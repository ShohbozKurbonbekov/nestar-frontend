import {
  BoardArticleCategory,
  BoardArticleStatus,
} from "@/libs/enums/board-article.enum";
import { MeLiked, TotalCounter } from "../property/property";
import { Member } from "../member/member";

export interface BoardArticle {
  _id: string;
  articleCategory: BoardArticleCategory;
  articleStatus: BoardArticleStatus;
  articleTitle: string;
  articleContent: string;
  articleImage: string;
  articleViews: number;
  articleLikes: number;
  articleComments: number;
  memberId: string;
  createdAt: string;
  updatedAt: string;
  /** from aggregation **/
  meLiked?: MeLiked[];
  memberData?: Member;
}

export interface BoardArticles {
  list: BoardArticle[];
  metaCounter: TotalCounter[];
}
