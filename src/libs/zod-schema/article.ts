import { z } from "zod";
import { BoardArticleCategory } from "../enums/board-article.enum";
export const ArticleSchema = z.object({
  articleCategory: z.nativeEnum(BoardArticleCategory),
  articleTitle: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Max  limit is 50 characters" }),
  articleImage: z.string().optional(),
  articleContent: z
    .string()
    .min(1, { message: "content is required" })
    .max(250, { message: "Max limit is 250 characters" }),
});
