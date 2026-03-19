"use client";
import { T } from "@/libs/types/common";
import dynamic from "next/dynamic";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProfileSidebar from "../_components/ProfileSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { GET_MEMBER } from "@/apollo/user/query";
import { useCallback, useEffect, useState } from "react";
import { Member } from "@/libs/types/member/member";
import DetailPageLoading from "@/components/skeletons/DetailPageLoading";
import Emty from "@/components/ui/Emty";
import { sweetErrorHandling } from "@/libs/sweetAlert";
import { userVar } from "@/apollo/store";

// lazy loading
const AddProperty = dynamic(
  () => import("../_components/features/AddProperty"),
);
const MyProperties = dynamic(
  () => import("../_components/features/MyProperties"),
);
const MyFavorites = dynamic(
  () => import("../_components/features/MyFavorites"),
);
const RecentlyVisited = dynamic(
  () => import("../_components/features/RecentlyVisited"),
);
const MyArticles = dynamic(() => import("../_components/features/MyArticles"));
const WriteArticle = dynamic(
  () => import("../_components/features/WriteArticle"),
);

export default function Profile() {
  const user = useReactiveVar(userVar);
  const params = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [userId, setUserId] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "myProperties";
  const isOwner = user?._id === member?._id;
  const variant: "OWNER" | "VISITOR" = isOwner ? "OWNER" : "VISITOR";

  /************************ Apollo  /**************************/

  const {
    loading: getMemberLoading,
    data: getMemberData,
    error: getMemberError,
    refetch: getMemberRefetch,
  } = useQuery(GET_MEMBER, {
    fetchPolicy: "cache-and-network",
    variables: { input: userId },
    skip: !userId,
    onCompleted: (data: T) => {
      setMember(data.getMember);
    },
  });

  useEffect(() => {
    if (params.userId) {
      setUserId(String(params.userId));
    }
  }, [params.userId]);

  const componentMap: T = {
    addProperty: <AddProperty />,
    myProperties: <MyProperties />,
    myFavorites: <MyFavorites />,
    writeArticle: <WriteArticle />,
  };

  /** HANDLERS **/
  const onFollow = useCallback(async () => {
    try {
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, []);

  const onUnfollow = useCallback(async () => {
    try {
    } catch (err: any) {
      await sweetErrorHandling(err);
    }
  }, []);

  if (!userId || getMemberLoading)
    return <DetailPageLoading subtitle="Fetching user detail" />;

  if (!member)
    return (
      <section className="mt-30 mb-10">
        <Emty title="No Member Found" />
      </section>
    );
  return (
    <section className="pt-25 pb-10 px-4">
      <div className="w-full max-w-8xl mx-auto grid grid-col-1 md:grid-cols-12 gap-5 border border-slate-300 rounded-2xl overflow-hidden items-stretch mt-5">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <ProfileSidebar
            authUser={user}
            member={member}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            variant={variant}
          />
        </div>

        {/* Main */}
        <div className="md:col-span-9">
          <AnimatePresence mode="wait" key={tab}>
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{ duration: 0.3 }}
            >
              {componentMap[tab] ?? <MyProperties />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
