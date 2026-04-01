"use client";
import { Box, Divider, Drawer, Toolbar } from "@mui/material";
import TopNavbar from "./TopNavbar";
import { adminDrawerWidth } from "@/libs/config";
import Sidebar from "./Sidebar";
import { useState } from "react";

interface AdminDashboardFrameType {
  children: React.ReactNode;
}
export default function AdminDashboardFrame({
  children,
}: AdminDashboardFrameType) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TopNavbar handleDrawerToggle={handleDrawerToggle} />

      <Box component="nav" sx={{ width: { md: adminDrawerWidth } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: adminDrawerWidth },
          }}
        >
          <Sidebar />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: adminDrawerWidth,
              border: "none",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
