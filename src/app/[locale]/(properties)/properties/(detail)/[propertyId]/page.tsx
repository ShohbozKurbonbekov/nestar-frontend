"use client";

import { GET_COMMENTS, GET_PROPERTY } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import { Property } from "@/libs/types/property/property";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import DetailPageLoading from "@/components/skeletons/DetailPageLoading";
import PropertyGallery from "../../_components/PropertyGallery";
import PropertyIntroduction from "../../_components/PropertyIntroduction";
import PropertyStatistics from "./PropertyStatistics";
import { Direction } from "@/libs/enums/common.enum";
import { CommentsInquiry } from "@/libs/types/comment/comment.input";
import { Comment } from "@/libs/types/comment/comment";
import PropertyComments from "../../_components/PropertyComments";

const initialComment = {
  page: 1,
  limit: 5,
  sort: "createdAt",
  direction: Direction.DESC,
  search: {
    commentRefId: "685e773785c28b7ead85cfb5",
  },
};
export default function PropertyDetail() {
  const params = useParams();

  const [property, setProperty] = useState<Property | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const [commentInquery, setCommentInquery] =
    useState<CommentsInquiry>(initialComment);
  const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  {
    /*  Apollo Fetch  */
  }
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
      if (data?.getProperty) setProperty(data?.getProperty);
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
      if (data?.getComments?.list) setPropertyComments(data?.getComments?.list);
      setTotalComments(data?.getComments?.metaCounter[0]?.total ?? 0);
    },
  });

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
    }
  }, [params]);
  console.log("Comments: ", propertyComments);
  if (getPropertyLoading)
    return <DetailPageLoading subtitle="Fetching property detail..." />;

  // ------------------------------- Handlers -----------------
  const onPageChange = async (event: ChangeEvent<unknown>, value: number) => {
    commentInquery.page = value;
    setCommentInquery({ ...commentInquery });
  };
  if (!propertyId || !property) return;
  return (
    <section className="py-20 bg-white">
      {/*  Apollo Fetch  */}
      <PropertyGallery images={property.propertyImages} />
      <PropertyIntroduction
        propertyCreation={property.createdAt}
        propertyLocation={property.propertyLocation}
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
              propertyBedrooms={property?.propertyBeds}
              propertyLikes={property.propertyLikes}
              propertyRooms={property.propertyRooms}
              propertySquare={property.propertySquare}
              propertyType={property.propertyType}
              propertyViews={property.propertyViews}
              propertyYearBuilt={property.constructedAt}
            />

            <PropertyComments
              comments={propertyComments}
              onPageChange={onPageChange}
              page={commentInquery.page}
              totalComments={totalComments}
              totalPages={Math.ceil(totalComments / commentInquery.limit)}
            />
          </div>
          <div className="lg:col-span-2 border border-slate-300/80 p-4 rounded-2xl">
            {" "}
            part 2
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
