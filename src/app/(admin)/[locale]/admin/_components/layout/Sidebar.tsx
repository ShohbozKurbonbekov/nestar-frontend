import { useState } from "react";
import { Divider } from "@mui/material";
import SidebarLogo from "../sidebar/SidebarLogo";
import SidebarNav from "../sidebar/SidebarNav";
import SidebarUser from "../sidebar/SidebarUser";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboards");

  return (
    <div className="h-full flex flex-col bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <SidebarLogo />
      <Divider className="bg-slate-500" />
      <SidebarNav activeItem={activeItem} setActiveItem={setActiveItem} />
      <Divider className="bg-slate-500" />
      <SidebarUser />
    </div>
  );
}
