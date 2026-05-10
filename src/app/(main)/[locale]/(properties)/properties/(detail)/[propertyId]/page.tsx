"use client";

import {
  GET_COMMENTS,
  GET_PROPERTIES,
  GET_PROPERTY,
} from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import { Property } from "@/libs/types/property/property";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DetailPageLoading from "@/components/skeletons/DetailPageLoading";
import PropertyGallery from "../../_components/PropertyGallery";
import PropertyIntroduction from "../../_components/PropertyIntroduction";
import PropertyStatistics from "../../_components/PropertyStatistics";
import { Direction, Message } from "@/libs/enums/common.enum";
import {
  CommentInput,
  CommentsInquiry,
} from "@/libs/types/comment/comment.input";
import { Comment } from "@/libs/types/comment/comment";
import { CommentGroup } from "@/libs/enums/comment.enum";
import PostComment from "../../../../../../../components/ui/PostComment";
import { userChatId, userVar } from "@/apollo/store";
import { CREATE_COMMENT } from "@/apollo/user/mutation";
import {
  sweetErrorHandling,
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/sweetAlert";
import AgentInfo from "../../_components/AgentInfo";
import SameLocationProperties from "../../_components/SameLocationProperties";
import PropertyTrendingProperties from "../../_components/PropertyTrendingProperties";
import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { likeTargetProperty } from "@/services/Property.service";
import Comments from "@/components/ui/Comments";
import PropertyLiveChat from "@/components/chat/LiveChat";
import { ConversationGroupType } from "@/libs/enums/chat.enum";

// --------------------------------- Initial Comment ---------------------------
const initialComment = {
  page: 1,
  limit: 5,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {
    commentRefId: "",
  },
};

// --------------------------------- Component ---------------------------
export default function PropertyDetail() {
  const isUserOneline = useReactiveVar(userChatId);
  console.log("Am i oneline: ", isUserOneline);
  const user = useReactiveVar(userVar);
  const params = useParams();
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [trendingProperties, setTrendingProperties] = useState<Property[]>([]);

  const [property, setProperty] = useState<Property | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const [commentInquery, setCommentInquery] =
    useState<CommentsInquiry>(initialComment);
  const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const router = useRouter();
  const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
    commentGroup: CommentGroup.PROPERTY,
    commentContent: "",
    commentRefId: "",
  });
  {
    /*  ***************************************** Apollo Fetch  ***************************************** */
  }
  const [createComment] = useMutation(CREATE_COMMENT);

  const {
    loading: getPropertyLoading,
    data: getPropertyData,
    error: getPropertyError,
    refetch: getPropertyRefetch,
  } = useQuery(GET_PROPERTY, {
    fetchPolicy: "network-only",
    variables: { input: propertyId },
    skip: !propertyId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      if (data?.getProperty) setProperty(data.getProperty);
    },
  });

  const {
    loading: getPropertiesLoading,
    data: getPropertiesData,
    error: getPropertiesError,
    refetch: getPropertiesRefetch,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1,
        limit: 6,
        sort: "createdAt",
        direction: Direction.DESC,
        search: {
          locationList: property?.propertyLocation
            ? [property?.propertyLocation]
            : [],
        },
      },
    },
    skip: !propertyId && !property,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      if (data?.getProperties?.list)
        setRelatedProperties(data?.getProperties?.list);
    },
  });

  const {
    loading: getCommentsLoading,
    data: getCommentsData,
    error: getCommentsError,
    refetch: getCommentsRefetch,
  } = useQuery(GET_COMMENTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: { ...commentInquery, search: { commentRefId: propertyId } },
    },
    skip: !propertyId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      if (data?.getComments?.list) setPropertyComments(data.getComments.list);
      setTotalComments(data.getComments?.metaCounter?.[0]?.total ?? 0);
    },
  });

  const {
    loading: getTrendingPropertiesLoading,
    data: getTrendingPropertiesData,
    error: getTrendingPropertiesError,
  } = useQuery(GET_PROPERTIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      input: {
        page: 1,
        limit: 4,
        sort: "propertyLikes",
        direction: Direction.DESC,
        search: {},
      },
    },
    skip: !property,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTrendingProperties(data?.getProperties.list);
    },
  });
  /*  ***************************************** Apollo End  ***************************************** */
  /** LIFECYCLES **/
  useEffect(() => {
    if (params.propertyId) {
      setPropertyId(String(params.propertyId));
      setCommentInquery((prev) => ({
        ...prev,
        search: {
          commentRefId: String(params.propertyId),
        },
      }));
      setInsertCommentData((prev) => ({
        ...prev,
        commentRefId: String(params.propertyId),
      }));
    }
  }, [params]);

  // ------------------------------- Handlers -----------------
  const createCommentHandler = useCallback(async () => {
    try {
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      await createComment({ variables: { input: insertCommentData } });

      setInsertCommentData({ ...insertCommentData, commentContent: "" });

      await getCommentsRefetch({ input: commentInquery });
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, [
    user._id,
    createComment,
    insertCommentData,
    setInsertCommentData,
    commentInquery,
    getCommentsData,
  ]);

  const onPageChange = useCallback(
    async (event: ChangeEvent<unknown>, value: number) => {
      setCommentInquery({ ...commentInquery, page: value });
    },
    [],
  );

  const likePropertyHandler = useCallback(
    async (user: CustomJwtPayload, id: string) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

        await likeTargetProperty(id);
        getPropertyRefetch({ input: id });

        property &&
          getPropertiesRefetch({
            input: {
              page: 1,
              limit: 6,
              sort: "createdAt",
              direction: Direction.DESC,
              search: {
                locationList: [property?.propertyLocation],
              },
            },
          });

        await sweetTopSmallSuccessAlert("succes", 1000);
      } catch (err: any) {
        console.log("ERROR, likePropertyHandler:", err.message);
        await sweetMixinErrorAlert(err.message);
      }
    },
    [],
  );

  const goMemberPage = useCallback(
    (id: string) => {
      router.push(`/profile/${id}`);
    },
    [router],
  );

  const handleRefetchComments = useCallback(
    async () => await getCommentsRefetch({ input: commentInquery }),
    [getCommentsRefetch, commentInquery],
  );

  if (
    (getPropertyLoading && !getPropertyData && !getPropertiesData) ||
    !property
  )
    return <DetailPageLoading subtitle="Fetching property detail..." />;

  if (!property) return;
  // ------------------------------- Render -----------------
  return (
    <section className="py-20 bg-white">
      {/*  Apollo Fetch  */}
      <PropertyGallery images={property.propertyImages} />
      <PropertyIntroduction
        propertyCreation={property.createdAt}
        propertyAddress={property.propertyAddress}
        propertyPrice={property.propertyPrice}
        propertyTitle={property.propertyTitle}
        isBarter={property.propertyBarter}
        isRent={property.propertyRent}
        propertyDesc={property.propertyDesc}
      />
      <div className="max-w-8xl px-4 mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="lg:col-span-4">
            <PropertyStatistics
              propertyLocation={property?.propertyLocation}
              propertyBedrooms={property?.propertyBeds}
              propertyLikes={property?.propertyLikes}
              propertyRooms={property?.propertyRooms}
              propertySquare={property?.propertySquare}
              propertyType={property?.propertyType}
              propertyViews={property?.propertyViews}
              propertyYearBuilt={property?.constructedAt}
              likePropertyHandler={likePropertyHandler}
              propertyLiked={property?.meLiked?.[0]?.myFavorite}
              _id={property?._id}
            />

            <Comments
              goMemberPage={goMemberPage}
              handleRefetchComments={handleRefetchComments}
              comments={propertyComments}
              onPageChange={onPageChange}
              page={commentInquery.page}
              totalComments={totalComments}
              totalPages={Math.ceil(totalComments / commentInquery.limit)}
            />

            <PostComment
              setCommentInput={setInsertCommentData}
              commentInput={insertCommentData}
              createCommentHandler={createCommentHandler}
            />

            <SameLocationProperties
              properties={relatedProperties}
              likePropertyHandler={likePropertyHandler}
            />
          </div>
          <div className="lg:col-span-2">
            <AgentInfo agent={property.memberData} />
            <PropertyTrendingProperties properties={trendingProperties} />
          </div>
        </div>
      </div>
    </section>
  );
}
