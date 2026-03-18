"use client";

import {
  GET_BOARD_ARTICLE,
  GET_BOARD_ARTICLES,
  GET_COMMENTS,
} from "@/apollo/user/query";
import DetailPageLoading from "@/components/skeletons/DetailPageLoading";
import { Direction, Message } from "@/libs/enums/common.enum";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { Comment } from "@/libs/types/comment/comment";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import ArticleDetails from "../../_components/ArticleDetails";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetArticle } from "@/services/Article.service";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetMixinSuccessAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import Comments from "@/components/ui/Comments";
import PostComment from "@/components/ui/PostComment";
import { CommentGroup } from "@/libs/enums/comment.enum";
import { CREATE_COMMENT } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { T } from "@/libs/types/common";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import FeaturedArticles from "@/components/ui/FeaturedArticles";

// ------------------------------- Component -----------------------
export default function CommunityDetail() {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const params = useParams();
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [article, setArticle] = useState<null | BoardArticle>(null);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [commentInquery, setCommentInquery] = useState<CommentsInquiry>({
    page: 1,
    limit: 5,
    sort: "createdAt",
    direction: Direction.DESC,
    search: { commentRefId: "" },
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState<CommentInput>({
    commentGroup: CommentGroup.ARTICLE,
    commentContent: "",
    commentRefId: "",
  });

  const featuredArticlesInput: BoardArticlesInquiry = useMemo(() => {
    return {
      limit: 4,
      page: 1,
      search: {
        isFeatured: true,
      },
      direction: Direction.DESC,
      sort: "featuredScore",
    };
  }, []);

  const [featuredArticles, setfeaturedArticles] = useState<BoardArticle[]>([]);

  //************************************************* Apollo ************************************************* */
  const [createComment] = useMutation(CREATE_COMMENT);
  const {
    loading: articleLoading,
    data: articleData,
    error: articleError,
    refetch: articleRefetch,
  } = useQuery(GET_BOARD_ARTICLE, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: communityId,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setArticle(data?.getBoardArticle);
    },
    skip: !communityId,
  });

  const {
    loading: getCommentsLoading,
    data: getCommentsData,
    error: getCommentsError,
    refetch: getCommentsRefetch,
  } = useQuery(GET_COMMENTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: commentInquery,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setComments(data.getComments.list);
      setTotalComments(data.getComments?.metaCounter?.[0]?.total || 0);
    },
    skip: !commentInquery.search.commentRefId,
  });

  const {
    loading: featuredArticlesLoading,
    data: featuredArticlesData,
    error: featuredArticlesError,
    refetch: featuredArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: featuredArticlesInput,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setfeaturedArticles(data?.getBoardArticles?.list);
    },
    skip: !communityId,
  });

  //*************************************************Apollo End //************************************************* */

  useEffect(() => {
    if (params.communityId) {
      const communityId = params.communityId;
      setCommunityId(String(communityId));
      setCommentInquery({
        ...commentInquery,
        search: {
          commentRefId: String(communityId),
        },
      });
      setCommentInput({
        ...commentInput,
        commentRefId: String(communityId),
      });
    }
  }, [params.communityId]);

  // ------------------------------- Handlers -----------------------
  const likeArticleHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetArticle(id);
        articleRefetch({ input: communityId });

        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likeArticleHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [communityId, articleRefetch],
  );

  const onPageChange = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      setCommentInquery({ ...commentInquery, page: Number(value) });
    },
    [setCommentInquery, commentInquery],
  );

  const createCommentHandler = useCallback(async () => {
    try {
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      await createComment({ variables: { input: commentInput } });

      setCommentInput({ ...commentInput, commentContent: "" });

      await getCommentsRefetch({ input: commentInquery });
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, [
    user._id,
    createComment,
    commentInput,
    setCommentInput,
    commentInquery,
    getCommentsRefetch,
  ]);

  const goMemberPage = useCallback(
    (id: string) => {
      if (id === user?._id) router.push("/mypage");
      else router.push(`/member?memberId=${id}`);
    },
    [user, router],
  );

  const handleRefetchComments = useCallback(
    async () => await getCommentsRefetch({ input: commentInquery }),
    [getCommentsRefetch, commentInquery],
  );
  // ------------------------------- Render -----------------------
  if (!article || articleLoading)
    return <DetailPageLoading subtitle="Fetching article detail" />;
  return (
    <section className="py-20  px-4">
      <div className="max-w-8xl mx-auto mt-10">
        <ArticleDetails
          goMemberPage={goMemberPage}
          article={article}
          likeArticleHandler={likeArticleHandler}
        />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="lg:col-span-4">
            <Comments
              handleRefetchComments={handleRefetchComments}
              goMemberPage={goMemberPage}
              comments={comments}
              onPageChange={onPageChange}
              page={commentInquery.page}
              totalComments={totalComments}
              totalPages={Math.ceil(totalComments / commentInquery.limit)}
            />

            <PostComment
              commentInput={commentInput}
              createCommentHandler={createCommentHandler}
              setCommentInput={setCommentInput}
            />
          </div>
          <div className="lg:col-span-2">
            <FeaturedArticles featuredArticles={featuredArticles} />
          </div>
        </div>
      </div>
    </section>
  );
}
