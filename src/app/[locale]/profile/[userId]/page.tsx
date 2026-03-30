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
import { userVar } from "@/apollo/store";
import MyProfile from "../_components/features/MyProfile";
import { MemberType } from "@/libs/enums/member.enum";
import FollowProvider from "../_components/FollowProvider";

// lazy loading
const AddProperty = dynamic(
  () => import("../_components/features/AddProperty")
);

const MyProperties = dynamic(
  () => import("../_components/features/MyProperties")
);
const MyFavorites = dynamic(
  () => import("../_components/features/MyFavorites")
);
const RecentlyVisited = dynamic(
  () => import("../_components/features/RecentlyVisited")
);
const MyArticles = dynamic(() => import("../_components/features/MyArticles"));

const WriteArticle = dynamic(
  () => import("../_components/features/WriteArticle")
);
const Followers = dynamic(() => import("../_components/features/Followers"));
const Followings = dynamic(() => import("../_components/features/Followings"));

export default function Profile() {
  const user = useReactiveVar(userVar);
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | undefined>();
  const [memberId, setMemberId] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const isOwner = user?._id === memberId;
  const variant: "OWNER" | "VISITOR" = isOwner ? "OWNER" : "VISITOR";
  const tab = searchParams.get("tab") ?? "myProfile";

  /************************ Apollo  **************************/
  const { loading: getMemberLoading, refetch: getMemberRefetch } = useQuery(
    GET_MEMBER,
    {
      fetchPolicy: "cache-and-network",
      variables: { input: memberId },
      skip: !memberId,
      onCompleted: (data: T) => {
        const fetchedMember = data.getMember;
        const isOwnerNow = user?._id === fetchedMember?._id;
        setMember(fetchedMember);
        let nextTab = "myProfile";

        if (!isOwnerNow) {
          nextTab =
            fetchedMember?.memberType === MemberType.USER
              ? "followers"
              : "myProperties";
        }

        const params = new URLSearchParams(searchParams);
        params.set("tab", nextTab);

        router.replace(`?${params.toString()}`);
      },
    }
  );

  /************************ Apollo End  **************************/

  useEffect(() => {
    if (params.userId) {
      setMemberId(String(params.userId));
    }
  }, [params.userId]);

  const componentMap: T = {
    addProperty: <AddProperty />,
    myProperties: <MyProperties />,
    myFavorites: <MyFavorites />,
    writeArticle: <WriteArticle />,
    myArticles: <MyArticles member={member} isOwner={isOwner} />,
    recentlyVisited: <RecentlyVisited />,
    myProfile: <MyProfile />,
    followers: (
      <FollowProvider>
        <Followers member={member} isOwner={isOwner} />
      </FollowProvider>
    ),
    followings: (
      <FollowProvider>
        <Followings member={member} isOwner={isOwner} />
      </FollowProvider>
    ),
  };

  const refetchMember = useCallback(async () => {
    await getMemberRefetch({ input: memberId });
  }, [getMemberRefetch, memberId]);

  if (!memberId || getMemberLoading)
    return <DetailPageLoading subtitle="Fetching user detail" />;

  if (!member)
    return (
      <section className="mt-30 mb-10">
        <Emty title="No Member Found" />
      </section>
    );

  return (
    <section className="pt-25 pb-10 px-4 bg-sky-50">
      <div className="w-full max-w-8xl mx-auto grid grid-col-1 md:grid-cols-12 border border-slate-300 rounded-2xl overflow-hidden items-stretch mt-5 bg-white shadow-sm">
        {/* Sidebar */}
        <div className="md:col-span-3 md:border-r-slate-300/80 md:border-r">
          <FollowProvider>
            <ProfileSidebar
              member={member}
              variant={variant}
              refetchMember={refetchMember}
            />
          </FollowProvider>
        </div>

        {/* Main */}
        <div className="md:col-span-9">
          <AnimatePresence mode="wait" key={tab}>
            <motion.div
              className="w-full h-full"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{ duration: 0.4 }}
            >
              {componentMap[tab] ?? <MyProfile />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
