"use client";
import {
  GET_AGENTS,
  GET_COMMENTS,
  GET_MEMBER,
  GET_PROPERTIES,
} from "@/apollo/user/query";
import DetailPageLoading from "@/components/skeletons/DetailPageLoading";
import { T } from "@/libs/types/common";
import { Member } from "@/libs/types/member/member";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import AgentDetailInfo from "../../_components/AgentDetailInfo";
import AgentDetailStatistics from "../../_components/AgentDetailStatistics";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
import { Direction, Message } from "@/libs/enums/common.enum";
import { Comment } from "@/libs/types/comment/comment";
import Comments from "@/components/ui/Comments";
import PostComment from "@/components/ui/PostComment";
import { CommentGroup } from "@/libs/enums/comment.enum";
import { userVar } from "@/apollo/store";
import { CREATE_COMMENT } from "@/apollo/user/mutation";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import AgentProperties from "../../_components/AgentProperties";
import { PropertiesInquiry } from "@/libs/types/property/property.input";
import { Property } from "@/libs/types/property/property";
import PublicTopAgents from "@/components/ui/PublicTopAgents";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetAgent } from "@/services/Agent.service";
import { likeTargetProperty } from "@/services/Property.service";

// ------------------------------- Component ----------------------
export default function AgentDetail() {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const params = useParams();
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agent, setAgent] = useState<Member | null>(null);
  const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>({
    page: 1,
    limit: 5,
    sort: "createdAt",
    direction: Direction.DESC,
    search: {
      commentRefId: "",
    },
  });
  const [agentComments, setAgentComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);

  const [commentInput, setCommentInput] = useState<CommentInput>({
    commentGroup: CommentGroup.MEMBER,
    commentContent: "",
    commentRefId: "",
  });

  const [propertiesInquiry, setPropertiesInquiry] = useState<PropertiesInquiry>(
    {
      page: 1,
      limit: 4,
      direction: Direction.DESC,
      sort: "createdAt",
      search: {
        memberId: "",
      },
    },
  );

  const [agentProperties, setAgentProperties] = useState<Property[]>([]);

  const [totalAgentProperties, setTotalAgentProperties] = useState<number>(0);

  const [topAgents, setTopAgents] = useState<Member[]>([]);
  const [topAgentsInitial, setTopAgentsInitial] = useState<AgentsInquiry>({
    page: 1,
    limit: 6,
    sort: "memberRank",
    direction: Direction.DESC,
    search: {},
  });

  useEffect(() => {
    if (params.agentId) setAgentId(String(params.agentId));
  }, [params.agentId]);

  // ****************************************** Apollo Fetch *********************************
  const [createComment] = useMutation(CREATE_COMMENT);
  const {
    loading: getAgentLoading,
    data: getAgentData,
    error: getAgentError,
    refetch: getAgentRefetch,
  } = useQuery(GET_MEMBER, {
    fetchPolicy: "network-only",
    variables: { input: agentId },
    skip: !agentId,
    onCompleted: (data: T) => {
      setAgent(data?.getMember);
      setCommentInquiry({
        ...commentInquiry,
        search: {
          commentRefId: data?.getMember?._id,
        },
      });

      setCommentInput({
        ...commentInput,
        commentRefId: data?.getMember?._id,
      });

      setPropertiesInquiry({
        ...propertiesInquiry,
        search: { memberId: data?.getMember?._id },
      });
    },
  });

  const {
    loading: getPropertiesLoading,
    data: getPropertiesData,
    error: getPropertiesError,
    refetch: getPropertiesRefetch,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: { input: propertiesInquiry },
    skip: !propertiesInquiry?.search?.memberId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setAgentProperties(data?.getProperties?.list);
      setTotalAgentProperties(data?.getProperties?.metaCounter[0]?.total ?? 0);
    },
  });

  const {
    loading: getCommentsLoading,
    data: getCommentsData,
    error: getCommentsError,
    refetch: getCommentsRefetch,
  } = useQuery(GET_COMMENTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: commentInquiry },
    skip: !commentInquiry.search.commentRefId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setAgentComments(data?.getComments?.list);
      setTotalComments(data?.getComments?.metaCounter[0]?.total ?? 0);
    },
  });

  const {
    loading: getTopAgentsLoading,
    data: getTopAgentsData,
    error: getTopAgentsError,
    refetch: getTopAgentsRefetch,
  } = useQuery(GET_AGENTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: topAgentsInitial },

    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTopAgents(data?.getAgents?.list);
    },
    skip: !agent,
  });
  // ****************************************** Apollo End *********************************

  // ------------------------------- Handlers ----------------------
  const createCommentHandler = useCallback(async () => {
    try {
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      await createComment({ variables: { input: commentInput } });

      setCommentInput({ ...commentInput, commentContent: "" });

      await getCommentsRefetch({ input: commentInquiry });
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, [
    user._id,
    createComment,
    commentInput,
    setCommentInput,
    commentInquiry,
    getCommentsRefetch,
  ]);

  const onPageChange = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      setCommentInquiry({ ...commentInquiry, page: Number(value) });
    },
    [setCommentInquiry, commentInquiry],
  );

  const propertyPaginationChangeHandler = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      setPropertiesInquiry({ ...propertiesInquiry, page: Number(value) });
    },
    [setPropertiesInquiry, propertiesInquiry],
  );

  const likeAgentHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetAgent(id);
        getAgentRefetch({ input: agentId });
        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likeAgentHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [getAgentRefetch, agentId],
  );

  const likePropertyHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetProperty(id);
        getPropertiesRefetch({ input: propertiesInquiry });

        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likePropertyHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [getPropertiesRefetch, propertiesInquiry],
  );

  const goMemberPage = useCallback(
    (id: string) => {
      router.push(`/profile/${id}`);
    },
    [router],
  );

  const handleRefetchComments = useCallback(
    async () => await getCommentsRefetch({ input: commentInquiry }),
    [getCommentsRefetch, commentInquiry],
  );

  // ------------------------------- Render ----------------------
  if (getAgentLoading || !agent)
    return <DetailPageLoading subtitle="Fetching agent detail" />;

  return (
    <section className="py-20 mt-10">
      <AgentDetailInfo agent={agent} goMemberPage={goMemberPage} />
      <div className="mx-auto max-w-8xl px-4 my-10 grid grid-cols-1 lg:grid-cols-6 gap-5">
        <div className="lg:col-span-4">
          <AgentDetailStatistics
            likeAgentHandler={likeAgentHandler}
            agent={agent}
          />
          <Comments
            goMemberPage={goMemberPage}
            handleRefetchComments={handleRefetchComments}
            comments={agentComments}
            onPageChange={onPageChange}
            page={commentInquiry.page}
            totalComments={totalComments}
            totalPages={Math.ceil(totalComments / (commentInquiry.limit ?? 1))}
          />

          <PostComment
            commentInput={commentInput}
            createCommentHandler={createCommentHandler}
            setCommentInput={setCommentInput}
          />
          <AgentProperties
            likePropertyHandler={likePropertyHandler}
            propertiesInquiry={propertiesInquiry}
            propertyPaginationChangeHandler={propertyPaginationChangeHandler}
            properties={agentProperties}
            totalAgentProperties={totalAgentProperties}
          />
        </div>
        <div className="lg:col-span-2 ">
          <PublicTopAgents agents={topAgents} />
        </div>
      </div>
    </section>
  );
}
