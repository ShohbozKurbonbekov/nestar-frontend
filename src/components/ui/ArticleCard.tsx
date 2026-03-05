import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { serverApi } from "@/libs/config";
import Image from "next/image";

type ArticleCardType = {
  variant: "featured" | "vertical" | "horizontal";
  article: BoardArticle;
};

export default function ArticleCard({ article, variant }: ArticleCardType) {
  const imageUrl = article?.articleImage
    ? `${serverApi}/${article.articleImage}`
    : "/public/images/default-blog.png";

  if (variant === "featured") {
    return (
      <div className="group relative w-full rounded-xl overflow-hidden cursor-pointer h-80  sm:h-96  md:h-[80vh] lg:h-full ">
        <Image
          src={imageUrl}
          alt={article?.articleTitle}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white w-full">
          <span className="inline-block bg-white/90 text-black text-xs font-medium px-3 py-1 rounded mb-3">
            {article?.articleCategory}
          </span>

          <h2 className="relative w-fit text-2xl font-semibold">
            {article?.articleTitle}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </h2>

          <div className="flex items-center gap-4 text-sm mt-4 opacity-90 flex-wrap">
            <div className="flex items-center gap-1">
              <PersonOutlineIcon fontSize="small" />
              {article.memberData?.memberNick ?? "Unknown"}
            </div>

            <div className="flex items-center gap-1">
              <CalendarTodayOutlinedIcon fontSize="small" />
              {article?.createdAt}
            </div>

            <div className="flex items-center gap-1">
              <ChatBubbleOutlineIcon fontSize="small" />
              {article?.articleComments ?? 0}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* VERTICAL CARD (COLUMN 2) */
  if (variant === "vertical") {
    return (
      <div className="group flex flex-col lg:h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-80">
        <div className="relative h-3/4 overflow-hidden">
          <Image
            fill
            src={imageUrl}
            alt={article?.articleTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded shadow">
            {article?.articleCategory}
          </span>
        </div>

        <div className="flex flex-col justify-between flex-1 p-4">
          <h3 className="relative w-fit text-lg font-semibold">
            {article?.articleTitle}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </h3>

          <div className="flex items-center gap-3 text-sm text-gray-600 mt-4 flex-wrap">
            <div className="flex items-center gap-1">
              <PersonOutlineIcon fontSize="small" />
              {article?.memberData?.memberNick ?? "Unknown"}
            </div>

            <div className="flex items-center gap-1">
              <CalendarTodayOutlinedIcon fontSize="small" />
              {article?.createdAt}
            </div>

            <div className="flex items-center gap-1">
              <ChatBubbleOutlineIcon fontSize="small" />
              {article?.articleComments}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* HORIZONTAL CARD (COLUMN 3) */
  if (variant === "horizontal") {
    return (
      <div className="group grid grid-cols-2 h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="overflow-hidden">
          <Image
            src={imageUrl}
            alt={article?.articleTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between p-3">
          <div>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {article?.articleCategory}
            </span>

            <h4 className="relative w-fit text-sm font-semibold mt-2">
              {article?.articleTitle}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </h4>
          </div>

          <div className="text-xs text-gray-600 flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <PersonOutlineIcon fontSize="small" />
              {article?.memberData?.memberNick}
            </div>

            <div className="flex items-center gap-1">
              <CalendarTodayOutlinedIcon fontSize="small" />
              {article?.createdAt}
            </div>

            <div className="flex items-center gap-1">
              <ChatBubbleOutlineIcon fontSize="small" />
              {article?.articleComments ?? 0}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
