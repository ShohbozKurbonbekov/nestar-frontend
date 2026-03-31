"use client";
import { useState } from "react";
import { Divider } from "@mui/material";
import SidebarLogo from "@/app/(admin)/[locale]/admin/_components/sidebar/SidebarLogo";
import SidebarNav from "@/app/(admin)/[locale]/admin/_components/sidebar/SidebarNav";
import SidebarUser from "@/app/(admin)/[locale]/admin/_components/sidebar/SidebarUser";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboards");

  return (
    <div className="h-full flex flex-col g-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <SidebarLogo />
      <Divider className="bg-slate-800" />
      <SidebarNav activeItem={activeItem} setActiveItem={setActiveItem} />
      <SidebarUser />
    </div>
  );
}
