"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { NoticeFormProvider } from "./_components/NoticeFormProvider";
import NoticeFormContent from "./_components/NoticeFormContent";
import AdminNoticeCreateHeader from "./_components/AdminNoticeCreateHeader";
import { Stack } from "@mui/material";
import { NoticeFormType } from "@/libs/zod-schema/create-notice";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NOTICE, UPDATE_NOTICE_BY_ADMIN } from "@/apollo/admin/mutation";
import { sweetTopSuccessAlert } from "@/libs/sweetAlert";
import { GET_NOTICE } from "@/apollo/user/query";

export default function CreateNotice() {
  const searchParams = useSearchParams();
  const noticeId = searchParams.get("noticeId");
  const router = useRouter();

  // ********************** Apollo  **********************
  const { data: getNoticeData } = useQuery(GET_NOTICE, {
    fetchPolicy: "cache-and-network",
    variables: { noticeId },
    skip: !noticeId,
  });

  const [createNotice] = useMutation(CREATE_NOTICE);
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const onCreate = useCallback(
    async (value: NoticeFormType) => {
      try {
        await createNotice({
          variables: {
            input: value,
          },
        });
        await sweetTopSuccessAlert("Notice created");
        router.push("/admin/notice");
      } catch (error: any) {
        console.log("Error in onCreate: ", error.message);
      }
    },
    [createNotice, router],
  );

  const onUpdate = useCallback(
    async (value: NoticeFormType) => {
      if (!noticeId) return;
      try {
        await updateNotice({
          variables: {
            input: { _id: noticeId, ...value },
          },
        });
        await sweetTopSuccessAlert("Successfully updated");
      } catch (error) {
        console.log("Error in onUpdate: ", error);
      }
    },
    [updateNotice, noticeId],
  );

  return (
    <Stack my={5} gap={4}>
      <AdminNoticeCreateHeader />
      <NoticeFormProvider notice={getNoticeData?.getNotice}>
        <NoticeFormContent
          noticeId={noticeId}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      </NoticeFormProvider>
    </Stack>
  );
}
