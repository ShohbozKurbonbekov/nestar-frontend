import Image from "next/image";
import { Card, Chip, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { serverApi } from "@/libs/config";
import { timeFormatter } from "@/libs/utils/timeFormatter";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getBaseUrl } from "@/libs/utils/getBaseUrl";

type ArticleCardType = {
  id: string;
  image: string | undefined;
  category: string;
  title: string;
  author: string | undefined;
  date: string;
  comments: number;
  variant: "vertical" | "main";
};

export default function ArticleCard({
  image,
  category,
  title,
  author,
  date,
  comments,
  variant,
  id,
}: ArticleCardType) {
  const imageUrl = image
    ? `${getBaseUrl()}/${image}`
    : "/images/default-blog.png";

  const locale = useLocale();

  if (variant === "main") {
    return (
      <Link href={`/community/${id}`}>
        <Card className="relative h-full w-full overflow-hidden rounded-xl group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end h-full p-5 text-white">
            {/* Top */}
            <div>
              <Chip
                label={category}
                size="small"
                className="py-2 px-3 rounded-xl text-gray-700 bg-slate-200"
              />

              <Typography
                variant="h6"
                className="mt-3 font-semibold leading-snug line-clamp-2 relative"
              >
                {title}
              </Typography>
            </div>

            {/* Bottom Metadata */}
            <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <PersonOutlineIcon fontSize={"small"} />
                <span>{author ?? "Uknown"}</span>
              </div>

              <div className="flex items-center gap-1">
                <CalendarTodayOutlinedIcon fontSize="small" />
                <span>{timeFormatter(date)}</span>
              </div>

              <div className="flex items-center gap-1">
                <ChatBubbleOutlineIcon fontSize="small" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  } else if (variant === "vertical") {
    return (
      <Link href={`/community/${id}`}>
        <Card className="w-full h-full rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
          {/* IMAGE SECTION */}
          <div className="relative w-full h-7/12 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <Chip
                label={category}
                size="small"
                className="bg-white font-semibold"
              />
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="flex-1 flex flex-col justify-between p-4">
            {/* Title */}
            <Typography
              variant="h6"
              className="font-semibold leading-snug line-clamp-2"
            >
              {title}
            </Typography>

            {/* Metadata */}
            <div className="flex md:flex-col xl:flex-row gap-y-2 gap-x-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <PersonOutlineIcon fontSize="small" />
                <span>{author}</span>
              </div>

              <div className="flex items-center gap-1">
                <CalendarTodayOutlinedIcon fontSize="small" />
                <span>{timeFormatter(date)}</span>
              </div>

              <div className="flex items-center gap-1">
                <ChatBubbleOutlineIcon fontSize="small" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
  return null;
}
