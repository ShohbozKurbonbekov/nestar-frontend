"use client";
import { useMutation, useQuery } from "@apollo/client";
import ProfileContentHeader from "../ProfileContentHeader";
import {
  CREATE_BOARD_ARTICLE,
  UPDATE_BOARD_ARTICLE,
} from "@/apollo/user/mutation";
import { GET_BOARD_ARTICLE } from "@/apollo/user/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { sweetErrorHandling, sweetMixinSuccessAlert } from "@/libs/sweetAlert";
import ArticleForm from "../article/ArticleForm";

/// ------------------------------- Component ------------------------
export default function WriteArticle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("articleId");
  // ************************ Apollo  ************************
  const [createArticle] = useMutation(CREATE_BOARD_ARTICLE);
  const [updateArticle] = useMutation(UPDATE_BOARD_ARTICLE);

  const { data } = useQuery(GET_BOARD_ARTICLE, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: articleId,
    },
    skip: !articleId,
  });

  // ************************ Apollo  End ************************

  // ------------------------------- Handlers ------------------------
  const onUpdate = useCallback(
    async (value: any) => {
      if (!data.getBoardArticle) return;
      const params = new URLSearchParams();
      params.set("tab", "myArticles");
      value._id = data.getBoardArticle._id;

      try {
        await updateArticle({
          variables: {
            input: value,
          },
        });

        await sweetMixinSuccessAlert(
          "This article has been updated successfully.",
        );
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } catch (error: any) {
        await sweetErrorHandling(error);
      }
    },
    [updateArticle, data, router],
  );

  const onSubmit = useCallback(
    async (value: any) => {
      const params = new URLSearchParams();
      params.set("tab", "myArticles");
      try {
        await createArticle({
          variables: {
            input: value,
          },
        });
        await sweetMixinSuccessAlert("Article Created Sucessfully");
        router.replace(`${window.location.pathname}?${params.toString()}`);
      } catch (error: any) {
        console.log("Error in onSubmit BoardArticle: ", error);
        sweetErrorHandling(error);
      }
    },
    [createArticle, router],
  );
  /// ------------------------------- Render ------------------------
  return (
    <div className="h-full flex flex-col">
      <ProfileContentHeader
        title="Write an Article"
        subtitle="Feel free to write your ideas!"
      />

      <ArticleForm
        articleData={data?.getBoardArticle}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
      />
    </div>
  );
}
