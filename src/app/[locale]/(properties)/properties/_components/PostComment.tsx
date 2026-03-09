import { CommentInput } from "@/libs/types/comment/comment.input";
import React from "react";
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import { SetStateType } from "@/libs/types/common";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

interface PostCommentType {
  commentInput: CommentInput;
  createCommentHandler: () => Promise<void>;
  setCommentInput: SetStateType<CommentInput>;
}
const PostComment: React.FC<PostCommentType> = React.memo(
  ({
    commentInput,
    createCommentHandler,
    setCommentInput,
  }: PostCommentType) => {
    const user = useReactiveVar(userVar);
    return (
      <div className="mt-8 bg-white border border-slate-300/80 rounded-2xl p-6">
        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <ChatBubbleOutlineIcon className="text-slate-600" />
          <Typography variant="h6" className="text-slate-800">
            Leave a Comment
          </Typography>
        </div>

        {/* Comment Input */}
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Share your thoughts about this property..."
          value={commentInput.commentContent}
          onChange={(e) =>
            setCommentInput({
              ...commentInput,
              commentContent: e.target.value,
            })
          }
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#f8fafc",
            },
            ".MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#cbd5e1",
              },
          }}
        />

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={createCommentHandler}
            className="bg-slate-400 hover:bg-slate-600 rounded-xl px-6 py-2 shadow-none capitalize"
            disabled={
              commentInput.commentContent.trim() === "" || user._id === ""
            }
          >
            Post Comment
          </Button>
        </div>
      </div>
    );
  },
);

export default PostComment;
