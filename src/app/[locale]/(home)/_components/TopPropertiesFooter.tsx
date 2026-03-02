import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface TopPropertiesFooterType {
  totalViews: number;
  totalLikes: number;
  propertyLink: string;
}
export default function TopPropertiesFooter({
  totalLikes,
  totalViews,
  propertyLink,
}: TopPropertiesFooterType) {
  return (
    <div className="flex items-center">
      <Tooltip title={totalViews} arrow placement="top">
        <IconButton>
          <RemoveRedEyeIcon className="text-slate-600" />
        </IconButton>
      </Tooltip>

      <Tooltip title={totalLikes} arrow placement="top" className="mr-2">
        <IconButton>
          <FavoriteIcon className="text-slate-600" />
        </IconButton>
      </Tooltip>
      <Button
        variant="outlined"
        className="relative border border-green-500 text-sm capitalize text-green-700 rounded-lg group/button overflow-hidden hover:text-white z-10 px-5"
      >
        <Link
          href={propertyLink}
          className="relative group-hover/button:text-white z-10"
        >
          Detail
        </Link>
        <span className="bg-green-500 absolute  inset-0 -translate-x-full opacity-0 group-hover/button:translate-x-0 group-hover/button:opacity-100 transition-transform duration-500 ease-in-out rounded-r-lg"></span>
      </Button>
    </div>
  );
}
