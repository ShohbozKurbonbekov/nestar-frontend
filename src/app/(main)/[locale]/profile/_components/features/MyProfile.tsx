"use client";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import ProfileContentHeader from "../ProfileContentHeader";
import {
  CREATE_BOARD_ARTICLE,
  UPDATE_BOARD_ARTICLE,
  UPDATE_MEMBER,
} from "@/apollo/user/mutation";
import { GET_BOARD_ARTICLE } from "@/apollo/user/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { sweetErrorHandling, sweetMixinSuccessAlert } from "@/libs/sweetAlert";
import ArticleForm from "../article/ArticleForm";
import { userVar } from "@/apollo/store";
import { Messages } from "@/libs/config";
import { updateStorage, updateUserInfo } from "@/libs/auth";
import ProfileForm from "../ProfileForm";

/// ------------------------------- Component ------------------------
export default function MyProfile() {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const searchParams = useSearchParams();
  // ************************ Apollo  ************************

  const [updateMember] = useMutation(UPDATE_MEMBER);

  // ************************ Apollo  End ************************

  useEffect(() => {
    if (!user || !user._id) {
      router.push("/");
    }
  }, [user]);

  // ------------------------------- Handlers ------------------------
  const onUpdateProfile = useCallback(
    async (value: any) => {
      try {
        if (!user._id) throw new Error(Messages.error2);
        value._id = user._id;
        const result = await updateMember({
          variables: {
            input: value,
          },
        });

        const jwtToken = result.data.updateMember?.accessToken;
        await updateStorage({
          jwtToken,
        });
        updateUserInfo(result.data.updateMember?.accessToken);
        await sweetMixinSuccessAlert("Profile updated successfully.");
      } catch (error: any) {
        await sweetErrorHandling(error);
      }
    },
    [user, updateMember],
  );
  /// ------------------------------- Render ------------------------
  return (
    <div className="h-full flex flex-col">
      <ProfileContentHeader
        title="My Profile"
        subtitle="We are glad to see you again!"
      />

      <ProfileForm onUpdateProfile={onUpdateProfile} />
    </div>
  );
}
