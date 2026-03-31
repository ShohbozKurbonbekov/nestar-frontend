import { userVar } from "@/apollo/store";
import { serverApi } from "@/libs/config";
import { useReactiveVar } from "@apollo/client";
import { Avatar, Typography } from "@mui/material";

export default function SidebarUser() {
  const user = useReactiveVar(userVar);
  const imageUrl = user?.memberImage
    ? `${serverApi}/${user.memberImage}`
    : "/images/default-user.png";
  return (
    <div className="p-4">
      <div className="bg-slate-800 rounded-2xl p-3 flex gap-3">
        <Avatar src={imageUrl} />
        <div>
          <Typography fontSize={13}>Admin</Typography>
          <Typography fontSize={11}>Super Admin</Typography>
        </div>
      </div>
    </div>
  );
}
