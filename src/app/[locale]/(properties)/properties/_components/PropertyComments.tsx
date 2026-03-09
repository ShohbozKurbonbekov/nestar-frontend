import { Avatar, Pagination } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import VerifiedIcon from "@mui/icons-material/Verified";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { Comment } from "@/libs/types/comment/comment";
import { serverApi } from "@/libs/config";

interface PropertyCommentsType {
  comments: Comment[];
  totalComments: number;
  page: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PropertyComments({
  comments,
  totalComments,
  page,
  totalPages,
  onPageChange,
}: PropertyCommentsType) {
  return (
    <div className="border border-slate-300/80 rounded-2xl bg-white p-6 space-y-6 mt-8">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-400 pb-4">
        <ForumIcon className="text-gray-600" />
        <span className="text-lg font-semibold text-gray-800">
          {totalComments} Comments
        </span>
      </div>

      {/* COMMENTS */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-4 p-4 border border-slate-300 rounded-xl hover:bg-gray-50 transition"
          >
            {/* MEMBER IMAGE */}
            <Avatar
              src={
                comment.memberData?.memberImage
                  ? `${serverApi}/${comment.memberData?.memberImage}`
                  : ""
              }
              alt={comment.memberData?.memberNick}
            />

            {/* COMMENT CONTENT */}
            <div className="flex flex-col w-full">
              {/* NAME + BADGE + TIME */}
              <div className="flex items-center justify-between flex-wrap gap-x-5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
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
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {comment.commentContent}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center pt-4">
        <Pagination
          page={page}
          count={totalPages}
          onChange={onPageChange}
          color="standard"
        />
      </div>
    </div>
  );
}
