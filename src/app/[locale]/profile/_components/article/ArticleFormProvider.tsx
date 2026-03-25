"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { ArticleSchema } from "@/libs/zod-schema/article";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";

interface ArticleFormProviderType {
  children: ReactNode;
  articleData: BoardArticle | undefined;
}
export const ArticleFormProvider = ({
  children,
  articleData,
}: ArticleFormProviderType) => {
  const methods = useForm({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      articleCategory: BoardArticleCategory.FREE,
      articleContent: "",
      articleImage: undefined,
      articleTitle: "",
    },
    mode: "onChange",
  });

  const { reset } = methods;

  useEffect(() => {
    if (articleData) {
      reset({
        articleCategory: articleData.articleCategory,
        articleContent: articleData.articleContent,
        articleImage: articleData.articleImage,
        articleTitle: articleData.articleTitle,
      });
    }
  }, [articleData, reset]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};
