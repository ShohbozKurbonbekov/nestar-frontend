import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import VerifiedIcon from "@mui/icons-material/Verified";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { Comment } from "@/libs/types/comment/comment";
import { serverApi } from "@/libs/config";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { CommentStatus } from "@/libs/enums/comment.enum";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Messages } from "@/libs/config";
import { CommentUpdate } from "@/libs/types/comment/comment.update";
import { UPDATE_COMMENT } from "@/apollo/user/mutation";
import {
  sweetConfirmAlert,
  sweetMixinErrorAlert,
  sweetMixinSuccessAlert,
} from "@/libs/sweetAlert";

// ----------------------------- Component ----------------------------
interface CommentsType {
  comments: Comment[];
  totalComments: number;
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  goMemberPage: (id: string) => void;
  handleRefetchComments: () => Promise<any>;
}

export default function Comments({
  comments,
  totalComments,
  page,
  totalPages,
  onPageChange,
  goMemberPage,
  handleRefetchComments,
}: CommentsType) {
  const [updateLoading, setUpateLoading] = useState<boolean>(false);
  const user = useReactiveVar(userVar);
  const [updatedComment, setUpdatedComment] = useState<string>("");

  const [updatedCommentId, setUpdatedCommentId] = useState<string>("");
  const [updatedCommentWordsCnt, setUpdatedCommentWordsCnt] =
    useState<number>(0);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  //************************************************* Apollo ************************************************* */

  const [updateComment] = useMutation(UPDATE_COMMENT);
  //************************************************* Apollo End ************************************************* */

  // ----------------------------- Handlers ----------------------------

  const updateCommentInputHandler = (value: string) => {
    if (value.length > 100) return;
    setUpdatedCommentWordsCnt(value.length);
    setUpdatedComment(value);
  };

  const cancelButtonHandler = () => {
    setOpenBackdrop(false);
    setUpdatedComment("");
    setUpdatedCommentWordsCnt(0);
    setUpdatedCommentId("");
  };

  const updateButtonHandler = async (
    commentId: string,
    commentStatus?: CommentStatus.DELETE,
  ) => {
    setUpateLoading(true);
    try {
      if (!user?._id) throw new Error(Messages.error2);
      if (!commentId) throw new Error("Select a comment to update!");

      if (
        updatedComment ===
        comments?.find((comment) => comment?._id === commentId)?.commentContent
      )
        return;

      const updateData: CommentUpdate = {
        _id: commentId,
        ...(commentStatus && { commentStatus: commentStatus }),
        ...(updatedComment && { commentContent: updatedComment }),
      };

      if (!updateData?.commentContent && !updateData?.commentStatus)
        throw new Error("Provide data to update your comment!");

      if (commentStatus) {
        if (await sweetConfirmAlert("Do you want to delete the comment?")) {
          await updateComment({
            variables: {
              input: updateData,
            },
          });
          await sweetMixinSuccessAlert("Successfully deleted!");
        } else return;
      } else {
        await updateComment({
          variables: {
            input: updateData,
          },
        });
      }
      await handleRefetchComments();
    } catch (error: any) {
      await sweetMixinErrorAlert(error.message);
    } finally {
      setOpenBackdrop(false);
      setUpdatedComment("");
      setUpdatedCommentWordsCnt(0);
      setUpdatedCommentId("");
      setUpateLoading(false);
    }
  };

  // ----------------------------- Render ----------------------------

  return (
    <div className="border border-slate-300/80 rounded-2xl bg-white p-6 space-y-6 mt-8">
      {/* HEADER */}
      <div
        className={`flex items-center gap-3 ${comments.length ? "border-b border-slate-400 pb-4" : ""} `}
      >
        <ForumIcon className="text-gray-600" />
        <span className="text-lg font-semibold text-gray-800">
          {totalComments} Comments
        </span>
      </div>

      {/* COMMENTS */}
      {!!comments.length && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex  gap-4 p-4 border border-slate-300 rounded-xl hover:bg-gray-50 transition"
            >
              {/* MEMBER IMAGE */}
              <Avatar
                className="cursor-pointer hover:opacity-60 transition-opacity duration-300  h-12 w-12 md:h-15 md:w-15"
                src={
                  comment.memberData?.memberImage
                    ? `${serverApi}/${comment.memberData?.memberImage}`
                    : "/images/default-user.png"
                }
                alt={comment.memberData?.memberNick}
                onClick={() => goMemberPage(comment?.memberData?._id!)}
              />

              {/* COMMENT CONTENT */}
              <div className="flex flex-col w-full">
                {/* NAME + BADGE + TIME */}
                <div className="flex items-center justify-between flex-wrap gap-x-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold text-gray-800 hover:text-gray-500 cursor-pointer transition-colors duration-150"
                      onClick={() => goMemberPage(comment?.memberData?._id!)}
                    >
                      {comment.memberData?.memberNick ??
                        comment.memberData?.memberFullName}
                    </span>

                    {!!comment.memberData?.memberRank &&
                      comment.memberData.memberRank > 5 && (
                        <VerifiedIcon
                          fontSize="small"
                          className="text-blue-500"
                        />
                      )}
                  </div>

                  <span className="text-sm text-gray-400">
                    {timeFormatter(comment.createdAt)}
                  </span>
                </div>

                {/* COMMENT TEXT */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {comment.commentContent}
                </p>
                {comment?.memberData && comment.memberData._id === user._id && (
                  <div className="flex justify-end items-center gap-1">
                    <IconButton
                      className="p-1"
                      onClick={() => {
                        setUpdatedCommentId(comment?._id);
                        updateButtonHandler(comment?._id, CommentStatus.DELETE);
                      }}
                    >
                      <DeleteForeverIcon
                        fontSize="small"
                        className="text-red-400 "
                      />
                    </IconButton>
                    <IconButton
                      className="p-1"
                      onClick={(e: any) => {
                        setUpdatedComment(comment?.commentContent);
                        setUpdatedCommentWordsCnt(
                          comment?.commentContent?.length,
                        );
                        setUpdatedCommentId(comment?._id);
                        setOpenBackdrop(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <Backdrop
                      open={openBackdrop}
                      sx={{
                        zIndex: (theme) => theme.zIndex.modal + 1,
                        backdropFilter: "blur(6px)",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!updateLoading && (
                        <Stack
                          sx={{
                            width: { xs: "90%", sm: "500px", lg: "600px" },
                            bgcolor: "background.paper",
                            borderRadius: "12px",
                            p: 3,
                            boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
                            fontFamily: "var(--font-inter)",
                            gap: 2,
                          }}
                        >
                          {/* HEADER */}
                          <Stack spacing={0.5}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 700,
                                textAlign: "center",
                              }}
                            >
                              Update Comment
                            </Typography>
                            <Typography
                              sx={{ fontSize: "14px", color: "text.secondary" }}
                            >
                              Edit your comment below
                            </Typography>
                          </Stack>

                          {/* INPUT */}
                          <Stack spacing={1}>
                            <TextField
                              autoFocus
                              value={updatedComment}
                              onChange={(e) =>
                                updateCommentInputHandler(e.target.value)
                              }
                              placeholder="Write your updated comment..."
                              sx={{
                                ".MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#cbd5e1",
                                  },
                              }}
                            />

                            <Typography
                              className={`text-end text-xs ${updatedCommentWordsCnt > 99 ? "text-red-400" : "text-slate-400"}`}
                            >
                              {updatedCommentWordsCnt}/100
                            </Typography>
                          </Stack>

                          {/* ACTIONS */}
                          <Stack
                            direction="row"
                            justifyContent="flex-end"
                            spacing={1}
                            mt={1}
                          >
                            <Button
                              variant="text"
                              onClick={cancelButtonHandler}
                              sx={{
                                textTransform: "none",
                                color: "text.secondary",
                              }}
                            >
                              Cancel
                            </Button>

                            <Button
                              variant="contained"
                              onClick={() =>
                                updateButtonHandler(updatedCommentId)
                              }
                              sx={{
                                textTransform: "none",
                                borderRadius: "8px",
                                px: 2,
                                fontWeight: 600,
                                boxShadow: "none",
                                "&:hover": {
                                  boxShadow:
                                    "0px 4px 12px rgba(25,118,210,0.3)",
                                },
                              }}
                            >
                              Update
                            </Button>
                          </Stack>
                        </Stack>
                      )}
                      {updateLoading && (
                        <Stack
                          sx={{
                            width: { xs: "90%", sm: "500px", lg: "600px" },
                            bgcolor: "background.paper",
                            borderRadius: "12px",
                            p: 3,
                            boxShadow: "0px 10px 40px rgba(0,0,0,0.2)",
                            fontFamily: "var(--font-inter)",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Box className="flex flex-col items-center gap-3">
                            <CircularProgress />
                            <Typography
                              variant="body2"
                              className="text-slate-400"
                            >
                              Please wait!, Your request is on progress
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Backdrop>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!!comments.length && (
        <div className="flex justify-center pt-4">
          <Pagination
            page={page}
            count={totalPages}
            onChange={onPageChange}
            color="standard"
          />
        </div>
      )}
    </div>
  );
}
